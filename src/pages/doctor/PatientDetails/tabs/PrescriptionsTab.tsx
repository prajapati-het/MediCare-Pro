// PrescriptionsTab.tsx
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPatientByIdQuery } from "@/redux/slices/api";

export default function PrescriptionsTab() {
  const { id } = useParams();

  const { data: patient, isLoading, isError } = useGetPatientByIdQuery(id);

  if (!patient || patient.prescriptions.length === 0) {
    return <p className="text-muted-foreground">No prescriptions found.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      {patient.prescriptions.map((p, idx) => (
        <Card key={idx}>
          <CardContent className="p-5 space-y-2">
            <p className="font-semibold text-lg">{p.medication}</p>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>Dosage: {p.dosage}</p>
              <p>Frequency: {p.frequency}</p>
              <p>
                Duration: {p.startDate} → {p.endDate}
              </p>
              <p>Prescribed by: {p.prescribedBy}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
