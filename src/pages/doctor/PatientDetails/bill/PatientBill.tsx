import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Receipt,
  Download,
  Printer,
  ArrowLeft,
  FileImage,
  FileType,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  useCreateBillMutation,
  useGetBillsByPatientQuery,
  useGetDoctorDetailsQuery,
  useGetDoctorPatientsQuery,
  useGetPatientByIdQuery,
} from "@/redux/slices/api";
import BillPreview from "./BillPreview";

interface MedicineItem {
  id: number;
  name: string;
  dosage: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export default function PatientBill() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ── Pick up billId passed from PatientBillsTimeline via navigate state ──
  const location = useLocation();
  const selectedBillId: string | undefined = location.state?.billId;

  const [billNumber, setBillNumber] = useState<string>("");
  const [createBill] = useCreateBillMutation();

  const { data: patient, isLoading, isError } = useGetPatientByIdQuery(id!);
  let currentUser = useSelector((state: RootState) => state.app.doctorUser);

  const { data: doctor } = useGetDoctorDetailsQuery(String(currentUser.id));

  const { data: apiData } = useGetDoctorPatientsQuery(
    String(currentUser.id ?? null),
    { skip: currentUser.id == null }
  );

  currentUser = doctor;

  const { data: billData, refetch: refetchBill } = useGetBillsByPatientQuery(
    Number(patient?.id),
    { skip: !patient?.id }
  );

  // ── If a specific billId was passed (from timeline), find that bill.
  //    Otherwise fall back to the latest (first) bill. ──
  const bill = selectedBillId
    ? (billData?.find((b: any) => b._id === selectedBillId) ?? billData?.[0])
    : billData?.[0];

  const saveBill = async () => {
  if (!patient || !currentUser) return;

  const res = await createBill({
    doctorId: currentUser._id,
    doctorCode: currentUser.doctorCode,
    patientId: patient.id,
    medicines,
    consultationFee,
    labTestsFee: labTests,
    subtotal,
    tax,
    total,
  }).unwrap();

  setBillNumber(res.data.billNumber);
  await refetchBill();   // ← add this
};

  const reportUrl = `${window.location.origin}/bill/${patient?.id}`;

  const medicines: MedicineItem[] = bill?.medicines ?? [];
  const consultationFee = bill?.consultationFee ?? 0;
  const labTests = bill?.labTestsFee ?? 0;
  const subtotal = bill?.subtotal ?? 0;
  const tax = bill?.tax ?? 0;
  const total = bill?.total ?? 0;
  const currentBillNumber = bill?.billNumber ?? billNumber;

  const billDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = async () => {
    await saveBill();
    setTimeout(() => window.print(), 200);
  };

  const handleDownload = async (format: "png" | "jpeg" | "pdf") => {
    if (!currentBillNumber) {
      await saveBill();
    }
    const element = document.getElementById("bill-preview");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });

    if (format === "pdf") {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${currentBillNumber}.pdf`);
    } else {
      const link = document.createElement("a");
      link.href = canvas.toDataURL(`image/${format}`);
      link.download = `${currentBillNumber}.${format}`;
      link.click();
    }
  };

  const status        = bill?.status        ?? "Pending";
  const paymentMethod = bill?.paymentMethod ?? "Cash";
  const notes         = bill?.notes;
  const taxPercent    = bill?.subtotal > 0
    ? Math.round((bill.tax / bill.subtotal) * 100)
    : 0;

  const billProps = {
    patient,
    currentUser,
    medicines,
    consultationFee,
    labTests,
    subtotal,
    tax,
    total,
    billDate,
    currentBillNumber,
    reportUrl,
    status,           // ← new
    paymentMethod,    // ← new
    notes,            // ← new
    taxPercent,       // ← new
  };

  return (
    <>
      {/* Print-only layout */}
      <div className="hidden print:block">
        <BillPreview {...billProps} />
      </div>

      {/* Screen layout */}
      <div className="min-h-screen bg-slate-50 print:hidden">

        {/* ── Sticky top bar ── */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

            {/* Back — returns to timeline (or wherever came from) */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 group-hover:border-slate-400 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Bill identity */}
            <div className="hidden md:flex flex-col items-center leading-tight">
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                Invoice
              </span>
              <span className="text-sm font-semibold text-slate-700 font-mono">
                {currentBillNumber}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handlePrint}
                variant="outline"
                size="sm"
                className="gap-1.5 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                    <ChevronDown className="h-3 w-3 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuLabel className="text-xs text-slate-400 font-normal pb-1">
                    Export as
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDownload("pdf")} className="gap-2.5 cursor-pointer">
                    <FileText className="h-4 w-4 text-red-500" />
                    PDF Document
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload("png")} className="gap-2.5 cursor-pointer">
                    <FileImage className="h-4 w-4 text-blue-500" />
                    PNG Image
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload("jpeg")} className="gap-2.5 cursor-pointer">
                    <FileType className="h-4 w-4 text-amber-500" />
                    JPEG Image
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* ── Page body ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Patient",   value: patient?.name ?? "—",       sub: `ID #${patient?.id ?? "—"}` },
              { label: "Doctor",    value: currentUser?.username ?? "—", sub: currentUser?.hospital ?? "—" },
              { label: "Bill Date", value: billDate,                    sub: "Issued today" },
              { label: "Total Due", value: `₹${total.toFixed(2)}`,      sub: "Incl. tax", accent: true },
            ].map(({ label, value, sub, accent }) => (
              <div
                key={label}
                className={`rounded-xl border px-4 py-3.5 ${
                  accent ? "bg-blue-600 border-blue-500 text-white" : "bg-white border-slate-200"
                }`}
              >
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${accent ? "text-blue-200" : "text-slate-400"}`}>
                  {label}
                </p>
                <p className={`text-sm font-bold truncate ${accent ? "text-white" : "text-slate-800"}`}>
                  {value}
                </p>
                <p className={`text-xs mt-0.5 truncate ${accent ? "text-blue-200" : "text-slate-400"}`}>
                  {sub}
                </p>
              </div>
            ))}
          </div>

          {/* Bill preview card */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <div className="flex items-center gap-2.5 px-6 py-3 bg-slate-50 border-b border-slate-200">
              <Receipt className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Bill Preview
              </span>
              <span className="ml-auto text-xs text-slate-400 font-mono">{currentBillNumber}</span>
            </div>

            <div id="bill-preview">
              <BillPreview {...billProps} />
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 pb-4">
            Computer-generated document · Use the buttons above to print or export
          </p>
        </div>
      </div>
    </>
  );
}