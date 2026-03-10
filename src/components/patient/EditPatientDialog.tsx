import { useState } from "react";
import {
  Users, Phone, Stethoscope, HeartPulse, Activity,
  AlertCircle, Shield, ClipboardList, StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { Patient } from "@/types/type";
import { FormSection } from "../shared/FormSection";
import { FormField } from "../shared/Formfield";

type Tab = "basic" | "vitals" | "lifestyle" | "other";

export type EditPatientPayload = Partial<{
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

interface EditPatientDialogProps {
  patient: Patient;
  open: boolean;
  onClose: () => void;
  onSave: (id: string | number, data: EditPatientPayload) => Promise<void>;
}

const TABS: { key: Tab; label: string }[] = [
  { key: "basic",     label: "Basic"     },
  { key: "vitals",    label: "Vitals"    },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "other",     label: "Other"     },
];

export function EditPatientDialog({ patient, open, onClose, onSave }: EditPatientDialogProps) {
  const initials = patient.name.split(" ").map((n: string) => n[0]).join("");
  const [activeTab, setActiveTab] = useState<Tab>("basic");
  const [isSaving, setIsSaving] = useState(false);

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

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0 overflow-hidden rounded-2xl">

        <div className="bg-gradient-to-r from-primary/90 to-primary px-6 pt-5 pb-4 shrink-0">
          <DialogHeader className="space-y-0 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-base shadow shrink-0">
                {initials}
              </div>
              <div>
                <DialogTitle className="text-white text-base font-bold leading-tight">Edit Patient Info</DialogTitle>
                <p className="text-white/65 text-xs mt-0.5">
                  {[patient.age && `${patient.age} yrs`, patient.gender, patient.condition].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
                className={cn("px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeTab === tab.key ? "bg-white text-primary shadow-sm" : "text-white/70 hover:bg-white/15 hover:text-white"
                )}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[52vh] overflow-y-auto px-6 py-5 bg-background">
          {activeTab === "basic" && (
            <div className="space-y-5">
              <FormSection icon={<Users className="w-3.5 h-3.5" />} title="Identity" accent="blue">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Full Name" full>
                    <Input className="h-9 text-sm" value={form.name} onChange={(e) => set("name", e.target.value)} />
                  </FormField>
                  <FormField label="Age">
                    <Input className="h-9 text-sm" type="number" value={form.age ?? ""}
                      onChange={(e) => set("age", e.target.value ? Number(e.target.value) : undefined)} />
                  </FormField>
                  <FormField label="Gender">
                    <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>{["Male","Female","Other"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Blood Group">
                    <Select value={form.bloodGroup} onValueChange={(v) => set("bloodGroup", v)}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>{["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                </div>
              </FormSection>

              <FormSection icon={<Phone className="w-3.5 h-3.5" />} title="Contact" accent="teal">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Phone">
                    <Input className="h-9 text-sm" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </FormField>
                  <FormField label="Email">
                    <Input className="h-9 text-sm" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </FormField>
                  <FormField label="Address" full>
                    <Input className="h-9 text-sm" value={form.address} onChange={(e) => set("address", e.target.value)} />
                  </FormField>
                </div>
              </FormSection>

              <FormSection icon={<Stethoscope className="w-3.5 h-3.5" />} title="Clinical" accent="rose">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Condition" full>
                    <Input className="h-9 text-sm" value={form.condition} onChange={(e) => set("condition", e.target.value)} />
                  </FormField>
                  <FormField label="Diagnosis" full>
                    <Input className="h-9 text-sm" value={form.diagnosis} onChange={(e) => set("diagnosis", e.target.value)} />
                  </FormField>
                  <FormField label="Status">
                    <Select value={form.status} onValueChange={(v) => set("status", v)}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>{["Active","Critical","Follow-up","Recovered"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Tag">
                    <Select value={form.tag} onValueChange={(v) => set("tag", v)}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>{["critical","follow-up","normal","new","chronic"].map((t) => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                </div>
              </FormSection>
            </div>
          )}

          {activeTab === "vitals" && (
            <FormSection icon={<HeartPulse className="w-3.5 h-3.5" />} title="Vitals" accent="rose">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "bloodPressure",   label: "Blood Pressure",  placeholder: "120/80 mmHg" },
                  { key: "heartRate",        label: "Heart Rate",      placeholder: "72 bpm"      },
                  { key: "temperature",      label: "Temperature",     placeholder: "98.6 °F"     },
                  { key: "weight",           label: "Weight",          placeholder: "70 kg"       },
                  { key: "height",           label: "Height",          placeholder: "175 cm"      },
                  { key: "bmi",              label: "BMI",             placeholder: "22.9"        },
                  { key: "oxygenSaturation", label: "O₂ Saturation",   placeholder: "98%"         },
                  { key: "respiratoryRate",  label: "Resp. Rate",      placeholder: "16 /min"     },
                ].map(({ key, label, placeholder }) => (
                  <FormField key={key} label={label}>
                    <Input className="h-9 text-sm" value={(form.vitals as any)?.[key] ?? ""}
                      onChange={(e) => setVital(key, e.target.value)} placeholder={placeholder} />
                  </FormField>
                ))}
              </div>
            </FormSection>
          )}

          {activeTab === "lifestyle" && (
            <FormSection icon={<Activity className="w-3.5 h-3.5" />} title="Lifestyle" accent="green">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Smoking">
                  <Select value={form.lifestyle?.smokingStatus} onValueChange={(v) => setLifestyle("smokingStatus", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>{["Non-smoker","Former smoker","Current smoker"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </FormField>
                <FormField label="Alcohol">
                  <Select value={form.lifestyle?.alcoholConsumption} onValueChange={(v) => setLifestyle("alcoholConsumption", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>{["None","Occasional","Moderate","Heavy"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </FormField>
                <FormField label="Exercise">
                  <Select value={form.lifestyle?.exerciseFrequency} onValueChange={(v) => setLifestyle("exerciseFrequency", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>{["Sedentary","Light (1-2/week)","Moderate (3-4/week)","Active (5+/week)"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </FormField>
                <FormField label="Diet">
                  <Select value={form.lifestyle?.dietType} onValueChange={(v) => setLifestyle("dietType", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>{["Omnivore","Vegetarian","Vegan","Keto","Other"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </FormField>
                <FormField label="Sleep Hours" full>
                  <Input className="h-9 text-sm" value={form.lifestyle?.sleepHours}
                    onChange={(e) => setLifestyle("sleepHours", e.target.value)} placeholder="e.g. 7–8 hrs" />
                </FormField>
              </div>
            </FormSection>
          )}

          {activeTab === "other" && (
            <div className="space-y-5">
              <FormSection icon={<AlertCircle className="w-3.5 h-3.5" />} title="Emergency Contact" accent="amber">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Name" full>
                    <Input className="h-9 text-sm" value={form.emergencyContact?.name} onChange={(e) => setEmergency("name", e.target.value)} />
                  </FormField>
                  <FormField label="Relation">
                    <Input className="h-9 text-sm" value={form.emergencyContact?.relation} onChange={(e) => setEmergency("relation", e.target.value)} />
                  </FormField>
                  <FormField label="Phone">
                    <Input className="h-9 text-sm" value={form.emergencyContact?.phone} onChange={(e) => setEmergency("phone", e.target.value)} />
                  </FormField>
                </div>
              </FormSection>

              <FormSection icon={<Shield className="w-3.5 h-3.5" />} title="Insurance" accent="purple">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Provider">
                    <Input className="h-9 text-sm" value={form.insuranceProvider} onChange={(e) => set("insuranceProvider", e.target.value)} />
                  </FormField>
                  <FormField label="Policy Number">
                    <Input className="h-9 text-sm" value={form.insuranceNumber} onChange={(e) => set("insuranceNumber", e.target.value)} />
                  </FormField>
                </div>
              </FormSection>

              <FormSection icon={<ClipboardList className="w-3.5 h-3.5" />} title="Medical Lists" accent="teal">
                <div className="space-y-3">
                  {[
                    { key: "allergies" as const,     label: "Allergies (comma-separated)",          placeholder: "e.g. Penicillin, Pollen" },
                    { key: "medications" as const,   label: "Current Medications (comma-separated)", placeholder: "e.g. Metformin"          },
                    { key: "medicalHistory" as const, label: "Medical History (comma-separated)",    placeholder: "e.g. Diabetes"           },
                  ].map(({ key, label, placeholder }) => (
                    <FormField key={key} label={label} full>
                      <Input className="h-9 text-sm" value={form[key]?.join(", ")}
                        onChange={(e) => handleList(key, e.target.value)} placeholder={placeholder} />
                    </FormField>
                  ))}
                </div>
              </FormSection>

              <FormSection icon={<StickyNote className="w-3.5 h-3.5" />} title="Notes" accent="slate">
                <Textarea className="text-sm resize-none min-h-[80px]" value={form.notes}
                  onChange={(e) => set("notes", e.target.value)} placeholder="Any additional notes…" />
              </FormSection>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-border px-6 py-3.5 flex items-center justify-between gap-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">Only changed fields will be saved.</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isSaving} className="h-8 px-4">Cancel</Button>
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