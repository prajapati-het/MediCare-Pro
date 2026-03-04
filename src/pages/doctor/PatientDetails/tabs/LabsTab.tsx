// LabsTab.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RootState } from "@/redux/store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPatientByIdQuery } from "@/redux/slices/api";

export default function LabsTab() {
  const { id } = useParams();

  const { data: patient, isLoading, isError } = useGetPatientByIdQuery(id);

  if (!patient || patient.labResults.length === 0) {
    return <p className="text-muted-foreground">No lab reports available.</p>;
  }

  return (
    <div className="space-y-4 mt-4">
      {patient.labResults.map((lab, idx) => (
        <Card key={idx}>
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="font-semibold">{lab.testName}</p>
              <p className="text-sm text-muted-foreground">
                {lab.date} • Normal Range: {lab.normalRange}
              </p>
              <p className="mt-1 text-sm">Result: {lab.value}</p>
            </div>

            <Badge
              className={
                lab.status === "Critical"
                  ? "bg-red-500"
                  : lab.status === "Abnormal"
                  ? "bg-orange-500"
                  : "bg-green-500"
              }
            >
              {lab.status}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
