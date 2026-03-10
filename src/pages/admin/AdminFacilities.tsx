import { motion } from 'framer-motion';
import { 
  Bed, 
  Plus, 
  Search,
  Building2,
  Activity,
  Thermometer,
  HeartPulse
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout as logoutAction } from "@/redux/slices/appSlice";
import { useGetAdminDetailsQuery, useGetFacilitiesQuery, useGetHospitalByIdQuery } from '@/redux/slices/api';

export default function AdminFacilities() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminUser, isLoggedIn } = useSelector(
      (state: RootState) => state.app
    );
  
    const { data: admin, isLoading: IsLoadingAdmin, isError: isErrorAdmin } = useGetAdminDetailsQuery(String(adminUser.id));
  
    const hospitalId = admin?.hospital;
    const { data: hospital, isLoading: isLoadingHospital, isError: isErrorHospital } =
    useGetHospitalByIdQuery(hospitalId!, {
      skip: !hospitalId,
    });

  
    const hospitalName = hospital?.name
    
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isLoading,
    isError,
  } = useGetFacilitiesQuery(hospitalId!, {
    skip: !hospitalId,
  });

  const facilities = data?.data || [];

  const filteredFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBeds = facilities.reduce((acc, f) => acc + f.totalBeds, 0);
  const occupiedBeds = facilities.reduce((acc, f) => acc + f.occupied, 0);
  const totalEquipment = facilities.reduce((acc, f) => acc + f.equipment, 0);

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


  if (isLoading || IsLoadingAdmin || isLoadingHospital ) return <div>Loading facilities...</div>;
  if (isError || isErrorAdmin || isErrorHospital ) return <div>Error loading facilities</div>;


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
                  Facilities Management
                </h1>
                <p className="text-muted-foreground">
                  Manage wards and equipment for {hospitalName}
                </p>
              </div>
              <Button className="gap-2" onClick={() => navigate('/facilities/add')}>
                <Plus className="w-4 h-4" />
                Add Facility
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Bed className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalBeds}</p>
                      <p className="text-sm text-muted-foreground">Total Beds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-secondary/10">
                      <HeartPulse className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{occupiedBeds}</p>
                      <p className="text-sm text-muted-foreground">Occupied</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Activity className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalBeds - occupiedBeds}</p>
                      <p className="text-sm text-muted-foreground">Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-success/10">
                      <Thermometer className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalEquipment}</p>
                      <p className="text-sm text-muted-foreground">Equipment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search facilities..."
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
              {filteredFacilities.map((facility, index) => (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="hover-lift">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Building2 className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{facility.name}</CardTitle>
                        </div>
                        <Badge variant={facility.status === 'Operational' ? 'default' : 'secondary'}>
                          {facility.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Bed Occupancy</span>
                            <span className="font-medium">{facility.occupied}/{facility.totalBeds}</span>
                          </div>
                          <Progress value={(facility.occupied / facility.totalBeds) * 100} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Equipment Units</span>
                          <span className="font-medium">{facility.equipment}</span>
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
    </div>
  );
}
