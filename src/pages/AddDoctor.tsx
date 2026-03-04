import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  ArrowLeft, 
  User,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Save,
  Loader2,
  Building2,
  Clock
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useDoctors } from '@/contexts/DoctorsContext';
import { z } from 'zod';
import { useAddDoctorMutation } from '@/redux/slices/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const doctorSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required').max(20),
  specialty: z.string().min(1, 'Specialty is required'),
  hospital: z.string().min(1, 'Hospital is required'),
  licenseNumber: z.string().min(5, 'License number is required').max(50),
  experience: z.number().min(0, 'Experience must be positive').max(60),
  education: z.string().min(5, 'Education details required').max(200),
  consultationFee: z.number().min(0, 'Fee must be positive'),
  bio: z.string().max(500).optional(),
  availableDays: z.array(z.string()).min(1, 'Select at least one day'),
});

type DoctorFormData = z.infer<typeof doctorSchema>;

const specialties = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology',
  'Oncology', 'Gastroenterology', 'Pulmonology', 'Endocrinology', 'Psychiatry',
  'Ophthalmology', 'ENT', 'Urology', 'Nephrology', 'General Medicine'
];

const hospitals = [
  'City General Hospital',
  'Metro Health Center',
  'Sunrise Medical Complex',
  'Valley Regional Hospital',
  'Coastal Care Medical'
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function AddDoctor() {
  const navigate = useNavigate();
  const { toast } = useToast();
  // const { addDoctor } = useDoctors();
  // const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof DoctorFormData, string>>>({});
  const [addDoctor, { isLoading }] = useAddDoctorMutation();
  
  const [formData, setFormData] = useState<DoctorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    hospital: '',
    licenseNumber: '',
    experience: 0,
    education: '',
    consultationFee: 0,
    bio: '',
    availableDays: [],
  });

  const handleChange = (field: keyof DoctorFormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleDay = (day: string) => {
    const currentDays = formData.availableDays;
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    handleChange('availableDays', newDays);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const validatedData = doctorSchema.parse(formData);

    await addDoctor({
      username: `${validatedData.firstName} ${validatedData.lastName}`,
      email: validatedData.email,
      hospital: validatedData.hospital,
      speciality: validatedData.specialty,
      phone: validatedData.phone,
      experience: `${validatedData.experience} years`,
      consultationFee: validatedData.consultationFee,
      education: validatedData.education,
      licenseNumber: validatedData.licenseNumber,
      availableDays: validatedData.availableDays,
    }).unwrap();

    toast({
      title: "Doctor Added Successfully",
      description: "Doctor has been added to database.",
    });

    navigate("/doctors");
  } catch (err: unknown) {
    const error = err as FetchBaseQueryError;

    toast({
      title: "Error",
      description:
        "data" in error
          ? (error.data as { message?: string })?.message
          : "Something went wrong",
      variant: "destructive",
    });
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
              <Button variant="ghost" size="icon" onClick={() => navigate('/doctors')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Add New Doctor</h1>
                <p className="text-muted-foreground">Register a new doctor to the system</p>
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
                    <CardDescription>Doctor's personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          placeholder="Sarah"
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
                          placeholder="Mitchell"
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
                          placeholder="sarah.mitchell@hospital.com"
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
                          placeholder="+1 (555) 123-4567"
                          className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        placeholder="Brief bio about the doctor..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-primary" />
                      Professional Information
                    </CardTitle>
                    <CardDescription>Medical credentials and specialization</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="specialty">Specialty *</Label>
                      <Select value={formData.specialty} onValueChange={(value) => handleChange('specialty', value)}>
                        <SelectTrigger className={errors.specialty ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map(spec => (
                            <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.specialty && <p className="text-sm text-destructive mt-1">{errors.specialty}</p>}
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
                      <Label htmlFor="licenseNumber">License Number *</Label>
                      <Input
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) => handleChange('licenseNumber', e.target.value)}
                        placeholder="MD-12345678"
                        className={errors.licenseNumber ? 'border-destructive' : ''}
                      />
                      {errors.licenseNumber && <p className="text-sm text-destructive mt-1">{errors.licenseNumber}</p>}
                    </div>

                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="experience"
                          type="number"
                          value={formData.experience || ''}
                          onChange={(e) => handleChange('experience', parseInt(e.target.value) || 0)}
                          placeholder="10"
                          className={`pl-10 ${errors.experience ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.experience && <p className="text-sm text-destructive mt-1">{errors.experience}</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Education & Fees
                    </CardTitle>
                    <CardDescription>Educational background and consultation fees</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="education">Education *</Label>
                      <Textarea
                        id="education"
                        value={formData.education}
                        onChange={(e) => handleChange('education', e.target.value)}
                        placeholder="MD from Harvard Medical School, Cardiology Fellowship at Johns Hopkins..."
                        rows={3}
                        className={errors.education ? 'border-destructive' : ''}
                      />
                      {errors.education && <p className="text-sm text-destructive mt-1">{errors.education}</p>}
                    </div>

                    <div>
                      <Label htmlFor="consultationFee">Consultation Fee ($) *</Label>
                      <Input
                        id="consultationFee"
                        type="number"
                        value={formData.consultationFee || ''}
                        onChange={(e) => handleChange('consultationFee', parseInt(e.target.value) || 0)}
                        placeholder="150"
                        className={errors.consultationFee ? 'border-destructive' : ''}
                      />
                      {errors.consultationFee && <p className="text-sm text-destructive mt-1">{errors.consultationFee}</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Availability
                    </CardTitle>
                    <CardDescription>Select available working days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weekDays.map(day => (
                        <div key={day} className="flex items-center space-x-3">
                          <Checkbox
                            id={day}
                            checked={formData.availableDays.includes(day)}
                            onCheckedChange={() => toggleDay(day)}
                          />
                          <Label htmlFor={day} className="text-sm font-normal cursor-pointer">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.availableDays && <p className="text-sm text-destructive mt-2">{errors.availableDays}</p>}
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline" onClick={() => navigate('/doctors')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Add Doctor
                </Button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
