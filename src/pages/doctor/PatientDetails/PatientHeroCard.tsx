import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, Mail, Droplet } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetPatientByIdQuery } from "@/redux/slices/api";

export default function PatientHeroCard() {
  const { id } = useParams();

  const { data: patient, isLoading, isError } = useGetPatientByIdQuery(id);


  console.log(patient);

  if (!patient) return null;

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6">
        <div className="flex gap-6 items-center">
          <motion.div className="w-24 h-24 rounded-2xl bg-primary text-white flex items-center justify-center text-3xl font-bold">
            {patient.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <Badge>{patient.status}</Badge>
              <Badge variant="outline">{patient.tag}</Badge>
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground mt-2 flex-wrap">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {patient.age} • {patient.gender}
              </span>
              <span className="flex items-center gap-1">
                <Droplet className="w-4 h-4" /> {patient.bloodGroup}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" /> {patient.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> {patient.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <Info label="Current Condition" value={patient.condition} />
        <Info label="Last Visit" value={patient.lastVisit} />
        <Info label="Next Appointment" value={patient.nextAppointment} />
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="bg-muted/50 p-4 rounded-xl">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
