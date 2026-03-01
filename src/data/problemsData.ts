export interface Problem {
  id: number;
  hospitalId: string;
  title: string;
  department: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  reportedBy: string;
  reportedAt: Date;
  assignedTo: string;
  resolvedAt: Date | null;
  description: string;
  resolution: string | null;
  category: 'Equipment' | 'Staffing' | 'Supply' | 'Infrastructure' | 'Patient Care' | 'Other';
}

export const problemsData: Problem[] = [
  // City General Hospital problems
  {
    id: 1,
    hospitalId: "city-general",
    title: "Equipment Malfunction - MRI Scanner",
    department: "Radiology",
    priority: "High",
    status: "In Progress",
    reportedBy: "Dr. Sarah Mitchell",
    reportedAt: "2024-01-15",
    assignedTo: "Technical Team A",
    resolvedAt: null,
    description: "MRI scanner showing calibration errors during scans. Images are distorted and unusable for diagnostic purposes.",
    resolution: null,
    category: "Equipment"
  },
  {
    id: 2,
    hospitalId: "city-general",
    title: "Staff Shortage - Night Shift ICU",
    department: "ICU",
    priority: "Critical",
    status: "Open",
    reportedBy: "Head Nurse Maria",
    reportedAt: "2024-01-14",
    assignedTo: "HR Department",
    resolvedAt: null,
    description: "Insufficient nursing staff for night shifts in ICU. Current ratio is 1:8 instead of required 1:4.",
    resolution: null,
    category: "Staffing"
  },
  {
    id: 3,
    hospitalId: "city-general",
    title: "Supply Shortage - Surgical Gloves",
    department: "Surgery",
    priority: "Medium",
    status: "Resolved",
    reportedBy: "Dr. Emily Davis",
    reportedAt: "2024-01-12",
    assignedTo: "Procurement Team",
    resolvedAt: "2024-01-14",
    description: "Running low on size medium and large surgical gloves. Current stock will last only 3 days.",
    resolution: "Emergency order placed and received. Stock replenished to 30-day supply.",
    category: "Supply"
  },
  {
    id: 4,
    hospitalId: "city-general",
    title: "HVAC Issue - Oncology Ward",
    department: "Oncology",
    priority: "High",
    status: "In Progress",
    reportedBy: "Dr. Robert Taylor",
    reportedAt: "2024-01-10",
    assignedTo: "Maintenance Team",
    resolvedAt: null,
    description: "Air conditioning not maintaining proper temperature in rooms 501-505. Temperature fluctuating between 68-78°F.",
    resolution: null,
    category: "Infrastructure"
  },

  // Metro Health Center problems
  {
    id: 5,
    hospitalId: "metro-health",
    title: "CT Scanner Maintenance Required",
    department: "Imaging",
    priority: "High",
    status: "Open",
    reportedBy: "Dr. Patricia Wong",
    reportedAt: "2024-01-16",
    assignedTo: "Vendor Service Team",
    resolvedAt: null,
    description: "CT scanner showing error codes during startup. Requires immediate vendor inspection.",
    resolution: null,
    category: "Equipment"
  },
  {
    id: 6,
    hospitalId: "metro-health",
    title: "Medication Dispensing Error",
    department: "Pharmacy",
    priority: "Critical",
    status: "Resolved",
    reportedBy: "Pharmacist John",
    reportedAt: "2024-01-13",
    assignedTo: "Quality Assurance",
    resolvedAt: "2024-01-14",
    description: "Automated dispensing machine gave incorrect medication count. Discrepancy of 15 tablets found.",
    resolution: "Machine recalibrated. New verification protocol implemented. Staff retrained.",
    category: "Equipment"
  },
  {
    id: 7,
    hospitalId: "metro-health",
    title: "Elevator Out of Service",
    department: "Facilities",
    priority: "Medium",
    status: "In Progress",
    reportedBy: "Security Team",
    reportedAt: "2024-01-15",
    assignedTo: "Elevator Maintenance Co.",
    resolvedAt: null,
    description: "Main patient elevator stuck between floors. Currently using service elevator as alternative.",
    resolution: null,
    category: "Infrastructure"
  },

  // Sunrise Medical Complex problems
  {
    id: 8,
    hospitalId: "sunrise-medical",
    title: "Pediatric Ward - Bed Shortage",
    department: "Pediatrics",
    priority: "High",
    status: "Open",
    reportedBy: "Dr. James Wilson",
    reportedAt: "2024-01-16",
    assignedTo: "Administration",
    resolvedAt: null,
    description: "Increased patient admissions exceeding bed capacity. Need to arrange temporary beds.",
    resolution: null,
    category: "Patient Care"
  },
  {
    id: 9,
    hospitalId: "sunrise-medical",
    title: "Infant Warmer Malfunction",
    department: "NICU",
    priority: "Critical",
    status: "Resolved",
    reportedBy: "Head Nurse Sarah",
    reportedAt: "2024-01-11",
    assignedTo: "Biomedical Engineering",
    resolvedAt: "2024-01-12",
    description: "One of three infant warmers showing inconsistent temperature readings.",
    resolution: "Thermostat replaced and unit tested for 24 hours. Now operational.",
    category: "Equipment"
  },
  {
    id: 10,
    hospitalId: "sunrise-medical",
    title: "Physical Therapy Equipment Needed",
    department: "Rehabilitation",
    priority: "Low",
    status: "Open",
    reportedBy: "Dr. Thomas Baker",
    reportedAt: "2024-01-08",
    assignedTo: "Procurement",
    resolvedAt: null,
    description: "Request for additional parallel bars and resistance bands for increased patient load.",
    resolution: null,
    category: "Supply"
  },

  // Valley Regional Hospital problems
  {
    id: 11,
    hospitalId: "valley-regional",
    title: "Electronic Health Records Slowdown",
    department: "IT",
    priority: "High",
    status: "In Progress",
    reportedBy: "IT Manager",
    reportedAt: "2024-01-15",
    assignedTo: "IT Infrastructure Team",
    resolvedAt: null,
    description: "EHR system experiencing significant delays during peak hours. Response time exceeding 10 seconds.",
    resolution: null,
    category: "Infrastructure"
  },
  {
    id: 12,
    hospitalId: "valley-regional",
    title: "Dermatology Light Therapy Unit",
    department: "Dermatology",
    priority: "Medium",
    status: "Open",
    reportedBy: "Dr. Lisa Anderson",
    reportedAt: "2024-01-14",
    assignedTo: "Biomedical Engineering",
    resolvedAt: null,
    description: "UV light therapy unit showing reduced output. May need bulb replacement.",
    resolution: null,
    category: "Equipment"
  },

  // Coastal Care Medical problems
  {
    id: 13,
    hospitalId: "coastal-care",
    title: "Generator Maintenance Due",
    department: "Facilities",
    priority: "Medium",
    status: "Open",
    reportedBy: "Facilities Manager",
    reportedAt: "2024-01-12",
    assignedTo: "Maintenance Team",
    resolvedAt: null,
    description: "Backup generator due for annual maintenance and testing.",
    resolution: null,
    category: "Infrastructure"
  },
  {
    id: 14,
    hospitalId: "coastal-care",
    title: "X-Ray Equipment Calibration",
    department: "Radiology",
    priority: "High",
    status: "Resolved",
    reportedBy: "Radiology Tech",
    reportedAt: "2024-01-10",
    assignedTo: "Vendor Service",
    resolvedAt: "2024-01-13",
    description: "X-ray machine requiring annual calibration and safety check.",
    resolution: "Calibration completed. All safety parameters within acceptable range.",
    category: "Equipment"
  },
  {
    id: 15,
    hospitalId: "coastal-care",
    title: "Waiting Room Seating Insufficient",
    department: "Administration",
    priority: "Low",
    status: "In Progress",
    reportedBy: "Patient Relations",
    reportedAt: "2024-01-08",
    assignedTo: "Facilities",
    resolvedAt: null,
    description: "Emergency waiting room has insufficient seating during busy periods.",
    resolution: null,
    category: "Infrastructure"
  }
];

export const getProblemsByHospitalName = (hospitalId: string): Problem[] => {
  return problemsData.filter(problem => problem.hospitalId === hospitalId);
};

export const getProblemById = (problemId: number): Problem | undefined => {
  return problemsData.find(problem => problem.id === problemId);
};
