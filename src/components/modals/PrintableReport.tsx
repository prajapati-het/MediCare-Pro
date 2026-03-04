// PrintableReport.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "react-router-dom";
import ReportHeader from "./ReportHeader";
import { useGetDoctorDetailsQuery, useGetPatientByIdQuery } from "@/redux/slices/api";
import "../../PrintableReport.css"

interface Props {
  selectedSections: string[];
}

export default function PrintableReport({ selectedSections }: Props) {
  const { id } = useParams();

  const { data: patient, isLoading, isError } = useGetPatientByIdQuery(id);

  const currUser = useSelector((state: RootState) => state.app.doctorUser);

  const { data: doctor, isLoading: isLoadingDoctorDetail, isError: isErrorDoctorDetail } = useGetDoctorDetailsQuery(String(currUser.id));

  console.log(patient)

  if (isLoading) return <div className="flex items-center justify-center h-screen text-sm text-muted-foreground">Loading patients…</div>;
  if (isError)   return <div className="flex items-center justify-center h-screen text-sm text-destructive">Failed to load patients.</div>;

  return (
    <div className="relative print-container bg-white rounded-lg border p-8 shadow-sm">
      
      {/* Watermark - sits behind all content */}
      <div
        className="print-watermark"
      >
        <span>{doctor?.hospital}</span>
      </div>

      {/* All report content sits above watermark */}
      <div>
        {/* Hospital Header */}
        <header className="relative border-b-2 border-gray-300 pb-6 mb-8 print:pb-4 print:mb-6">
          <ReportHeader />
        </header>

        {selectedSections.includes("Vitals") && (
          <section className="mb-8 page-break-inside-avoid">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
              Vital Signs
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(patient.vitals).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedSections.includes("Body") && (
          <section className="mb-8 page-break-inside-avoid">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
              Body Characteristics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(patient.bodyCharacteristics).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </span>
                  <span className="text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedSections.includes("Medical") && (
          <section className="mb-8 page-break-inside-avoid">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
              Medical Information
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Diagnosis</p>
                <p className="text-gray-900 font-semibold">{patient.diagnosis}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Clinical Notes</p>
                <p className="text-gray-900">{patient.notes}</p>
              </div>
              <div className={`p-4 rounded-lg ${patient.allergies.length ? "bg-red-50" : "bg-green-50"}`}>
                <p className="text-sm text-gray-600 mb-1">Allergies</p>
                <p className={`font-semibold ${patient.allergies.length ? "text-red-700" : "text-green-700"}`}>
                  {patient.allergies.length ? patient.allergies.join(", ") : "No known allergies"}
                </p>
              </div>
            </div>
          </section>
        )}

        {selectedSections.includes("Labs") && (
          <section className="mb-8 page-break-inside-avoid">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
              Laboratory Results
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold text-gray-700">Test Name</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Value</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Normal Range</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.labResults.map((lab, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="p-3 font-medium text-gray-900">{lab.testName}</td>
                      <td className="p-3 text-gray-900">{lab.value}</td>
                      <td className="p-3 text-gray-600">{lab.normalRange}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          lab.status === "Normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {lab.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {selectedSections.includes("Prescriptions") && (
          <section className="mb-8 page-break-inside-avoid">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
              Current Prescriptions
            </h2>
            <div className="space-y-3">
              {patient.prescriptions.map((rx, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{rx.medication}</p>
                      <p className="text-gray-600">{rx.dosage} • {rx.frequency}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2 pt-2 border-t border-gray-200">
                    <span>Duration: {rx.startDate} → {rx.endDate}</span>
                    <span>Prescribed by: Dr. {rx.prescribedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedSections.includes("History") && (
          <section className="mb-8 page-break-inside-avoid">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
              Visit History
            </h2>
            <div className="space-y-4">
              {patient.visitHistory.map((visit, idx) => (
                <div key={idx} className="relative pl-8 pb-4 border-l-2 border-primary last:border-0">
                  <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary border-4 border-white"></div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-gray-900">{visit.reason}</p>
                      <span className="text-sm text-gray-500">{visit.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Diagnosis:</span> {visit.diagnosis}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Treatment:</span> {visit.treatment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t-2 border-gray-300">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-600 mb-2">Authorized Signature</p>
              <div className="border-b-2 border-gray-400 w-48 mb-1"></div>
              <p className="text-xs text-gray-500">Doctor's Signature</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Report Generated</p>
              <p className="font-semibold text-gray-900">
                {new Date().toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <span className="page-number" />
        </footer>
      </div>
    </div>
  );
}