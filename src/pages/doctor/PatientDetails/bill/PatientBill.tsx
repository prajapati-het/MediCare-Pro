import { RootState } from "@/redux/store";
import { QRCodeCanvas } from "qrcode.react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Activity,
  Mail,
  Phone,
  MapPin,
  User,
  Stethoscope,
  Calendar,
  Receipt,
  Download,
  Printer,
  ArrowLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MedicineItem {
  id: number;
  name: string;
  dosage: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

// Bill Preview Component
function BillPreview({
  patient,
  doctor,
  medicines,
  consultationFee,
  labTests,
  subtotal,
  tax,
  total,
  billDate,
  billNumber,
  reportUrl,
}: any) {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="border-b-2 border-blue-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <Activity className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                City General Hospital
              </h1>
              <div className="flex items-center gap-3 text-xs text-gray-600 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Nadiad, Gujarat
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  +91 12345 67890
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <QRCodeCanvas value={reportUrl} size={60} level="H" />
            <p className="text-xs text-gray-500 mt-1">Scan Bill</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Stethoscope className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-blue-900 uppercase">
                Doctor
              </span>
            </div>
            <p className="font-semibold text-gray-900 text-sm">
              {doctor?.username}
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
              <Mail className="h-3 w-3" />
              {doctor?.email}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-1.5 mb-1.5">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-900 uppercase">
                Patient
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-gray-500">ID</p>
                <p className="font-semibold text-gray-900">#{patient?.id}</p>
              </div>
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-semibold text-gray-900">{patient?.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Age/Gender</p>
                <p className="font-semibold text-gray-900">
                  {patient?.age}/{patient?.gender}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bill Details */}
      <div className="p-6">
        {/* Bill Info */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
            </div>
            <p className="text-sm text-gray-600">
              Bill Number: <span className="font-semibold">{billNumber}</span>
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Date: {billDate}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Time:{" "}
              {new Date().toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Services Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Services & Consultation
          </h3>
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">
                  Description
                </th>
                <th className="text-right p-3 font-semibold text-gray-700">
                  Amount (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 text-gray-800">Doctor Consultation Fee</td>
                <td className="p-3 text-right text-gray-800">
                  {consultationFee.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-gray-800">Laboratory Tests</td>
                <td className="p-3 text-right text-gray-800">
                  {labTests.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Medicines Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Prescribed Medicines
          </h3>
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">
                  Medicine Name
                </th>
                <th className="text-center p-3 font-semibold text-gray-700">
                  Dosage
                </th>
                <th className="text-center p-3 font-semibold text-gray-700">
                  Qty
                </th>
                <th className="text-right p-3 font-semibold text-gray-700">
                  Price/Unit (₹)
                </th>
                <th className="text-right p-3 font-semibold text-gray-700">
                  Total (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine: MedicineItem) => (
                <tr key={medicine.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-800">{medicine.name}</td>
                  <td className="p-3 text-center text-gray-600">
                    {medicine.dosage}
                  </td>
                  <td className="p-3 text-center text-gray-600">
                    {medicine.quantity}
                  </td>
                  <td className="p-3 text-right text-gray-600">
                    {medicine.pricePerUnit.toFixed(2)}
                  </td>
                  <td className="p-3 text-right font-semibold text-gray-800">
                    {medicine.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bill Summary */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (5%)</span>
              <span className="font-semibold text-gray-900">
                ₹{tax.toFixed(2)}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">
                Total Amount
              </span>
              <span className="text-2xl font-bold text-blue-600">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Payment Status:</span> Paid
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Payment Method:</span> Cash
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-300 p-6 text-center">
        <p className="text-sm text-gray-600 mb-1">
          Thank you for choosing City General Hospital
        </p>
        <p className="text-xs text-gray-500">
          For any queries, please contact us at info@cityhospital.com or +91
          12345 67890
        </p>
        <p className="text-xs text-gray-400 mt-2">
          This is a computer-generated bill and does not require a signature
        </p>
      </footer>
    </div>
  );
}

export default function PatientBill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  const patient = useSelector((state: RootState) =>
    state.patients.list.find((p) => p.id === Number(id))
  );
  const doctor = useSelector((state: RootState) => state.app.user);
  const reportUrl = `${window.location.origin}/bill/${patient?.id}`;

  // Sample medicines - replace with actual prescription data
  const medicines: MedicineItem[] = [
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      quantity: 30,
      pricePerUnit: 12,
      total: 360,
    },
    {
      id: 2,
      name: "Paracetamol",
      dosage: "650mg",
      quantity: 20,
      pricePerUnit: 3,
      total: 60,
    },
    {
      id: 3,
      name: "Omeprazole",
      dosage: "20mg",
      quantity: 14,
      pricePerUnit: 8,
      total: 112,
    },
    {
      id: 4,
      name: "Vitamin D3",
      dosage: "2000 IU",
      quantity: 30,
      pricePerUnit: 15,
      total: 450,
    },
  ];

  const consultationFee = 500;
  const labTests = 1200;
  const subtotal =
    medicines.reduce((sum, med) => sum + med.total, 0) +
    consultationFee +
    labTests;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const billDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const billNumber = `BILL-${patient?.id}-${Date.now().toString().slice(-6)}`;

  const handlePrint = () => {
    setShowPreview(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleDownload = async (format: "png" | "jpeg" | "pdf") => {
    const element = document.getElementById("bill-preview");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

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
    doctor,
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
      {/* Main Bill Page (for printing) */}
      <div className="hidden print:block">
        <BillPreview {...billProps} />
      </div>

      {/* Preview Page */}
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 print:hidden">
        <div className="max-w-4xl mx-auto">
          {/* Action Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Patients
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowPreview(true)}
                  variant="outline"
                  className="gap-2"
                >
                  <Receipt className="h-4 w-4" />
                  Preview
                </Button>
                <Button onClick={handlePrint} className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print Bill
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDownload("png")}>
                      PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload("jpeg")}>
                      JPEG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload("pdf")}>
                      PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Bill Preview Card */}
          <div
            id="bill-preview"
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <BillPreview {...billProps} />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-4 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Bill Preview
              </DialogTitle>
              <div className="flex gap-2">
                <Button onClick={handlePrint} size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="p-6 pt-0">
            <BillPreview {...billProps} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
