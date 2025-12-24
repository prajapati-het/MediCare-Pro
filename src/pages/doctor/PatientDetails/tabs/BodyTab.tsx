import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User, Ruler, Weight, Droplet } from "lucide-react";

export default function BodyTab() {
  const { id } = useParams();

  const patient = useSelector((state: RootState) =>
    state.patients.list.find((p) => p.id === Number(id))
  );

  if (!patient) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* BODY DETAILS */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Body Profile</h3>

          <InfoRow icon={<User />} label="Age" value={patient.age} />
          <InfoRow icon={<User />} label="Gender" value={patient.gender} />
          <InfoRow
            icon={<Ruler />}
            label="Height"
            value={`${patient.vitals.height} cm`}
          />
          <InfoRow
            icon={<Weight />}
            label="Weight"
            value={`${patient.vitals.weight} kg`}
          />

          {patient.bloodGroup && (
            <Badge variant="outline" className="mt-2">
              <Droplet className="w-3 h-3 mr-1" />
              Blood Group: {patient.bloodGroup}
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* QUICK VITAL SNAPSHOT */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Quick Vitals</h3>

          <div className="grid grid-cols-2 gap-4">
            <QuickStat
              label="Blood Pressure"
              value={patient.vitals.bloodPressure}
            />
            <QuickStat
              label="Heart Rate"
              value={patient.vitals.heartRate}
            />
            <QuickStat
              label="Temperature"
              value={patient.vitals.temperature}
            />
            <QuickStat label="BMI" value={patient.vitals.bmi} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function QuickStat({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="bg-muted/50 rounded-xl p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value || "—"}</p>
    </div>
  );
}
