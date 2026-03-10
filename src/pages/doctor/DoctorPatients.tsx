import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Calendar,
  FileText,
  Eye,
  Filter,
  X,
  Tag,
  Receipt,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreVertical,
  Pencil,
  ChevronDown,
  HeartPulse,
  Activity,
  Phone,
  Stethoscope,
  AlertCircle,
  Shield,
  ClipboardList,
  StickyNote,
  Plus,
  Trash2,
  CreditCard,
  FlaskConical,
  BadgeDollarSign,
} from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Patient } from "@/data/patientsData";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { format, isWithinInterval, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useCreateBillMutation, useGetDoctorDetailsQuery, useGetDoctorPatientsQuery, useUpdatePatientMutation } from "@/redux/slices/api";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

type TagFilter = Patient["tag"] | "all";
type SortBy = "name" | "date" | "status" | "tag";

type EditPatientPayload = Partial<{
  name: string; age: number; gender: string; phone: string; email: string;
  address: string; bloodGroup: string; condition: string; diagnosis: string;
  status: "Active" | "Critical" | "Follow-up" | "Recovered";
  tag: "critical" | "follow-up" | "normal" | "new" | "chronic";
  insuranceProvider: string; insuranceNumber: string; notes: string;
  allergies: string[]; medications: string[]; medicalHistory: string[];
  emergencyContact: { name: string; relation: string; phone: string };
  vitals: { bloodPressure: string; heartRate: string; temperature: string; weight: string; height: string; bmi: string; oxygenSaturation: string; respiratoryRate: string };
  lifestyle: { smokingStatus: string; alcoholConsumption: string; exerciseFrequency: string; dietType: string; sleepHours: string };
}>;

interface IBillMedicine {
  name: string;
  dosage: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

interface BillPayload {
  medicines: IBillMedicine[];
  consultationFee: number;
  labTestsFee: number;
  subtotal: number;
  tax: number;
  total: number;
  status: "Pending" | "Paid" | "Cancelled";
  paymentMethod: "Cash" | "Card" | "UPI" | "Online";
  notes?: string;
}

// ─── Stable form helpers ──────────────────────────────────────────────────────

function FormSection({
  icon, title, accent = "blue", children,
}: {
  icon: React.ReactNode; title: string; accent?: string; children: React.ReactNode;
}) {
  const colors: Record<string, string> = {
    blue:   "bg-blue-500/10 text-blue-500",
    rose:   "bg-rose-500/10 text-rose-500",
    teal:   "bg-teal-500/10 text-teal-500",
    green:  "bg-emerald-500/10 text-emerald-500",
    amber:  "bg-amber-500/10 text-amber-500",
    purple: "bg-purple-500/10 text-purple-500",
    slate:  "bg-slate-500/10 text-slate-500",
    indigo: "bg-indigo-500/10 text-indigo-500",
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={cn("p-1.5 rounded-md shrink-0", colors[accent])}>
          {icon}
        </div>
        <span className="text-xs font-semibold text-foreground tracking-wide uppercase">{title}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      {children}
    </div>
  );
}

function F({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={cn("space-y-1", full && "col-span-2")}>
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
      {children}
    </div>
  );
}

// ─── Generate / Edit Bill Dialog ──────────────────────────────────────────────

interface GenerateBillDialogProps {
  patient: Patient;
  open: boolean;
  onClose: () => void;
  onSave: (patientId: string | number, data: BillPayload) => Promise<void>;
}

const emptyMedicine = (): IBillMedicine => ({
  name: "", dosage: "", quantity: 1, pricePerUnit: 0, total: 0,
});

function GenerateBillDialog({ patient, open, onClose, onSave }: GenerateBillDialogProps) {
  const initials = patient.name.split(" ").map((n: string) => n[0]).join("");

  const [medicines, setMedicines] = useState<IBillMedicine[]>([emptyMedicine()]);
  const [consultationFee, setConsultationFee] = useState<number>(0);
  const [labTestsFee, setLabTestsFee] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [status, setStatus] = useState<BillPayload["status"]>("Pending");
  const [paymentMethod, setPaymentMethod] = useState<BillPayload["paymentMethod"]>("Cash");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const updateMedicine = (index: number, field: keyof IBillMedicine, value: string | number) => {
    setMedicines((prev) => {
      const updated = [...prev];
      const med = { ...updated[index], [field]: value };
      if (field === "quantity" || field === "pricePerUnit") {
        med.total = Number(med.quantity) * Number(med.pricePerUnit);
      }
      updated[index] = med;
      return updated;
    });
  };

  const addMedicine = () => setMedicines((p) => [...p, emptyMedicine()]);
  const removeMedicine = (i: number) => setMedicines((p) => p.filter((_, idx) => idx !== i));

  const medicinesTotal = medicines.reduce((s, m) => s + (m.total || 0), 0);
  const subtotal = medicinesTotal + consultationFee + labTestsFee;
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + taxAmount;

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave(patient.id, {
      medicines,
      consultationFee,
      labTestsFee,
      subtotal,
      tax: taxAmount,
      total,
      status,
      paymentMethod,
      notes,
    });
    setIsSaving(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0 overflow-hidden rounded-2xl">

        {/* ── Gradient banner ── */}
        <div className="bg-gradient-to-r from-emerald-600/90 to-emerald-500 px-6 pt-5 pb-4 shrink-0">
          <DialogHeader className="space-y-0 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-base shadow shrink-0">
                {initials}
              </div>
              <div>
                <DialogTitle className="text-white text-base font-bold leading-tight">
                  Generate / Edit Bill
                </DialogTitle>
                <p className="text-white/65 text-xs mt-0.5">
                  {patient.name} · {[patient.age && `${patient.age} yrs`, patient.gender].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* ── Fixed-height scrollable body ── */}
        <div className="h-[52vh] overflow-y-auto px-6 py-5 bg-background space-y-6">

          {/* Medicines */}
          <FormSection icon={<ClipboardList className="w-3.5 h-3.5" />} title="Medicines" accent="blue">
            <div className="space-y-2">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_80px_80px_80px_80px_28px] gap-2 px-1">
                {["Name", "Dosage", "Qty", "Price/Unit", "Total", ""].map((h) => (
                  <span key={h} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</span>
                ))}
              </div>

              {medicines.map((med, i) => (
                <div key={i} className="grid grid-cols-[1fr_80px_80px_80px_80px_28px] gap-2 items-center">
                  <Input
                    className="h-8 text-xs"
                    placeholder="Paracetamol"
                    value={med.name}
                    onChange={(e) => updateMedicine(i, "name", e.target.value)}
                  />
                  <Input
                    className="h-8 text-xs"
                    placeholder="500mg"
                    value={med.dosage}
                    onChange={(e) => updateMedicine(i, "dosage", e.target.value)}
                  />
                  <Input
                    className="h-8 text-xs"
                    type="number"
                    min={1}
                    value={med.quantity}
                    onChange={(e) => updateMedicine(i, "quantity", Number(e.target.value))}
                  />
                  <Input
                    className="h-8 text-xs"
                    type="number"
                    min={0}
                    value={med.pricePerUnit}
                    onChange={(e) => updateMedicine(i, "pricePerUnit", Number(e.target.value))}
                  />
                  <div className="h-8 flex items-center text-xs font-medium text-foreground px-2 bg-muted/50 rounded-md border">
                    ₹{med.total.toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => removeMedicine(i)}
                    disabled={medicines.length === 1}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 mt-1" onClick={addMedicine}>
                <Plus className="w-3 h-3" />Add Medicine
              </Button>
            </div>
          </FormSection>

          {/* Fees */}
          <FormSection icon={<BadgeDollarSign className="w-3.5 h-3.5" />} title="Fees" accent="teal">
            <div className="grid grid-cols-2 gap-3">
              <F label="Consultation Fee (₹)">
                <Input
                  className="h-9 text-sm"
                  type="number" min={0}
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(Number(e.target.value))}
                  placeholder="500"
                />
              </F>
              <F label="Lab Tests Fee (₹)">
                <Input
                  className="h-9 text-sm"
                  type="number" min={0}
                  value={labTestsFee}
                  onChange={(e) => setLabTestsFee(Number(e.target.value))}
                  placeholder="0"
                />
              </F>
              <F label="Tax (%)">
                <Input
                  className="h-9 text-sm"
                  type="number" min={0} max={100}
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  placeholder="0"
                />
              </F>
            </div>

            {/* Summary */}
            <div className="mt-3 rounded-lg border bg-muted/30 px-4 py-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground text-xs">
                <span>Medicines</span><span>₹{medicinesTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-xs">
                <span>Consultation</span><span>₹{consultationFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-xs">
                <span>Lab Tests</span><span>₹{labTestsFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-xs">
                <span>Tax ({taxPercent}%)</span><span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-1.5 flex justify-between font-semibold text-foreground">
                <span>Total</span><span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </FormSection>

          {/* Payment & Status */}
          <FormSection icon={<CreditCard className="w-3.5 h-3.5" />} title="Payment & Status" accent="purple">
            <div className="grid grid-cols-2 gap-3">
              <F label="Status">
                <Select value={status} onValueChange={(v) => setStatus(v as BillPayload["status"])}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Pending", "Paid", "Cancelled"].map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </F>
              <F label="Payment Method">
                <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as BillPayload["paymentMethod"])}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Cash", "Card", "UPI", "Online"].map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </F>
            </div>
          </FormSection>

          {/* Notes */}
          <FormSection icon={<StickyNote className="w-3.5 h-3.5" />} title="Notes" accent="slate">
            <Textarea
              className="text-sm resize-none min-h-[72px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any billing notes…"
            />
          </FormSection>
        </div>

        {/* ── Sticky footer ── */}
        <div className="shrink-0 border-t border-border px-6 py-3.5 flex items-center justify-between gap-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">Total: <span className="font-semibold text-foreground">₹{total.toFixed(2)}</span></p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isSaving} className="h-8 px-4">
              Cancel
            </Button>
            <Button size="sm" onClick={handleSubmit} disabled={isSaving} className="h-8 px-4 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white">
              {isSaving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Save Bill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Edit Patient Dialog ──────────────────────────────────────────────────────

type Tab = "basic" | "vitals" | "lifestyle" | "other";

interface EditPatientDialogProps {
  patient: Patient;
  open: boolean;
  onClose: () => void;
  onSave: (id: string | number, data: EditPatientPayload) => Promise<void>;
}

function EditPatientDialog({ patient, open, onClose, onSave }: EditPatientDialogProps) {
  const initials = patient.name.split(" ").map((n: string) => n[0]).join("");

  const [form, setForm] = useState<EditPatientPayload>({
    name: patient.name ?? "", age: patient.age ?? undefined,
    gender: patient.gender ?? "", phone: patient.phone ?? "",
    email: patient.email ?? "", address: patient.address ?? "",
    bloodGroup: patient.bloodGroup ?? "", condition: patient.condition ?? "",
    diagnosis: patient.diagnosis ?? "", status: patient.status ?? undefined,
    tag: patient.tag ?? undefined, insuranceProvider: patient.insuranceProvider ?? "",
    insuranceNumber: patient.insuranceNumber ?? "", notes: patient.notes ?? "",
    allergies: patient.allergies ?? [], medications: patient.medications ?? [],
    medicalHistory: patient.medicalHistory ?? [],
    emergencyContact: {
      name: patient.emergencyContact?.name ?? "",
      relation: patient.emergencyContact?.relation ?? "",
      phone: patient.emergencyContact?.phone ?? "",
    },
    vitals: {
      bloodPressure: patient.vitals?.bloodPressure ?? "",
      heartRate: patient.vitals?.heartRate ?? "",
      temperature: patient.vitals?.temperature ?? "",
      weight: patient.vitals?.weight ?? "",
      height: patient.vitals?.height ?? "",
      bmi: patient.vitals?.bmi ?? "",
      oxygenSaturation: patient.vitals?.oxygenSaturation ?? "",
      respiratoryRate: patient.vitals?.respiratoryRate ?? "",
    },
    lifestyle: {
      smokingStatus: patient.lifestyle?.smokingStatus ?? "",
      alcoholConsumption: patient.lifestyle?.alcoholConsumption ?? "",
      exerciseFrequency: patient.lifestyle?.exerciseFrequency ?? "",
      dietType: patient.lifestyle?.dietType ?? "",
      sleepHours: patient.lifestyle?.sleepHours ?? "",
    },
  });

  const [activeTab, setActiveTab] = useState<Tab>("basic");
  const [isSaving, setIsSaving] = useState(false);

  const set = (field: keyof EditPatientPayload, value: any) =>
    setForm((p) => ({ ...p, [field]: value }));
  const setVital = (field: string, value: string) =>
    setForm((p) => ({ ...p, vitals: { ...p.vitals!, [field]: value } }));
  const setLifestyle = (field: string, value: string) =>
    setForm((p) => ({ ...p, lifestyle: { ...p.lifestyle!, [field]: value } }));
  const setEmergency = (field: string, value: string) =>
    setForm((p) => ({ ...p, emergencyContact: { ...p.emergencyContact!, [field]: value } }));
  const handleList = (f: "allergies" | "medications" | "medicalHistory", v: string) =>
    set(f, v.split(",").map((s: string) => s.trim()).filter(Boolean));

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave(patient.id, form);
    setIsSaving(false);
    onClose();
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "basic",     label: "Basic" },
    { key: "vitals",    label: "Vitals" },
    { key: "lifestyle", label: "Lifestyle" },
    { key: "other",     label: "Other" },
  ];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0 overflow-hidden rounded-2xl">

        {/* ── Gradient banner ── */}
        <div className="bg-gradient-to-r from-primary/90 to-primary px-6 pt-5 pb-4 shrink-0">
          <DialogHeader className="space-y-0 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-base shadow shrink-0">
                {initials}
              </div>
              <div>
                <DialogTitle className="text-white text-base font-bold leading-tight">
                  Edit Patient Info
                </DialogTitle>
                <p className="text-white/65 text-xs mt-0.5">
                  {[patient.age && `${patient.age} yrs`, patient.gender, patient.condition].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Tab bar */}
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeTab === tab.key
                    ? "bg-white text-primary shadow-sm"
                    : "text-white/70 hover:bg-white/15 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Fixed-height body ── */}
        <div className="h-[52vh] overflow-y-auto px-6 py-5 bg-background">

          {/* BASIC */}
          {activeTab === "basic" && (
            <div className="space-y-5">
              <FormSection icon={<Users className="w-3.5 h-3.5" />} title="Identity" accent="blue">
                <div className="grid grid-cols-2 gap-3">
                  <F label="Full Name" full>
                    <Input className="h-9 text-sm" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="John Doe" />
                  </F>
                  <F label="Age">
                    <Input className="h-9 text-sm" type="number" value={form.age ?? ""} onChange={(e) => set("age", e.target.value ? Number(e.target.value) : undefined)} placeholder="35" />
                  </F>
                  <F label="Gender">
                    <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{["Male","Female","Other"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                    </Select>
                  </F>
                  <F label="Blood Group">
                    <Select value={form.bloodGroup} onValueChange={(v) => set("bloodGroup", v)}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}</SelectContent>
                    </Select>
                  </F>
                </div>
              </FormSection>

              <FormSection icon={<Phone className="w-3.5 h-3.5" />} title="Contact" accent="teal">
                <div className="grid grid-cols-2 gap-3">
                  <F label="Phone">
                    <Input className="h-9 text-sm" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 99999 00000" />
                  </F>
                  <F label="Email">
                    <Input className="h-9 text-sm" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="patient@email.com" />
                  </F>
                  <F label="Address" full>
                    <Input className="h-9 text-sm" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street, City, State" />
                  </F>
                </div>
              </FormSection>

              <FormSection icon={<Stethoscope className="w-3.5 h-3.5" />} title="Clinical" accent="rose">
                <div className="grid grid-cols-2 gap-3">
                  <F label="Condition" full>
                    <Input className="h-9 text-sm" value={form.condition} onChange={(e) => set("condition", e.target.value)} placeholder="e.g. Hypertension" />
                  </F>
                  <F label="Diagnosis" full>
                    <Input className="h-9 text-sm" value={form.diagnosis} onChange={(e) => set("diagnosis", e.target.value)} placeholder="e.g. Stage 2 Hypertension" />
                  </F>
                  <F label="Status">
                    <Select value={form.status} onValueChange={(v) => set("status", v)}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{["Active","Critical","Follow-up","Recovered"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </F>
                  <F label="Tag">
                    <Select value={form.tag} onValueChange={(v) => set("tag", v)}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{["critical","follow-up","normal","new","chronic"].map((t) => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</SelectItem>)}</SelectContent>
                    </Select>
                  </F>
                </div>
              </FormSection>
            </div>
          )}

          {/* VITALS */}
          {activeTab === "vitals" && (
            <FormSection icon={<HeartPulse className="w-3.5 h-3.5" />} title="Vitals" accent="rose">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "bloodPressure",   label: "Blood Pressure",  placeholder: "120/80 mmHg" },
                  { key: "heartRate",        label: "Heart Rate",      placeholder: "72 bpm" },
                  { key: "temperature",      label: "Temperature",     placeholder: "98.6 °F" },
                  { key: "weight",           label: "Weight",          placeholder: "70 kg" },
                  { key: "height",           label: "Height",          placeholder: "175 cm" },
                  { key: "bmi",              label: "BMI",             placeholder: "22.9" },
                  { key: "oxygenSaturation", label: "O₂ Saturation",   placeholder: "98%" },
                  { key: "respiratoryRate",  label: "Resp. Rate",      placeholder: "16 /min" },
                ].map(({ key, label, placeholder }) => (
                  <F key={key} label={label}>
                    <Input className="h-9 text-sm" value={(form.vitals as any)?.[key] ?? ""} onChange={(e) => setVital(key, e.target.value)} placeholder={placeholder} />
                  </F>
                ))}
              </div>
            </FormSection>
          )}

          {/* LIFESTYLE */}
          {activeTab === "lifestyle" && (
            <FormSection icon={<Activity className="w-3.5 h-3.5" />} title="Lifestyle" accent="green">
              <div className="grid grid-cols-2 gap-3">
                <F label="Smoking">
                  <Select value={form.lifestyle?.smokingStatus} onValueChange={(v) => setLifestyle("smokingStatus", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{["Non-smoker","Former smoker","Current smoker"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Alcohol">
                  <Select value={form.lifestyle?.alcoholConsumption} onValueChange={(v) => setLifestyle("alcoholConsumption", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{["None","Occasional","Moderate","Heavy"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Exercise">
                  <Select value={form.lifestyle?.exerciseFrequency} onValueChange={(v) => setLifestyle("exerciseFrequency", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{["Sedentary","Light (1-2/week)","Moderate (3-4/week)","Active (5+/week)"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Diet">
                  <Select value={form.lifestyle?.dietType} onValueChange={(v) => setLifestyle("dietType", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{["Omnivore","Vegetarian","Vegan","Keto","Other"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Sleep Hours" full>
                  <Input className="h-9 text-sm" value={form.lifestyle?.sleepHours} onChange={(e) => setLifestyle("sleepHours", e.target.value)} placeholder="e.g. 7–8 hrs" />
                </F>
              </div>
            </FormSection>
          )}

          {/* OTHER */}
          {activeTab === "other" && (
            <div className="space-y-5">
              <FormSection icon={<AlertCircle className="w-3.5 h-3.5" />} title="Emergency Contact" accent="amber">
                <div className="grid grid-cols-2 gap-3">
                  <F label="Name" full>
                    <Input className="h-9 text-sm" value={form.emergencyContact?.name} onChange={(e) => setEmergency("name", e.target.value)} placeholder="Contact name" />
                  </F>
                  <F label="Relation">
                    <Input className="h-9 text-sm" value={form.emergencyContact?.relation} onChange={(e) => setEmergency("relation", e.target.value)} placeholder="Spouse" />
                  </F>
                  <F label="Phone">
                    <Input className="h-9 text-sm" value={form.emergencyContact?.phone} onChange={(e) => setEmergency("phone", e.target.value)} placeholder="+91 99999 00000" />
                  </F>
                </div>
              </FormSection>

              <FormSection icon={<Shield className="w-3.5 h-3.5" />} title="Insurance" accent="purple">
                <div className="grid grid-cols-2 gap-3">
                  <F label="Provider">
                    <Input className="h-9 text-sm" value={form.insuranceProvider} onChange={(e) => set("insuranceProvider", e.target.value)} placeholder="e.g. Star Health" />
                  </F>
                  <F label="Policy Number">
                    <Input className="h-9 text-sm" value={form.insuranceNumber} onChange={(e) => set("insuranceNumber", e.target.value)} placeholder="Policy #" />
                  </F>
                </div>
              </FormSection>

              <FormSection icon={<ClipboardList className="w-3.5 h-3.5" />} title="Medical Lists" accent="teal">
                <div className="space-y-3">
                  <F label="Allergies (comma-separated)" full>
                    <Input className="h-9 text-sm" value={form.allergies?.join(", ")} onChange={(e) => handleList("allergies", e.target.value)} placeholder="e.g. Penicillin, Pollen" />
                  </F>
                  <F label="Current Medications (comma-separated)" full>
                    <Input className="h-9 text-sm" value={form.medications?.join(", ")} onChange={(e) => handleList("medications", e.target.value)} placeholder="e.g. Metformin, Amlodipine" />
                  </F>
                  <F label="Medical History (comma-separated)" full>
                    <Input className="h-9 text-sm" value={form.medicalHistory?.join(", ")} onChange={(e) => handleList("medicalHistory", e.target.value)} placeholder="e.g. Diabetes, Hypertension" />
                  </F>
                </div>
              </FormSection>

              <FormSection icon={<StickyNote className="w-3.5 h-3.5" />} title="Notes" accent="slate">
                <Textarea className="text-sm resize-none min-h-[80px]" value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Any additional notes…" />
              </FormSection>
            </div>
          )}
        </div>

        {/* ── Sticky footer ── */}
        <div className="shrink-0 border-t border-border px-6 py-3.5 flex items-center justify-between gap-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">Only changed fields will be saved.</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isSaving} className="h-8 px-4">
              Cancel
            </Button>
            <Button size="sm" onClick={handleSubmit} disabled={isSaving} className="h-8 px-4 gap-1.5">
              {isSaving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DoctorPatients() {
  const navigate = useNavigate();
  const { toast } = useToast();
  let user = useSelector((state: RootState) => state.app.doctorUser);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagFilter>("all");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [createBill] = useCreateBillMutation();
  

  
 
  const {
      data: doctor,
      isLoading: isLoadingDoctorDetails,
      isError: isErrorDoctorDetails,
      refetch,
    } = useGetDoctorDetailsQuery(String(user.id));

    user = doctor;
    const doctorId = user?.id?.toString();
     const { data: apiData, isLoading, isError } = useGetDoctorPatientsQuery(doctorId!, { skip: !doctorId });
  const [updatePatient] = useUpdatePatientMutation();

  const patients = useMemo<Patient[]>(() => apiData?.patients ?? [], [apiData]);

  const [editingPatientId, setEditingPatientId] = useState<string | number | null>(null);
  const [billingPatientId, setBillingPatientId] = useState<string | number | null>(null);

  const editingPatient = useMemo(
    () => patients.find((p) => p.id === editingPatientId) ?? null,
    [patients, editingPatientId]
  );
  const billingPatient = useMemo(
    () => patients.find((p) => p.id === billingPatientId) ?? null,
    [patients, billingPatientId]
  );

  const filteredAndSortedPatients = useMemo(() => {
    const filtered = patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "all" || patient.tag === selectedTag;
      let matchesDateRange = true;
      if (startDate && endDate && patient.lastVisit) {
        matchesDateRange = isWithinInterval(parseISO(patient.lastVisit), { start: startDate, end: endDate });
      }
      return matchesSearch && matchesTag && matchesDateRange;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":   return a.name.localeCompare(b.name);
        case "date":   return parseISO(b.lastVisit).getTime() - parseISO(a.lastVisit).getTime();
        case "status": return a.status.localeCompare(b.status);
        case "tag":    return a.tag.localeCompare(b.tag);
        default:       return 0;
      }
    });
    return filtered;
  }, [patients, searchQuery, selectedTag, startDate, endDate, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPatients.slice(start, start + itemsPerPage);
  }, [filteredAndSortedPatients, currentPage, itemsPerPage]);

  useMemo(() => { setCurrentPage(1); }, []);

  const handleSavePatient = async (id: string | number, data: EditPatientPayload) => {
    try {
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
      );
      await updatePatient({ id: String(id), body: cleanedData }).unwrap();
      toast({ title: "Saved", description: "Patient updated successfully." });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err?.data?.message || "Failed to update patient" });
    }
  };

const handleSaveBill = async (
  patientId: string | number,
  data: BillPayload
) => {
  try {
    const res = await createBill({
      doctorId: user.id,
      doctorCode: user.doctorCode,

      patientId: patientId,

      medicines: data.medicines,
      consultationFee: data.consultationFee,
      labTestsFee: data.labTestsFee,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total,
      status: data.status,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
    }).unwrap();

    // await axios.post("http://localhost:4000/bill/send-whatsapp-dummy");

    toast({
      title: "Bill Saved",
      description: "Bill generated / updated successfully",
    });

  } catch (err: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description:
        err?.data?.message || "Failed to save bill",
    });
  }
};

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

  const getTagColor = (tag: Patient["tag"]) => {
    switch (tag) {
      case "critical":  return "bg-red-500/10 text-red-600 border-red-200";
      case "follow-up": return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "normal":    return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "new":       return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "chronic":   return "bg-purple-500/10 text-purple-600 border-purple-200";
      default:          return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Critical":  return "bg-red-500";
      case "Follow-up": return "bg-amber-500";
      case "Recovered": return "bg-emerald-500";
      default:          return "bg-blue-500";
    }
  };

  const tags: { value: TagFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "critical", label: "Critical" },
    { value: "follow-up", label: "Follow-up" },
    { value: "normal", label: "Normal" },
    { value: "new", label: "New" },
    { value: "chronic", label: "Chronic" },
  ];

  const clearFilters = () => { setSelectedTag("all"); setStartDate(undefined); setEndDate(undefined); setSearchQuery(""); };
  const hasActiveFilters = selectedTag !== "all" || startDate || endDate;

  if (isLoading) return <div className="flex items-center justify-center h-screen text-sm text-muted-foreground">Loading patients…</div>;
  if (isError)   return <div className="flex items-center justify-center h-screen text-sm text-destructive">Failed to load patients.</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-screen-2xl mx-auto">

            {/* Page Header */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">My Patients</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filteredAndSortedPatients.length} patient{filteredAndSortedPatients.length !== 1 ? "s" : ""} found
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total Patients", count: patients.length,                                       dot: "bg-primary",     num: "text-primary" },
                { label: "Active Cases",   count: patients.filter((p) => p.status === "Active").length,  dot: "bg-emerald-500", num: "text-emerald-600" },
                { label: "Critical",       count: patients.filter((p) => p.tag === "critical").length,   dot: "bg-red-500",     num: "text-red-600" },
                { label: "Follow-up",      count: patients.filter((p) => p.tag === "follow-up").length,  dot: "bg-amber-500",   num: "text-amber-600" },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Card className="border shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                        <p className={cn("text-2xl font-bold", s.num)}>{s.count}</p>
                      </div>
                      <div className={cn("w-2.5 h-2.5 rounded-full", s.dot)} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Search + Filters */}
            <motion.div variants={itemVariants} className="mb-5 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by name or condition…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9 text-sm" />
                </div>
                <div className="flex gap-2 shrink-0">
                  <Select value={sortBy} onValueChange={(v: SortBy) => setSortBy(v)}>
                    <SelectTrigger className="h-9 text-sm w-[140px]">
                      <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="date">Last Visit</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="tag">Tag</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}
                    className={cn("h-9 gap-1.5 text-sm", hasActiveFilters && "border-primary text-primary bg-primary/5")}>
                    <Filter className="w-3.5 h-3.5" />Filter
                    {hasActiveFilters && <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">!</span>}
                  </Button>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 gap-1 text-sm text-muted-foreground">
                      <X className="w-3.5 h-3.5" />Clear
                    </Button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <Card className="border shadow-sm">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {tags.map((tag) => (
                            <button key={tag.value} onClick={() => setSelectedTag(tag.value)}
                              className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all",
                                selectedTag === tag.value
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted")}>
                              {tag.label}
                            </button>
                          ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          {[{ label: "From", date: startDate, set: setStartDate }, { label: "To", date: endDate, set: setEndDate }].map(({ label, date, set }) => (
                            <div key={label} className="flex-1">
                              <p className="text-xs text-muted-foreground mb-1">{label}</p>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="sm" className="w-full justify-start h-9 text-sm font-normal">
                                    <Calendar className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                                    {date ? format(date, "dd MMM yyyy") : "Select date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent mode="single" selected={date} onSelect={set} className="pointer-events-auto" />
                                </PopoverContent>
                              </Popover>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Patient Grid */}
            <motion.div variants={itemVariants}>
              {paginatedPatients.length === 0 ? (
                <div className="text-center py-20">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-foreground">No patients found</p>
                  <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {paginatedPatients.map((patient, index) => {
                    const initials = patient.name.split(" ").map((n: string) => n[0]).join("");
                    return (
                      <motion.div
                        key={patient.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03, type: "spring", stiffness: 300 }}
                        whileHover={{ y: -3, transition: { type: "spring", stiffness: 400 } }}
                      >
                        <Card className="group overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                          <CardContent className="p-0">
                            <div className="h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                            <div className="p-4">
                              {/* Avatar + name + menu */}
                              <div className="flex items-start gap-2.5 mb-3">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-semibold text-sm shadow shrink-0">
                                  {initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-sm text-foreground truncate leading-tight">{patient.name}</h3>
                                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                                    {[patient.age && `${patient.age} yrs`, patient.gender].filter(Boolean).join(" · ")}
                                  </p>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost" size="icon"
                                      className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity -mt-0.5"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreVertical className="w-3.5 h-3.5" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-44" sideOffset={4}>
                                    <DropdownMenuItem
                                      className="gap-2 text-xs cursor-pointer"
                                      onClick={() => setEditingPatientId(patient.id)}
                                    >
                                      <Pencil className="w-3 h-3" />
                                      Edit Patient Info
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="gap-2 text-xs cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50"
                                      onClick={() => setBillingPatientId(patient.id)}
                                    >
                                      <Receipt className="w-3 h-3" />
                                      Generate / Edit Bill
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              {/* Status dot + condition */}
                              <div className="flex items-center gap-1.5 mb-2">
                                <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", getStatusDot(patient.status))} />
                                <span className="text-[11px] text-muted-foreground truncate flex-1">{patient.condition || "—"}</span>
                              </div>

                              {/* Tag */}
                              <div className="mb-3">
                                <span className={cn("inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full border", getTagColor(patient.tag))}>
                                  {patient.tag.charAt(0).toUpperCase() + patient.tag.slice(1)}
                                </span>
                              </div>

                              {/* Last visit */}
                              <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-3">
                                <Calendar className="w-3 h-3 shrink-0" />
                                <span className="truncate">{patient.lastVisit || "—"}</span>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-1.5">
                                <Button variant="outline" size="sm" className="flex-1 h-7 text-xs gap-1" onClick={() => navigate(`/doctor/patients/${patient.id}`)}>
                                  <Eye className="w-3 h-3" />View
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => navigate(`/doctor/patients/${patient.id}/records`)}>
                                  <FileText className="w-3 h-3" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => navigate(`/doctor/${user.id}/patients/${patient.id}/bills`)}>
                                  <Receipt className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {filteredAndSortedPatients.length > 0 && (
              <motion.div variants={itemVariants} className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Rows per page</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
                    <SelectTrigger className="h-8 w-16 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[8, 12, 16, 24].map((n) => <SelectItem key={n} value={n.toString()} className="text-xs">{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <span className="text-xs text-muted-foreground">· Page {currentPage} of {totalPages}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1))
                    .map((page, i, arr) => (
                      <div key={page} className="flex items-center">
                        {i > 0 && arr[i - 1] !== page - 1 && <span className="px-1 text-xs text-muted-foreground">…</span>}
                        <Button variant={currentPage === page ? "default" : "outline"} size="icon" className="h-8 w-8 text-xs" onClick={() => setCurrentPage(page)}>
                          {page}
                        </Button>
                      </div>
                    ))}
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}

          </motion.div>
        </main>
      </div>

      {/* Edit Patient Info Dialog */}
      {editingPatient && (
        <EditPatientDialog
          patient={editingPatient}
          open={!!editingPatient}
          onClose={() => setEditingPatientId(null)}
          onSave={handleSavePatient}
        />
      )}

      {/* Generate / Edit Bill Dialog */}
      {billingPatient && (
        <GenerateBillDialog
          patient={billingPatient}
          open={!!billingPatient}
          onClose={() => setBillingPatientId(null)}
          onSave={handleSaveBill}
        />
      )}
    </div>
  );
}