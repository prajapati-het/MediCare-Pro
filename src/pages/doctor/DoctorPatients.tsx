import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Calendar, FileText, Eye, Filter, X, Receipt,
  ChevronLeft, ChevronRight, ArrowUpDown, MoreVertical, Pencil,
} from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { format, isWithinInterval, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useCreateBillMutation, useGetDoctorDetailsQuery, useGetDoctorPatientsQuery, useUpdatePatientMutation } from "@/redux/slices/api";
import { useToast } from "@/hooks/use-toast";
import { GenerateBillDialog } from "@/components/bill/GenerateBillDialog";
import { EditPatientDialog, EditPatientPayload } from "@/components/patient/EditPatientDialog";
import { BillPayload } from "../../components/bill/billTypes";
import { Patient } from "@/types/type";

type TagFilter = Patient["tag"] | "all";
type SortBy = "name" | "date" | "status" | "tag";

const TAG_COLORS: Record<string, string> = {
  "critical":  "bg-red-500/10 text-red-600 border-red-200",
  "follow-up": "bg-amber-500/10 text-amber-600 border-amber-200",
  "normal":    "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  "new":       "bg-blue-500/10 text-blue-600 border-blue-200",
  "chronic":   "bg-purple-500/10 text-purple-600 border-purple-200",
};

const STATUS_DOT: Record<string, string> = {
  "Critical":  "bg-red-500",
  "Follow-up": "bg-amber-500",
  "Recovered": "bg-emerald-500",
};

const TAG_OPTIONS: { value: TagFilter; label: string }[] = [
  { value: "all",       label: "All"       },
  { value: "critical",  label: "Critical"  },
  { value: "follow-up", label: "Follow-up" },
  { value: "normal",    label: "Normal"    },
  { value: "new",       label: "New"       },
  { value: "chronic",   label: "Chronic"   },
];

export default function DoctorPatients() {
  const navigate = useNavigate();
  const { toast } = useToast();
  let user = useSelector((state: RootState) => state.app.doctorUser);

  const [searchQuery,  setSearchQuery]  = useState("");
  const [selectedTag,  setSelectedTag]  = useState<TagFilter>("all");
  const [startDate,    setStartDate]    = useState<Date | undefined>();
  const [endDate,      setEndDate]      = useState<Date | undefined>();
  const [showFilters,  setShowFilters]  = useState(false);
  const [sortBy,       setSortBy]       = useState<SortBy>("name");
  const [currentPage,  setCurrentPage]  = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [editingPatientId, setEditingPatientId] = useState<string | number | null>(null);
  const [billingPatientId, setBillingPatientId] = useState<string | number | null>(null);

  const { data: doctor } = useGetDoctorDetailsQuery(String(user.id));
  user = doctor;
  const doctorId = user?.id?.toString();

  const { data: apiData, isLoading, isError } = useGetDoctorPatientsQuery(doctorId!, {
    skip: !doctorId,
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,         
  }); 

const [updatePatient] = useUpdatePatientMutation();
  const [createBill]    = useCreateBillMutation();

  const patients = useMemo<Patient[]>(() => apiData?.patients ?? [], [apiData]);

  const editingPatient = useMemo(() => patients.find((p) => p.id === editingPatientId) ?? null, [patients, editingPatientId]);
  const billingPatient = useMemo(() => patients.find((p) => p.id === billingPatientId) ?? null, [patients, billingPatientId]);

  const filteredAndSortedPatients = useMemo(() => {
    const filtered = patients.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.condition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag    = selectedTag === "all" || p.tag === selectedTag;
      const matchesDate   = (!startDate || !endDate || !p.lastVisit) ? true : isWithinInterval(parseISO(p.lastVisit), { start: startDate, end: endDate });
      return matchesSearch && matchesTag && matchesDate;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":   return a.name.localeCompare(b.name);
        case "date":   return parseISO(b.lastVisit).getTime() - parseISO(a.lastVisit).getTime();
        case "status": return a.status.localeCompare(b.status);
        case "tag":    return a.tag.localeCompare(b.tag);
        default:       return 0;
      }
    });
    return filtered;
  }, [patients, searchQuery, selectedTag, startDate, endDate, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPatients.slice(start, start + itemsPerPage);
  }, [filteredAndSortedPatients, currentPage, itemsPerPage]);

  const hasActiveFilters = selectedTag !== "all" || startDate || endDate;
  const clearFilters = () => { setSelectedTag("all"); setStartDate(undefined); setEndDate(undefined); setSearchQuery(""); };

  const handleSavePatient = async (id: string | number, data: EditPatientPayload) => {
    try {
      const cleaned = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== "" && v != null));
      await updatePatient({ id: String(id), body: cleaned }).unwrap();
      toast({ title: "Saved", description: "Patient updated successfully." });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err?.data?.message || "Failed to update patient" });
    }
  };

  const handleSaveBill = async (patientId: string | number, data: BillPayload) => {
    try {
      await createBill({
        doctorId: user.id, doctorCode: user.doctorCode, patientId, ...data,
      }).unwrap();
      toast({ title: "Bill Saved", description: "Bill generated / updated successfully" });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err?.data?.message || "Failed to save bill" });
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen text-sm text-muted-foreground">Loading patients…</div>;
  if (isError)   return <div className="flex items-center justify-center h-screen text-sm text-destructive">Failed to load patients.</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { staggerChildren: 0.04 } }} className="max-w-screen-2xl mx-auto">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">My Patients</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filteredAndSortedPatients.length} patient{filteredAndSortedPatients.length !== 1 ? "s" : ""} found
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total Patients", count: patients.length,                                      dot: "bg-primary",     num: "text-primary"      },
                { label: "Active Cases",   count: patients.filter((p) => p.status === "Active").length,  dot: "bg-emerald-500", num: "text-emerald-600"  },
                { label: "Critical",       count: patients.filter((p) => p.tag === "critical").length,   dot: "bg-red-500",     num: "text-red-600"      },
                { label: "Follow-up",      count: patients.filter((p) => p.tag === "follow-up").length,  dot: "bg-amber-500",   num: "text-amber-600"    },
              ].map((s) => (
                <motion.div key={s.label} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Card className="border shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                        <p className={cn("text-2xl font-bold", s.num)}>{s.count}</p>
                      </div>
                      <div className={cn("w-2.5 h-2.5 rounded-full", s.dot)} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Search + Filters */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-5 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by name or condition…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9 text-sm" />
                </div>
                <div className="flex gap-2 shrink-0">
                  <Select value={sortBy} onValueChange={(v: SortBy) => setSortBy(v)}>
                    <SelectTrigger className="h-9 text-sm w-[140px]">
                      <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="date">Last Visit</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="tag">Tag</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}
                    className={cn("h-9 gap-1.5 text-sm", hasActiveFilters && "border-primary text-primary bg-primary/5")}>
                    <Filter className="w-3.5 h-3.5" /> Filter
                    {hasActiveFilters && <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">!</span>}
                  </Button>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 gap-1 text-sm text-muted-foreground">
                      <X className="w-3.5 h-3.5" /> Clear
                    </Button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <Card className="border shadow-sm">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {TAG_OPTIONS.map((tag) => (
                            <button key={tag.value} onClick={() => setSelectedTag(tag.value)}
                              className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all",
                                selectedTag === tag.value ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-muted/50 text-muted-foreground border-border hover:bg-muted")}>
                              {tag.label}
                            </button>
                          ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          {[{ label: "From", date: startDate, set: setStartDate }, { label: "To", date: endDate, set: setEndDate }].map(({ label, date, set }) => (
                            <div key={label} className="flex-1">
                              <p className="text-xs text-muted-foreground mb-1">{label}</p>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="sm" className="w-full justify-start h-9 text-sm font-normal">
                                    <Calendar className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                                    {date ? format(date, "dd MMM yyyy") : "Select date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent mode="single" selected={date} onSelect={set} className="pointer-events-auto" />
                                </PopoverContent>
                              </Popover>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Patient Grid */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              {paginatedPatients.length === 0 ? (
                <div className="text-center py-20">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-foreground">No patients found</p>
                  <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {paginatedPatients.map((patient, index) => {
                    const initials = patient.name.split(" ").map((n: string) => n[0]).join("");
                    return (
                      <motion.div key={patient.id}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03, type: "spring", stiffness: 300 }}
                        whileHover={{ y: -3, transition: { type: "spring", stiffness: 400 } }}>
                        <Card className="group overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                          <CardContent className="p-0">
                            <div className="h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            <div className="p-4">
                              {/* Avatar + name + menu */}
                              <div className="flex items-start gap-2.5 mb-3">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-semibold text-sm shadow shrink-0">
                                  {initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-sm text-foreground truncate leading-tight">{patient.name}</h3>
                                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                                    {[patient.age && `${patient.age} yrs`, patient.gender].filter(Boolean).join(" · ")}
                                  </p>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon"
                                      className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity -mt-0.5"
                                      onClick={(e) => e.stopPropagation()}>
                                      <MoreVertical className="w-3.5 h-3.5" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-44" sideOffset={4}>
                                    <DropdownMenuItem className="gap-2 text-xs cursor-pointer" onClick={() => setEditingPatientId(patient.id)}>
                                      <Pencil className="w-3 h-3" /> Edit Patient Info
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="gap-2 text-xs cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50" onClick={() => setBillingPatientId(patient.id)}>
                                      <Receipt className="w-3 h-3" /> Generate / Edit Bill
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="flex items-center gap-1.5 mb-2">
                                <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", STATUS_DOT[patient.status] ?? "bg-blue-500")} />
                                <span className="text-[11px] text-muted-foreground truncate flex-1">{patient.condition || "—"}</span>
                              </div>

                              <div className="mb-3">
                                <span className={cn("inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full border", TAG_COLORS[patient.tag] ?? "bg-muted text-muted-foreground border-border")}>
                                  {patient.tag.charAt(0).toUpperCase() + patient.tag.slice(1)}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-3">
                                <Calendar className="w-3 h-3 shrink-0" />
                                <span className="truncate">{patient.lastVisit || "—"}</span>
                              </div>

                              <div className="flex gap-1.5">
                                <Button variant="outline" size="sm" className="flex-1 h-7 text-xs gap-1" onClick={() => navigate(`/doctor/patients/${patient.id}`)}>
                                  <Eye className="w-3 h-3" /> View
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => navigate(`/doctor/patients/${patient.id}/records`)}>
                                  <FileText className="w-3 h-3" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => navigate(`/doctor/${user.id}/patients/${patient.id}/bills`)}>
                                  <Receipt className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {filteredAndSortedPatients.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Rows per page</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
                    <SelectTrigger className="h-8 w-16 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>{[8, 12, 16, 24].map((n) => <SelectItem key={n} value={n.toString()} className="text-xs">{n}</SelectItem>)}</SelectContent>
                  </Select>
                  <span className="text-xs text-muted-foreground">· Page {currentPage} of {totalPages}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1))
                    .map((page, i, arr) => (
                      <div key={page} className="flex items-center">
                        {i > 0 && arr[i - 1] !== page - 1 && <span className="px-1 text-xs text-muted-foreground">…</span>}
                        <Button variant={currentPage === page ? "default" : "outline"} size="icon" className="h-8 w-8 text-xs" onClick={() => setCurrentPage(page)}>
                          {page}
                        </Button>
                      </div>
                    ))}
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>

      {editingPatient && (
        <EditPatientDialog patient={editingPatient} open={!!editingPatient} onClose={() => setEditingPatientId(null)} onSave={handleSavePatient} />
      )}
      {billingPatient && (
        <GenerateBillDialog patient={billingPatient} open={!!billingPatient} onClose={() => setBillingPatientId(null)} onSave={handleSaveBill} />
      )}
    </div>
  );
}