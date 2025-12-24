import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Patient } from "@/data/patientsData";

interface PrintPreviewModalProps {
  open: boolean;
  onClose: () => void;
  patient: Patient;
}

const sections = ["Vitals", "Body", "Medical", "Labs", "Prescriptions", "History"];

export default function PrintPreviewModal({ open, onClose, patient }: PrintPreviewModalProps) {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedSections([]);
      setShowPreview(false);
    }
  }, [open]);

  const toggleSection = (section: string) => {
    setSelectedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const toggleAll = () => {
    if (selectedSections.length === sections.length) setSelectedSections([]);
    else setSelectedSections([...sections]);
  };

  const proceedToPreview = () => {
    if (selectedSections.length === 0) return alert("Please select at least one section!");
    setShowPreview(true);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-6xl p-6">
        <DialogHeader className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl font-semibold">
            {showPreview ? "Print Preview" : "Select Sections to Print"}
          </DialogTitle>
          {!showPreview && (
            <Button variant="outline" onClick={toggleAll}>
              {selectedSections.length === sections.length ? "Unselect All" : "Select All"}
            </Button>
          )}
        </DialogHeader>

        {!showPreview ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {sections.map(section => (
              <div
                key={section}
                className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-primary/10 transition"
                onClick={() => toggleSection(section)}
              >
                <Checkbox
                  checked={selectedSections.includes(section)}
                  onCheckedChange={() => toggleSection(section)}
                />
                <Label>{section}</Label>
              </div>
            ))}
            <Button className="col-span-full mt-4" onClick={proceedToPreview} variant="glass">
              Proceed to Preview
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[75vh] overflow-auto border rounded p-4 bg-white">
              <div className="print-container w-full">
                {/* Hospital Header */}
                <header className="text-center border-b pb-4 mb-6">
                  <h1 className="text-2xl font-bold">City General Hospital</h1>
                  <p>123 Main Street, Nadiad, Gujarat | +91 12345 67890</p>
                  <p className="mt-2 text-sm">
                    Patient: <strong>{patient.name}</strong> | Age: {patient.age} | Gender: {patient.gender} | ID: {patient.id}
                  </p>
                  <p className="text-sm">Doctor ID: {patient.doctorId}</p>
                </header>

                {selectedSections.includes("Vitals") && (
                  <section className="mb-6">
                    <h2 className="font-semibold mb-2 border-b pb-1">Vitals</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      {Object.entries(patient.vitals).map(([key, value]) => (
                        <div key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</div>
                      ))}
                    </div>
                  </section>
                )}

                {selectedSections.includes("Body") && (
                  <section className="mb-6">
                    <h2 className="font-semibold mb-2 border-b pb-1">Body Characteristics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      {Object.entries(patient.bodyCharacteristics).map(([key, value]) => (
                        <div key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</div>
                      ))}
                    </div>
                  </section>
                )}

                {selectedSections.includes("Medical") && (
                  <section className="mb-6">
                    <h2 className="font-semibold mb-2 border-b pb-1">Medical</h2>
                    <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
                    <p><strong>Notes:</strong> {patient.notes}</p>
                    <p><strong>Allergies:</strong> {patient.allergies.length ? patient.allergies.join(", ") : "No known allergies"}</p>
                  </section>
                )}

                {selectedSections.includes("Labs") && (
                  <section className="mb-6">
                    <h2 className="font-semibold mb-2 border-b pb-1">Lab Results</h2>
                    <div className="space-y-2 text-sm">
                      {patient.labResults.map((lab, idx) => (
                        <div key={idx} className="flex justify-between border-b pb-1">
                          <span><strong>{lab.testName}:</strong> {lab.value}</span>
                          <span className={`text-xs ${lab.status !== "Normal" ? "text-red-600" : "text-muted-foreground"}`}>
                            Normal: {lab.normalRange} | Status: {lab.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {selectedSections.includes("Prescriptions") && (
                  <section className="mb-6">
                    <h2 className="font-semibold mb-2 border-b pb-1">Prescriptions</h2>
                    <div className="space-y-2 text-sm">
                      {patient.prescriptions.map((rx, idx) => (
                        <div key={idx} className="border-b pb-1">
                          <div><strong>{rx.medication}</strong> - {rx.dosage} • {rx.frequency}</div>
                          <div className="text-xs text-muted-foreground">{rx.startDate} → {rx.endDate} | Prescribed by: {rx.prescribedBy}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {selectedSections.includes("History") && (
                  <section className="mb-6">
                    <h2 className="font-semibold mb-2 border-b pb-1">Visit History</h2>
                    <div className="flex flex-col gap-4">
                      {patient.visitHistory.map((visit, idx) => (
                        <div key={idx} className="relative pl-6 border-l-2 border-primary">
                          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                          <p className="font-semibold">{visit.reason} ({visit.date})</p>
                          <p>Diagnosis: {visit.diagnosis}</p>
                          <p>Treatment: {visit.treatment}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Footer */}
                <footer className="mt-6 border-t pt-4 text-sm flex justify-between">
                  <div>Doctor Signature: ____________________</div>
                  <div>Print Date: {new Date().toLocaleDateString()}</div>
                </footer>
              </div>
            </ScrollArea>

            {/* Print / Share Buttons */}
            <div className="flex justify-end gap-2 mt-4 no-print">
              <Button variant="default" onClick={() => window.print()}>Print</Button>
              <Button variant="secondary">Share</Button>
            </div>
          </>
        )}
      </DialogContent>

      <style jsx global>{`
        @media print {
          .no-print { display: none; }
          .print-container {
            padding: 1in;
            margin: 0;
            width: 100%;
            font-size: 12pt;
            font-family: "Times New Roman", serif;
          }
          .page-break-inside-avoid { page-break-inside: avoid; }
          header, footer { text-align: center; }
        }
      `}</style>
    </Dialog>
  );
}
