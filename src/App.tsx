import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "@/components/ProtectedRoute";
import { Loader2 } from "lucide-react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
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



const AdminFacilities = lazy(() => import("./pages/admin/AdminFacilities"));
const AdminProblems = lazy(() => import("./pages/admin/AdminProblems"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const DoctorAppointments = lazy(
  () => import("./pages/doctor/DoctorAppointments")
);
const DoctorPatients = lazy(() => import("./pages/doctor/DoctorPatients"));
const DoctorProfile = lazy(() => import("./pages/doctor/DoctorProfile"));
const PatientDetail = lazy(() => import("./pages/doctor/PatientDetails/PatientDetail"));
const PatientBillsTimeline  = lazy(() => import("./pages/doctor/PatientDetails/bill/PatientBillsTimeline"));

const EditDoctor = lazy(() => import("./pages/EditDoctorDialog"));
const EditStaffDialog = lazy(() => import("./pages/EditStaffDialog"));

const PrintReportPage = lazy(() => import("./components/modals/PrintableReportPage"));

const PatientBill = lazy(() => import("./pages/doctor/PatientDetails/bill/PatientBill"));


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
                            <EditStaffDialog />
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

                      {/* <Route
                        path="/doctor/:docid/patients/:id/bills"
                        element={<PatientBill />}
                      /> */}
                      <Route
                        path="/doctor/:docid/patients/:id/bills"
                        element={<PatientBillsTimeline  />}
                      />

                      <Route path="/doctor/:doctorId/patients/:id/bill"  element={<PatientBill />} />

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
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

export default App;
