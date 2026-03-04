import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Plus, 
  Search, 
  MoreVertical,
  Mail,
  Phone,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useDoctors } from '@/contexts/DoctorsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout as logoutAction } from "@/redux/slices/appSlice";
import { useGetAdminDetailsQuery, useGetDoctorsByHospitalQuery, useGetHospitalByIdQuery } from '@/redux/slices/api';

export default function AdminDoctors() {
  const dispatch = useDispatch();
  const { adminUser, isLoggedIn } = useSelector(
    (state: RootState) => state.app
  );

  const { data: admin, isLoading, isError } = useGetAdminDetailsQuery(String(adminUser.id));

  console.log(admin)
  const hospitalId = admin?.hospital;
  const { data: hospital } =
  useGetHospitalByIdQuery(hospitalId!, {
    skip: !hospitalId,
  });

  const hospitalName = hospital?.name

  
  const { data: doctors = [] } = useGetDoctorsByHospitalQuery(hospitalName!, {
    skip: !hospitalName
  });


  // const doctors = data || [];


 


  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number, name: string) => {
    toast({
      title: "Doctor Removed",
      description: `${name} has been removed from the system.`,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Doctors Management
                </h1>
                <p className="text-muted-foreground">
                  Manage doctors for {adminUser?.hospital}

                </p>
              </div>
              <Button onClick={() => navigate('/admin/doctors/add')} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Doctor
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="hover-lift overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                            {doctor.username.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{doctor.username}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.speciality}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/admin/doctors/${doctor.id}`)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(doctor.id, doctor.username)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Stethoscope className="w-4 h-4" />
                          <span>{doctor.speciality}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{doctor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{doctor.phone}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <Badge variant={doctor.status === 'available' ? 'default' : 'secondary'}>
                          {doctor.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {doctor.experience}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredDoctors.length === 0 && (
              <motion.div 
                variants={itemVariants}
                className="text-center py-12"
              >
                <Stethoscope className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No doctors found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Try a different search term' : 'Add your first doctor to get started'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
