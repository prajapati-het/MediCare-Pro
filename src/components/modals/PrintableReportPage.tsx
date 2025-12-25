import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PrintableReport from "@/components/modals/PrintableReport";

export default function PrintReportPage() {

  const sections = [
    "Vitals",
    "Body",
    "Medical",
    "Labs",
    "Prescriptions",
    "History",
  ];

  return (
    <PrintableReport
      selectedSections={sections}
    />
  );
}
