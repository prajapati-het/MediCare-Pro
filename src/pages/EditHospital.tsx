import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, MapPin, Globe, Phone, BadgeCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHospitals } from "@/contexts/HospitalsContext";
import { useToast } from "@/hooks/use-toast";

export default function EditHospital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hospitals, updateHospital, getHospitalById } = useHospitals();
  const { toast } = useToast();

  const hospital = id ? getHospitalById(id) : undefined;

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "maintenance">("active");
  const [accreditation, setAccreditation] = useState("");

  useEffect(() => {
    if (hospital) {
      setName(hospital.name);
      setLocation(hospital.location);
      setPhone(hospital.phone);
      setWebsite(hospital.website);
      setDescription(hospital.description);
      setStatus(hospital.status);
      setAccreditation(hospital.accreditation);
    }
  }, [hospital]);

  const handleSave = () => {
    if (!hospital) return;
    updateHospital(hospital.id, {
      name,
      location,
      phone,
      website,
      description,
      status,
      accreditation,
    });
    toast({
      title: "Hospital updated",
      description: `${name} details have been refreshed.`,
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
                <p className="text-sm text-muted-foreground">Edit hospital</p>
                <h1 className="text-2xl font-semibold text-foreground">{hospital?.name || "Hospital not found"}</h1>
              </div>
            </div>

            {hospital ? (
              <Card>
                <CardHeader>
                  <CardTitle>Hospital Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input value={location} onChange={(e) => setLocation(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input value={website} onChange={(e) => setWebsite(e.target.value)} className="pl-10" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={status} onValueChange={(value) => setStatus(value as "active" | "maintenance")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Accreditation</Label>
                      <div className="relative">
                        <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input value={accreditation} onChange={(e) => setAccreditation(e.target.value)} className="pl-10" />
                      </div>
                    </div>
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
                <CardContent className="p-6 text-muted-foreground">No hospital found with this id.</CardContent>
              </Card>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

