// pages/AddProblem.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertTriangle,
  User,
  FileText,
  Tag,
  Building2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { AddProblemPayload } from "@/types/type";
import { useAddProblemMutation } from "@/redux/slices/api";

const problemSchema = z.object({
  hospitalId: z.string().min(1, "Hospital is required"),
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  department: z.string().min(1, "Department is required"),
  priority: z.enum(["Critical", "High", "Medium", "Low"], {
    errorMap: () => ({ message: "Priority is required" }),
  }),
  status: z.enum(["Open", "In Progress", "Resolved", "Closed"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  reportedBy: z.string().min(2, "Reporter name is required"),
  assignedTo: z.string().min(2, "Assignee is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
  category: z.enum(
    ["Equipment", "Staffing", "Supply", "Infrastructure", "Patient Care", "Other"],
    { errorMap: () => ({ message: "Category is required" }) }
  ),
});

type ProblemFormData = z.infer<typeof problemSchema>;

const priorities = ["Critical", "High", "Medium", "Low"] as const;
const statuses = ["Open", "In Progress", "Resolved", "Closed"] as const;
const categories = [
  "Equipment",
  "Staffing",
  "Supply",
  "Infrastructure",
  "Patient Care",
  "Other",
] as const;
const departments = [
  "ICU", "Emergency", "Laboratory", "Pharmacy", "Radiology",
  "Administration", "Cardiology", "Neurology", "Pediatrics", "Oncology",
];
const hospitals = [
  { id: 'city-general', name: 'City General Hospital' },
  { id: 'metro-health', name: 'Metro Health Center' },
  { id: 'sunrise-medical', name: 'Sunrise Medical Complex' },
  { id: 'valley-regional', name: 'Valley Regional Hospital' },
  { id: 'coastal-care', name: 'Coastal Care Medical' },
];

const priorityColors: Record<string, string> = {
  Critical: "text-red-500",
  High: "text-orange-500",
  Medium: "text-yellow-500",
  Low: "text-green-500",
};

export default function AddProblem() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProblemFormData, string>>>({});
  const [addProblem] = useAddProblemMutation();

  const [formData, setFormData] = useState<ProblemFormData>({
    hospitalId: "",
    title: "",
    department: "",
    priority: "Medium",
    status: "Open",
    reportedBy: "",
    assignedTo: "",
    description: "",
    category: "Other",
  });

  const handleChange = (field: keyof ProblemFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = problemSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ProblemFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ProblemFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      await addProblem(formData as AddProblemPayload).unwrap();
      toast({ title: "Success", description: "Problem reported successfully" });
      navigate("/problems");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err?.data?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin/problems")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Report Problem
                </h1>
                <p className="text-muted-foreground">
                  Log a new problem or issue to the system
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Problem Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      Problem Details
                    </CardTitle>
                    <CardDescription>
                      Title, category and classification
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hospitalId">Hospital *</Label>
                      <Select
                        value={formData.hospitalId}
                        onValueChange={(v) => handleChange("hospitalId", v)}
                      >
                        <SelectTrigger
                          className={errors.hospitalId ? "border-destructive" : ""}
                        >
                          <SelectValue placeholder="Select hospital" />
                        </SelectTrigger>
                        <SelectContent>
                          {hospitals.map((h) => (
                            <SelectItem key={h.id} value={h.id}>
                              {h.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.hospitalId && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.hospitalId}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="title">Problem Title *</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleChange("title", e.target.value)}
                          placeholder="e.g. MRI Machine Malfunction"
                          className={`pl-10 ${errors.title ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.title && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) => handleChange("category", v)}
                      >
                        <SelectTrigger
                          className={errors.category ? "border-destructive" : ""}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="department">Department *</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(v) => handleChange("department", v)}
                      >
                        <SelectTrigger
                          className={errors.department ? "border-destructive" : ""}
                        >
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.department && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.department}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                        placeholder="Describe the problem in detail..."
                        className={`min-h-[120px] resize-none ${
                          errors.description ? "border-destructive" : ""
                        }`}
                      />
                      {errors.description && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Priority, Status & Assignment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-primary" />
                      Priority & Assignment
                    </CardTitle>
                    <CardDescription>
                      Urgency level, status and responsible parties
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="priority">Priority *</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(v) => handleChange("priority", v)}
                      >
                        <SelectTrigger
                          className={errors.priority ? "border-destructive" : ""}
                        >
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((p) => (
                            <SelectItem key={p} value={p}>
                              <span className={priorityColors[p]}>{p}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.priority && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.priority}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="status">Status *</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(v) => handleChange("status", v)}
                      >
                        <SelectTrigger
                          className={errors.status ? "border-destructive" : ""}
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.status && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.status}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="reportedBy">Reported By *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="reportedBy"
                          value={formData.reportedBy}
                          onChange={(e) =>
                            handleChange("reportedBy", e.target.value)
                          }
                          placeholder="Dr. James Carter"
                          className={`pl-10 ${
                            errors.reportedBy ? "border-destructive" : ""
                          }`}
                        />
                      </div>
                      {errors.reportedBy && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.reportedBy}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="assignedTo">Assigned To *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="assignedTo"
                          value={formData.assignedTo}
                          onChange={(e) =>
                            handleChange("assignedTo", e.target.value)
                          }
                          placeholder="Maintenance Team / Staff Name"
                          className={`pl-10 ${
                            errors.assignedTo ? "border-destructive" : ""
                          }`}
                        />
                      </div>
                      {errors.assignedTo && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.assignedTo}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/problems")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Report Problem
                </Button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}