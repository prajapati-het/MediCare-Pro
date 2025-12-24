import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import PatientHeader from "./PatientHeader";
import PatientHeroCard from "./PatientHeroCard";
import PatientTabs from "./tabs/PatientTabs";
import PrintPreviewModal from "@/components/modals/PrintPreviewModal";
import { selectPatientById } from "@/selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
import { patientsData } from "@/data/patientsData";
import { setPatients } from "@/redux/slices/patientsSlice";

export default function PatientDetail() {

  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(setPatients(patientsData));
}, [dispatch]);

  const navigate = useNavigate();
  const { id } = useParams();

  const patient = useSelector(selectPatientById(Number(id)));
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <PatientHeader
              patient={patient}
              onBack={() => navigate(-1)}
              onPrint={() => {
                setSelectedSections([
                  "Vitals",
                  "Body",
                  "Medical",
                  "Labs",
                  "Prescriptions",
                  "History",
                ]);
                setShowPreviewModal(true);
              }}
            />

            <PatientHeroCard />

            <PatientTabs patient={patient} />
          </div>
        </main>
      </div>

      <PrintPreviewModal
        open={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        patient={patient}
        selectedSections={selectedSections}
      />
    </div>
  );
}
