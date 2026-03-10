import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  Building2,
  ClipboardList,
  Briefcase,
  DollarSign,
  Clock,
  Hash,
  AlertCircle,
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
import { useUpdateStaffMutation } from "@/redux/slices/api";
import { AddStaffRequest } from "@/types/type";

const departments = [
  "ICU", "Emergency", "Laboratory", "Pharmacy", "Radiology",
  "Administration", "Cardiology", "Neurology", "Pediatrics", "Oncology",
];

const shifts = ["Morning", "Afternoon", "Night"];

const statuses: AddStaffRequest["status"][] = ["on-duty", "off-duty", "on-leave"];

// API response includes _id and name on top of AddStaffRequest fields
type StaffMember = AddStaffRequest & { name: string; _id: string };

interface EditStaffDialogProps {
  staff?: StaffMember;
  open?: boolean;
  onClose?: () => void;
}

export default function EditStaffDialog({ staff, open, onClose }: EditStaffDialogProps) {
  const { toast } = useToast();
  const [updateStaff, { isLoading: isSaving }] = useUpdateStaffMutation();

  const initials = staff.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Form state — field names match AddStaffRequest exactly
  const [firstName, setFirstName] = useState(staff.firstName ?? "");
  const [lastName, setLastName] = useState(staff.lastName ?? "");
  const [role, setRole] = useState(staff.role ?? "");
  const [department, setDepartment] = useState(staff.department ?? "");
  const [email, setEmail] = useState(staff.email ?? "");
  const [phone, setPhone] = useState(staff.phone ?? "");
  const [shift, setShift] = useState(staff.shift ?? shifts[0]);
  const [status, setStatus] = useState<AddStaffRequest["status"]>(staff.status ?? "on-duty");
  const [salary, setSalary] = useState(staff.salary ?? 0);
  const [emergencyContact, setEmergencyContact] = useState(staff.emergencyContact ?? "");

  // Re-sync when a different staff member is passed in
  useEffect(() => {
    setFirstName(staff.firstName ?? "");
    setLastName(staff.lastName ?? "");
    setRole(staff.role ?? "");
    setDepartment(staff.department ?? "");
    setEmail(staff.email ?? "");
    setPhone(staff.phone ?? "");
    setShift(staff.shift ?? shifts[0]);
    setStatus(staff.status ?? "on-duty");
    setSalary(staff.salary ?? 0);
    setEmergencyContact(staff.emergencyContact ?? "");
  }, [staff]);

  const handleSubmit = async () => {
    try {
      await updateStaff({
        id: staff._id,
        data: {
          firstName,
          lastName,
          name: `${firstName} ${lastName}`.trim(),
          role,
          department,
          email,
          phone,
          shift,
          status,
          salary,
          emergencyContact,
        },
      }).unwrap();

      toast({
        title: "Staff updated",
        description: `${staff.name} has been updated successfully.`,
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

        {/* Banner */}
        <div className="bg-gradient-to-r from-violet-600 to-violet-500 px-6 pt-5 pb-4 shrink-0">
          <DialogHeader className="space-y-0 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-base shadow shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-white text-base font-bold leading-tight">
                  Edit Staff Member
                </DialogTitle>
                <p className="text-white/70 text-xs mt-0.5 truncate">
                  {staff.name}
                  {staff.role && <> · {staff.role}</>}
                  {staff.department && <> · {staff.department}</>}
                </p>
              </div>
              <span className="text-white/60 text-xs font-mono shrink-0">
                {staff.employeeId}
              </span>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable body */}
        <div className="h-[52vh] overflow-y-auto px-6 py-5 bg-background space-y-4">

          {/* Row 1: First Name + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                First Name
              </Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-9 text-sm"
                placeholder="First name"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Last Name
              </Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-9 text-sm"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Row 2: Role + Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Role
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  placeholder="e.g. Nurse, Technician"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Department
              </Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{d}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  placeholder="email@hospital.com"
                />
              </div>
            </div>
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
          </div>

          {/* Row 4: Shift + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Shift
              </Label>
              <Select value={shift} onValueChange={setShift}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map((s) => (
                    <SelectItem key={s} value={s}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{s}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </Label>
              <Select value={status} onValueChange={(v) => setStatus(v as AddStaffRequest["status"])}>
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

          {/* Row 5: Salary + Emergency Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Salary
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  type="number"
                  min={0}
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="pl-9 h-9 text-sm"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Emergency Contact
              </Label>
              <div className="relative">
                <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  placeholder="Emergency contact number"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Sticky footer */}
        <div className="shrink-0 border-t border-border px-6 py-3.5 flex items-center justify-between gap-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">
            Staff:{" "}
            <span className="font-semibold text-foreground">{staff.name}</span>
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
              className="h-8 px-4 gap-1.5 bg-violet-600 hover:bg-violet-700 text-white"
            >
              {isSaving && (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Update Staff
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}