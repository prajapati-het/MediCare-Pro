// pages/BookAppointment.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  ChevronDown,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useAddAppointmentMutation, useGetDoctorsQuery } from "@/redux/slices/api";
import { DoctorType } from "@/types/type";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AddAppointmentPayload {
  doctorCode: number;
  patientName: string;
  time: string;
  date: string;
  type?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const appointmentSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  doctorCode: z
    .number({ invalid_type_error: "Doctor is required" })
    .min(1, "Doctor is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time slot is required"),
  type: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const appointmentTypes = [
  "Consultation",
  "Follow-up",
  "Emergency",
  "Routine Check-up",
  "Lab Review",
  "Procedure",
  "Surgery Prep",
  "Therapy",
];

// Generate all time slots from 08:00 to 20:00 in 15-min intervals
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let h = 8; h < 20; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hh = h.toString().padStart(2, "0");
      const mm = m.toString().padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
};
const ALL_TIME_SLOTS = generateTimeSlots();

const formatTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
};

// ─── Doctor Search Combobox ───────────────────────────────────────────────────

interface DoctorComboboxProps {
  value: number | null;
  onChange: (doctorCode: number, name: string) => void;
  error?: string;
}

function DoctorCombobox({ value, onChange, error }: DoctorComboboxProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useGetDoctorsQuery(
    {},
    { skip: !open }
  );

  const allDoctors: DoctorType[] = data?.data ?? [];

  const doctors = search.trim()
    ? allDoctors.filter((doc) =>
        doc.username.toLowerCase().includes(search.toLowerCase()) ||
        doc.speciality?.toLowerCase().includes(search.toLowerCase())
      )
    : allDoctors;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (doctor: DoctorType) => {
    onChange(doctor.doctorCode, doctor.username);
    setSelectedName(doctor.username);
    setSearch("");
    setOpen(false);
  };

  const handleClear = () => {
    onChange(0, "");
    setSelectedName("");
    setSearch("");
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center gap-2 border rounded-md px-3 py-2 bg-background cursor-pointer
          ${error ? "border-destructive" : "border-input"}
          ${open ? "ring-2 ring-ring" : ""}
          hover:border-muted-foreground transition-colors`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Stethoscope className="w-4 h-4 text-muted-foreground shrink-0" />

        {open ? (
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Search doctor by name..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
        ) : (
          <span className={`flex-1 text-sm ${selectedName ? "text-foreground" : "text-muted-foreground"}`}>
            {selectedName || "Select a doctor"}
          </span>
        )}

        {selectedName && !open ? (
          <X
            className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground"
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
          />
        ) : (
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-56 overflow-y-auto"
          >
            {isFetching ? (
              <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading doctors...
              </div>
            ) : doctors.length === 0 ? (
              <div className="py-4 text-center text-sm text-muted-foreground">
                No doctors found
              </div>
            ) : (
              doctors.map((doc) => (
                <div
                  key={doc.doctorCode}
                  onClick={() => handleSelect(doc)}
                  className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-accent transition-colors
                    ${value === doc.doctorCode ? "bg-accent" : ""}`}
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{doc.username}</p>
                    {doc.speciality && (
                      <p className="text-xs text-muted-foreground">{doc.speciality}</p>
                    )}
                  </div>
                  {value === doc.doctorCode && (
                    <span className="ml-auto text-xs text-primary font-medium">Selected</span>
                  )}
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BookAppointment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});
  const [addAppointment] = useAddAppointmentMutation();

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: "",
    doctorCode: 0,
    date: "",
    time: ""
});

  const today = new Date().toISOString().split("T")[0];

  // Only show future time slots when the selected date is today
  const availableTimeSlots = ALL_TIME_SLOTS.filter((slot) => {
    if (formData.date !== today) return true;
    const [h, m] = slot.split(":").map(Number);
    const slotTime = new Date();
    slotTime.setHours(h, m, 0, 0);
    return slotTime > new Date();
  });

  const handleChange = (field: keyof AppointmentFormData, value: string | number) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Reset time if date changes to today and previously selected time is now in the past
      if (field === "date" && prev.time) {
        const newDate = value as string;
        if (newDate === today) {
          const [h, m] = prev.time.split(":").map(Number);
          const slotTime = new Date();
          slotTime.setHours(h, m, 0, 0);
          if (slotTime <= new Date()) {
            updated.time = "";
          }
        }
      }
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
        const field = err.path[0] as keyof AppointmentFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      await addAppointment(formData as AddAppointmentPayload).unwrap();
      toast({ title: "Success", description: "Appointment booked successfully" });
      navigate("/");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err?.data?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Book Appointment
                </h1>
                <p className="text-muted-foreground">
                  Schedule a new patient appointment
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Patient Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Patient Information
                    </CardTitle>
                    <CardDescription>Patient's identity details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="patientName">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="patientName"
                          value={formData.patientName}
                          onChange={(e) => handleChange("patientName", e.target.value)}
                          placeholder="John Doe"
                          className={`pl-10 ${errors.patientName ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.patientName && (
                        <p className="text-sm text-destructive mt-1">{errors.patientName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="type">Appointment Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(v) => handleChange("type", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentTypes.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Doctor & Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-primary" />
                      Doctor & Schedule
                    </CardTitle>
                    <CardDescription>Assign doctor and set appointment time</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Doctor *</Label>
                      <DoctorCombobox
                        value={formData.doctorCode || null}
                        onChange={(code) => handleChange("doctorCode", code)}
                        error={errors.doctorCode}
                      />
                      {errors.doctorCode && (
                        <p className="text-sm text-destructive mt-1">{errors.doctorCode}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="date"
                          type="date"
                          min={today}
                          value={formData.date}
                          onChange={(e) => handleChange("date", e.target.value)}
                          className={`pl-10 ${errors.date ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.date && (
                        <p className="text-sm text-destructive mt-1">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="time">Time Slot *</Label>
                      <Select
                        value={formData.time}
                        onValueChange={(v) => handleChange("time", v)}
                      >
                        <SelectTrigger className={errors.time ? "border-destructive" : ""}>
                          <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent className="max-h-56">
                          {availableTimeSlots.length === 0 ? (
                            <div className="py-4 text-center text-sm text-muted-foreground">
                              No available slots for today
                            </div>
                          ) : (
                            availableTimeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {formatTime(slot)}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {errors.time && (
                        <p className="text-sm text-destructive mt-1">{errors.time}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/appointments")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CalendarDays className="w-4 h-4" />
                  )}
                  Book Appointment
                </Button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
