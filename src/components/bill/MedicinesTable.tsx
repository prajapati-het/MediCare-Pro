import { Plus, Trash2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSection } from "@/components/shared/FormSection";
import { Medicine, emptyMedicine } from "./billTypes";

interface MedicinesTableProps {
  medicines: Medicine[];
  onChange: (medicines: Medicine[]) => void;
}

export function MedicinesTable({ medicines, onChange }: MedicinesTableProps) {
  const updateMed = (i: number, field: keyof Medicine, val: string | number) => {
    const next = [...medicines];
    const m = { ...next[i], [field]: val };
    if (field === "quantity" || field === "pricePerUnit") {
      m.total = Number(m.quantity) * Number(m.pricePerUnit);
    }
    next[i] = m;
    onChange(next);
  };

  const addMed = () => onChange([...medicines, emptyMedicine()]);
  const removeMed = (i: number) => onChange(medicines.filter((_, idx) => idx !== i));

  return (
    <FormSection icon={<ClipboardList className="w-3.5 h-3.5" />} title="Medicines" accent="blue">
      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_80px_80px_80px_80px_28px] gap-2 px-1">
          {["Name", "Dosage", "Qty", "Price/Unit", "Total", ""].map((h) => (
            <span key={h} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {h}
            </span>
          ))}
        </div>

        {medicines.map((med, i) => (
          <div key={i} className="grid grid-cols-[1fr_80px_80px_80px_80px_28px] gap-2 items-center">
            <Input className="h-8 text-xs" placeholder="Paracetamol" value={med.name}
              onChange={(e) => updateMed(i, "name", e.target.value)} />
            <Input className="h-8 text-xs" placeholder="500mg" value={med.dosage}
              onChange={(e) => updateMed(i, "dosage", e.target.value)} />
            <Input className="h-8 text-xs" type="number" min={1} value={med.quantity}
              onChange={(e) => updateMed(i, "quantity", Number(e.target.value))} />
            <Input className="h-8 text-xs" type="number" min={0} value={med.pricePerUnit}
              onChange={(e) => updateMed(i, "pricePerUnit", Number(e.target.value))} />
            <div className="h-8 flex items-center text-xs font-medium text-foreground px-2 bg-muted/50 rounded-md border">
              ₹{med.total.toFixed(2)}
            </div>
            <Button variant="ghost" size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => removeMed(i)}
              disabled={medicines.length === 1}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}

        <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 mt-1" onClick={addMed}>
          <Plus className="w-3 h-3" /> Add Medicine
        </Button>
      </div>
    </FormSection>
  );
}