import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Patient } from "@/data/patientsData";

interface PrintPreviewModalProps {
  open: boolean;
  onClose: () => void;
  patient: Patient;
  selectedSections: string[];
}

export default function PrintPreviewModal({
  open,
  onClose,
  patient,
  selectedSections,
}: PrintPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-5xl p-6">
        <DialogHeader className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl font-semibold">Print Preview</DialogTitle>
          <div className="flex gap-2">
            <Button variant="default" onClick={() => window.print()}>
              Print
            </Button>
            <Button variant="secondary">Share</Button>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[75vh] overflow-auto border rounded p-4 space-y-4 bg-white">
          {selectedSections.includes("Vitals") && (
            <section className="p-4 border rounded shadow-sm bg-gray-50">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">Vitals</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div><strong>Blood Pressure:</strong> {patient.vitals.bloodPressure}</div>
                <div><strong>Heart Rate:</strong> {patient.vitals.heartRate}</div>
                <div><strong>Temperature:</strong> {patient.vitals.temperature}</div>
                <div><strong>Weight:</strong> {patient.vitals.weight}</div>
                <div><strong>Height:</strong> {patient.vitals.height}</div>
                <div><strong>BMI:</strong> {patient.vitals.bmi}</div>
                <div><strong>O2 Saturation:</strong> {patient.vitals.oxygenSaturation}</div>
                <div><strong>Respiratory Rate:</strong> {patient.vitals.respiratoryRate}</div>
              </div>
            </section>
          )}

          {selectedSections.includes("Body") && (
            <section className="p-4 border rounded shadow-sm bg-gray-50">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">Body Characteristics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {Object.entries(patient.bodyCharacteristics).map(([key, value]) => (
                  <div key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</div>
                ))}
              </div>
            </section>
          )}

          {selectedSections.includes("Medical") && (
            <section className="p-4 border rounded shadow-sm bg-gray-50">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">Medical</h3>
              <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
              <p><strong>Notes:</strong> {patient.notes}</p>
              <p><strong>Allergies:</strong> {patient.allergies.length ? patient.allergies.join(", ") : "No known allergies"}</p>
            </section>
          )}

          {selectedSections.includes("Labs") && (
            <section className="p-4 border rounded shadow-sm bg-gray-50">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">Lab Results</h3>
              {patient.labResults.map((lab, index) => (
                <div key={index} className="flex flex-col mb-1 text-sm border-b last:border-0 pb-1">
                  <span><strong>{lab.testName}:</strong> {lab.value}</span>
                  <span className="text-muted-foreground text-xs">Normal: {lab.normalRange} | Status: {lab.status}</span>
                  <span className="text-muted-foreground text-xs">Date: {lab.date}</span>
                </div>
              ))}
            </section>
          )}

          {selectedSections.includes("Prescriptions") && (
            <section className="p-4 border rounded shadow-sm bg-gray-50">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">Prescriptions</h3>
              {patient.prescriptions.map((rx, index) => (
                <div key={index} className="mb-2 text-sm border-b last:border-0 pb-1">
                  <div><strong>{rx.medication}</strong> - {rx.dosage} • {rx.frequency}</div>
                  <div className="text-xs text-muted-foreground">{rx.startDate} to {rx.endDate} | Prescribed by: {rx.prescribedBy}</div>
                </div>
              ))}
            </section>
          )}

          {selectedSections.includes("History") && (
            <section className="p-4 border rounded shadow-sm bg-gray-50">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">Visit History</h3>
              {patient.visitHistory.map((visit, index) => (
                <div key={index} className="mb-2 text-sm border-b last:border-0 pb-1">
                  <div><strong>{visit.reason}</strong> ({visit.date})</div>
                  <div>Diagnosis: {visit.diagnosis}</div>
                  <div>Treatment: {visit.treatment}</div>
                </div>
              ))}
            </section>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
