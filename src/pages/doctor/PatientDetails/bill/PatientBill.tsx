import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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

  const { data: patient, isLoading, isError } = useGetPatientByIdQuery(id!);
  let currentUser = useSelector((state: RootState) => state.app.doctorUser);
  const {
    data: doctor,
    isLoading: isLoadingDoctorDetails,
    isError: isErrorDoctorDetails,
    refetch,
  } = useGetDoctorDetailsQuery(String(currentUser.id));
  const { data: apiData } = useGetDoctorPatientsQuery(
    String(currentUser.id ?? null),
    { skip: currentUser.id == null }
  );

  currentUser = doctor;
  const reportUrl = `${window.location.origin}/bill/${patient?.id}`;

  const medicines: MedicineItem[] = [
    { id: 1, name: "Amoxicillin", dosage: "500mg",   quantity: 30, pricePerUnit: 12, total: 360 },
    { id: 2, name: "Paracetamol", dosage: "650mg",   quantity: 20, pricePerUnit: 3,  total: 60  },
    { id: 3, name: "Omeprazole",  dosage: "20mg",    quantity: 14, pricePerUnit: 8,  total: 112 },
    { id: 4, name: "Vitamin D3",  dosage: "2000 IU", quantity: 30, pricePerUnit: 15, total: 450 },
  ];

  const consultationFee = 500;
  const labTests = 1200;
  const subtotal =
    medicines.reduce((sum, med) => sum + med.total, 0) + consultationFee + labTests;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const billDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const billNumber = `BILL-${patient?.id}-${Date.now().toString().slice(-6)}`;

  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  const handleDownload = async (format: "png" | "jpeg" | "pdf") => {
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
      pdf.save(`${billNumber}.pdf`);
    } else {
      const link = document.createElement("a");
      link.href = canvas.toDataURL(`image/${format}`);
      link.download = `${billNumber}.${format}`;
      link.click();
    }
  };

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
    billNumber,
    reportUrl,
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

            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 group-hover:border-slate-400 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span className="hidden sm:inline">Back to Patients</span>
            </button>

            {/* Bill identity */}
            <div className="hidden md:flex flex-col items-center leading-tight">
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Invoice</span>
              <span className="text-sm font-semibold text-slate-700 font-mono">{billNumber}</span>
            </div>

            {/* Action buttons */}
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
                  <Button
                    size="sm"
                    className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
                  >
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
              {
                label: "Patient",
                value: patient?.name ?? "—",
                sub: `ID #${patient?.id ?? "—"}`,
              },
              {
                label: "Doctor",
                value: currentUser?.username ?? "—",
                sub: currentUser?.hospital ?? "—",
              },
              {
                label: "Bill Date",
                value: billDate,
                sub: "Issued today",
              },
              {
                label: "Total Due",
                value: `₹${total.toFixed(2)}`,
                sub: "Incl. 5% tax",
                accent: true,
              },
            ].map(({ label, value, sub, accent }) => (
              <div
                key={label}
                className={`rounded-xl border px-4 py-3.5 ${
                  accent
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-white border-slate-200"
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

          {/* Bill card */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            {/* Card label strip */}
            <div className="flex items-center gap-2.5 px-6 py-3 bg-slate-50 border-b border-slate-200">
              <Receipt className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Bill Preview
              </span>
              <span className="ml-auto text-xs text-slate-400 font-mono">{billNumber}</span>
            </div>

            {/* BillPreview component */}
            <div id="bill-preview">
              <BillPreview {...billProps} />
            </div>
          </div>

          {/* Footer hint */}
          <p className="text-center text-xs text-slate-400 pb-4">
            Computer-generated document · Use the buttons above to print or export
          </p>
        </div>
      </div>
    </>
  );
}