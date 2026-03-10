import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Patient } from "@/types/type";
import { BillPayload, emptyMedicine } from "./billTypes";
import { MedicinesTable } from "./MedicinesTable";
import { BillFeesSection } from "./BillFeesSection";
import { BillPaymentSection } from "./BillPaymentSection";


interface GenerateBillDialogProps {
  patient: Patient;
  open: boolean;
  onClose: () => void;
  onSave: (patientId: string | number, data: BillPayload) => Promise<void>;
}

export function GenerateBillDialog({ patient, open, onClose, onSave }: GenerateBillDialogProps) {
  const initials = patient.name.split(" ").map((n: string) => n[0]).join("");

  const [medicines, setMedicines] = useState([emptyMedicine()]);
  const [consultationFee, setConsultationFee] = useState(0);
  const [labTestsFee, setLabTestsFee] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0);
  const [status, setStatus] = useState<BillPayload["status"]>("Pending");
  const [paymentMethod, setPaymentMethod] = useState<BillPayload["paymentMethod"]>("Cash");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const medicinesTotal = medicines.reduce((s, m) => s + (m.total || 0), 0);
  const subtotal = medicinesTotal + consultationFee + labTestsFee;
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + taxAmount;

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave(patient.id, { medicines, consultationFee, labTestsFee, subtotal, tax: taxAmount, total, status, paymentMethod, notes });
    setIsSaving(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0 overflow-hidden rounded-2xl">

        {/* Green banner */}
        <div className="bg-gradient-to-r from-emerald-600/90 to-emerald-500 px-6 pt-5 pb-4 shrink-0">
          <DialogHeader className="space-y-0 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-base shadow shrink-0">
                {initials}
              </div>
              <div>
                <DialogTitle className="text-white text-base font-bold leading-tight">
                  Generate / Edit Bill
                </DialogTitle>
                <p className="text-white/65 text-xs mt-0.5">
                  {patient.name} · {[patient.age && `${patient.age} yrs`, patient.gender].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable body */}
        <div className="h-[52vh] overflow-y-auto px-6 py-5 bg-background space-y-6">
          <MedicinesTable medicines={medicines} onChange={setMedicines} />
          <BillFeesSection
            consultationFee={consultationFee}
            labTestsFee={labTestsFee}
            taxPercent={taxPercent}
            medicinesTotal={medicinesTotal}
            onConsultationChange={setConsultationFee}
            onLabTestsChange={setLabTestsFee}
            onTaxPercentChange={setTaxPercent}
          />
          <BillPaymentSection
            status={status}
            paymentMethod={paymentMethod}
            notes={notes}
            onStatusChange={setStatus}
            onPaymentMethodChange={setPaymentMethod}
            onNotesChange={setNotes}
          />
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 border-t border-border px-6 py-3.5 flex items-center justify-between gap-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">
            Total: <span className="font-semibold text-foreground">₹{total.toFixed(2)}</span>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isSaving} className="h-8 px-4">
              Cancel
            </Button>
            <Button size="sm" onClick={handleSubmit} disabled={isSaving}
              className="h-8 px-4 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white">
              {isSaving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Save Bill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}