import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import VitalsTab from "./VitalsTab";
import BodyTab from "./BodyTab";
import MedicalTab from "./MedicalTab";
import LabsTab from "./LabsTab";
import PrescriptionsTab from "./PrescriptionsTab";
import HistoryTab from "./HistoryTab";
import type { Patient } from "@/data/patientsData";

export default function PatientTabs({ patient }) {
  return (
    <Tabs defaultValue="vitals">
      <TabsList className="grid grid-cols-2 md:grid-cols-6">
        <TabsTrigger value="vitals">Vitals</TabsTrigger>
        <TabsTrigger value="body">Body</TabsTrigger>
        <TabsTrigger value="medical">Medical</TabsTrigger>
        <TabsTrigger value="labs">Labs</TabsTrigger>
        <TabsTrigger value="prescriptions">Rx</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="vitals"><VitalsTab /></TabsContent>
      <TabsContent value="body"><BodyTab /></TabsContent>
      <TabsContent value="medical"><MedicalTab/></TabsContent>
      <TabsContent value="labs"><LabsTab /></TabsContent>
      <TabsContent value="prescriptions"><PrescriptionsTab /></TabsContent>
      <TabsContent value="history"><HistoryTab /></TabsContent>
    </Tabs>
  );
}
