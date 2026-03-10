import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Receipt,
  Calendar,
  CreditCard,
  FlaskConical,
  Stethoscope,
  Pill,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  BadgeDollarSign,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon,
  Pencil,
  Plus,
  Trash2,
  ClipboardList,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetBillsByPatientQuery,
  useGetPatientByIdQuery,
  useCreateBillMutation,
  useGetDoctorDetailsQuery,
} from "@/redux/slices/api";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Medicine {
  name: string;
  dosage: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

interface Bill {
  _id: string;
  billNumber: string;
  medicines: Medicine[];
  consultationFee: number;
  labTestsFee: number;
  subtotal: number;
  tax: number;
  total: number;
  status: "Paid" | "Pending" | "Cancelled";
  paymentMethod: "Cash" | "Card" | "UPI" | "Online";
  notes?: string;
  createdAt: string;
}

interface BillPayload {
  _id?: string;
  medicines: Medicine[];
  consultationFee: number;
  labTestsFee: number;
  subtotal: number;
  tax: number;
  total: number;
  status: "Pending" | "Paid" | "Cancelled";
  paymentMethod: "Cash" | "Card" | "UPI" | "Online";
  notes?: string;
}

// ── Status config ─────────────────────────────────────────────────────────────

function statusConfig(status: Bill["status"]) {
  switch (status) {
    case "Paid":
      return {
        icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
        strip: "from-emerald-400 to-emerald-500",
      };
    case "Pending":
      return {
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        dot: "bg-amber-400",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        strip: "from-amber-400 to-amber-500",
      };
    case "Cancelled":
      return {
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-50",
        border: "border-red-200",
        dot: "bg-red-400",
        badge: "bg-red-100 text-red-600 border-red-200",
        strip: "from-red-400 to-red-500",
      };
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const PER_ROW = 3;

// ── Form helpers ──────────────────────────────────────────────────────────────

function FormSection({
  icon, title, accent = "blue", children,
}: {
  icon: React.ReactNode; title: string; accent?: string; children: React.ReactNode;
}) {
  const colors: Record<string, string> = {
    blue:   "bg-blue-500/10 text-blue-500",
    teal:   "bg-teal-500/10 text-teal-500",
    purple: "bg-purple-500/10 text-purple-500",
    slate:  "bg-slate-500/10 text-slate-500",
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={cn("p-1.5 rounded-md shrink-0", colors[accent] ?? colors.blue)}>
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
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </Label>
      {children}
    </div>
  );
}

// ── Edit Bill Dialog ──────────────────────────────────────────────────────────

const emptyMed = (): Medicine => ({ name: "", dosage: "", quantity: 1, pricePerUnit: 0, total: 0 });

interface EditBillDialogProps {
  bill: Bill;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: BillPayload) => Promise<void>;
}

function EditBillDialog({
  bill, patientName, patientAge, patientGender,
  open, onClose, onSave,
}: EditBillDialogProps) {
  const initials = patientName.split(" ").map((n) => n[0]).join("").slice(0, 2);

  // Pre-fill all fields from the existing bill
  const [medicines, setMedicines] = useState<Medicine[]>(
    bill.medicines.length > 0 ? bill.medicines.map((m) => ({ ...m })) : [emptyMed()]
  );
  const [consultationFee, setConsultationFee] = useState(bill.consultationFee);
  const [labTestsFee, setLabTestsFee] = useState(bill.labTestsFee);
  const initTaxPercent = bill.subtotal > 0 ? Math.round((bill.tax / bill.subtotal) * 100) : 0;
  const [taxPercent, setTaxPercent] = useState(initTaxPercent);
  const [status, setStatus] = useState<BillPayload["status"]>(bill.status as BillPayload["status"]);
  const [paymentMethod, setPaymentMethod] = useState<BillPayload["paymentMethod"]>(bill.paymentMethod);
  const [notes, setNotes] = useState(bill.notes ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const updateMed = (i: number, field: keyof Medicine, val: string | number) => {
    setMedicines((prev) => {
      const next = [...prev];
      const m = { ...next[i], [field]: val };
      if (field === "quantity" || field === "pricePerUnit") {
        m.total = Number(m.quantity) * Number(m.pricePerUnit);
      }
      next[i] = m;
      return next;
    });
  };

  const medicinesTotal = medicines.reduce((s, m) => s + (m.total || 0), 0);
  const subtotal = medicinesTotal + consultationFee + labTestsFee;
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + taxAmount;

  const handleSubmit = async () => {
  setIsSaving(true);

  await onSave({
    _id: bill._id,   // ✅ ADD THIS
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

        {/* Amber banner (distinct from the green "generate" modal) */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 px-6 pt-5 pb-4 shrink-0">
          <DialogHeader className="space-y-0 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-base shadow shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-white text-base font-bold leading-tight">
                  Edit Bill
                </DialogTitle>
                <p className="text-white/70 text-xs mt-0.5 truncate">
                  {patientName}
                  {[patientAge && `${patientAge} yrs`, patientGender].filter(Boolean).length > 0 && (
                    <> · {[patientAge && `${patientAge} yrs`, patientGender].filter(Boolean).join(" · ")}</>
                  )}
                </p>
              </div>
              <span className="text-white/60 text-xs font-mono shrink-0">{bill.billNumber}</span>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable body */}
        <div className="h-[52vh] overflow-y-auto px-6 py-5 bg-background space-y-6">

          {/* Medicines */}
          <FormSection icon={<ClipboardList className="w-3.5 h-3.5" />} title="Medicines" accent="blue">
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_80px_80px_80px_80px_28px] gap-2 px-1">
                {["Name", "Dosage", "Qty", "Price/Unit", "Total", ""].map((h) => (
                  <span key={h} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</span>
                ))}
              </div>
              {medicines.map((med, i) => (
                <div key={i} className="grid grid-cols-[1fr_80px_80px_80px_80px_28px] gap-2 items-center">
                  <Input className="h-8 text-xs" placeholder="Paracetamol" value={med.name}
                    onChange={(e) => updateMed(i, "name", e.target.value)} />
                  <Input className="h-8 text-xs" placeholder="500mg" value={med.dosage}
                    onChange={(e) => updateMed(i, "dosage", e.target.value)} />
                  <Input className="h-8 text-xs" type="number" min={1} value={med.quantity}
                    onChange={(e) => updateMed(i, "quantity", Number(e.target.value))} />
                  <Input className="h-8 text-xs" type="number" min={0} value={med.pricePerUnit}
                    onChange={(e) => updateMed(i, "pricePerUnit", Number(e.target.value))} />
                  <div className="h-8 flex items-center text-xs font-medium text-foreground px-2 bg-muted/50 rounded-md border">
                    ₹{med.total.toFixed(2)}
                  </div>
                  <Button variant="ghost" size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => setMedicines((p) => p.filter((_, idx) => idx !== i))}
                    disabled={medicines.length === 1}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 mt-1"
                onClick={() => setMedicines((p) => [...p, emptyMed()])}>
                <Plus className="w-3 h-3" />Add Medicine
              </Button>
            </div>
          </FormSection>

          {/* Fees */}
          <FormSection icon={<BadgeDollarSign className="w-3.5 h-3.5" />} title="Fees" accent="teal">
            <div className="grid grid-cols-2 gap-3">
              <F label="Consultation Fee (₹)">
                <Input className="h-9 text-sm" type="number" min={0} value={consultationFee}
                  onChange={(e) => setConsultationFee(Number(e.target.value))} />
              </F>
              <F label="Lab Tests Fee (₹)">
                <Input className="h-9 text-sm" type="number" min={0} value={labTestsFee}
                  onChange={(e) => setLabTestsFee(Number(e.target.value))} />
              </F>
              <F label="Tax (%)">
                <Input className="h-9 text-sm" type="number" min={0} max={100} value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))} />
              </F>
            </div>
            {/* Summary */}
            <div className="mt-3 rounded-lg border bg-muted/30 px-4 py-3 space-y-1.5">
              {[
                ["Medicines",         medicinesTotal],
                ["Consultation",      consultationFee],
                ["Lab Tests",         labTestsFee],
                [`Tax (${taxPercent}%)`, taxAmount],
              ].map(([label, val]) => (
                <div key={String(label)} className="flex justify-between text-muted-foreground text-xs">
                  <span>{label}</span><span>₹{Number(val).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-1.5 flex justify-between font-semibold text-foreground text-sm">
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
            <Textarea className="text-sm resize-none min-h-[72px]" value={notes}
              onChange={(e) => setNotes(e.target.value)} placeholder="Any billing notes…" />
          </FormSection>
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 border-t border-border px-6 py-3.5 flex items-center justify-between gap-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">
            Total: <span className="font-semibold text-foreground">₹{total.toFixed(2)}</span>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isSaving} className="h-8 px-4">
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSaving}
              className="h-8 px-4 gap-1.5 bg-amber-500 hover:bg-amber-600 text-white"
            >
              {isSaving && (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Update Bill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Turn indicator ────────────────────────────────────────────────────────────

function TurnIndicator({ direction }: { direction: "right-to-next" | "left-to-next" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative h-10 w-full"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-200" />
      <div className={cn(
        "absolute top-0 bottom-0 w-0.5 bg-slate-200",
        direction === "right-to-next" ? "right-0" : "left-0"
      )} />
      <div className={cn(
        "absolute bottom-1 text-[9px] font-bold text-slate-300 uppercase tracking-widest",
        direction === "right-to-next" ? "right-2" : "left-2"
      )}>
        {direction === "right-to-next" ? "↓ next" : "next ↓"}
      </div>
    </motion.div>
  );
}

// ── Bill Card ─────────────────────────────────────────────────────────────────

function BillCard({
  bill, animDelay, onDetails, onEdit,
}: {
  bill: Bill;
  animDelay: number;
  onDetails: () => void;
  onEdit: () => void;
}) {
  const cfg = statusConfig(bill.status);
  const StatusIcon = cfg.icon;
  const medicinesTotal = bill.medicines.reduce((s, m) => s + m.total, 0);
  const isPending = bill.status === "Pending";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: animDelay, type: "spring", stiffness: 260, damping: 24 }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 18 } }}
      className={cn(
        "rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col",
        cfg.border
      )}
    >
      <div className={cn("h-1.5 w-full bg-gradient-to-r shrink-0", cfg.strip)} />

      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={cn("p-2 rounded-xl shrink-0", cfg.bg)}>
              <Receipt className={cn("w-3.5 h-3.5", cfg.color)} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-xs text-slate-800 font-mono leading-tight">{bill.billNumber}</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Calendar className="w-2.5 h-2.5 shrink-0" />
                {formatDate(bill.createdAt)}
              </p>
            </div>
          </div>
          <span className={cn(
            "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0",
            cfg.badge
          )}>
            <StatusIcon className="w-2.5 h-2.5" />
            {bill.status}
          </span>
        </div>

        {/* Fee tiles */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[
            { icon: Stethoscope, label: "Consult",  value: bill.consultationFee, color: "text-blue-500",   bg: "bg-blue-50"   },
            { icon: FlaskConical, label: "Lab",      value: bill.labTestsFee,     color: "text-violet-500", bg: "bg-violet-50" },
            { icon: Pill,         label: "Meds",     value: medicinesTotal,       color: "text-teal-500",   bg: "bg-teal-50"   },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className={cn("rounded-xl px-2.5 py-2 flex flex-col gap-0.5", bg)}>
              <div className="flex items-center gap-1">
                <Icon className={cn("w-2.5 h-2.5 shrink-0", color)} />
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide leading-none">{label}</span>
              </div>
              <p className="text-xs font-bold text-slate-700">₹{value.toFixed(0)}</p>
            </div>
          ))}
        </div>

        {/* Medicine tags */}
        {bill.medicines.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {bill.medicines.slice(0, 2).map((m, i) => (
              <span key={i} className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full border border-slate-200 truncate max-w-[80px]">
                {m.name} {m.dosage}
              </span>
            ))}
            {bill.medicines.length > 2 && (
              <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full border border-slate-200">
                +{bill.medicines.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-2">
          <div>
            <p className="text-[9px] text-slate-400 uppercase tracking-wide leading-none mb-0.5">Total</p>
            <p className="text-sm font-bold text-slate-800">₹{bill.total.toFixed(0)}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Edit button: only on Pending */}
            {isPending && (
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: animDelay + 0.18, type: "spring", stiffness: 380 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); onEdit(); }}
                  className="h-7 px-2.5 gap-1 border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 text-[10px] font-semibold rounded-xl"
                >
                  <Pencil className="w-2.5 h-2.5" />
                  Edit
                </Button>
              </motion.div>
            )}
            <Button
              size="sm"
              onClick={onDetails}
              className="h-7 px-2.5 gap-1 bg-slate-900 hover:bg-slate-700 text-white text-[10px] font-semibold rounded-xl"
            >
              Details <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PatientBillsTimeline() {
  const { id, doctorId } = useParams<{ id: string; doctorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const rawUser = useSelector((state: RootState) => state.app.doctorUser);
  const { data: doctor } = useGetDoctorDetailsQuery(
  String(rawUser?.id),
  {
    skip: !rawUser?.id,
  }
);
  const user = doctor;

  const { data: patient, isLoading: patientLoading } = useGetPatientByIdQuery(id!);
  const {
    data: billsRaw,
    isLoading: billsLoading,
    refetch: refetchBills,
  } = useGetBillsByPatientQuery(Number(id), { skip: !id });

  const [createBill] = useCreateBillMutation();
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  const bills: Bill[] = [...(billsRaw ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const rows = chunk(bills, PER_ROW);
  const totalSpend = bills.filter((b) => b.status === "Paid").reduce((s, b) => s + b.total, 0);

  // Uses the same createBill mutation — backend should upsert by patientId + doctorId
  const handleSaveBill = async (data: BillPayload) => {
    try {
      await createBill({
        billId: data?._id,
        doctorId:  user._id ?? user.id,
        doctorCode: user.doctorCode,
        patientId: Number(id),
        medicines:       data.medicines,
        consultationFee: data.consultationFee,
        labTestsFee:     data.labTestsFee,
        subtotal:        data.subtotal,
        tax:             data.tax,
        total:           data.total,
        status:          data.status,
        paymentMethod:   data.paymentMethod,
        notes:           data.notes,
      }).unwrap();

      toast({ title: "Bill Updated", description: "The bill has been updated successfully." });
      refetchBills();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err?.data?.message || "Failed to update bill",
      });
    }
  };

  if (patientLoading || billsLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-slate-300 border-t-slate-800 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 group-hover:border-slate-400 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex flex-col items-center leading-tight">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Billing History</span>
            <span className="text-sm font-bold text-slate-800 truncate max-w-[200px]">
              {patient?.name ?? "Patient"}
            </span>
          </div>

          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <Receipt className="w-3.5 h-3.5" />
            {bills.length} bill{bills.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260 }}
          className="flex flex-col lg:flex-row lg:items-center gap-5"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
              {patient?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) ?? "P"}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {patient?.name ?? "Patient"}'s Bills
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {[patient?.age && `${patient.age} yrs`, patient?.gender, patient?.condition]
                  .filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Total",     value: bills.length,                                          icon: Receipt,    color: "text-slate-600",   bg: "bg-slate-100"  },
              { label: "Paid",      value: `₹${(totalSpend / 1000).toFixed(1)}k`,                icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Pending",   value: bills.filter((b) => b.status === "Pending").length,    icon: Clock,      color: "text-amber-600",   bg: "bg-amber-50"   },
              { label: "Cancelled", value: bills.filter((b) => b.status === "Cancelled").length,  icon: XCircle,    color: "text-red-500",     bg: "bg-red-50"     },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm text-center">
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 mx-auto", bg)}>
                  <Icon className={cn("w-3.5 h-3.5", color)} />
                </div>
                <p className="text-base font-bold text-slate-800">{value}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {bills.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Receipt className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-base font-semibold text-slate-600">No bills yet</p>
              <p className="text-sm text-slate-400 mt-1">Bills for this patient will appear here.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zigzag timeline */}
        {bills.length > 0 && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Timeline</span>
              <div className="flex-1 h-px bg-slate-200" />
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                <ArrowRight className="w-3 h-3" />
                <span>left to right</span>
                <span className="text-slate-300">·</span>
                <span>then right to left</span>
                <ArrowLeftIcon className="w-3 h-3" />
              </div>
              {bills.some((b) => b.status === "Pending") && (
                <span className="flex items-center gap-1 text-[10px] text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 ml-2">
                  <Pencil className="w-2.5 h-2.5" />
                  Pending bills are editable
                </span>
              )}
            </div>

            <div className="space-y-0">
              {rows.map((rowBills, rowIdx) => {
                const isEven = rowIdx % 2 === 0;
                const globalOffset = rowIdx * PER_ROW;
                const isLast = rowIdx === rows.length - 1;
                const displayBills = isEven ? rowBills : [...rowBills].reverse();

                return (
                  <div key={rowIdx}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: rowIdx * 0.08 }}
                    >
                      {/* Row direction label */}
                      <div className={cn("flex items-center gap-2 mb-2", !isEven && "flex-row-reverse")}>
                        <div className={cn(
                          "flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest",
                          !isEven && "flex-row-reverse"
                        )}>
                          {isEven
                            ? <><span>Row {rowIdx + 1}</span><ArrowRight className="w-3 h-3 text-slate-300" /></>
                            : <><ArrowLeftIcon className="w-3 h-3 text-slate-300" /><span>Row {rowIdx + 1}</span></>
                          }
                        </div>
                        <span className="text-[9px] text-slate-300">
                          #{globalOffset + 1}{rowBills.length > 1 ? `–${globalOffset + rowBills.length}` : ""}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: PER_ROW }).map((_, slotIdx) => {
                          const bill = displayBills[slotIdx];
                          if (!bill) return <div key={`empty-${slotIdx}`} className="invisible" />;

                          const trueIdx = isEven
                            ? globalOffset + slotIdx
                            : globalOffset + (rowBills.length - 1 - slotIdx);

                          return (
                            <BillCard
                              key={bill._id}
                              bill={bill}
                              animDelay={trueIdx * 0.055}
                              onDetails={() =>
                                navigate(`/doctor/${doctorId}/patients/${id}/bill`, {
                                  state: { billId: bill._id },
                                })
                              }
                              onEdit={() => setEditingBill(bill)}
                            />
                          );
                        })}
                      </div>
                    </motion.div>

                    {!isLast && (
                      <TurnIndicator direction={isEven ? "right-to-next" : "left-to-next"} />
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-400 pb-4 pt-2">
              {bills.length} bill{bills.length !== 1 ? "s" : ""} total · Newest first
            </p>
          </>
        )}
      </div>

      {/* Edit Bill Modal */}
      <AnimatePresence>
        {editingBill && (
          <EditBillDialog
            key={editingBill._id}
            bill={editingBill}
            patientName={patient?.name ?? "Patient"}
            patientAge={patient?.age}
            patientGender={patient?.gender}
            open={!!editingBill}
            onClose={() => setEditingBill(null)}
            onSave={handleSaveBill}
          />
        )}
      </AnimatePresence>
    </div>
  );
}