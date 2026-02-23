import { RootState } from "@/redux/store";
import { QRCodeCanvas } from "qrcode.react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Mail, Phone, MapPin, User, Stethoscope, Building2 } from "lucide-react";

export default function ReportHeader() {
  const { id } = useParams();
  const patient = useSelector((state: RootState) =>
    state.patients.list.find(p => p.id === Number(id))
  );
  const doctor = useSelector((state: RootState) => state.app.doctorUser);
  const reportUrl = `${window.location.origin}/reports/print/${patient?.id}`;

  return (
    <header className="border-b-2 border-blue-600 pb-4 mb-6">
      {/* Top Row - Hospital & QR */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{doctor.hospital}</h1>
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
          <p className="text-xs text-gray-500 mt-1">Scan Record</p>
        </div>
      </div>

      {/* Doctor & Patient Info Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Doctor Card */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Stethoscope className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-900 uppercase">Doctor</span>
          </div>
          <p className="font-semibold text-gray-900 text-sm">{doctor?.username}</p>
          <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
            <Mail className="h-3 w-3" />
            {doctor?.email}
          </p>
        </div>

        {/* Patient Card */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-1.5 mb-1.5">
            <User className="h-4 w-4 text-gray-600" />
            <span className="text-xs font-semibold text-gray-900 uppercase">Patient</span>
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
              <p className="font-semibold text-gray-900">{patient?.age}/{patient?.gender}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}