import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, FileText, User, Video } from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { doctorAppointments } from "@/data/doctorSamples";

export default function AppointmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const appointment = useMemo(
    () => doctorAppointments.find((apt) => apt.id === Number(id)),
    [id]
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <p className="text-sm text-muted-foreground">Appointment details</p>
                <h1 className="text-2xl font-semibold text-foreground">
                  {appointment ? appointment.patient : "Appointment"}
                </h1>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    {appointment?.date || "Date not found"}
                  </CardTitle>
                  {appointment && (
                    <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                      {appointment.status}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointment ? (
                  <>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                      <span className="inline-flex items-center gap-1">
                        {appointment.type === "Video Call" ? <Video className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        {appointment.type}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted">
                      <p className="text-sm text-muted-foreground mb-1">Notes</p>
                      <p className="text-foreground">{appointment.notes}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">No appointment found for this id.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

