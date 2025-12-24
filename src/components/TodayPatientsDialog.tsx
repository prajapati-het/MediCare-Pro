import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Check, X, RotateCcw, Eye } from "lucide-react";
import RescheduleModal from "../components/modals/RescheduleModal";

import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
  isSameDay,
} from "date-fns";

import { Appointment } from "@/data/appointmentsData";
import { updateAppointment } from "@/redux/slices/appointmentsSlice";
import { selectAppointmentsWithPatientInfo } from "@/selectors/selectors";
import { RootState } from "@/redux/store";

type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled"
  | "No Show"
  | "Delayed";

interface TodayPatientsDialogProps {
  open: boolean;
  onClose: () => void;
  selectedDate: Date;
}

export function TodayPatientsDialog({
  open,
  onClose,
  selectedDate,
}: TodayPatientsDialogProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const doctorId = useSelector((state: RootState) => state.app.user?.id);
  const doctorEmail = useSelector((state: RootState) => state.app.user?.email);

  const appointments = useSelector(selectAppointmentsWithPatientInfo);

  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  /* ---------------- FILTERS FROM URL ---------------- */
  const monthFilter = searchParams.get("month") === "1";
  const weekFilter = searchParams.get("week") === "1";
  const searchName = searchParams.get("search") || "";
  const rangeFilter = useMemo(
    () => ({
      start: searchParams.get("start") || "",
      end: searchParams.get("end") || "",
    }),
    [searchParams]
  );

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) =>
      value ? params.set(key, value) : params.delete(key)
    );
    setSearchParams(params);
  };

  /* ---------------- STYLES ---------------- */
  const statusColors: Record<AppointmentStatus, string> = {
    Confirmed: "bg-emerald-500 text-white",
    Pending: "bg-amber-500 text-white",
    Completed: "bg-green-600 text-white",
    Cancelled: "bg-red-600 text-white",
    Delayed: "bg-orange-500 text-white",
    "No Show": "bg-gray-500 text-white",
  };

  const actionColors = {
    complete: "bg-green-500 text-white hover:bg-green-600",
    cancel: "bg-red-500 text-white hover:bg-red-600",
    followup: "bg-blue-500 text-white hover:bg-blue-600",
    view: "bg-slate-200 hover:bg-slate-300",
  };

  /* ---------------- FILTER LOGIC ---------------- */
  /* ---------------- FILTER LOGIC ---------------- */
const filteredAppointments = useMemo(() => {
  if (!selectedDate) return [];

  return appointments.filter((apt) => {
    const aptDate = parseISO(apt.date);

    if (apt.doctorId !== doctorId) return false;

    const applyMonthForTag = tagFilter.length > 0;
    const statusFilterActive =
      monthFilter || weekFilter || (rangeFilter.start && rangeFilter.end);

    // If only month filter is active (no other filters)
    const onlyMonthFilterActive =
      monthFilter &&
      !weekFilter &&
      !rangeFilter.start &&
      !searchName &&
      tagFilter.length === 0;

    if (onlyMonthFilterActive) {
      // Month range
      if (aptDate < startOfMonth(selectedDate) || aptDate > endOfMonth(selectedDate))
        return false;
      // Only Confirmed or Delayed
      if (!["Confirmed", "Delayed"].includes(apt.status)) return false;
      return true;
    }

    // Day filter if no other filters
    if (!statusFilterActive && !applyMonthForTag) {
      if (!isSameDay(aptDate, selectedDate)) return false;
      if (!["Confirmed", "Delayed"].includes(apt.status)) return false;
    }

    // Month filter
    if ((monthFilter || applyMonthForTag) &&
        (aptDate < startOfMonth(selectedDate) ||
         aptDate > endOfMonth(selectedDate)))
      return false;

    // Week filter
    if (weekFilter &&
        (aptDate < startOfWeek(selectedDate) ||
         aptDate > endOfWeek(selectedDate)))
      return false;

    // Range filter
    if (rangeFilter.start && rangeFilter.end) {
      if (
        !isWithinInterval(aptDate, {
          start: parseISO(rangeFilter.start),
          end: parseISO(rangeFilter.end),
        })
      )
        return false;
    }

    // Search filter
    if (
      searchName &&
      !apt.patientName.toLowerCase().includes(searchName.toLowerCase())
    )
      return false;

    // Tag filter (works on full month)
    if (tagFilter.length > 0 && !tagFilter.includes(apt.tag)) return false;

    return true;
  });
}, [
  appointments,
  doctorId,
  selectedDate,
  monthFilter,
  weekFilter,
  rangeFilter,
  searchName,
  tagFilter,
]);



  const getWeekOfMonth = (date: Date) => {
    const startWeek = startOfWeek(startOfMonth(date));
    const currentWeek = startOfWeek(date);
    return (
      Math.round(
        (currentWeek.getTime() - startWeek.getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      ) + 1
    );
  };

  const dialogTitle = useMemo(() => {
    if (monthFilter) {
      return `Patients for ${format(selectedDate, "MMMM yyyy")}`;
    }

    if (weekFilter) {
      const weekNumber = getWeekOfMonth(selectedDate);
      return `Patients for ${weekNumber}${
        ["th", "st", "nd", "rd"][weekNumber] || "th"
      } week of ${format(selectedDate, "MMMM yyyy")}`;
    }

    return `Patients for ${format(selectedDate, "EEEE, MMM d yyyy")}`;
  }, [monthFilter, weekFilter, selectedDate]);

  /* ---------------- UI ---------------- */
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) {
            setSearchParams({});
            onClose();
          }
        }}
      >
        <DialogContent
          className="w-[calc(100vw-280px)] max-w-none h-[90vh] ml-auto rounded-l-2xl p-0 overflow-hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <motion.div
            initial={{ x: 80, opacity: 0, scale: 0.98 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="h-full bg-background"
          >
            {/* HEADER */}
            <DialogHeader className="px-6 py-4 border-b">
              <DialogTitle className="text-xl font-semibold">
                {dialogTitle}
              </DialogTitle>

              {/* FILTERS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {/* Month */}
                <Button
                  size="sm"
                  variant={monthFilter ? "default" : "outline"}
                  onClick={() =>
                    updateParams({
                      month: monthFilter ? null : "1",
                      week: null,
                    })
                  }
                >
                  Month
                </Button>

                {/* Week */}
                <Button
                  size="sm"
                  variant={weekFilter ? "default" : "outline"}
                  onClick={() =>
                    updateParams({
                      week: weekFilter ? null : "1",
                      month: null,
                    })
                  }
                >
                  Week
                </Button>

                <input
                  type="date"
                  title="Select start date"
                  className="border rounded px-2 py-1 text-sm"
                  value={rangeFilter.start}
                  onChange={(e) =>
                    updateParams({ start: e.target.value || null })
                  }
                />

                <input
                  type="date"
                  title="Select end date"
                  className="border rounded px-2 py-1 text-sm"
                  value={rangeFilter.end}
                  onChange={(e) =>
                    updateParams({ end: e.target.value || null })
                  }
                />

                <input
                  type="text"
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="Search name"
                  value={searchName}
                  onChange={(e) =>
                    updateParams({ search: e.target.value || null })
                  }
                />
              </div>

              {/* TAG FILTER BUTTONS */}
              <div className="flex flex-wrap gap-2 mt-2">
                {["critical", "follow-up", "normal", "new", "chronic"].map(
                  (tag) => (
                    <Button
                      key={tag}
                      size="sm"
                      variant={tagFilter.includes(tag) ? "default" : "outline"}
                      onClick={() => {
                        const newFilter = [...tagFilter];
                        if (newFilter.includes(tag)) {
                          newFilter.splice(newFilter.indexOf(tag), 1);
                        } else {
                          newFilter.push(tag);
                        }
                        setTagFilter(newFilter);
                      }}
                    >
                      {tag}
                    </Button>
                  )
                )}
              </div>
            </DialogHeader>

            {/* TABLE */}
            <div className="p-4 overflow-auto h-[calc(90vh-130px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Problem</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Height</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                    <TableHead className="text-center">View</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredAppointments.map((apt) => (
                    <TableRow key={apt.id}>
                      <TableCell className="font-medium">
                        {apt.patientName}
                      </TableCell>

                      {/* Condition Column (tag) */}
                      <TableCell>
                        <Badge
                          className={`${
                            apt.tag === "critical"
                              ? "bg-red-500 text-white"
                              : apt.tag === "follow-up"
                              ? "bg-orange-500 text-white"
                              : apt.tag === "normal"
                              ? "bg-green-500 text-white"
                              : apt.tag === "new"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {apt.tag}
                        </Badge>
                      </TableCell>

                      {/* Problem Column */}
                      <TableCell>{apt.condition}</TableCell>

                      <TableCell>{apt.age}</TableCell>
                      <TableCell>{apt.height}</TableCell>
                      <TableCell>{apt.weight}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${apt.contact}`}
                          className="text-blue-600 hover:underline"
                        >
                          {apt.contact}
                        </a>
                      </TableCell>

                      <TableCell>
                        <a
                          href={`mailto:${apt.email}?from=${doctorEmail}`}
                          className="text-blue-600 hover:underline"
                        >
                          {apt.email}
                        </a>
                      </TableCell>

                      <TableCell>
                        <Badge className={statusColors[apt.status]}>
                          {apt.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="flex justify-center gap-1">
                        <Button
                          size="icon"
                          className={actionColors.complete}
                          onClick={() =>
                            dispatch(
                              updateAppointment({
                                id: apt.id,
                                changes: { status: "Completed" },
                              })
                            )
                          }
                        >
                          <Check className="w-4 h-4" />
                        </Button>

                        <Button
                          size="icon"
                          className={actionColors.cancel}
                          onClick={() =>
                            dispatch(
                              updateAppointment({
                                id: apt.id,
                                changes: { status: "Cancelled" },
                              })
                            )
                          }
                        >
                          <X className="w-4 h-4" />
                        </Button>

                        <Button
                          size="icon"
                          className={actionColors.followup}
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setShowRescheduleModal(true);
                          }}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </TableCell>

                      <TableCell className="text-center">
                        <Button
                          size="icon"
                          className={actionColors.view}
                          onClick={() =>
                            navigate(
                              `/doctor/patients/${
                                apt.patientId
                              }?fromCalendar=1&date=${selectedDate.toISOString()}`
                            )
                          }
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {selectedAppointment && (
        <RescheduleModal
          open={showRescheduleModal}
          appointment={selectedAppointment}
          onClose={() => setShowRescheduleModal(false)}
          allAppointments={appointments}
        />
      )}
    </>
  );
}
