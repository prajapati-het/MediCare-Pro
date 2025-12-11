import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DoctorsProvider } from "@/contexts/DoctorsContext";
import { StaffProvider } from "@/contexts/StaffContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";
import AddHospital from "./pages/AddHospital";
import HospitalDetail from "./pages/HospitalDetail";
import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctor";
import DoctorDetail from "./pages/DoctorDetail";
import Staff from "./pages/Staff";
import AddStaff from "./pages/AddStaff";
import StaffDetail from "./pages/StaffDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DoctorsProvider>
        <StaffProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/hospitals" element={<Hospitals />} />
                <Route path="/hospitals/add" element={<AddHospital />} />
                <Route path="/hospitals/:id" element={<HospitalDetail />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/add" element={<AddDoctor />} />
                <Route path="/doctors/:id" element={<DoctorDetail />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/staff/add" element={<AddStaff />} />
                <Route path="/staff/:id" element={<StaffDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </StaffProvider>
      </DoctorsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
