import { initialHospitals } from "@/contexts/HospitalsContext";

const findHospital = (id: string | undefined) => initialHospitals.find((hospital) => hospital.id === id);

export const adminHospitalMap: Record<string, string> = {

  jamine: "city-general",
  admin: "city-general",
  cityadmin: "city-general",
  
  metroadmin: "metro-health",
  het: "metro-health",

  sunriselead: "sunrise-medical",
  sunriseadmin: "sunrise-medical",
  
  valleychief: "valley-regional",
  valleyadmin: "valley-regional",

  coastalhead: "coastal-care",
  coastaladmin: "coastal-care",
};


export const doctorHospitalMap: Record<string, { doctorId: number; hospitalId: string }> = {

  sarah: { doctorId: 1, hospitalId: "city-general" },
  sarahmitchell: { doctorId: 1, hospitalId: "city-general" },
  emily: { doctorId: 3, hospitalId: "city-general" },
  emilydavis: { doctorId: 3, hospitalId: "city-general" },
  roberttaylor: { doctorId: 6, hospitalId: "city-general" },
 
  michael: { doctorId: 2, hospitalId: "metro-health" },
  michaelchen: { doctorId: 2, hospitalId: "metro-health" },

  james: { doctorId: 4, hospitalId: "sunrise-medical" },
  jameswilson: { doctorId: 4, hospitalId: "sunrise-medical" },

  lisa: { doctorId: 5, hospitalId: "valley-regional" },
  robert: { doctorId: 6, hospitalId: "city-general" },
  het: { doctorId: 2, hospitalId: "metro-health" },
};

export function getHospitalForAdminHandle(handle: string) {
  const hospitalId = adminHospitalMap[handle];
  return hospitalId ? findHospital(hospitalId) : undefined;
}

export function getDoctorMapping(handle: string) {
  const mapping = doctorHospitalMap[handle];
  if (!mapping) return undefined;
  return {
    ...mapping,
    hospital: findHospital(mapping.hospitalId),
  };
}

export function normalizeAdminHandle(username: string) {
  return username.replace(/[^a-z0-9]/gi, "").toLowerCase().replace(/adm$/, "");
}

export function normalizeDoctorHandle(username: string) {
  return username.replace(/[^a-z0-9]/gi, "").toLowerCase().replace(/^dr/, "");
}

export const hospitalStaffMap: Record<string, number[]> = {
  "city-general": [1, 2, 4], // Jennifer Adams, Marcus Johnson, David Brown
  "metro-health": [3],       // Patricia Lee
  "sunrise-medical": [5],    // Rachel Green
  "valley-regional": [6],    // Thomas White
  "coastal-care": [],
};

export const hospitalDoctorsMap: Record<string, number[]> = {
  "city-general": [1, 3, 6],   // Sarah Mitchell, Emily Davis, Robert Taylor
  "metro-health": [2],         // Michael Chen
  "sunrise-medical": [4],      // James Wilson
  "valley-regional": [5],      // Lisa Anderson
  "coastal-care": [],
};
