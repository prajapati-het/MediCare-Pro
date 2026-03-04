// MedicalTab.tsx
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "@/redux/store";
import {
  Activity,
  AlertTriangle,
  Droplet,
  ClipboardList,
} from "lucide-react";
import { useGetPatientByIdQuery } from "@/redux/slices/api";

export default function MedicalTab() {
  const { id } = useParams();

  const { data: patient, isLoading, isError } = useGetPatientByIdQuery(id);

  if (!patient) return null;

  return (
    <div className="space-y-4">
      {/* Diagnosis */}
      <div className="bg-muted/40 border-l-4 border-primary rounded-md p-4">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Diagnosis</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {patient.diagnosis || "—"}
        </p>
      </div>

      {/* Condition */}
      <div className="bg-muted/40 border-l-4 border-orange-500 rounded-md p-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <h3 className="font-semibold text-sm">Current Condition</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {patient.condition || "—"}
        </p>
      </div>

      {/* Blood + Allergies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-muted/40 rounded-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <Droplet className="w-4 h-4 text-red-500" />
            <h3 className="font-semibold text-sm">Blood Group</h3>
          </div>
          <p className="text-sm">{patient.bloodGroup || "—"}</p>
        </div>

        <div className="bg-muted/40 rounded-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-4 h-4 text-purple-500" />
            <h3 className="font-semibold text-sm">Allergies</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {patient.allergies.length
              ? patient.allergies.join(", ")
              : "None reported"}
          </p>
        </div>
      </div>

      {/* Medical History */}
      <div className="bg-muted/40 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Medical History</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          {patient.medicalHistory.length ? (
            patient.medicalHistory.map((item, i) => (
              <li key={i}>{item}</li>
            ))
          ) : (
            <li>No prior history recorded</li>
          )}
        </ul>
      </div>
    </div>
  );
}
