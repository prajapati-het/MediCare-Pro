import { CreditCard, StickyNote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormSection } from "@/components/shared/FormSection";
import { BillPayload } from "./billTypes";
import { FormField } from "../shared/Formfield";

interface BillPaymentSectionProps {
  status: BillPayload["status"];
  paymentMethod: BillPayload["paymentMethod"];
  notes: string;
  onStatusChange: (v: BillPayload["status"]) => void;
  onPaymentMethodChange: (v: BillPayload["paymentMethod"]) => void;
  onNotesChange: (v: string) => void;
}

export function BillPaymentSection({
  status, paymentMethod, notes,
  onStatusChange, onPaymentMethodChange, onNotesChange,
}: BillPaymentSectionProps) {
  return (
    <>
      <FormSection icon={<CreditCard className="w-3.5 h-3.5" />} title="Payment & Status" accent="purple">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Status">
            <Select value={status} onValueChange={(v) => onStatusChange(v as BillPayload["status"])}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Pending", "Paid", "Cancelled"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Payment Method">
            <Select value={paymentMethod} onValueChange={(v) => onPaymentMethodChange(v as BillPayload["paymentMethod"])}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Cash", "Card", "UPI", "Online"].map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormSection>

      <FormSection icon={<StickyNote className="w-3.5 h-3.5" />} title="Notes" accent="slate">
        <Textarea className="text-sm resize-none min-h-[72px]" value={notes}
          onChange={(e) => onNotesChange(e.target.value)} placeholder="Any billing notes…" />
      </FormSection>
    </>
  );
}