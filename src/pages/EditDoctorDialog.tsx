import { useEffect, useState } from "react";
import {
  Phone,
  Building2,
  Stethoscope,
  BadgeInfo,
  GraduationCap,
  Briefcase,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/hooks/use-toast";
import {
  useGetDoctorDetailsQuery,
  useUpdateDoctorMutation,
} from "@/redux/slices/api"; // adjust to your actual path
import { DoctorType } from "@/types/type";

const statuses = ["available", "in-surgery", "in-consultation", "on-leave"];

interface EditDoctorDialogProps {
  doctor: DoctorType;
  open: boolean;
  onClose: () => void;
}

export default function EditDoctorDialog({ doctor, open, onClose }: EditDoctorDialogProps) {
  const { toast } = useToast();

  const [updateDoctor, { isLoading: isSaving }] = useUpdateDoctorMutation();

  const initials = doctor.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Form state — field names match DoctorType exactly
  const [phone, setPhone] = useState(doctor.phone ?? "");
  const [hospital, setHospital] = useState(doctor.hospital ?? "");
  const [speciality, setSpeciality] = useState(doctor.speciality ?? "");
  const [status, setStatus] = useState(doctor.status ?? statuses[0]);
  const [experience, setExperience] = useState(doctor.experience ?? "");
  const [education, setEducation] = useState(doctor.education ?? "");
  const [consultationFee, setConsultationFee] = useState(doctor.consultationFee ?? 0);
  const [licenseNumber, setLicenseNumber] = useState(doctor.licenseNumber ?? "");

  // Re-sync if a different doctor is passed in
  useEffect(() => {
    setPhone(doctor.phone ?? "");
    setHospital(doctor.hospital ?? "");
    setSpeciality(doctor.speciality ?? "");
    setStatus(doctor.status ?? statuses[0]);
    setExperience(doctor.experience ?? "");
    setEducation(doctor.education ?? "");
    setConsultationFee(doctor.consultationFee ?? 0);
    setLicenseNumber(doctor.licenseNumber ?? "");
  }, [doctor]);

  const handleSubmit = async () => {
    try {
      await updateDoctor({
        DoctorCode: String(doctor.doctorCode),
        data: {
          phone,
          hospital,
          speciality,
          experience,
          education,
          consultationFee,
          licenseNumber,
        },
      }).unwrap();

      toast({
        title: "Doctor updated",
        description: `${doctor.username} has been updated successfully.`,
      });
      onClose();
    } catch {
      toast({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0 overflow-hidden rounded-2xl">

        {/* Teal/primary banner — mirrors the amber banner in EditBillDialog */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 pt-5 pb-4 shrink-0">
          <DialogHeader className="space-y-0 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-base shadow shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-white text-base font-bold leading-tight">
                  Edit Doctor
                </DialogTitle>
                <p className="text-white/70 text-xs mt-0.5 truncate">
                  {doctor.username}
                  {doctor.speciality && (
                    <> · {doctor.speciality}</>
                  )}
                </p>
              </div>
              <span className="text-white/60 text-xs font-mono shrink-0">
                #{doctor.doctorCode}
              </span>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable body */}
        <div className="h-[52vh] overflow-y-auto px-6 py-5 bg-background space-y-4">

          {/* Row 1: Phone + Hospital */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Phone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Hospital
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  placeholder="Hospital name"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Speciality + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Speciality
              </Label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  placeholder="e.g. Cardiology"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-3.5 h-3.5" />
                        <span className="capitalize">{s.replace("-", " ")}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Experience + Consultation Fee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Experience
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  placeholder="e.g. 10 years"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Consultation Fee
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  type="number"
                  min={0}
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(Number(e.target.value))}
                  className="pl-9 h-9 text-sm"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Education + License Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Education
              </Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  placeholder="e.g. MBBS, MD"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                License Number
              </Label>
              <div className="relative">
                <BadgeInfo className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  placeholder="Medical license number"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Sticky footer */}
        <div className="shrink-0 border-t border-border px-6 py-3.5 flex items-center justify-between gap-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">
            Doctor:{" "}
            <span className="font-semibold text-foreground">{doctor.username}</span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isSaving}
              className="h-8 px-4"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSaving}
              className="h-8 px-4 gap-1.5"
            >
              {isSaving && (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Update Doctor
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}