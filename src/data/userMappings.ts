import { initialHospitals } from "@/contexts/HospitalsContext";

const findHospital = (id: string | undefined) => initialHospitals.find((hospital) => hospital.id === id);

export const adminHospitalMap: Record<string, string> = {
  // City General Hospital Admins
  jamine: "city-general",
  admin: "city-general",
  cityadmin: "city-general",
  superadmin: "city-general",
  
  // Metro Health Center Admins
  metroadmin: "metro-health",
  het: "metro-health",
  metrochief: "metro-health",

  // Sunrise Medical Complex Admins
  sunriselead: "sunrise-medical",
  sunriseadmin: "sunrise-medical",
  sunrisemanager: "sunrise-medical",
  
  // Valley Regional Hospital Admins
  valleychief: "valley-regional",
  valleyadmin: "valley-regional",
  valleyboss: "valley-regional",

  // Coastal Care Medical Admins
  coastalhead: "coastal-care",
  coastaladmin: "coastal-care",
  coastaldir: "coastal-care",

  // New Hospital: Lakeside Medical Center
  lakesidemanager: "lakeside-medical",
  lakesidehead: "lakeside-medical",
};


export const doctorHospitalMap: Record<string, { doctorId: number; hospitalId: string }> = {
  // City General Hospital Doctors (Main General Medicine & Spidey-Verse)
  "john.smith": { doctorId: 1, hospitalId: "city-general" },
  "michael.johnson": { doctorId: 2, hospitalId: "city-general" },
  "emily.davis": { doctorId: 3, hospitalId: "city-general" },
  "james.wilson": { doctorId: 4, hospitalId: "city-general" },
  "robert.taylor": { doctorId: 6, hospitalId: "city-general" },
  "otto.octavius": { doctorId: 17, hospitalId: "city-general" },
  "curt.connors": { doctorId: 18, hospitalId: "city-general" },

  // Metro Health Center Doctors (MCU & Starfleet Medical)
  "stephen.strange": { doctorId: 7, hospitalId: "metro-health" },
  "bruce.banner": { doctorId: 8, hospitalId: "metro-health" },
  "christine.palmer": { doctorId: 10, hospitalId: "metro-health" },
  "abraham.erskine": { doctorId: 11, hospitalId: "metro-health" },
  "leonard.mccoy": { doctorId: 22, hospitalId: "metro-health" },
  "beverly.crusher": { doctorId: 23, hospitalId: "metro-health" },
  "katherine.pulaski": { doctorId: 26, hospitalId: "metro-health" },

  // Sunrise Medical Complex Doctors (Cosmic & Space Medicine)
  "jane.foster": { doctorId: 9, hospitalId: "sunrise-medical" },
  "erik.lensherr": { doctorId: 21, hospitalId: "sunrise-medical" },
  "julian.bashir": { doctorId: 24, hospitalId: "sunrise-medical" },
  "deanna.troi": { doctorId: 27, hospitalId: "sunrise-medical" },

  // Valley Regional Hospital Doctors (Specialty Care & Sci-Fi Tech)
  "lisa.anderson": { doctorId: 5, hospitalId: "valley-regional" },
  "jericho.drumm": { doctorId: 15, hospitalId: "valley-regional" },
  "alexander.hamilton": { doctorId: 19, hospitalId: "valley-regional" },
  "the.doctor": { doctorId: 28, hospitalId: "valley-regional" },

  // Coastal Care Medical Doctors (Unique Physiology & Exobiology)
  "helen.cho": { doctorId: 12, hospitalId: "coastal-care" },
  "sue.storm": { doctorId: 20, hospitalId: "coastal-care" },
  "phlox.denobulan": { doctorId: 25, hospitalId: "coastal-care" },
  "dr.zee": { doctorId: 29, hospitalId: "coastal-care" },

  // Lakeside Medical Center Doctors (Genetics, Toxicology & Suspicious Characters)
  "arnim.zola": { doctorId: 13, hospitalId: "lakeside-medical" },
  "miguel.ohara": { doctorId: 14, hospitalId: "lakeside-medical" },
  "henry.wu": { doctorId: 16, hospitalId: "lakeside-medical" },
  "zachary.smith": { doctorId: 30, hospitalId: "lakeside-medical" },
};

export function getHospitalForAdminHandle(handle: string) {
  const hospitalId = adminHospitalMap[handle];
  return hospitalId ? findHospital(hospitalId) : undefined;
}

export function getDoctorMapping(handle: string) {
  const normalized = normalizeDoctorHandle(handle);
  let mapping = doctorHospitalMap[normalized];

  if (!mapping && !normalized.includes(".")) {
    const dotted = normalized.replace(
      /^([a-z]+)([a-z]+)$/i,
      "$1.$2"
    );
    mapping = doctorHospitalMap[dotted];
  }

  if (!mapping) return undefined;

  return {
    ...mapping,
    hospital: findHospital(mapping.hospitalId),
  };
}


export function normalizeAdminHandle(username: string) {
  return username
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/adm$/, "");
}


export function normalizeDoctorHandle(raw: string) {
  return raw
    .toLowerCase()
    .replace(/^dr/, "")           // 🔑 remove dr prefix
    .replace(/[^a-z.]/g, "")      // keep letters + dots
    .replace(/\.{2,}/g, ".")      // collapse multiple dots
    .replace(/^\./, "")           // no starting dot
    .replace(/\.$/, "");          // no ending dot
}


// These IDs correspond to non-doctor staff (nurses, admin assistants)
export const hospitalStaffMap: Record<string, number[]> = {
  "city-general": [1, 2, 4], // Jennifer Adams, Marcus Johnson, David Brown
  "metro-health": [3],       // Patricia Lee
  "sunrise-medical": [5],    // Rachel Green
  "valley-regional": [6],    // Thomas White
  "coastal-care": [7],       // Jessica Davis
  "lakeside-medical": [8, 9], // Katherine Johnson, Mark Evans
};

// These IDs correspond to Doctor IDs found in patientsData
export const hospitalDoctorsMap: Record<string, number[]> = {
  "city-general": [1, 2, 3, 4, 6, 17, 18], // John Smith, Michael Johnson, Emily Davis, James Wilson, Robert Taylor, Otto Octavius, Curt Connors
  "metro-health": [7, 8, 10, 11, 22, 23, 26], // Stephen Strange, Bruce Banner, Christine Palmer, Abraham Erskine, Leonard McCoy, Beverly Crusher, Katherine Pulaski
  "sunrise-medical": [9, 21, 24, 27], // Jane Foster, Erik Lensherr, Julian Bashir, Deanna Troi
  "valley-regional": [5, 15, 19, 28], // Lisa Anderson, Jericho Drumm, Alexander Hamilton, The Doctor (EMH)
  "coastal-care": [12, 20, 25, 29], // Helen Cho, Sue Storm, Phlox, Dr. Zee
  "lakeside-medical": [13, 14, 16, 30], // Arnim Zola, Miguel O'Hara, Henry Wu, Zachary Smith
};