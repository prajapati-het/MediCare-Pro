import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Stethoscope, 
  ArrowLeft, 
  MapPin, 
  Phone,
  Mail,
  Star,
  Edit,
  Calendar,
  Clock,
  Users,
  Award,
  GraduationCap,
  Building2,
  DollarSign
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const doctorData = {
  id: 1,
  name: 'Dr. Sarah Mitchell',
  firstName: 'Sarah',
  lastName: 'Mitchell',
  specialty: 'Cardiology',
  email: 'sarah.mitchell@hospital.com',
  phone: '+1 (555) 123-4567',
  hospital: 'City General Hospital',
  experience: '15 years',
  rating: 4.9,
  totalPatients: 1245,
  appointmentsToday: 8,
  status: 'available',
  licenseNumber: 'MD-12345678',
  consultationFee: 150,
  education: 'MD from Harvard Medical School, Fellowship in Cardiology at Johns Hopkins Hospital',
  bio: 'Dr. Sarah Mitchell is a board-certified cardiologist with over 15 years of experience in treating complex cardiovascular conditions. She specializes in interventional cardiology and has performed over 2000 successful procedures.',
  languages: ['English', 'Spanish'],
  awards: ['Best Cardiologist 2023', 'Excellence in Patient Care 2022', 'Research Innovation Award 2021'],
  availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  consultationHours: '9:00 AM - 5:00 PM',
};

const weeklyAppointments = [
  { day: 'Mon', appointments: 12 },
  { day: 'Tue', appointments: 15 },
  { day: 'Wed', appointments: 10 },
  { day: 'Thu', appointments: 14 },
  { day: 'Fri', appointments: 11 },
];

const upcomingAppointments = [
  { patient: 'John Smith', time: '9:00 AM', type: 'Follow-up' },
  { patient: 'Emily Davis', time: '10:30 AM', type: 'Consultation' },
  { patient: 'Robert Wilson', time: '11:00 AM', type: 'Check-up' },
  { patient: 'Maria Garcia', time: '2:00 PM', type: 'Procedure' },
];

export default function DoctorDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/doctors')}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-4 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-2xl font-bold">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{doctorData.name}</h1>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge className="bg-primary text-primary-foreground">{doctorData.specialty}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="font-medium">{doctorData.rating}</span>
                      </div>
                      <Badge className="bg-success text-success-foreground">{doctorData.status}</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Button>
                <Button className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{doctorData.totalPatients}</p>
                      <p className="text-xs text-muted-foreground">Total Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Calendar className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{doctorData.appointmentsToday}</p>
                      <p className="text-xs text-muted-foreground">Today's Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{doctorData.experience}</p>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">${doctorData.consultationFee}</p>
                      <p className="text-xs text-muted-foreground">Consultation Fee</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{doctorData.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Education & Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Education</h4>
                      <p className="text-sm text-muted-foreground">{doctorData.education}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Awards</h4>
                      <div className="flex flex-wrap gap-2">
                        {doctorData.awards.map(award => (
                          <Badge key={award} variant="secondary" className="gap-1">
                            <Award className="w-3 h-3" />
                            {award}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={weeklyAppointments}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                        <XAxis dataKey="day" stroke="hsl(215, 15%, 45%)" fontSize={12} />
                        <YAxis stroke="hsl(215, 15%, 45%)" fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="appointments" fill="hsl(205, 85%, 45%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{doctorData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{doctorData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{doctorData.hospital}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Working Days</p>
                      <div className="flex flex-wrap gap-1">
                        {doctorData.availableDays.map(day => (
                          <Badge key={day} variant="outline" className="text-xs">{day.slice(0, 3)}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hours</p>
                      <p className="font-medium">{doctorData.consultationHours}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingAppointments.map((apt, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                          <div>
                            <p className="text-sm font-medium text-foreground">{apt.patient}</p>
                            <p className="text-xs text-muted-foreground">{apt.type}</p>
                          </div>
                          <Badge variant="outline">{apt.time}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License</span>
                      <span className="font-medium text-sm">{doctorData.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Languages</span>
                      <span className="font-medium text-sm">{doctorData.languages.join(', ')}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
