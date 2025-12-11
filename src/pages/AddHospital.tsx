import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ArrowLeft, 
  MapPin, 
  Phone,
  Mail,
  Globe,
  Bed,
  Users,
  Save,
  Loader2
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

const hospitalSchema = z.object({
  name: z.string().min(2, 'Hospital name must be at least 2 characters').max(100),
  address: z.string().min(5, 'Address must be at least 5 characters').max(200),
  city: z.string().min(2, 'City is required').max(50),
  state: z.string().min(2, 'State is required').max(50),
  zipCode: z.string().min(5, 'Valid zip code required').max(10),
  phone: z.string().min(10, 'Valid phone number required').max(20),
  email: z.string().email('Valid email required'),
  website: z.string().url('Valid URL required').optional().or(z.literal('')),
  totalBeds: z.number().min(1, 'Must have at least 1 bed').max(10000),
  icuBeds: z.number().min(0).max(1000),
  emergencyCapacity: z.number().min(0).max(500),
  type: z.string().min(1, 'Hospital type is required'),
  description: z.string().max(500).optional(),
});

type HospitalFormData = z.infer<typeof hospitalSchema>;

export default function AddHospital() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof HospitalFormData, string>>>({});
  
  const [formData, setFormData] = useState<HospitalFormData>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    totalBeds: 0,
    icuBeds: 0,
    emergencyCapacity: 0,
    type: '',
    description: '',
  });

  const handleChange = (field: keyof HospitalFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validatedData = hospitalSchema.parse(formData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Hospital Added Successfully",
        description: `${validatedData.name} has been added to the network.`,
      });
      
      navigate('/hospitals');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof HospitalFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof HospitalFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "Validation Error",
          description: "Please check the form for errors.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={() => navigate('/hospitals')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Add New Hospital</h1>
                <p className="text-muted-foreground">Add a new hospital to your network</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Basic Information
                    </CardTitle>
                    <CardDescription>Enter the hospital's basic details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Hospital Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="City General Hospital"
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="type">Hospital Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                        <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Hospital</SelectItem>
                          <SelectItem value="specialty">Specialty Hospital</SelectItem>
                          <SelectItem value="teaching">Teaching Hospital</SelectItem>
                          <SelectItem value="community">Community Hospital</SelectItem>
                          <SelectItem value="research">Research Hospital</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && <p className="text-sm text-destructive mt-1">{errors.type}</p>}
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Brief description of the hospital..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Location
                    </CardTitle>
                    <CardDescription>Hospital address and location details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        placeholder="123 Healthcare Avenue"
                        className={errors.address ? 'border-destructive' : ''}
                      />
                      {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          placeholder="New York"
                          className={errors.city ? 'border-destructive' : ''}
                        />
                        {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleChange('state', e.target.value)}
                          placeholder="NY"
                          className={errors.state ? 'border-destructive' : ''}
                        />
                        {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                        placeholder="10001"
                        className={errors.zipCode ? 'border-destructive' : ''}
                      />
                      {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      Contact Information
                    </CardTitle>
                    <CardDescription>How to reach this hospital</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="contact@hospital.com"
                          className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => handleChange('website', e.target.value)}
                          placeholder="https://hospital.com"
                          className={`pl-10 ${errors.website ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.website && <p className="text-sm text-destructive mt-1">{errors.website}</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-primary" />
                      Capacity
                    </CardTitle>
                    <CardDescription>Hospital bed and facility capacity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="totalBeds">Total Beds *</Label>
                      <div className="relative">
                        <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="totalBeds"
                          type="number"
                          value={formData.totalBeds || ''}
                          onChange={(e) => handleChange('totalBeds', parseInt(e.target.value) || 0)}
                          placeholder="200"
                          className={`pl-10 ${errors.totalBeds ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.totalBeds && <p className="text-sm text-destructive mt-1">{errors.totalBeds}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="icuBeds">ICU Beds</Label>
                        <Input
                          id="icuBeds"
                          type="number"
                          value={formData.icuBeds || ''}
                          onChange={(e) => handleChange('icuBeds', parseInt(e.target.value) || 0)}
                          placeholder="20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyCapacity">Emergency Capacity</Label>
                        <Input
                          id="emergencyCapacity"
                          type="number"
                          value={formData.emergencyCapacity || ''}
                          onChange={(e) => handleChange('emergencyCapacity', parseInt(e.target.value) || 0)}
                          placeholder="50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline" onClick={() => navigate('/hospitals')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Add Hospital
                </Button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
