import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  Plus, 
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProblemsByHospitalName } from '@/data/problemsData';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout as logoutAction } from "@/redux/slices/appSlice";

export default function AdminProblems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.app
  );
  const [searchQuery, setSearchQuery] = useState('');

  const problems = useMemo(() => {
    if (user?.hospital) {
      return getProblemsByHospitalName(user.hospital);
    }
    return [];
  }, [user?.hospital]);

  const filteredProblems = problems.filter(problem =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    problem.department.toLowerCase().includes(searchQuery.toLowerCase())
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-warning" />;
      case 'Open': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const openCount = problems.filter(p => p.status === 'Open').length;
  const inProgressCount = problems.filter(p => p.status === 'In Progress').length;
  const resolvedCount = problems.filter(p => p.status === 'Resolved').length;

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
                  Problems & Complaints
                </h1>
                <p className="text-muted-foreground">
                  Track and resolve issues for {user?.hospital}
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Report Problem
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-destructive/10">
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{openCount}</p>
                      <p className="text-sm text-muted-foreground">Open Issues</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-warning/10">
                      <Clock className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{inProgressCount}</p>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-success/10">
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{resolvedCount}</p>
                      <p className="text-sm text-muted-foreground">Resolved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="space-y-4"
            >
              {filteredProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            {getStatusIcon(problem.status)}
                            <div>
                              <h3 className="font-semibold text-foreground">{problem.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{problem.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <span>Department: {problem.department}</span>
                            <span>Reported by: {problem.reportedBy}</span>
                            <span>Date: {problem.reportedAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(problem.priority) as any}>
                            {problem.priority}
                          </Badge>
                          <Badge variant="outline">{problem.status}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProblems.length === 0 && (
              <motion.div 
                variants={itemVariants}
                className="text-center py-12"
              >
                <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No problems found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Try a different search term' : 'All issues have been resolved!'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
