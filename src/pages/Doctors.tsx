import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Plus,
  Search,
  Mail,
  Phone,
  Calendar,
  Star,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Clock
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  useGetAdminDetailsQuery,
  useGetDoctorsByHospitalQuery,
  useGetHospitalByIdQuery,
} from '@/redux/slices/api';
import { DoctorType } from '@/types/type';
import EditDoctorDialog from './EditDoctorDialog';

const specialties = [
  'All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
  'Dermatology', 'Oncology', 'Gastroenterology', 'Pulmonology',
  'Endocrinology', 'Psychiatry', 'Ophthalmology', 'ENT', 'Urology',
  'Nephrology', 'General Medicine',
];

export default function Doctors() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  // Edit dialog state
  const [editingDoctor, setEditingDoctor] = useState<DoctorType | null>(null);

  const { adminUser } = useSelector((state: RootState) => state.app);

  const { data: admin } = useGetAdminDetailsQuery(String(adminUser.id));
  const hospitalId = admin?.hospital;

  const { data: hospital } = useGetHospitalByIdQuery(hospitalId!, {
    skip: !hospitalId,
  });
  const hospitalName = hospital?.name;

  const { data: doctors = [] } = useGetDoctorsByHospitalQuery(hospitalName!, {
    skip: !hospitalName,
  });

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch =
      d.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'All' || d.speciality === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'in-surgery': return 'bg-destructive text-destructive-foreground';
      case 'in-consultation': return 'bg-warning text-warning-foreground';
      case 'on-leave': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* Page heading */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            >
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Doctors Directory
                </h1>
                <p className="text-muted-foreground">
                  Manage doctors, their availability, and appointments
                </p>
              </div>
              <Button className="gap-2" onClick={() => navigate('/doctors/add')}>
                <Plus className="w-4 h-4" />
                Add Doctor
              </Button>
            </motion.div>

            {/* Search + specialty filters */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {specialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={selectedSpecialty === specialty ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty)}
                    className="whitespace-nowrap"
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Doctor cards grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-14 h-14 border-2 border-primary/20">
                            <AvatarImage src={doctor.picture || undefined} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                              {doctor.username.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-foreground">{doctor.username}</h3>
                            <p className="text-sm text-primary">{doctor.speciality}</p>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/doctors/${doctor.id}`)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            {/* ← Opens the dialog instead of navigating */}
                            <DropdownMenuItem onClick={() => setEditingDoctor(doctor)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <Badge className={`${getStatusColor(doctor.status)} mb-4`}>
                        {doctor.status.replace('-', ' ')}
                      </Badge>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{doctor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{doctor.phone}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 rounded-xl bg-muted/50">
                          <p className="text-lg font-bold text-foreground">{doctor.experience}</p>
                          <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-muted/50">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-warning fill-warning" />
                            <span className="text-lg font-bold text-foreground">{doctor.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Rating</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Next:</span>
                          <span className="font-medium text-foreground">{doctor.nextAvailable}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </main>
      </div>

      {/* Edit Doctor Dialog — rendered once, outside the grid */}
      {editingDoctor && (
        <EditDoctorDialog
          doctor={editingDoctor}
          open={!!editingDoctor}
          onClose={() => setEditingDoctor(null)}
        />
      )}
    </div>
  );
}