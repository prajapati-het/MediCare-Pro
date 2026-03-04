import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { HospitalsProvider } from "@/contexts/HospitalsContext";
import { DoctorsProvider } from "@/contexts/DoctorsContext";
import { StaffProvider } from "@/contexts/StaffContext";
import { ProtectedRoute, PublicRoute } from "@/components/ProtectedRoute";
import { Loader2 } from "lucide-react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Hospitals = lazy(() => import("./pages/Hospitals"));
const AddHospital = lazy(() => import("./pages/AddHospital"));
const HospitalDetail = lazy(() => import("./pages/HospitalDetail"));
const Doctors = lazy(() => import("./pages/Doctors"));
const AddDoctor = lazy(() => import("./pages/AddDoctor"));
const DoctorDetail = lazy(() => import("./pages/DoctorDetail"));
const Staff = lazy(() => import("./pages/Staff"));
const AddStaff = lazy(() => import("./pages/AddStaff"));
const StaffDetail = lazy(() => import("./pages/StaffDetail"));
const AddFacility = lazy(()=> import("./pages/AddFacility"));
const AddProblem = lazy(()=> import("./pages/AddProblem"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const BookAppointment = lazy(() => import("./pages/BookAppointment"));



const AdminDoctors = lazy(() => import("./pages/admin/AdminDoctors"));
const AdminStaff = lazy(() => import("./pages/admin/AdminStaff"));
const AdminFacilities = lazy(() => import("./pages/admin/AdminFacilities"));
const AdminProblems = lazy(() => import("./pages/admin/AdminProblems"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const DoctorAppointments = lazy(
  () => import("./pages/doctor/DoctorAppointments")
);
const DoctorPatients = lazy(() => import("./pages/doctor/DoctorPatients"));
const DoctorProfile = lazy(() => import("./pages/doctor/DoctorProfile"));
const AppointmentDetail = lazy(() => import("./pages/doctor/AppointmentDetail"));
const PatientDetail = lazy(() => import("./pages/doctor/PatientDetails/PatientDetail"));

const EditDoctor = lazy(() => import("./pages/EditDoctor"));
const EditStaff = lazy(() => import("./pages/EditStaff"));
const EditHospital = lazy(() => import("./pages/EditHospital"));

const PrintReportPage = lazy(() => import("./components/modals/PrintableReportPage"));

const PatientBill = lazy(() => import("./pages/doctor/PatientDetails/bill/PatientBill"));

const DoctorAppointmentsView = lazy(() => import("./pages/doctor/DoctorAppointmentsView"));

const TodayPatientsPage = lazy(()=> import("./components/TodayPatientsPage"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={<PageLoader />} persistor={persistor}>
        <HospitalsProvider>
          <DoctorsProvider>
            <StaffProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter
                  future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true
                  }}
                >
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Public Routes */}
                      <Route
                        path="/"
                        element={
                          <PublicRoute>
                            <Index />
                          </PublicRoute>
                        }
                      />
                      <Route
                        path="/auth"
                        element={
                          <PublicRoute>
                            <Auth />
                          </PublicRoute>
                        }
                      />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/bookappointment" element={<BookAppointment/>} />
                      <Route
                        path="/unauthorized"
                        element={
                          <PublicRoute>
                            <Unauthorized />
                          </PublicRoute>
                        }
                      />

                      {/* Shared Protected */}
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute allowedRoles={["admin", "doctor"]}>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      />

                      {/* Admin Routes */}
                      <Route
                        path="/admin/doctors"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDoctors />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/doctors/add"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AddDoctor />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/doctors/:id"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <DoctorDetail />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/doctors/:id/edit"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <EditDoctor />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/admin/staff"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminStaff />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/staff/add"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AddStaff />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/staff/:id"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <StaffDetail />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/staff/:id/edit"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <EditStaff />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/admin/facilities"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminFacilities />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/problems"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminProblems />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/settings"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminSettings />
                          </ProtectedRoute>
                        }
                      />

                      {/* Doctor Routes */}
                      {/* Main dashboard */}
                      <Route
                        path="/doctor/appointments"
                        element={
                          <ProtectedRoute allowedRoles={["doctor"]}>
                            <DoctorAppointments />
                          </ProtectedRoute>
                        }
                      />

                      {/* Filtered appointments view (must come before :id route) */}
                      <Route 
                        path="/doctor/appointments/:filter" 
                        element={
                          <ProtectedRoute allowedRoles={["doctor"]}>
                            <DoctorAppointmentsView />
                          </ProtectedRoute>
                        } 
                      />

                      {/* Other doctor routes */}
                      <Route
                        path="/doctor/patients"
                        element={
                          <ProtectedRoute allowedRoles={["doctor"]}>
                            <DoctorPatients />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/doctor/patients/:id"
                        element={
                          <ProtectedRoute allowedRoles={["doctor"]}>
                            <PatientDetail />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/doctor/profile"
                        element={
                          <ProtectedRoute allowedRoles={["doctor"]}>
                            <DoctorProfile />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/doctor/calendar/patients"
                        element={
                          <ProtectedRoute allowedRoles={["doctor"]}>
                            <TodayPatientsPage />
                          </ProtectedRoute>
                        }
                      />
                      

                      {/* Legacy */}
                      <Route
                        path="/hospitals"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <Hospitals />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/hospitals/add"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AddHospital />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/hospitals/:id"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <HospitalDetail />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/hospitals/:id/edit"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <EditHospital />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/doctors"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <Doctors />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/doctors/add"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AddDoctor />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/doctors/:id"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <DoctorDetail />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/staff"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <Staff />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/staff/add"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AddStaff />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/staff/:id"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <StaffDetail />
                          </ProtectedRoute>
                        }
                      />

                      {/* Print */}
                      <Route
                        path="/reports/print/:id"
                        element={<PrintReportPage />}
                      />

                      <Route
                        path="/doctor/:docid/patients/:id/bill"
                        element={<PatientBill />}
                      />


                      {/* Facility */}

                      <Route
                        path="/facilities/add"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AddFacility />
                          </ProtectedRoute>
                        }
                      />


                      {/* Problems */}
                        <Route
                        path="/problems/add"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AddProblem />
                          </ProtectedRoute>
                        }
                      />




                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </StaffProvider>
          </DoctorsProvider>
        </HospitalsProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

export default App;
