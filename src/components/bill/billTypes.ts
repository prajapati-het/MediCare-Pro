export interface Medicine {
  name: string;
  dosage: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export interface Bill {
  _id: string;
  billNumber: string;
  medicines: Medicine[];
  consultationFee: number;
  labTestsFee: number;
  subtotal: number;
  tax: number;
  total: number;
  status: "Paid" | "Pending" | "Cancelled";
  paymentMethod: "Cash" | "Card" | "UPI" | "Online";
  notes?: string;
  createdAt: string;
}

export interface BillPayload {
  _id?: string;
  medicines: Medicine[];
  consultationFee: number;
  labTestsFee: number;
  subtotal: number;
  tax: number;
  total: number;
  status: "Pending" | "Paid" | "Cancelled";
  paymentMethod: "Cash" | "Card" | "UPI" | "Online";
  notes?: string;
}

export function statusConfig(status: Bill["status"]) {
  switch (status) {
    case "Paid":
      return {
        icon: "CheckCircle2" as const,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
        strip: "from-emerald-400 to-emerald-500",
      };
    case "Pending":
      return {
        icon: "Clock" as const,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        dot: "bg-amber-400",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        strip: "from-amber-400 to-amber-500",
      };
    case "Cancelled":
      return {
        icon: "XCircle" as const,
        color: "text-red-500",
        bg: "bg-red-50",
        border: "border-red-200",
        dot: "bg-red-400",
        badge: "bg-red-100 text-red-600 border-red-200",
        strip: "from-red-400 to-red-500",
      };
  }
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export const emptyMedicine = (): Medicine => ({
  name: "", dosage: "", quantity: 1, pricePerUnit: 0, total: 0,
});