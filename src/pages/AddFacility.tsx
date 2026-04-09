import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Loader2,
  Building2,
  Bed,
  Wrench,
  Phone,
  User,
  FileText,
  Layers,
  Calendar,
  Activity
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
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useAddFacilityMutation } from '@/redux/slices/api';

const facilitySchema = z.object({
  hospitalId: z.string().min(1, 'Hospital is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  type: z.enum(['Ward', 'Department', 'Lab', 'Surgical', 'Emergency', 'Support'], {
    errorMap: () => ({ message: 'Type is required' }),
  }),
  totalBeds: z.number().min(0, 'Total beds must be 0 or more'),
  occupied: z.number().min(0, 'Occupied must be 0 or more'),
  equipment: z.number().min(0, 'Equipment count must be 0 or more'),
  status: z.enum(['Operational', 'Maintenance', 'Closed'], {
    errorMap: () => ({ message: 'Status is required' }),
  }),
  floor: z.string().min(1, 'Floor is required'),
  headOfDepartment: z.string().min(2, 'Head of department is required'),
  contact: z.string().min(10, 'Valid contact number required').max(20),
  description: z.string().min(5, 'Description is required').max(500),
  lastMaintenance: z.string().min(1, 'Last maintenance date is required'),
  nextMaintenance: z.string().min(1, 'Next maintenance date is required'),
});

type FacilityFormData = z.infer<typeof facilitySchema>;

const facilityTypes = ['Ward', 'Department', 'Lab', 'Surgical', 'Emergency', 'Support'] as const;
const facilityStatuses = ['Operational', 'Maintenance', 'Closed'] as const;

const hospitals = [
  { id: 'city-general', name: 'City General Hospital' },
  { id: 'metro-general', name: 'Metro General Hospital' },
  { id: 'sunrise-medical', name: 'Sunrise Medical Center' },
  { id: 'valley-regional', name: 'Valley Regional Hospital' },
  { id: 'coastal-care', name: 'Coastal Care Hospital' },
];

export default function AddFacility() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FacilityFormData, string>>>({});
  const [addFacility] = useAddFacilityMutation();

  const [formData, setFormData] = useState<FacilityFormData>({
    hospitalId: '',
    name: '',
    type: 'Ward',
    totalBeds: 0,
    occupied: 0,
    equipment: 0,
    status: 'Operational',
    floor: '',
    headOfDepartment: '',
    contact: '',
    description: '',
    lastMaintenance: '',
    nextMaintenance: '',
  });

  const handleChange = (field: keyof FacilityFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = facilitySchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FacilityFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FacilityFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      await addFacility(formData).unwrap();
      toast({
        title: 'Success',
        description: 'Facility added successfully',
      });
      navigate('/admin/facilities');
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err?.data?.message || 'Something went wrong',
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
              <Button variant="ghost" size="icon" onClick={() => navigate('/admin/facilities')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Add Facility</h1>
                <p className="text-muted-foreground">Register a new facility to the system</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Basic Information
                    </CardTitle>
                    <CardDescription>Facility name, type and location details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hospitalId">Assigned Hospital *</Label>
                      <Select value={formData.hospitalId} onValueChange={(value) => handleChange('hospitalId', value)}>
                        <SelectTrigger className={errors.hospitalId ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select hospital" />
                        </SelectTrigger>
                        <SelectContent>
                          {hospitals.map(h => (
                            <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.hospitalId && <p className="text-sm text-destructive mt-1">{errors.hospitalId}</p>}
                    </div>

                    <div>
                      <Label htmlFor="name">Facility Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Cardiology Ward A"
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="type">Facility Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                        <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {facilityTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.type && <p className="text-sm text-destructive mt-1">{errors.type}</p>}
                    </div>

                    <div>
                      <Label htmlFor="floor">Floor *</Label>
                      <div className="relative">
                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="floor"
                          value={formData.floor}
                          onChange={(e) => handleChange('floor', e.target.value)}
                          placeholder="e.g. Floor 3, Ground Floor"
                          className={`pl-10 ${errors.floor ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.floor && <p className="text-sm text-destructive mt-1">{errors.floor}</p>}
                    </div>

                    <div>
                      <Label htmlFor="status">Status *</Label>
                      <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                        <SelectTrigger className={errors.status ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {facilityStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.status && <p className="text-sm text-destructive mt-1">{errors.status}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Department Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Department Details
                    </CardTitle>
                    <CardDescription>Contact and head of department info</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="headOfDepartment">Head of Department *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="headOfDepartment"
                          value={formData.headOfDepartment}
                          onChange={(e) => handleChange('headOfDepartment', e.target.value)}
                          placeholder="Dr. Sarah Mitchell"
                          className={`pl-10 ${errors.headOfDepartment ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.headOfDepartment && <p className="text-sm text-destructive mt-1">{errors.headOfDepartment}</p>}
                    </div>

                    <div>
                      <Label htmlFor="contact">Contact Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="contact"
                          value={formData.contact}
                          onChange={(e) => handleChange('contact', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className={`pl-10 ${errors.contact ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.contact && <p className="text-sm text-destructive mt-1">{errors.contact}</p>}
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          placeholder="Brief description of this facility..."
                          className={`pl-10 min-h-[120px] resize-none ${errors.description ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Capacity & Equipment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-primary" />
                      Capacity & Equipment
                    </CardTitle>
                    <CardDescription>Bed count and equipment inventory</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="totalBeds">Total Beds *</Label>
                        <Input
                          id="totalBeds"
                          type="number"
                          min={0}
                          value={formData.totalBeds || ''}
                          onChange={(e) => handleChange('totalBeds', parseInt(e.target.value) || 0)}
                          placeholder="50"
                          className={errors.totalBeds ? 'border-destructive' : ''}
                        />
                        {errors.totalBeds && <p className="text-sm text-destructive mt-1">{errors.totalBeds}</p>}
                      </div>

                      <div>
                        <Label htmlFor="occupied">Occupied Beds *</Label>
                        <Input
                          id="occupied"
                          type="number"
                          min={0}
                          value={formData.occupied || ''}
                          onChange={(e) => handleChange('occupied', parseInt(e.target.value) || 0)}
                          placeholder="32"
                          className={errors.occupied ? 'border-destructive' : ''}
                        />
                        {errors.occupied && <p className="text-sm text-destructive mt-1">{errors.occupied}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="equipment">Equipment Count *</Label>
                      <div className="relative">
                        <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="equipment"
                          type="number"
                          min={0}
                          value={formData.equipment || ''}
                          onChange={(e) => handleChange('equipment', parseInt(e.target.value) || 0)}
                          placeholder="24"
                          className={`pl-10 ${errors.equipment ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.equipment && <p className="text-sm text-destructive mt-1">{errors.equipment}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Maintenance Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-primary" />
                      Maintenance Schedule
                    </CardTitle>
                    <CardDescription>Last and upcoming maintenance dates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="lastMaintenance">Last Maintenance Date *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="lastMaintenance"
                          type="date"
                          value={formData.lastMaintenance}
                          onChange={(e) => handleChange('lastMaintenance', e.target.value)}
                          className={`pl-10 ${errors.lastMaintenance ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.lastMaintenance && <p className="text-sm text-destructive mt-1">{errors.lastMaintenance}</p>}
                    </div>

                    <div>
                      <Label htmlFor="nextMaintenance">Next Maintenance Date *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="nextMaintenance"
                          type="date"
                          value={formData.nextMaintenance}
                          onChange={(e) => handleChange('nextMaintenance', e.target.value)}
                          className={`pl-10 ${errors.nextMaintenance ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.nextMaintenance && <p className="text-sm text-destructive mt-1">{errors.nextMaintenance}</p>}
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline" onClick={() => navigate('/facilities')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Add Facility
                </Button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}