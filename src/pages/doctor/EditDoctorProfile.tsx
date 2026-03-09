import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Save, User, Mail, Phone, Building2, Award,
  GraduationCap, Clock, DollarSign, FileText, Calendar, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { useUpdateDoctorMutation } from '@/redux/slices/api';
import { setDoctorInfo } from '@/redux/slices/doctorSlice';
import { cn } from '@/lib/utils';
import { DoctorType } from '@/types/type';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface EditDoctorProfileProps {
  doctor: DoctorType;
  onClose: () => void;
}

type EditableFields = Pick<
  DoctorType,
  | 'username'
  | 'email'
  | 'phone'
  | 'hospital'
  | 'speciality'
  | 'experience'
  | 'consultationFee'
  | 'education'
  | 'licenseNumber'
  | 'availableDays'
  | 'nextAvailable'
>;

export function EditDoctorProfile({ doctor, onClose }: EditDoctorProfileProps) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [updateDoctor, { isLoading }] = useUpdateDoctorMutation();

  const [form, setForm] = useState<EditableFields>({
    username: doctor.username ?? '',
    email: doctor.email ?? '',
    phone: doctor.phone ?? '',
    hospital: doctor.hospital ?? '',
    speciality: doctor.speciality ?? '',
    experience: doctor.experience ?? '',
    consultationFee: doctor.consultationFee ?? 0,
    education: doctor.education ?? '',
    licenseNumber: doctor.licenseNumber ?? '',
    availableDays: doctor.availableDays ?? [],
    nextAvailable: doctor.nextAvailable ?? '',
  });

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleChange = (field: keyof EditableFields, value: string | number | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day: string) => {
    setForm(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleSubmit = async () => {
    console.log(doctor)
    try {
      const updated = await updateDoctor({
        DoctorCode: String(doctor.doctorCode),
        data: form,
      }).unwrap();

      dispatch(setDoctorInfo(updated));
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
        duration: 3000,
      });
      onClose();
    } catch (err) {
      toast({
        title: 'Update Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
        duration: 4000,
      });
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1, x: 0,
      transition: { delay: i * 0.07, duration: 0.3 },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-border"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 flex-shrink-0">
            <div>
              <h2 className="text-xl font-bold text-foreground">Edit Profile</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Update your professional information</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

            {/* Personal Info */}
            <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible">
              <SectionTitle icon={<User className="w-4 h-4" />} title="Personal Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <Field label="Full Name" icon={<User className="w-3.5 h-3.5" />}>
                  <Input
                    value={form.username}
                    onChange={e => handleChange('username', e.target.value)}
                    placeholder="Dr. John Doe"
                  />
                </Field>
                <Field label="Email" icon={<Mail className="w-3.5 h-3.5" />}>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="doctor@hospital.com"
                  />
                </Field>
                <Field label="Phone" icon={<Phone className="w-3.5 h-3.5" />}>
                  <Input
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="+1 234 567 8900"
                  />
                </Field>
                <Field label="Hospital" icon={<Building2 className="w-3.5 h-3.5" />}>
                  <Input
                    value={form.hospital}
                    onChange={e => handleChange('hospital', e.target.value)}
                    placeholder="City General Hospital"
                  />
                </Field>
              </div>
            </motion.section>

            <Separator />

            {/* Professional Info */}
            <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible">
              <SectionTitle icon={<Award className="w-4 h-4" />} title="Professional Details" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <Field label="Speciality" icon={<Award className="w-3.5 h-3.5" />}>
                  <Input
                    value={form.speciality}
                    onChange={e => handleChange('speciality', e.target.value)}
                    placeholder="Cardiology"
                  />
                </Field>
                <Field label="Experience" icon={<Clock className="w-3.5 h-3.5" />}>
                  <Input
                    value={form.experience}
                    onChange={e => handleChange('experience', e.target.value)}
                    placeholder="10 years"
                  />
                </Field>
                <Field label="Consultation Fee ($)" icon={<DollarSign className="w-3.5 h-3.5" />}>
                  <Input
                    type="number"
                    min={0}
                    value={form.consultationFee}
                    onChange={e => handleChange('consultationFee', Number(e.target.value))}
                    placeholder="150"
                  />
                </Field>
                <Field label="License Number" icon={<FileText className="w-3.5 h-3.5" />}>
                  <Input
                    value={form.licenseNumber}
                    onChange={e => handleChange('licenseNumber', e.target.value)}
                    placeholder="LIC-2024-XXXXX"
                  />
                </Field>
              </div>
            </motion.section>

            <Separator />

            {/* Education */}
            <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="visible">
              <SectionTitle icon={<GraduationCap className="w-4 h-4" />} title="Education" />
              <div className="mt-3">
                <Field label="Education Background" icon={<GraduationCap className="w-3.5 h-3.5" />}>
                  <Textarea
                    value={form.education}
                    onChange={e => handleChange('education', e.target.value)}
                    placeholder="MBBS - Harvard Medical School (2010)&#10;MD - Johns Hopkins University (2014)"
                    className="resize-none min-h-[90px]"
                    rows={3}
                  />
                </Field>
              </div>
            </motion.section>

            <Separator />

            {/* Availability */}
            <motion.section custom={3} variants={sectionVariants} initial="hidden" animate="visible">
              <SectionTitle icon={<Calendar className="w-4 h-4" />} title="Availability" />
              <div className="mt-3 space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">Available Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map(day => {
                      const selected = form.availableDays.includes(day);
                      return (
                        <motion.button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            'px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200',
                            selected
                              ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                              : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                          )}
                        >
                          {day.slice(0, 3)}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                <Field label="Next Available (e.g. 09:00 AM)" icon={<Clock className="w-3.5 h-3.5" />}>
                  <Input
                    value={form.nextAvailable}
                    onChange={e => handleChange('nextAvailable', e.target.value)}
                    placeholder="09:00 AM"
                  />
                </Field>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30 flex-shrink-0">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={handleSubmit} disabled={isLoading} className="gap-2 min-w-[120px]">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-primary">{icon}</span>
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">{title}</h3>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
        <span className="text-primary/70">{icon}</span>
        {label}
      </Label>
      {children}
    </div>
  );
}