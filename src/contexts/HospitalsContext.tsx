import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

export type HospitalStatus = "active" | "maintenance";

export interface Hospital {
  id: string;
  name: string;
  type: string;
  location: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  beds: number;
  doctors: number;
  staff: number;
  nurses: number;
  patients: number;
  occupancy: number;
  rating: number;
  status: HospitalStatus;
  establishedYear: number;
  accreditation: string;
  specialties: string[];
  description: string;
  address: string;
  heroImage?: string;
  gallery?: string[];
}

interface HospitalsContextType {
  hospitals: Hospital[];
  addHospital: (hospital: Omit<Hospital, "id" | "rating" | "patients" | "occupancy" | "status" | "heroImage">) => Hospital;
  updateHospital: (id: string, hospital: Partial<Hospital>) => void;
  getHospitalById: (id: string | number) => Hospital | undefined;
}

export const initialHospitals: Hospital[] = [
  {
    id: "city-general",
    name: "City General Hospital",
    type: "General Hospital",
    location: "Downtown District, 123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "+1 (555) 123-4567",
    email: "contact@citygeneral.com",
    website: "https://citygeneral.com",
    beds: 450,
    doctors: 85,
    staff: 1200,
    nurses: 320,
    patients: 3245,
    occupancy: 78,
    rating: 4.8,
    status: "active",
    establishedYear: 1985,
    accreditation: "JCI Accredited",
    specialties: ["Cardiology", "Neurology", "Oncology", "Orthopedics", "Pediatrics"],
    description:
      "City General Hospital is a leading healthcare facility providing comprehensive medical services with state-of-the-art technology and a team of experienced healthcare professionals.",
    address: "123 Healthcare Avenue",
    heroImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478248-054d60ab1ccb?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "metro-health",
    name: "Metro Health Center",
    type: "Multi-specialty",
    location: "Westside Avenue, 456 Park Blvd",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    phone: "+1 (555) 234-5678",
    email: "hello@metrohealth.com",
    website: "https://metrohealth.com",
    beds: 320,
    doctors: 72,
    staff: 850,
    nurses: 240,
    patients: 2876,
    occupancy: 85,
    rating: 4.6,
    status: "active",
    establishedYear: 1992,
    accreditation: "NABH Accredited",
    specialties: ["Neurology", "Gastroenterology", "Orthopedics", "Emergency"],
    description:
      "Metro Health Center focuses on rapid-response care with a strong emergency department and advanced neuro and ortho units.",
    address: "456 Park Boulevard",
    heroImage: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sunrise-medical",
    name: "Sunrise Medical Complex",
    type: "Specialty Hospital",
    location: "Eastside Boulevard, 789 Oak Lane",
    city: "Austin",
    state: "TX",
    zipCode: "73301",
    phone: "+1 (555) 345-6789",
    email: "care@sunrisemedical.com",
    website: "https://sunrisemedical.com",
    beds: 280,
    doctors: 58,
    staff: 720,
    nurses: 210,
    patients: 2134,
    occupancy: 65,
    rating: 4.7,
    status: "active",
    establishedYear: 2001,
    accreditation: "JCI Accredited",
    specialties: ["Pediatrics", "Women Health", "Orthopedics", "Rehabilitation"],
    description:
      "Sunrise Medical Complex blends family care with specialized pediatric and rehab programs tailored to long-term wellness.",
    address: "789 Oak Lane",
    heroImage: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "valley-regional",
    name: "Valley Regional Hospital",
    type: "Regional Center",
    location: "Northern Hills, 321 Valley Rd",
    city: "Denver",
    state: "CO",
    zipCode: "80014",
    phone: "+1 (555) 456-7890",
    email: "info@valleyregional.com",
    website: "https://valleyregional.com",
    beds: 200,
    doctors: 42,
    staff: 540,
    nurses: 150,
    patients: 1567,
    occupancy: 72,
    rating: 4.5,
    status: "active",
    establishedYear: 1998,
    accreditation: "NABH Accredited",
    specialties: ["Dermatology", "Psychiatry", "Cardiology"],
    description:
      "Valley Regional Hospital serves the northern community with accessible specialty clinics and a patient-first approach.",
    address: "321 Valley Road",
    heroImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "coastal-care",
    name: "Coastal Care Medical",
    type: "Coastal Care",
    location: "Seaside District, 654 Beach Ave",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    phone: "+1 (555) 567-8901",
    email: "hello@coastalcare.com",
    website: "https://coastalcare.com",
    beds: 180,
    doctors: 38,
    staff: 480,
    nurses: 140,
    patients: 1234,
    occupancy: 58,
    rating: 4.4,
    status: "maintenance",
    establishedYear: 2005,
    accreditation: "ISO Certified",
    specialties: ["Emergency", "Primary Care", "Orthopedics"],
    description:
      "Coastal Care Medical supports nearby communities with emergency readiness and holistic primary care programs.",
    address: "654 Beach Avenue",
    heroImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
  },
];

const HospitalsContext = createContext<HospitalsContextType | undefined>(undefined);

export function HospitalsProvider({ children }: { children: ReactNode }) {
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);

  const addHospital = (hospitalData: Omit<Hospital, "id" | "rating" | "patients" | "occupancy" | "status" | "heroImage">) => {
    const newHospital: Hospital = {
      ...hospitalData,
      id: hospitalData.name.toLowerCase().replace(/\s+/g, "-"),
      rating: 4.5,
      patients: 0,
      occupancy: 0,
      status: "active",
    };
    setHospitals((prev) => [...prev, newHospital]);
    return newHospital;
  };

  const updateHospital = (id: string, hospitalData: Partial<Hospital>) => {
    setHospitals((prev) => prev.map((hospital) => (hospital.id === id ? { ...hospital, ...hospitalData } : hospital)));
  };

  const getHospitalById = (id: string | number) => {
    const normalizedId = typeof id === "number" ? id.toString() : id;
    return hospitals.find((hospital) => hospital.id === normalizedId);
  };

  const contextValue = useMemo(
    () => ({
      hospitals,
      addHospital,
      updateHospital,
      getHospitalById,
    }),
    [hospitals]
  );

  return <HospitalsContext.Provider value={contextValue}>{children}</HospitalsContext.Provider>;
}

export function useHospitals() {
  const context = useContext(HospitalsContext);
  if (!context) {
    throw new Error("useHospitals must be used within a HospitalsProvider");
  }
  return context;
}

