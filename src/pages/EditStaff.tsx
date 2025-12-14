import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, Briefcase, Building2, Save } from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStaff } from "@/contexts/StaffContext";
import { useHospitals } from "@/contexts/HospitalsContext";
import { useToast } from "@/hooks/use-toast";

const statuses = ["on-duty", "off-duty", "on-leave"];

export default function EditStaff() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { staffMembers, getStaffById, updateStaff } = useStaff();
  const { hospitals } = useHospitals();
  const { toast } = useToast();

  const staff = id ? getStaffById(Number(id)) : undefined;

  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [hospital, setHospital] = useState("");
  const [status, setStatus] = useState(statuses[0]);

  useEffect(() => {
    if (staff) {
      setPhone(staff.phone);
      setDepartment(staff.department);
      setHospital(staff.hospital);
      setStatus(staff.status);
    }
  }, [staff]);

  const handleSave = () => {
    if (!staff) return;
    updateStaff(staff.id, { phone, department, hospital, status: status as any });
    toast({
      title: "Staff updated",
      description: `${staff.name} has been updated.`,
    });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <p className="text-sm text-muted-foreground">Edit staff</p>
                <h1 className="text-2xl font-semibold text-foreground">{staff?.name || "Staff not found"}</h1>
              </div>
            </div>

            {staff ? (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Department</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input value={department} onChange={(e) => setDepartment(e.target.value)} className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hospital</Label>
                    <Select value={hospital} onValueChange={setHospital}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map((hosp) => (
                          <SelectItem key={hosp.id} value={hosp.name}>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              <span>{hosp.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => (
                          <SelectItem key={s} value={s}>
                            <span className="capitalize">{s.replace("-", " ")}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-muted-foreground">No staff member found with this id.</CardContent>
              </Card>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

