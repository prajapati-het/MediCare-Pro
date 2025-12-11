import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Users, 
  ArrowLeft, 
  Phone,
  Mail,
  Edit,
  Calendar,
  Clock,
  Building2,
  Briefcase,
  DollarSign,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const staffData = {
  id: 1,
  name: 'Jennifer Adams',
  firstName: 'Jennifer',
  lastName: 'Adams',
  role: 'Head Nurse',
  department: 'ICU',
  email: 'jennifer.adams@hospital.com',
  phone: '+1 (555) 111-2222',
  hospital: 'City General Hospital',
  employeeId: 'EMP-001',
  shift: 'Morning',
  status: 'on-duty',
  joiningDate: '2019-03-15',
  salary: 5500,
  emergencyContact: '+1 (555) 999-8888',
  address: '456 Oak Street, New York, NY 10002',
  yearsOfService: 4,
  performanceScore: 92,
  attendanceRate: 98,
  certifications: ['BLS Certified', 'ACLS Certified', 'ICU Specialist'],
  skills: ['Patient Care', 'Emergency Response', 'Team Leadership', 'Medical Equipment'],
};

const recentShifts = [
  { date: 'Today', hours: '6:00 AM - 2:00 PM', status: 'in-progress' },
  { date: 'Yesterday', hours: '6:00 AM - 2:00 PM', status: 'completed' },
  { date: 'Dec 8', hours: '6:00 AM - 2:00 PM', status: 'completed' },
  { date: 'Dec 7', hours: '6:00 AM - 2:00 PM', status: 'completed' },
];

const performanceMetrics = [
  { label: 'Patient Satisfaction', value: 95 },
  { label: 'Task Completion', value: 98 },
  { label: 'Attendance', value: 98 },
  { label: 'Team Collaboration', value: 92 },
];

export default function StaffDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-duty': return 'bg-success text-success-foreground';
      case 'off-duty': return 'bg-muted text-muted-foreground';
      case 'on-leave': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/staff')}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-4 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-2xl font-bold">
                      JA
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{staffData.name}</h1>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="outline">{staffData.role}</Badge>
                      <Badge variant="secondary">{staffData.department}</Badge>
                      <Badge className={getStatusColor(staffData.status)}>
                        {staffData.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  View Schedule
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
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{staffData.yearsOfService}</p>
                      <p className="text-xs text-muted-foreground">Years of Service</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{staffData.performanceScore}%</p>
                      <p className="text-xs text-muted-foreground">Performance</p>
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
                      <p className="text-2xl font-bold text-foreground">{staffData.attendanceRate}%</p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
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
                      <p className="text-2xl font-bold text-foreground">${staffData.salary}</p>
                      <p className="text-xs text-muted-foreground">Monthly Salary</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {staffData.skills.map(skill => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {staffData.certifications.map(cert => (
                          <Badge key={cert} variant="outline" className="gap-1">
                            <CheckCircle2 className="w-3 h-3 text-success" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {performanceMetrics.map(metric => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">{metric.label}</span>
                          <span className="font-medium">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Shifts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentShifts.map((shift, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              shift.status === 'in-progress' ? 'bg-success animate-pulse' : 'bg-muted-foreground'
                            }`} />
                            <div>
                              <p className="font-medium text-foreground">{shift.date}</p>
                              <p className="text-sm text-muted-foreground">{shift.hours}</p>
                            </div>
                          </div>
                          <Badge variant={shift.status === 'in-progress' ? 'default' : 'secondary'}>
                            {shift.status === 'in-progress' ? 'In Progress' : 'Completed'}
                          </Badge>
                        </div>
                      ))}
                    </div>
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
                      <span className="text-sm">{staffData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{staffData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{staffData.hospital}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Emergency Contact</p>
                        <span className="text-sm">{staffData.emergencyContact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Employment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Employee ID</span>
                      <span className="font-medium">{staffData.employeeId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department</span>
                      <span className="font-medium">{staffData.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shift</span>
                      <Badge variant="outline">{staffData.shift}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Joining Date</span>
                      <span className="font-medium text-sm">{new Date(staffData.joiningDate).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Calendar className="w-4 h-4" />
                      Manage Schedule
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Clock className="w-4 h-4" />
                      Request Leave
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <DollarSign className="w-4 h-4" />
                      View Payslips
                    </Button>
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
