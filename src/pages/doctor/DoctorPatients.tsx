import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Calendar,
  FileText,
  Eye,
  Filter,
  X,
  Tag,
  Receipt,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getPatientsByDoctorId, Patient } from "@/data/patientsData";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { format, isWithinInterval, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

type TagFilter = Patient["tag"] | "all";
type SortBy = "name" | "date" | "status" | "tag";

export default function DoctorPatients() {
  const navigate = useNavigate();
  const user  = useSelector((state: RootState) => state.app.doctorUser);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagFilter>("all");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const patients = useMemo(() => {
    if (user?.id) {
      return getPatientsByDoctorId(user.id);
    }
    return [];
  }, [user?.id]);

  const filteredAndSortedPatients = useMemo(() => {
    const filtered = patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === "all" || patient.tag === selectedTag;

      let matchesDateRange = true;
      if (startDate && endDate) {
        const lastVisit = parseISO(patient.lastVisit);
        matchesDateRange = isWithinInterval(lastVisit, {
          start: startDate,
          end: endDate,
        });
      }

      return matchesSearch && matchesTag && matchesDateRange;
    });

    // Sort patients
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return parseISO(b.lastVisit).getTime() - parseISO(a.lastVisit).getTime();
        case "status":
          return a.status.localeCompare(b.status);
        case "tag":
          return a.tag.localeCompare(b.tag);
        default:
          return 0;
      }
    });

    return filtered;
  }, [patients, searchQuery, selectedTag, startDate, endDate, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedPatients.slice(start, end);
  }, [filteredAndSortedPatients, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "destructive";
      case "Follow-up":
        return "secondary";
      case "Recovered":
        return "default";
      default:
        return "default";
    }
  };

  const getTagColor = (tag: Patient["tag"]) => {
    switch (tag) {
      case "critical":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "follow-up":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "normal":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "new":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "chronic":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const tags: { value: TagFilter; label: string }[] = [
    { value: "all", label: "All Patients" },
    { value: "critical", label: "Critical" },
    { value: "follow-up", label: "Follow-up" },
    { value: "normal", label: "Normal" },
    { value: "new", label: "New" },
    { value: "chronic", label: "Chronic" },
  ];

  const clearFilters = () => {
    setSelectedTag("all");
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedTag !== "all" || startDate || endDate;

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
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                My Patients
              </h1>
              <p className="text-muted-foreground">
                Showing {paginatedPatients.length} of {filteredAndSortedPatients.length} patients
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {patients.length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Patients
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-l-4 border-l-emerald-500">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-emerald-500/10">
                        <Users className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {patients.filter((p) => p.status === "Active").length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Active Cases
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-destructive/10">
                        <Users className="w-6 h-6 text-destructive" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {patients.filter((p) => p.tag === "critical").length}
                        </p>
                        <p className="text-sm text-muted-foreground">Critical</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-l-4 border-l-amber-500">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-amber-500/10">
                        <Users className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {patients.filter((p) => p.tag === "follow-up").length}
                        </p>
                        <p className="text-sm text-muted-foreground">Follow-up</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Search and Filters */}
            <motion.div variants={itemVariants} className="mb-6 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients by name or condition..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
                    <SelectTrigger className="w-[180px]">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="date">Last Visit</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="tag">Tag</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                      "gap-2",
                      hasActiveFilters && "border-primary text-primary"
                    )}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge
                        variant="secondary"
                        className="ml-1 h-5 w-5 p-0 flex items-center justify-center"
                      >
                        !
                      </Badge>
                    )}
                  </Button>

                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      className="gap-2"
                    >
                      <X className="w-4 h-4" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              {/* Filter Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            Filter by Tag
                          </label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag) => (
                              <motion.button
                                key={tag.value}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedTag(tag.value)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                                  selectedTag === tag.value
                                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                                    : tag.value === "all"
                                    ? "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                                    : getTagColor(tag.value as Patient["tag"])
                                )}
                              >
                                {tag.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Start Date
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal mt-2"
                                >
                                  {startDate
                                    ? format(startDate, "PPP")
                                    : "Select start date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <CalendarComponent
                                  mode="single"
                                  selected={startDate}
                                  onSelect={setStartDate}
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="flex-1">
                            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              End Date
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal mt-2"
                                >
                                  {endDate
                                    ? format(endDate, "PPP")
                                    : "Select end date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <CalendarComponent
                                  mode="single"
                                  selected={endDate}
                                  onSelect={setEndDate}
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Patients Grid/List */}
            <motion.div variants={itemVariants}>
              {paginatedPatients.length === 0 ? (
                <div className="text-center py-16">
                  <Users className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No patients found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search term
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedPatients.map((patient, index) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 300,
                      }}
                      whileHover={{
                        y: -8,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                    >
                        <Card className="overflow-hidden h-full border-t-4 border-t-transparent hover:border-t-primary transition-all duration-300 shadow-sm hover:shadow-xl">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center text-primary-foreground font-semibold text-lg shadow-lg"
                                  whileHover={{ scale: 1.15, rotate: 10 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  {patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </motion.div>
                                <div>
                                  <h3 className="font-semibold text-foreground text-lg">
                                    {patient.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {patient.age} years • {patient.gender}
                                  </p>
                                </div>
                              </div>
                              <Badge variant={getStatusColor(patient.status)}>
                                {patient.status}
                              </Badge>
                            </div>

                            <div className="mb-4">
                              <motion.span
                                whileHover={{ scale: 1.05 }}
                                className={cn(
                                  "inline-flex px-3 py-1 rounded-full text-xs font-medium border",
                                  getTagColor(patient.tag)
                                )}
                              >
                                {patient.tag.charAt(0).toUpperCase() +
                                  patient.tag.slice(1)}
                              </motion.span>
                            </div>

                            <div className="space-y-3 mb-4">
                              <p className="text-sm font-medium text-foreground">
                                {patient.condition}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Last visit: {patient.lastVisit}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full gap-1"
                                  onClick={() =>
                                    navigate(`/doctor/patients/${patient.id}`)
                                  }
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() =>
                                    navigate(`/doctor/patients/${patient.id}/records`)
                                  }
                                >
                                  <FileText className="w-4 h-4" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() =>
                                    navigate(
                                      `/doctor/${user.id}/patients/${patient.id}/bill`
                                    )
                                  }
                                >
                                  <Receipt className="w-4 h-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {filteredAndSortedPatients.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">per page</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        return (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        );
                      })
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2 text-muted-foreground">...</span>
                          )}
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="icon"
                              onClick={() => setCurrentPage(page)}
                              className="w-10 h-10"
                            >
                              {page}
                            </Button>
                          </motion.div>
                        </div>
                      ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}