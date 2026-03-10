import { BadgeDollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormSection } from "@/components/shared/FormSection";
import { FormField } from "../shared/Formfield";

interface BillFeesSectionProps {
  consultationFee: number;
  labTestsFee: number;
  taxPercent: number;
  medicinesTotal: number;
  onConsultationChange: (v: number) => void;
  onLabTestsChange: (v: number) => void;
  onTaxPercentChange: (v: number) => void;
}

export function BillFeesSection({
  consultationFee, labTestsFee, taxPercent, medicinesTotal,
  onConsultationChange, onLabTestsChange, onTaxPercentChange,
}: BillFeesSectionProps) {
  const subtotal = medicinesTotal + consultationFee + labTestsFee;
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + taxAmount;

  return (
    <FormSection icon={<BadgeDollarSign className="w-3.5 h-3.5" />} title="Fees" accent="teal">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Consultation Fee (₹)">
          <Input className="h-9 text-sm" type="number" min={0} value={consultationFee}
            onChange={(e) => onConsultationChange(Number(e.target.value))} />
        </FormField>
        <FormField label="Lab Tests Fee (₹)">
          <Input className="h-9 text-sm" type="number" min={0} value={labTestsFee}
            onChange={(e) => onLabTestsChange(Number(e.target.value))} />
        </FormField>
        <FormField label="Tax (%)">
          <Input className="h-9 text-sm" type="number" min={0} max={100} value={taxPercent}
            onChange={(e) => onTaxPercentChange(Number(e.target.value))} />
        </FormField>
      </div>

      {/* Summary */}
      <div className="mt-3 rounded-lg border bg-muted/30 px-4 py-3 space-y-1.5">
        {[
          ["Medicines",            medicinesTotal],
          ["Consultation",         consultationFee],
          ["Lab Tests",            labTestsFee],
          [`Tax (${taxPercent}%)`, taxAmount],
        ].map(([label, val]) => (
          <div key={String(label)} className="flex justify-between text-muted-foreground text-xs">
            <span>{label}</span><span>₹{Number(val).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-1.5 flex justify-between font-semibold text-foreground text-sm">
          <span>Total</span><span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </FormSection>
  );
}