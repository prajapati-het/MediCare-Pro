import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Building2, 
  ArrowLeft, 
  MapPin, 
  Phone,
  Mail,
  Globe,
  Bed,
  Users,
  Stethoscope,
  Edit,
  TrendingUp,
  Clock,
  Activity,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useHospitals } from '@/contexts/HospitalsContext';

const weeklyPatients = [
  { day: 'Mon', patients: 145 },
  { day: 'Tue', patients: 168 },
  { day: 'Wed', patients: 192 },
  { day: 'Thu', patients: 156 },
  { day: 'Fri', patients: 201 },
  { day: 'Sat', patients: 98 },
  { day: 'Sun', patients: 76 },
];

const recentActivities = [
  { message: 'New cardiology wing opened', time: '2 days ago', type: 'info' },
  { message: 'ICU capacity increased by 10 beds', time: '1 week ago', type: 'success' },
  { message: 'Annual accreditation renewed', time: '2 weeks ago', type: 'success' },
  { message: 'Equipment maintenance scheduled', time: '3 weeks ago', type: 'warning' },
];

export default function HospitalDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { hospitals, getHospitalById } = useHospitals();

  const hospitalData = useMemo(() => getHospitalById(id || "") || hospitals[0], [getHospitalById, hospitals, id]);

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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/hospitals')}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary">
                    <Building2 className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{hospitalData?.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{hospitalData?.city}, {hospitalData?.state}</span>
                      <Badge variant="outline" className="ml-2">{hospitalData?.type}</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Hospital
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bed className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{hospitalData?.beds}</p>
                      <p className="text-xs text-muted-foreground">Total Beds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Stethoscope className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{hospitalData?.doctors}</p>
                      <p className="text-xs text-muted-foreground">Doctors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{hospitalData?.nurses}</p>
                      <p className="text-xs text-muted-foreground">Nurses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{hospitalData?.rating}</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
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
                    <p className="text-muted-foreground mb-4">{hospitalData?.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {hospitalData?.specialties?.map(specialty => (
                        <Badge key={specialty} variant="secondary">{specialty}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bed Occupancy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">General Beds</span>
                          <span className="font-medium">{hospitalData?.occupancy}%</span>
                        </div>
                        <Progress value={hospitalData?.occupancy} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">ICU Beds</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Emergency</span>
                          <span className="font-medium">62%</span>
                        </div>
                        <Progress value={62} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Patient Visits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={weeklyPatients}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                        <XAxis dataKey="day" stroke="hsl(215, 15%, 45%)" fontSize={12} />
                        <YAxis stroke="hsl(215, 15%, 45%)" fontSize={12} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="patients" 
                          stroke="hsl(205, 85%, 45%)" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(205, 85%, 45%)' }}
                        />
                      </LineChart>
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
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-foreground">{hospitalData?.address}</p>
                        <p className="text-sm text-muted-foreground">{hospitalData?.city}, {hospitalData?.state} {hospitalData?.zipCode}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{hospitalData?.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{hospitalData?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <a href={hospitalData?.website} className="text-sm text-primary hover:underline" target="_blank" rel="noreferrer">
                        {hospitalData?.website}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-medium">{hospitalData?.establishedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className={hospitalData?.status === 'active' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}>
                        {hospitalData?.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accreditation</span>
                      <span className="font-medium text-sm">{hospitalData?.accreditation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Staff</span>
                      <span className="font-medium">{(hospitalData?.staff || 0) + (hospitalData?.doctors || 0) + (hospitalData?.nurses || 0)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`p-1.5 rounded-full ${
                            activity.type === 'success' ? 'bg-success/10' :
                            activity.type === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
                          }`}>
                            <Activity className={`w-3 h-3 ${
                              activity.type === 'success' ? 'text-success' :
                              activity.type === 'warning' ? 'text-warning' : 'text-primary'
                            }`} />
                          </div>
                          <div>
                            <p className="text-sm text-foreground">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
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
