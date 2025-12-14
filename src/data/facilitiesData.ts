// Facilities data mapped to specific hospitals
export interface Facility {
  id: number;
  hospitalId: string;
  name: string;
  type: 'Ward' | 'Department' | 'Lab' | 'Surgical' | 'Emergency' | 'Support';
  totalBeds: number;
  occupied: number;
  equipment: number;
  status: 'Operational' | 'Maintenance' | 'Closed';
  floor: string;
  headOfDepartment: string;
  contact: string;
  description: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

export const facilitiesData: Facility[] = [
  // City General Hospital facilities
  {
    id: 1,
    hospitalId: "city-general",
    name: "ICU Ward A",
    type: "Ward",
    totalBeds: 20,
    occupied: 15,
    equipment: 45,
    status: "Operational",
    floor: "3rd Floor",
    headOfDepartment: "Dr. Sarah Mitchell",
    contact: "+1 (555) 123-4567 ext. 301",
    description: "Intensive Care Unit with advanced life support and monitoring systems",
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-02-05"
  },
  {
    id: 2,
    hospitalId: "city-general",
    name: "Emergency Room",
    type: "Emergency",
    totalBeds: 30,
    occupied: 22,
    equipment: 60,
    status: "Operational",
    floor: "Ground Floor",
    headOfDepartment: "Dr. Amanda Clarke",
    contact: "+1 (555) 123-4567 ext. 100",
    description: "24/7 emergency care facility with trauma center capabilities",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10"
  },
  {
    id: 3,
    hospitalId: "city-general",
    name: "Cardiology Department",
    type: "Department",
    totalBeds: 40,
    occupied: 28,
    equipment: 55,
    status: "Operational",
    floor: "4th Floor",
    headOfDepartment: "Dr. Sarah Mitchell",
    contact: "+1 (555) 123-4567 ext. 401",
    description: "Specialized cardiac care including catheterization lab",
    lastMaintenance: "2024-01-08",
    nextMaintenance: "2024-02-08"
  },
  {
    id: 4,
    hospitalId: "city-general",
    name: "Oncology Center",
    type: "Department",
    totalBeds: 35,
    occupied: 25,
    equipment: 70,
    status: "Operational",
    floor: "5th Floor",
    headOfDepartment: "Dr. Robert Taylor",
    contact: "+1 (555) 123-4567 ext. 501",
    description: "Comprehensive cancer treatment including chemotherapy and radiation",
    lastMaintenance: "2024-01-12",
    nextMaintenance: "2024-02-12"
  },
  {
    id: 5,
    hospitalId: "city-general",
    name: "Surgical Suite",
    type: "Surgical",
    totalBeds: 12,
    occupied: 8,
    equipment: 95,
    status: "Operational",
    floor: "2nd Floor",
    headOfDepartment: "Dr. Emily Davis",
    contact: "+1 (555) 123-4567 ext. 201",
    description: "State-of-the-art operating rooms with robotic surgery capabilities",
    lastMaintenance: "2024-01-03",
    nextMaintenance: "2024-02-03"
  },

  // Metro Health Center facilities
  {
    id: 6,
    hospitalId: "metro-health",
    name: "Neurology Wing",
    type: "Department",
    totalBeds: 30,
    occupied: 22,
    equipment: 50,
    status: "Operational",
    floor: "4th Floor",
    headOfDepartment: "Dr. Michael Chen",
    contact: "+1 (555) 234-5678 ext. 401",
    description: "Specialized neurological care with EEG and imaging facilities",
    lastMaintenance: "2024-01-07",
    nextMaintenance: "2024-02-07"
  },
  {
    id: 7,
    hospitalId: "metro-health",
    name: "MRI & Imaging Center",
    type: "Lab",
    totalBeds: 0,
    occupied: 0,
    equipment: 12,
    status: "Operational",
    floor: "1st Floor",
    headOfDepartment: "Dr. Patricia Wong",
    contact: "+1 (555) 234-5678 ext. 102",
    description: "Advanced imaging including 3T MRI and CT scanners",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-02-15"
  },
  {
    id: 8,
    hospitalId: "metro-health",
    name: "Emergency Department",
    type: "Emergency",
    totalBeds: 25,
    occupied: 18,
    equipment: 45,
    status: "Operational",
    floor: "Ground Floor",
    headOfDepartment: "Dr. Kevin Martinez",
    contact: "+1 (555) 234-5678 ext. 100",
    description: "Level II trauma center with rapid response capabilities",
    lastMaintenance: "2024-01-06",
    nextMaintenance: "2024-02-06"
  },
  {
    id: 9,
    hospitalId: "metro-health",
    name: "Gastroenterology Unit",
    type: "Department",
    totalBeds: 20,
    occupied: 14,
    equipment: 35,
    status: "Maintenance",
    floor: "3rd Floor",
    headOfDepartment: "Dr. Rachel Kim",
    contact: "+1 (555) 234-5678 ext. 301",
    description: "Digestive health center with endoscopy suite",
    lastMaintenance: "2024-01-14",
    nextMaintenance: "2024-01-21"
  },

  // Sunrise Medical Complex facilities
  {
    id: 10,
    hospitalId: "sunrise-medical",
    name: "Pediatric Ward",
    type: "Ward",
    totalBeds: 35,
    occupied: 20,
    equipment: 40,
    status: "Operational",
    floor: "2nd Floor",
    headOfDepartment: "Dr. James Wilson",
    contact: "+1 (555) 345-6789 ext. 201",
    description: "Child-friendly environment with specialized pediatric care",
    lastMaintenance: "2024-01-09",
    nextMaintenance: "2024-02-09"
  },
  {
    id: 11,
    hospitalId: "sunrise-medical",
    name: "Maternity Center",
    type: "Department",
    totalBeds: 25,
    occupied: 15,
    equipment: 30,
    status: "Operational",
    floor: "3rd Floor",
    headOfDepartment: "Dr. Jennifer Adams",
    contact: "+1 (555) 345-6789 ext. 301",
    description: "Comprehensive maternity care including NICU",
    lastMaintenance: "2024-01-11",
    nextMaintenance: "2024-02-11"
  },
  {
    id: 12,
    hospitalId: "sunrise-medical",
    name: "Rehabilitation Center",
    type: "Support",
    totalBeds: 30,
    occupied: 22,
    equipment: 55,
    status: "Operational",
    floor: "1st Floor",
    headOfDepartment: "Dr. Thomas Baker",
    contact: "+1 (555) 345-6789 ext. 101",
    description: "Physical therapy and rehabilitation services",
    lastMaintenance: "2024-01-04",
    nextMaintenance: "2024-02-04"
  },

  // Valley Regional Hospital facilities
  {
    id: 13,
    hospitalId: "valley-regional",
    name: "Dermatology Clinic",
    type: "Department",
    totalBeds: 10,
    occupied: 5,
    equipment: 25,
    status: "Operational",
    floor: "2nd Floor",
    headOfDepartment: "Dr. Lisa Anderson",
    contact: "+1 (555) 456-7890 ext. 201",
    description: "Skin care and cosmetic dermatology services",
    lastMaintenance: "2024-01-13",
    nextMaintenance: "2024-02-13"
  },
  {
    id: 14,
    hospitalId: "valley-regional",
    name: "Psychiatry Unit",
    type: "Department",
    totalBeds: 20,
    occupied: 12,
    equipment: 15,
    status: "Operational",
    floor: "4th Floor",
    headOfDepartment: "Dr. William Harris",
    contact: "+1 (555) 456-7890 ext. 401",
    description: "Mental health services with inpatient and outpatient care",
    lastMaintenance: "2024-01-02",
    nextMaintenance: "2024-02-02"
  },
  {
    id: 15,
    hospitalId: "valley-regional",
    name: "Cardiac Care Unit",
    type: "Ward",
    totalBeds: 15,
    occupied: 10,
    equipment: 35,
    status: "Operational",
    floor: "3rd Floor",
    headOfDepartment: "Dr. Daniel Moore",
    contact: "+1 (555) 456-7890 ext. 301",
    description: "Specialized cardiac monitoring and care",
    lastMaintenance: "2024-01-08",
    nextMaintenance: "2024-02-08"
  },

  // Coastal Care Medical facilities
  {
    id: 16,
    hospitalId: "coastal-care",
    name: "Primary Care Center",
    type: "Department",
    totalBeds: 15,
    occupied: 8,
    equipment: 20,
    status: "Operational",
    floor: "1st Floor",
    headOfDepartment: "Dr. Maria Santos",
    contact: "+1 (555) 567-8901 ext. 101",
    description: "General health checkups and preventive care",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10"
  },
  {
    id: 17,
    hospitalId: "coastal-care",
    name: "Orthopedic Center",
    type: "Department",
    totalBeds: 20,
    occupied: 12,
    equipment: 40,
    status: "Maintenance",
    floor: "2nd Floor",
    headOfDepartment: "Dr. Chris Thompson",
    contact: "+1 (555) 567-8901 ext. 201",
    description: "Bone and joint treatment with sports medicine",
    lastMaintenance: "2024-01-14",
    nextMaintenance: "2024-01-18"
  },
  {
    id: 18,
    hospitalId: "coastal-care",
    name: "Emergency Services",
    type: "Emergency",
    totalBeds: 18,
    occupied: 10,
    equipment: 35,
    status: "Operational",
    floor: "Ground Floor",
    headOfDepartment: "Dr. Andrew Lee",
    contact: "+1 (555) 567-8901 ext. 100",
    description: "24/7 emergency care for urgent medical needs",
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-02-05"
  }
];

export const getFacilitiesByHospitalName = (hospitalId: string): Facility[] => {
  return facilitiesData.filter(facility => facility.hospitalId === hospitalId);
};

export const getFacilityById = (facilityId: number): Facility | undefined => {
  return facilitiesData.find(facility => facility.id === facilityId);
};
