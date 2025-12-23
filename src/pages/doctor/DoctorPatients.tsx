import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search,
  Calendar,
  FileText,
  Eye,
  Filter,
  X,
  Tag
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatientsByDoctorId, Patient } from '@/data/patientsData';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { format, isWithinInterval, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

type TagFilter = Patient['tag'] | 'all';

export default function DoctorPatients() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.app);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<TagFilter>('all');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showFilters, setShowFilters] = useState(false);

  const patients = useMemo(() => {
    if (user?.id) {
      return getPatientsByDoctorId(user.id);
    }
    return [];
  }, [user?.id]);

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === 'all' || patient.tag === selectedTag;
      
      let matchesDateRange = true;
      if (startDate && endDate) {
        const lastVisit = parseISO(patient.lastVisit);
        matchesDateRange = isWithinInterval(lastVisit, { start: startDate, end: endDate });
      }
      
      return matchesSearch && matchesTag && matchesDateRange;
    });
  }, [patients, searchQuery, selectedTag, startDate, endDate]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'destructive';
      case 'Follow-up': return 'secondary';
      case 'Recovered': return 'default';
      default: return 'default';
    }
  };

  const getTagColor = (tag: Patient['tag']) => {
    switch (tag) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'follow-up': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'normal': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'new': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'chronic': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const tags: { value: TagFilter; label: string }[] = [
    { value: 'all', label: 'All Patients' },
    { value: 'critical', label: 'Critical' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'normal', label: 'Normal' },
    { value: 'new', label: 'New' },
    { value: 'chronic', label: 'Chronic' }
  ];

  const clearFilters = () => {
    setSelectedTag('all');
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedTag !== 'all' || startDate || endDate;

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
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                My Patients
              </h1>
              <p className="text-muted-foreground">
                View and manage your patient records
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8"
            >
              <Card>
                <CardContent className="p-5">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{patients.length}</p>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-xl bg-emerald-500/10">
                      <Users className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {patients.filter(p => p.status === 'Active').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Active Cases</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-xl bg-destructive/10">
                      <Users className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {patients.filter(p => p.tag === 'critical').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Critical</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-xl bg-amber-500/10">
                      <Users className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {patients.filter(p => p.tag === 'follow-up').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Follow-up</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn("gap-2", hasActiveFilters && "border-primary text-primary")}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      !
                    </Badge>
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="gap-2">
                    <X className="w-4 h-4" />
                    Clear
                  </Button>
                )}
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            Filter by Tag
                          </label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map(tag => (
                              <motion.button
                                key={tag.value}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedTag(tag.value)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                                  selectedTag === tag.value
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : tag.value === 'all'
                                    ? "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                                    : getTagColor(tag.value as Patient['tag'])
                                )}
                              >
                                {tag.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Start Date
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal mt-2">
                                  {startDate ? format(startDate, 'PPP') : 'Select start date'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={startDate}
                                  onSelect={setStartDate}
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="flex-1">
                            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              End Date
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal mt-2">
                                  {endDate ? format(endDate, 'PPP') : 'Select end date'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={endDate}
                                  onSelect={setEndDate}
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPatients.map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
                  >
                    <Card className="hover-lift overflow-hidden h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </motion.div>
                            <div>
                              <h3 className="font-semibold text-foreground">{patient.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {patient.age} years • {patient.gender}
                              </p>
                            </div>
                          </div>
                          <Badge variant={getStatusColor(patient.status) }>
                            {patient.status}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <span className={cn(
                            "inline-flex px-2 py-0.5 rounded-full text-xs font-medium border",
                            getTagColor(patient.tag)
                          )}>
                            {patient.tag.charAt(0).toUpperCase() + patient.tag.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-medium text-foreground">{patient.condition}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Last visit: {patient.lastVisit}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 gap-1" 
                            onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <FileText className="w-4 h-4" />
                            Records
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredPatients.length === 0 && (
              <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No patients found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search term
                </p>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
