import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

import { Check, X, RotateCcw, Eye, ArrowLeft, SlidersHorizontal, MoreVertical } from "lucide-react";
import RescheduleModal from "./modals/RescheduleModal";

import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  parseISO,
} from "date-fns";

import { Appointment, AppointmentStatus } from "@/data/appointmentsData";
import { updateAppointment } from "@/redux/slices/appointmentsSlice";
import { selectAppointmentsWithPatientInfoByDoctor } from "@/selectors/selectors";
import { RootState } from "@/redux/store";
import { useGetAppointmentsWithPatientInfoQuery } from "@/redux/slices/api";
import { AppointmentWithPatientInfo } from "@/types/type";

export default function TodayPatientsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { doctorCode, doctorEmail } = useSelector(
  (state: RootState) => ({
    doctorCode: state.app.doctorCode,
    doctorEmail: state.app.doctorUser?.email,
  }),
  shallowEqual
);


  const { data: appointments = [], isLoading } =   useGetAppointmentsWithPatientInfoQuery(doctorCode);


  const [tagFilter, setTagFilter] = useState<string[]>([]);
const [statusFilter, setStatusFilter] = useState<AppointmentStatus[]>([]);
const [showRescheduleModal, setShowRescheduleModal] = useState(false);
const [selectedAppointment, setSelectedAppointment] =
  useState<AppointmentWithPatientInfo | null>(null);
const [showFilters, setShowFilters] = useState(false);
const [actionPopupId, setActionPopupId] = useState<string | null>(null);

const [effectiveDate, setEffectiveDate] = useState<Date | null>(null);

  useEffect(() => {
  const dateParam = searchParams.get("date");
  if (dateParam) {
    const [y, m, d] = dateParam.split("-").map(Number);
    setEffectiveDate(new Date(y, m - 1, d));
  } else {
    navigate("/doctor/appointments");
  }
}, [searchParams, navigate]);

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

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) =>
        value ? params.set(key, value) : params.delete(key)
      );

      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const DAY_VIEW_ALLOWED_STATUSES = useMemo<AppointmentStatus[]>(
    () => ["Confirmed", "Delayed", "Pending"],
    []
  );

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

  /* ---------------- UTILS ---------------- */
  const toLocalDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const isSameLocalDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  /* ---------------- FILTER LOGIC ---------------- */

const filteredAppointments = useMemo(() => {
  if (!effectiveDate || !doctorCode) return [];

  const parseDay = (dateStr: string) => toLocalDay(new Date(dateStr));
  const effectiveDay = toLocalDay(effectiveDate);

  const monthStart = startOfMonth(effectiveDay);
  const monthEnd = endOfMonth(effectiveDay);
  const weekStart = startOfWeek(effectiveDay);
  const weekEnd = endOfWeek(effectiveDay);

  const rangeStart = searchParams.get("start") ? parseDay(searchParams.get("start")!) : null;
  const rangeEnd = searchParams.get("end") ? parseDay(searchParams.get("end")!) : null;

  const searchName = (searchParams.get("search") || "").toLowerCase();
  const monthFilter = searchParams.get("month") === "1";
  const weekFilter = searchParams.get("week") === "1";

  return appointments.filter((apt) => {
    if (apt.doctorCode !== Number(doctorCode)) return false;

    const aptDay = parseDay(apt.date);

    // ---- DATE FILTER PRIORITY ----
    if (rangeStart && rangeEnd) {
      if (aptDay < rangeStart || aptDay > rangeEnd) return false;
    } else if (weekFilter) {
      if (aptDay < weekStart || aptDay > weekEnd) return false;
    } else if (monthFilter || tagFilter.length > 0) {
      if (aptDay < monthStart || aptDay > monthEnd) return false;
    } else {
      if (!isSameLocalDay(aptDay, effectiveDay)) return false;
      if (!DAY_VIEW_ALLOWED_STATUSES.includes(apt.status as AppointmentStatus)) return false;
    }

    // ---- SEARCH ----
    if (searchName && !apt.patientName.toLowerCase().includes(searchName)) return false;

    // ---- TAG ----
    if (tagFilter.length && !tagFilter.includes(apt.tag ?? "_")) return false;

    // ---- STATUS ----
    if (statusFilter.length && !statusFilter.includes(apt.status as AppointmentStatus)) return false;

    return true;
  });
}, [effectiveDate, doctorCode, searchParams, appointments, tagFilter, statusFilter, DAY_VIEW_ALLOWED_STATUSES]);


console.log(filteredAppointments)

  const getWeekOfMonth = (date: Date) => {
    const startWeek = startOfWeek(startOfMonth(date));
    const currentWeek = startOfWeek(date);
    return (
      Math.floor(
        (currentWeek.getTime() - startWeek.getTime()) / (7 * 24 * 60 * 60 * 1000)
      ) + 1
    );
  };

  const pageTitle = useMemo(() => {
  if (!effectiveDate) return "";

  const monthFilter = searchParams.get("month") === "1";
  const weekFilter = searchParams.get("week") === "1";

  const getWeekOfMonth = (date: Date) => {
    const startWeek = startOfWeek(startOfMonth(date));
    const currentWeek = startOfWeek(date);
    return Math.floor(
      (currentWeek.getTime() - startWeek.getTime()) / (7 * 24 * 60 * 60 * 1000)
    ) + 1;
  };

  if (monthFilter) return `Patients for ${format(effectiveDate, "MMMM yyyy")}`;
  if (weekFilter) {
    const week = getWeekOfMonth(effectiveDate);
    return `Patients for week ${week} of ${format(effectiveDate, "MMMM yyyy")}`;
  }

  return `Patients for ${format(effectiveDate, "EEEE, MMM d yyyy")}`;
}, [effectiveDate, searchParams]);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-y-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="container mx-auto px-6 py-8"
      >
        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/doctor/appointments")}
                className="hover:bg-white/80 hover:scale-110 transition-all duration-200 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                {pageTitle}
              </h1>
            </motion.div>
            
            {/* FILTER TOGGLE BUTTON */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </motion.div>
                Filters
                {(tagFilter.length > 0 || statusFilter.length > 0 || searchName || monthFilter || weekFilter || rangeFilter.start || rangeFilter.end) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                  >
                    {tagFilter.length + statusFilter.length + (searchName ? 1 : 0) + (monthFilter ? 1 : 0) + (weekFilter ? 1 : 0) + (rangeFilter.start ? 1 : 0) + (rangeFilter.end ? 1 : 0)}
                  </motion.span>
                )}
              </Button>
            </motion.div>
          </div>

          {/* COLLAPSIBLE FILTERS PANEL */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -20 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-lg border border-slate-200 rounded-2xl p-6 shadow-xl"
                >
                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Date Range Filters */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                          <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                          Date Range
                        </label>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            size="sm"
                            variant={monthFilter ? "default" : "outline"}
                            onClick={() =>
                              updateParams({
                                month: monthFilter ? null : "1",
                                week: null,
                              })
                            }
                            className="transition-all duration-200 hover:scale-105"
                          >
                            Month
                          </Button>

                          <Button
                            size="sm"
                            variant={weekFilter ? "default" : "outline"}
                            onClick={() =>
                              updateParams({
                                week: weekFilter ? null : "1",
                                month: null,
                              })
                            }
                            className="transition-all duration-200 hover:scale-105"
                          >
                            Week
                          </Button>

                          <input
                            type="date"
                            title="Select start date"
                            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            value={rangeFilter.start}
                            onChange={(e) => updateParams({ start: e.target.value || null })}
                          />

                          <input
                            type="date"
                            title="Select end date"
                            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            value={rangeFilter.end}
                            onChange={(e) => updateParams({ end: e.target.value || null })}
                          />
                        </div>
                      </motion.div>

                      {/* Search Filter */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                          <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                          Search Patient
                        </label>
                        <input
                          type="text"
                          className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
                          placeholder="Search by patient name..."
                          value={searchName}
                          onChange={(e) => updateParams({ search: e.target.value || null })}
                        />
                      </motion.div>

                      
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Status Filters */}
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                          <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                          Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {(["Confirmed", "Pending", "Completed", "Cancelled", "Delayed", "No Show"] as AppointmentStatus[]).map((status, idx) => (
                            <motion.div
                              key={status}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2 + idx * 0.05 }}
                            >
                              <Button
                                size="sm"
                                variant={statusFilter.includes(status) ? "default" : "outline"}
                                onClick={() => {
                                  const newFilter = [...statusFilter];
                                  if (newFilter.includes(status)) {
                                    newFilter.splice(newFilter.indexOf(status), 1);
                                  } else {
                                    newFilter.push(status);
                                  }
                                  setStatusFilter(newFilter);
                                }}
                                className="transition-all duration-200 hover:scale-105 shadow-sm"
                              >
                                <span className={`w-2 h-2 rounded-full mr-2 ${statusColors[status].replace('text-white', '')}`}></span>
                                {status}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Tag Filters */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                      >
                        <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                          <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                          Condition Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["critical", "follow-up", "normal", "new", "chronic"].map((tag, idx) => (
                            <motion.div
                              key={tag}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                            >
                              <Button
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
                                className="transition-all duration-200 hover:scale-105 shadow-sm capitalize"
                              >
                                {tag}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Clear All Filters - Full Width */}
                  {(tagFilter.length > 0 || statusFilter.length > 0 || searchName || monthFilter || weekFilter || rangeFilter.start || rangeFilter.end) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="pt-4 mt-4 border-t border-slate-200"
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setTagFilter([]);
                          setStatusFilter([]);
                          updateParams({ 
                            search: null, 
                            month: null, 
                            week: null, 
                            start: null, 
                            end: null 
                          });
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                      >
                        Clear All Filters
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TABLE */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 transition-all duration-200">
                  <TableHead className="text-center font-semibold text-slate-700 w-[4%]">View</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[10%]">Name</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[8%]">Condition</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[12%]">Problem</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[4%]">Age</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[6%]">Height</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[6%]">Weight</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[10%]">Contact</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[16%]">Email</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[8%]">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[6%]">Time</TableHead>
                  <TableHead className="text-center font-semibold text-slate-700 w-[5%]">Actions</TableHead>
                </TableRow>
              </TableHeader>


              <TableBody>
                {filteredAppointments.map((apt, idx) => (
                  
                  <motion.tr
                    key={apt.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    className="hover:bg-blue-50/50 transition-all duration-200 border-b border-slate-100"
                  >
                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        className={`${actionColors.view} transition-all duration-200 hover:scale-110 shadow-md`}
                        onClick={() =>
                          navigate(
                            `/doctor/patients/${apt.patientId}?fromCalendar=1&date=${effectiveDate.toISOString()}`
                          )
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {apt.patientName}
                    </TableCell>

                    {/* Condition Column (tag) */}
                    <TableCell>
                      <Badge
                        className={`${
                          apt.tag === "critical"
                            ? "bg-red-500 text-white shadow-red-200"
                            : apt.tag === "follow-up"
                            ? "bg-orange-500 text-white shadow-orange-200"
                            : apt.tag === "normal"
                            ? "bg-green-500 text-white shadow-green-200"
                            : apt.tag === "new"
                            ? "bg-blue-500 text-white shadow-blue-200"
                            : "bg-gray-500 text-white shadow-gray-200"
                        } shadow-md transition-all duration-200 hover:scale-110`}
                      >
                        {apt.tag}
                      </Badge>
                    </TableCell>

                    {/* Problem Column */}
                    <TableCell className="text-slate-700">{apt.condition}</TableCell>

                    <TableCell className="text-slate-700">{apt.age}</TableCell>
                    <TableCell className="text-slate-700">{apt.height}</TableCell>
                    <TableCell className="text-slate-700">{apt.weight}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <a
                        href={`tel:${apt.contact}`}
                        className="text-black-600 hover:text-blue-700 hover:underline transition-all duration-200"
                      >
                        {apt.contact}
                      </a>
                    </TableCell>

                    <TableCell>
                      <a
                        href={`mailto:${apt.email}?from=${doctorEmail}`}
                        className="text-black-600 hover:text-blue-700 hover:underline transition-all duration-200"
                      >
                        {apt.email}
                      </a>
                    </TableCell>

                    <TableCell>
                      <Badge className={`${statusColors[apt.status]} shadow-md transition-all duration-200 hover:scale-110`}>
                        {apt.status}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="text-slate-700 ">{apt.time}</TableCell>
                    

                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant="outline"
                        data-action-button={apt.id}
                        className="transition-all duration-200 hover:scale-110 shadow-md hover:bg-slate-100"
                        onClick={() => setActionPopupId(actionPopupId === String(apt.id) ? null : String(apt.id))}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </TableCell>

                    
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </motion.div>

      {selectedAppointment && (
        <RescheduleModal
          open={showRescheduleModal}
          appointment={selectedAppointment}
          onClose={() => setShowRescheduleModal(false)}
          allAppointments={appointments}
        />
      )}

      {/* Global Action Popup Portal */}
      <AnimatePresence>
        {actionPopupId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50"
            onClick={() => setActionPopupId(null)}
          >
            {filteredAppointments.map((apt) => {
              if (String(apt.id) !== actionPopupId) return null;
              
              const buttonElement = document.querySelector(`[data-action-button="${apt.id}"]`);
              if (!buttonElement) return null;
              
              const rect = buttonElement.getBoundingClientRect();
              
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, scale: 0.9, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'fixed',
                    top: rect.top + rect.height / 2 - 60,
                    left: rect.right + 12,
                  }}
                  className="bg-white rounded-lg shadow-2xl border border-slate-200 p-2 min-w-[180px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      size="sm"
                      className={`${actionColors.complete} justify-start transition-all duration-200 hover:scale-105 shadow-sm`}
                      onClick={() => {
                        dispatch(
                          updateAppointment({
                            id: apt.id,
                            changes: { status: "Completed" },
                          })
                        );
                        setActionPopupId(null);
                      }}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>

                    <Button
                      size="sm"
                      className={`${actionColors.cancel} justify-start transition-all duration-200 hover:scale-105 shadow-sm`}
                      onClick={() => {
                        dispatch(
                          updateAppointment({
                            id: apt.id,
                            changes: { status: "Cancelled" },
                          })
                        );
                        setActionPopupId(null);
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>

                    <Button
                      size="sm"
                      className={`${actionColors.followup} justify-start transition-all duration-200 hover:scale-105 shadow-sm`}
                      onClick={() => {
                        setSelectedAppointment(apt);
                        setShowRescheduleModal(true);
                        setActionPopupId(null);
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reschedule
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}