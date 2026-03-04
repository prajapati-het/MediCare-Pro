import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  HeartPulse,
  Activity,
  Thermometer,
  Weight,
  Ruler,
  Wind,
  Droplet,
  Gauge,
} from "lucide-react";
import { useGetPatientByIdQuery } from "@/redux/slices/api";

const vitalsMeta: Record<
  string,
  { label: string; icon: React.ElementType }
> = {
  bloodPressure: { label: "Blood Pressure", icon: Gauge },
  heartRate: { label: "Heart Rate", icon: HeartPulse },
  temperature: { label: "Temperature", icon: Thermometer },
  weight: { label: "Weight", icon: Weight },
  height: { label: "Height", icon: Ruler },
  bmi: { label: "BMI", icon: Activity },
  oxygenSaturation: { label: "Oxygen Saturation", icon: Droplet },
  respiratoryRate: { label: "Respiratory Rate", icon: Wind },
};

export default function VitalsTab() {
  const { id } = useParams();

  const { data: patient, isLoading, isError } = useGetPatientByIdQuery(id);
  if (!patient) return null;

  return (
    <div className="space-y-4 mt-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold">Vital Signs</h3>
        <p className="text-sm text-muted-foreground">
          Latest recorded patient vitals
        </p>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(patient.vitals).map(([key, value]) => {
          const meta = vitalsMeta[key];
          if (!meta) return null;

          const Icon = meta.icon;

          return (
            <Card
              key={key}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <p className="text-xs text-muted-foreground">
                  {meta.label}
                </p>

                <p className="text-lg font-semibold tracking-tight">
                  {value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
