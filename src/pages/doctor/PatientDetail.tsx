import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Mail, Phone, User } from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { doctorPatients } from "@/data/doctorSamples";

export default function PatientDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const patient = useMemo(() => doctorPatients.find((p) => p.id === Number(id)), [id]);

  const getStatusVariant = (status: string) => {
    if (status === "Critical") return "destructive";
    if (status === "Follow-up") return "secondary";
    return "default";
  };

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
                <p className="text-sm text-muted-foreground">Patient record</p>
                <h1 className="text-2xl font-semibold text-foreground">{patient ? patient.name : "Patient"}</h1>
              </div>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  {patient?.name || "Unknown patient"}
                </CardTitle>
                {patient && (
                  <Badge variant={getStatusVariant(patient.status)} className="capitalize">
                    {patient.status}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {patient ? (
                  <>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{patient.age} yrs</span>
                      <span>•</span>
                      <span>{patient.gender}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Last visit: {patient.lastVisit}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-muted">
                      <p className="text-sm text-muted-foreground mb-1">Condition</p>
                      <p className="text-foreground font-medium">{patient.condition}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">No patient found for this id.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

