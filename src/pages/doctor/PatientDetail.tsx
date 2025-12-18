import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  Heart,
  Activity,
  Pill,
  FileText,
  AlertCircle,
  Thermometer,
  Scale,
  Ruler,
  Droplet,
  Wind,
  Clock,
  Shield,
  Users,
  Stethoscope,
  TestTube,
  History,
  Cigarette,
  Wine,
  Dumbbell,
  Utensils,
  Moon
} from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getPatientById } from "@/data/patientsData";
import { cn } from "@/lib/utils";

export default function PatientDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const patient = useMemo(() => getPatientById(Number(id)), [id]);

  const getStatusVariant = (status: string) => {
    if (status === "Critical") return "destructive";
    if (status === "Follow-up") return "secondary";
    if (status === "Recovered") return "default";
    return "default";
  };

  const getLabStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'text-emerald-500 bg-emerald-500/10';
      case 'Abnormal': return 'text-amber-500 bg-amber-500/10';
      case 'Critical': return 'text-red-500 bg-red-500/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!patient) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <DashboardSidebar />
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground">Patient not found</h2>
              <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto space-y-6"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <p className="text-sm text-muted-foreground">Patient record</p>
                <h1 className="text-2xl font-semibold text-foreground">{patient.name}</h1>
              </div>
            </motion.div>

            {/* Patient Hero Card */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <motion.div 
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-lg"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </motion.div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
                        <Badge variant={getStatusVariant(patient.status)} className="capitalize">
                          {patient.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {patient.tag}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {patient.age} years • {patient.gender}
                        </span>
                        <span className="flex items-center gap-1">
                          <Droplet className="w-4 h-4" />
                          {patient.bloodGroup}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {patient.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {patient.email}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{patient.address}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Current Condition</p>
                      <p className="font-semibold text-foreground">{patient.condition}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Last Visit</p>
                      <p className="font-semibold text-foreground">{patient.lastVisit}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Next Appointment</p>
                      <p className="font-semibold text-foreground">{patient.nextAppointment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tabs Section */}
            <motion.div variants={itemVariants}>
              <Tabs defaultValue="vitals" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
                  <TabsTrigger value="vitals" className="gap-1">
                    <Activity className="w-4 h-4" />
                    Vitals
                  </TabsTrigger>
                  <TabsTrigger value="body" className="gap-1">
                    <User className="w-4 h-4" />
                    Body
                  </TabsTrigger>
                  <TabsTrigger value="medical" className="gap-1">
                    <Stethoscope className="w-4 h-4" />
                    Medical
                  </TabsTrigger>
                  <TabsTrigger value="labs" className="gap-1">
                    <TestTube className="w-4 h-4" />
                    Labs
                  </TabsTrigger>
                  <TabsTrigger value="prescriptions" className="gap-1">
                    <Pill className="w-4 h-4" />
                    Rx
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-1">
                    <History className="w-4 h-4" />
                    History
                  </TabsTrigger>
                </TabsList>

                {/* Vitals Tab */}
                <TabsContent value="vitals" className="mt-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {[
                      { icon: Heart, label: "Blood Pressure", value: patient.vitals.bloodPressure, color: "text-red-500" },
                      { icon: Activity, label: "Heart Rate", value: patient.vitals.heartRate, color: "text-pink-500" },
                      { icon: Thermometer, label: "Temperature", value: patient.vitals.temperature, color: "text-orange-500" },
                      { icon: Scale, label: "Weight", value: patient.vitals.weight, color: "text-blue-500" },
                      { icon: Ruler, label: "Height", value: patient.vitals.height, color: "text-emerald-500" },
                      { icon: Activity, label: "BMI", value: patient.vitals.bmi, color: "text-purple-500" },
                      { icon: Wind, label: "O2 Saturation", value: patient.vitals.oxygenSaturation, color: "text-cyan-500" },
                      { icon: Wind, label: "Respiratory Rate", value: patient.vitals.respiratoryRate, color: "text-teal-500" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <Card>
                          <CardContent className="p-4 text-center">
                            <item.icon className={cn("w-8 h-8 mx-auto mb-2", item.color)} />
                            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                            <p className="font-semibold text-foreground">{item.value}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                {/* Body Characteristics Tab */}
                <TabsContent value="body" className="mt-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5 text-primary" />
                          Physical Characteristics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {Object.entries(patient.bodyCharacteristics).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                            <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-medium text-foreground">{value}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-primary" />
                          Lifestyle
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { icon: Cigarette, label: "Smoking", value: patient.lifestyle.smokingStatus },
                          { icon: Wine, label: "Alcohol", value: patient.lifestyle.alcoholConsumption },
                          { icon: Dumbbell, label: "Exercise", value: patient.lifestyle.exerciseFrequency },
                          { icon: Utensils, label: "Diet", value: patient.lifestyle.dietType },
                          { icon: Moon, label: "Sleep", value: patient.lifestyle.sleepHours },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <item.icon className="w-4 h-4" />
                              {item.label}
                            </span>
                            <span className="font-medium text-foreground text-right text-sm">{item.value}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Medical Tab */}
                <TabsContent value="medical" className="mt-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Stethoscope className="w-5 h-5 text-primary" />
                          Diagnosis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground">{patient.diagnosis}</p>
                        <Separator className="my-4" />
                        <p className="text-sm text-muted-foreground">{patient.notes}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-destructive" />
                          Allergies
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {patient.allergies.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {patient.allergies.map((allergy, i) => (
                              <Badge key={i} variant="destructive">{allergy}</Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No known allergies</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          Medical History
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {patient.medicalHistory.map((history, i) => (
                            <li key={i} className="flex items-start gap-2 text-foreground">
                              <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                              {history}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          Insurance & Emergency
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Insurance Provider</p>
                          <p className="font-medium text-foreground">{patient.insuranceProvider}</p>
                          <p className="text-sm text-muted-foreground">{patient.insuranceNumber}</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Emergency Contact
                          </p>
                          <p className="font-medium text-foreground">{patient.emergencyContact.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {patient.emergencyContact.relation} • {patient.emergencyContact.phone}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Labs Tab */}
                <TabsContent value="labs" className="mt-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TestTube className="w-5 h-5 text-primary" />
                          Lab Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {patient.labResults.map((lab, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{lab.testName}</p>
                                <p className="text-sm text-muted-foreground">Normal: {lab.normalRange}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-foreground">{lab.value}</p>
                                <Badge className={cn("mt-1", getLabStatusColor(lab.status))}>
                                  {lab.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground ml-4">{lab.date}</p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Prescriptions Tab */}
                <TabsContent value="prescriptions" className="mt-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Pill className="w-5 h-5 text-primary" />
                          Current Prescriptions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {patient.prescriptions.map((rx, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-foreground">{rx.medication}</h4>
                                  <p className="text-sm text-muted-foreground">{rx.dosage} • {rx.frequency}</p>
                                </div>
                                <Badge variant="outline">Active</Badge>
                              </div>
                              <Separator className="my-3" />
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {rx.startDate} - {rx.endDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {rx.prescribedBy}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Visit History Tab */}
                <TabsContent value="history" className="mt-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <History className="w-5 h-5 text-primary" />
                          Visit History
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                          <div className="space-y-6">
                            {patient.visitHistory.map((visit, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-10"
                              >
                                <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                                <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">{visit.reason}</span>
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {visit.date}
                                    </span>
                                  </div>
                                  <p className="text-sm text-foreground mb-1">
                                    <span className="text-muted-foreground">Diagnosis:</span> {visit.diagnosis}
                                  </p>
                                  <p className="text-sm text-foreground">
                                    <span className="text-muted-foreground">Treatment:</span> {visit.treatment}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
