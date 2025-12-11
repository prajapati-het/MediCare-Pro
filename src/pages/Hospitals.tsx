import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, 
  Plus, 
  Search, 
  MapPin, 
  Users, 
  Bed,
  Stethoscope,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  TrendingUp
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';

const hospitals = [
  {
    id: 1,
    name: 'City General Hospital',
    location: 'Downtown District, 123 Main St',
    beds: 450,
    doctors: 85,
    staff: 1200,
    patients: 3245,
    occupancy: 78,
    rating: 4.8,
    status: 'active',
  },
  {
    id: 2,
    name: 'Metro Health Center',
    location: 'Westside Avenue, 456 Park Blvd',
    beds: 320,
    doctors: 72,
    staff: 850,
    patients: 2876,
    occupancy: 85,
    rating: 4.6,
    status: 'active',
  },
  {
    id: 3,
    name: 'Sunrise Medical Complex',
    location: 'Eastside Boulevard, 789 Oak Lane',
    beds: 280,
    doctors: 58,
    staff: 720,
    patients: 2134,
    occupancy: 65,
    rating: 4.7,
    status: 'active',
  },
  {
    id: 4,
    name: 'Valley Regional Hospital',
    location: 'Northern Hills, 321 Valley Rd',
    beds: 200,
    doctors: 42,
    staff: 540,
    patients: 1567,
    occupancy: 72,
    rating: 4.5,
    status: 'active',
  },
  {
    id: 5,
    name: 'Coastal Care Medical',
    location: 'Seaside District, 654 Beach Ave',
    beds: 180,
    doctors: 38,
    staff: 480,
    patients: 1234,
    occupancy: 58,
    rating: 4.4,
    status: 'maintenance',
  },
];

export default function Hospitals() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = hospitals.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Hospital Network
                </h1>
                <p className="text-muted-foreground">
                  Manage and monitor all hospitals in your network
                </p>
              </div>
              
              {user?.role === 'super_admin' && (
                <Button className="gap-2" onClick={() => navigate('/hospitals/add')}>
                  <Plus className="w-4 h-4" />
                  Add Hospital
                </Button>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search hospitals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{hospitals.length}</p>
                      <p className="text-xs text-muted-foreground">Total Hospitals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Bed className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">1,430</p>
                      <p className="text-xs text-muted-foreground">Total Beds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Stethoscope className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">295</p>
                      <p className="text-xs text-muted-foreground">Total Doctors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <Users className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">11K+</p>
                      <p className="text-xs text-muted-foreground">Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital, index) => (
                <motion.div
                  key={hospital.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                            <Building2 className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{hospital.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate max-w-[180px]">{hospital.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/hospitals/${hospital.id}`)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-2 rounded-lg bg-muted/50">
                          <p className="text-lg font-bold text-foreground">{hospital.beds}</p>
                          <p className="text-xs text-muted-foreground">Beds</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/50">
                          <p className="text-lg font-bold text-foreground">{hospital.doctors}</p>
                          <p className="text-xs text-muted-foreground">Doctors</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/50">
                          <p className="text-lg font-bold text-foreground">{hospital.staff}</p>
                          <p className="text-xs text-muted-foreground">Staff</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Occupancy</span>
                          <span className="font-medium text-foreground">{hospital.occupancy}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              hospital.occupancy > 80 ? 'bg-destructive' :
                              hospital.occupancy > 60 ? 'bg-warning' :
                              'bg-success'
                            }`}
                            style={{ width: `${hospital.occupancy}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${
                            hospital.status === 'active' ? 'bg-success' : 'bg-warning'
                          }`} />
                          <span className="text-xs text-muted-foreground capitalize">{hospital.status}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="font-medium text-foreground">{hospital.rating}</span>
                          <span className="text-muted-foreground">Rating</span>
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
