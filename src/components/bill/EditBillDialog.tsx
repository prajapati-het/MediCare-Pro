import { useState } from "react";
import { ClipboardList, BadgeDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bill, BillPayload, emptyMedicine } from "./billTypes";
import { BillFeesSection } from "./BillFeesSection";
import { MedicinesTable } from "./MedicinesTable";
import { BillPaymentSection } from "./BillPaymentSection";


interface EditBillDialogProps {
  bill: Bill;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: BillPayload) => Promise<void>;
}

export function EditBillDialog({
  bill, patientName, patientAge, patientGender, open, onClose, onSave,
}: EditBillDialogProps) {
  const initials = patientName.split(" ").map((n) => n[0]).join("").slice(0, 2);

  const [medicines, setMedicines] = useState(
    bill.medicines.length > 0 ? bill.medicines.map((m) => ({ ...m })) : [emptyMedicine()]
  );
  const [consultationFee, setConsultationFee] = useState(bill.consultationFee);
  const [labTestsFee, setLabTestsFee] = useState(bill.labTestsFee);
  const initTaxPercent = bill.subtotal > 0 ? Math.round((bill.tax / bill.subtotal) * 100) : 0;
  const [taxPercent, setTaxPercent] = useState(initTaxPercent);
  const [status, setStatus] = useState<BillPayload["status"]>(bill.status);
  const [paymentMethod, setPaymentMethod] = useState<BillPayload["paymentMethod"]>(bill.paymentMethod);
  const [notes, setNotes] = useState(bill.notes ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const medicinesTotal = medicines.reduce((s, m) => s + (m.total || 0), 0);
  const subtotal = medicinesTotal + consultationFee + labTestsFee;
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + taxAmount;

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave({ _id: bill._id, medicines, consultationFee, labTestsFee, subtotal, tax: taxAmount, total, status, paymentMethod, notes });
    setIsSaving(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0 overflow-hidden rounded-2xl">

        {/* Amber banner */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 px-6 pt-5 pb-4 shrink-0">
          <DialogHeader className="space-y-0 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-base shadow shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-white text-base font-bold leading-tight">Edit Bill</DialogTitle>
                <p className="text-white/70 text-xs mt-0.5 truncate">
                  {patientName}
                  {[patientAge && `${patientAge} yrs`, patientGender].filter(Boolean).length > 0 && (
                    <> · {[patientAge && `${patientAge} yrs`, patientGender].filter(Boolean).join(" · ")}</>
                  )}
                </p>
              </div>
              <span className="text-white/60 text-xs font-mono shrink-0">{bill.billNumber}</span>
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
              className="h-8 px-4 gap-1.5 bg-amber-500 hover:bg-amber-600 text-white">
              {isSaving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Update Bill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}