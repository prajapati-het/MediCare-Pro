import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  ArrowLeft, 
  User,
  Phone,
  Mail,
  Calendar,
  Save,
  Loader2,
  Building2,
  Clock,
  Briefcase
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useStaff } from '@/contexts/StaffContext';
import { z } from 'zod';
import { useAddStaffMutation } from '@/redux/slices/api';

const staffSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required').max(20),
  role: z.string().min(1, 'Role is required'),
  department: z.string().min(1, 'Department is required'),
  hospital: z.string().min(1, 'Hospital is required'),
  shift: z.string().min(1, 'Shift is required'),
  employeeId: z.string().min(3, 'Employee ID is required').max(20),
  joiningDate: z.string().min(1, 'Joining date is required'),
  salary: z.number().min(0, 'Salary must be positive'),
  emergencyContact: z.string().min(10, 'Emergency contact is required').max(20),
});

type StaffFormData = z.infer<typeof staffSchema>;

const roles = [
  'Head Nurse', 'Nurse', 'Lab Technician', 'Pharmacist', 'Radiologist Tech',
  'Administrative Assistant', 'Receptionist', 'Janitor', 'Security Guard',
  'Medical Assistant', 'Physical Therapist', 'Respiratory Therapist'
];

const departments = [
  'ICU', 'Emergency', 'Laboratory', 'Pharmacy', 'Radiology',
  'Administration', 'Cardiology', 'Neurology', 'Pediatrics', 'Oncology'
];

const hospitals = [
  'City General Hospital',
  'Metro Health Center',
  'Sunrise Medical Complex',
  'Valley Regional Hospital',
  'Coastal Care Medical'
];

const shifts = ['Morning', 'Afternoon', 'Night', 'Rotating'];

export default function AddStaff() {
  const navigate = useNavigate();
  const { toast } = useToast();
  // const { addStaff } = useStaff();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof StaffFormData, string>>>({});
  const [addStaff] = useAddStaffMutation();

  
  const [formData, setFormData] = useState<StaffFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    hospital: '',
    shift: '',
    employeeId: '',
    joiningDate: '',
    salary: 0,
    emergencyContact: '',
  });

  const handleChange = (field: keyof StaffFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const result = staffSchema.safeParse(formData);

  if (!result.success) {
    const fieldErrors: Partial<Record<keyof StaffFormData, string>> = {};

    result.error.errors.forEach((err) => {
      const field = err.path[0] as keyof StaffFormData;
      fieldErrors[field] = err.message;
    });

    setErrors(fieldErrors);
    return;
  }

  try {
    setIsLoading(true);

    await addStaff(formData).unwrap();

    toast({
      title: "Success",
      description: "Staff added successfully",
    });

    navigate("/staff");
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
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={() => navigate('/staff')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Add Staff Member</h1>
                <p className="text-muted-foreground">Register a new staff member to the system</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Staff member's personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          placeholder="Jennifer"
                          className={errors.firstName ? 'border-destructive' : ''}
                        />
                        {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          placeholder="Adams"
                          className={errors.lastName ? 'border-destructive' : ''}
                        />
                        {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="jennifer.adams@hospital.com"
                          className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+1 (555) 111-2222"
                          className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => handleChange('emergencyContact', e.target.value)}
                          placeholder="+1 (555) 999-8888"
                          className={`pl-10 ${errors.emergencyContact ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.emergencyContact && <p className="text-sm text-destructive mt-1">{errors.emergencyContact}</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Employment Information
                    </CardTitle>
                    <CardDescription>Job role and department details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="role">Role *</Label>
                      <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                        <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.role && <p className="text-sm text-destructive mt-1">{errors.role}</p>}
                    </div>

                    <div>
                      <Label htmlFor="department">Department *</Label>
                      <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                        <SelectTrigger className={errors.department ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.department && <p className="text-sm text-destructive mt-1">{errors.department}</p>}
                    </div>

                    <div>
                      <Label htmlFor="hospital">Assigned Hospital *</Label>
                      <Select value={formData.hospital} onValueChange={(value) => handleChange('hospital', value)}>
                        <SelectTrigger className={errors.hospital ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select hospital" />
                        </SelectTrigger>
                        <SelectContent>
                          {hospitals.map(hospital => (
                            <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.hospital && <p className="text-sm text-destructive mt-1">{errors.hospital}</p>}
                    </div>

                    <div>
                      <Label htmlFor="employeeId">Employee ID *</Label>
                      <Input
                        id="employeeId"
                        value={formData.employeeId}
                        onChange={(e) => handleChange('employeeId', e.target.value)}
                        placeholder="EMP-001"
                        className={errors.employeeId ? 'border-destructive' : ''}
                      />
                      {errors.employeeId && <p className="text-sm text-destructive mt-1">{errors.employeeId}</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Schedule & Compensation
                    </CardTitle>
                    <CardDescription>Work schedule and salary details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="shift">Shift *</Label>
                        <Select value={formData.shift} onValueChange={(value) => handleChange('shift', value)}>
                          <SelectTrigger className={errors.shift ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select shift" />
                          </SelectTrigger>
                          <SelectContent>
                            {shifts.map(shift => (
                              <SelectItem key={shift} value={shift}>{shift}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.shift && <p className="text-sm text-destructive mt-1">{errors.shift}</p>}
                      </div>

                      <div>
                        <Label htmlFor="joiningDate">Joining Date *</Label>
                        <Input
                          id="joiningDate"
                          type="date"
                          value={formData.joiningDate}
                          onChange={(e) => handleChange('joiningDate', e.target.value)}
                          className={errors.joiningDate ? 'border-destructive' : ''}
                        />
                        {errors.joiningDate && <p className="text-sm text-destructive mt-1">{errors.joiningDate}</p>}
                      </div>

                      <div>
                        <Label htmlFor="salary">Monthly Salary ($) *</Label>
                        <Input
                          id="salary"
                          type="number"
                          value={formData.salary || ''}
                          onChange={(e) => handleChange('salary', parseInt(e.target.value) || 0)}
                          placeholder="3500"
                          className={errors.salary ? 'border-destructive' : ''}
                        />
                        {errors.salary && <p className="text-sm text-destructive mt-1">{errors.salary}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline" onClick={() => navigate('/staff')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Add Staff Member
                </Button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
