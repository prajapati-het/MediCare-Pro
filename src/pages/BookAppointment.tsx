// pages/BookAppointment.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Loader2, CalendarDays, User,
  Stethoscope, ChevronDown, X, Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  useAddAppointmentMutation,
  useGetDoctorsQuery,
  useGetTodayAppointmentsQuery,
} from "@/redux/slices/api";
import { DoctorType } from "@/types/type";
import { cn } from "@/lib/utils";

export interface AddAppointmentPayload {
  doctorCode: number;
  patientName: string;
  time: string;
  date: string;
  type?: string;
}

const appointmentSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  doctorCode: z.number({ invalid_type_error: "Doctor is required" }).min(1, "Doctor is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time slot is required"),
  type: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const appointmentTypes = [
  "Consultation", "Follow-up", "Emergency", "Routine Check-up",
  "Lab Review", "Procedure", "Surgery Prep", "Therapy",
];

const ALL_SLOTS: string[] = [];
for (let h = 8; h < 20; h++) {
  for (let m = 0; m < 60; m += 15) {
    ALL_SLOTS.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
  }
}

const formatTime = (slot: string) => {
  const [h, m] = slot.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
};

const isPastSlot = (slot: string, date: string) => {
  const today = new Date().toISOString().split("T")[0];
  if (date !== today) return false;
  const [h, m] = slot.split(":").map(Number);
  const t = new Date();
  t.setHours(h, m, 0, 0);
  return t <= new Date();
};

// ── Doctor Combobox ──────────────────────────────────────────────────────────

interface DoctorComboboxProps {
  value: number | null;
  onChange: (code: number, name: string) => void;
  error?: string;
}

function DoctorCombobox({ value, onChange, error }: DoctorComboboxProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useGetDoctorsQuery({}, { skip: !open });
  const allDoctors: DoctorType[] = data?.data ?? [];

  const doctors = search.trim()
    ? allDoctors.filter((d) =>
        d.username.toLowerCase().includes(search.toLowerCase()) ||
        d.speciality?.toLowerCase().includes(search.toLowerCase())
      )
    : allDoctors;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (doc: DoctorType) => {
    onChange(doc.doctorCode, doc.username);
    setSelectedName(doc.username);
    setSearch("");
    setOpen(false);
  };

  const handleClear = () => { onChange(0, ""); setSelectedName(""); setSearch(""); };

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex items-center gap-2 border rounded-md px-3 py-2 bg-background cursor-pointer hover:border-muted-foreground transition-colors",
          error ? "border-destructive" : "border-input",
          open && "ring-2 ring-ring"
        )}
      >
        <Stethoscope className="w-4 h-4 text-muted-foreground shrink-0" />
        {open ? (
          <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()} placeholder="Search doctor..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground" />
        ) : (
          <span className={cn("flex-1 text-sm", selectedName ? "text-foreground" : "text-muted-foreground")}>
            {selectedName || "Select a doctor"}
          </span>
        )}
        {selectedName && !open
          ? <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" onClick={(e) => { e.stopPropagation(); handleClear(); }} />
          : <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} />
        }
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-56 overflow-y-auto">
            {isFetching ? (
              <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading...
              </div>
            ) : doctors.length === 0 ? (
              <div className="py-4 text-center text-sm text-muted-foreground">No doctors found</div>
            ) : doctors.map((doc) => (
              <div key={doc.doctorCode} onClick={() => handleSelect(doc)}
                className={cn("flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-accent transition-colors",
                  value === doc.doctorCode && "bg-accent")}>
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{doc.username}</p>
                  {doc.speciality && <p className="text-xs text-muted-foreground">{doc.speciality}</p>}
                </div>
                {value === doc.doctorCode && <span className="ml-auto text-xs text-primary font-medium">Selected</span>}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Slot Grid ────────────────────────────────────────────────────────────────

interface SlotGridProps {
  date: string;
  doctorCode: number;
  value: string;
  onChange: (slot: string) => void;
  error?: string;
}

function SlotGrid({ date, doctorCode, value, onChange, error }: SlotGridProps) {
  const { data: existingAppointments = [], isFetching } = useGetTodayAppointmentsQuery(
    { doctorCode: String(doctorCode), date },
    {
      skip: !doctorCode || !date,
      refetchOnMountOrArgChange: true,
    }
  );

  const bookedSlots = useMemo(() => {
    const set = new Set<string>();
    existingAppointments.forEach((appt: any) => {
      if (appt.time) set.add(appt.time.trim().substring(0, 5));
    });
    return set;
  }, [existingAppointments]);

  if (!date || !doctorCode) {
    return (
      <p className="text-sm text-muted-foreground py-3">
        Select a doctor and date first to see available slots.
      </p>
    );
  }

  return (
    <div>
      {isFetching && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
          <Loader2 className="w-3 h-3 animate-spin" /> Checking availability...
        </p>
      )}

      <div className="flex gap-4 mb-3 flex-wrap">
        {[
          { label: "Available", cls: "bg-emerald-50 border-emerald-200" },
          { label: "Booked",    cls: "bg-red-50 border-red-200 opacity-60" },
          { label: "Past",      cls: "bg-muted border-border opacity-40" },
          { label: "Selected",  cls: "bg-primary border-primary" },
        ].map(({ label, cls }) => (
          <span key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className={cn("w-3 h-3 rounded border inline-block", cls)} />
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-56 overflow-y-auto pr-1">
        {ALL_SLOTS.map((slot) => {
          const booked   = bookedSlots.has(slot);
          const past     = isPastSlot(slot, date);
          const disabled = booked || past;
          const selected = value === slot;

          return (
            <button
              key={slot}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange(slot)}
              title={booked ? "Already booked" : past ? "Past time" : `Book ${formatTime(slot)}`}
              className={cn(
                "px-1 py-1.5 rounded-md text-[11px] font-medium border transition-all text-center leading-tight",
                selected
                  ? "bg-primary text-primary-foreground border-primary"
                  : booked
                  ? "bg-red-50 border-red-200 text-red-400 opacity-60 cursor-not-allowed"
                  : past
                  ? "bg-muted border-border text-muted-foreground opacity-40 cursor-not-allowed"
                  : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 cursor-pointer"
              )}
            >
              {formatTime(slot)}
            </button>
          );
        })}
      </div>

      {error && <p className="text-sm text-destructive mt-2">{error}</p>}

      {value && !error && (
        <p className="text-xs text-muted-foreground mt-2">
          Selected: <span className="font-medium text-foreground">{formatTime(value)}</span>
        </p>
      )}
    </div>
  );
}

// ── Public Navbar ────────────────────────────────────────────────────────────

function PublicNavbar() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <div className="bg-primary rounded-md p-1.5">
            <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-base text-foreground">MediCare Pro</span>
        </button>
        <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>Login</Button>
      </div>
    </header>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function BookAppointment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});
  const [addAppointment] = useAddAppointmentMutation();

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: "", doctorCode: 0, date: "", time: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (field: keyof AppointmentFormData, value: string | number) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "date" || field === "doctorCode") updated.time = "";
      return updated;
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = appointmentSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AppointmentFormData, string>> = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as keyof AppointmentFormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      setIsLoading(true);
      await addAppointment(formData as AddAppointmentPayload).unwrap();
      toast({
        title: "Appointment booked!",
        description: `Confirmed for ${formatTime(formData.time)} on ${formData.date}`,
      });
      navigate("/");
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err?.data?.message || "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Book Appointment</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                No account required · Slots refresh automatically to prevent clashes
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Patient Information
                  </CardTitle>
                  <CardDescription>Enter the patient's details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="patientName">Full Name *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="patientName" value={formData.patientName}
                        onChange={(e) => handleChange("patientName", e.target.value)}
                        placeholder="John Doe"
                        className={cn("pl-10", errors.patientName && "border-destructive")} />
                    </div>
                    {errors.patientName && <p className="text-sm text-destructive mt-1">{errors.patientName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="type">Appointment Type</Label>
                    <Select value={formData.type} onValueChange={(v) => handleChange("type", v)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select type (optional)" /></SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-primary" /> Doctor &amp; Date
                  </CardTitle>
                  <CardDescription>Choose a doctor and appointment date</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Doctor *</Label>
                    <div className="mt-1">
                      <DoctorCombobox value={formData.doctorCode || null}
                        onChange={(code) => handleChange("doctorCode", code)}
                        error={errors.doctorCode} />
                    </div>
                    {errors.doctorCode && <p className="text-sm text-destructive mt-1">{errors.doctorCode}</p>}
                  </div>

                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <div className="relative mt-1">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="date" type="date" min={today} value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        className={cn("pl-10", errors.date && "border-destructive")} />
                    </div>
                    {errors.date && <p className="text-sm text-destructive mt-1">{errors.date}</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time slot picker — full width */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarDays className="w-4 h-4 text-primary" /> Select Time Slot *
                </CardTitle>
                <CardDescription>
                  15-minute intervals · Green = available · Red = already booked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SlotGrid
                  date={formData.date}
                  doctorCode={formData.doctorCode}
                  value={formData.time}
                  onChange={(slot) => {
                    setFormData((p) => ({ ...p, time: slot }));
                    if (errors.time) setErrors((p) => ({ ...p, time: undefined }));
                  }}
                  error={errors.time}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 mt-6">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" disabled={isLoading} className="gap-2">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarDays className="w-4 h-4" />}
                Book Appointment
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}