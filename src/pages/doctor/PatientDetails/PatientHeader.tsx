import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientHeader({ patient, onBack, onPrint }: any) {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <div>
        <p className="text-sm text-muted-foreground">Patient record</p>
        <h1 className="text-2xl font-semibold">{patient.name}</h1>
      </div>

      <Button className="ml-auto" onClick={onPrint}>
        Print Preview
      </Button>
    </div>
  );
}
