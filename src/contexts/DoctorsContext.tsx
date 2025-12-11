import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Doctor {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  phone: string;
  hospital: string;
  experience: string;
  rating: number;
  patients: number;
  status: 'available' | 'in-surgery' | 'in-consultation' | 'on-leave';
  nextAvailable: string;
  avatar: string | null;
  licenseNumber: string;
  education: string;
  consultationFee: number;
  bio: string;
  availableDays: string[];
}

interface DoctorsContextType {
  doctors: Doctor[];
  addDoctor: (doctor: Omit<Doctor, 'id' | 'name' | 'rating' | 'patients' | 'status' | 'nextAvailable' | 'avatar'>) => void;
  updateDoctor: (id: number, doctor: Partial<Doctor>) => void;
  deleteDoctor: (id: number) => void;
  getDoctorById: (id: number) => Doctor | undefined;
}

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    firstName: 'Sarah',
    lastName: 'Mitchell',
    specialty: 'Cardiology',
    email: 'sarah.mitchell@hospital.com',
    phone: '+1 (555) 123-4567',
    hospital: 'City General Hospital',
    experience: '15 years',
    rating: 4.9,
    patients: 1245,
    status: 'available',
    nextAvailable: 'Today, 2:00 PM',
    avatar: null,
    licenseNumber: 'MD-12345678',
    education: 'MD from Harvard Medical School',
    consultationFee: 150,
    bio: 'Experienced cardiologist specializing in heart diseases.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    firstName: 'Michael',
    lastName: 'Chen',
    specialty: 'Neurology',
    email: 'michael.chen@hospital.com',
    phone: '+1 (555) 234-5678',
    hospital: 'Metro Health Center',
    experience: '12 years',
    rating: 4.8,
    patients: 980,
    status: 'in-surgery',
    nextAvailable: 'Tomorrow, 9:00 AM',
    avatar: null,
    licenseNumber: 'MD-23456789',
    education: 'MD from Johns Hopkins University',
    consultationFee: 175,
    bio: 'Expert neurologist with focus on brain disorders.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
  },
  {
    id: 3,
    name: 'Dr. Emily Davis',
    firstName: 'Emily',
    lastName: 'Davis',
    specialty: 'Orthopedics',
    email: 'emily.davis@hospital.com',
    phone: '+1 (555) 345-6789',
    hospital: 'City General Hospital',
    experience: '10 years',
    rating: 4.7,
    patients: 876,
    status: 'available',
    nextAvailable: 'Today, 4:30 PM',
    avatar: null,
    licenseNumber: 'MD-34567890',
    education: 'MD from Stanford University',
    consultationFee: 160,
    bio: 'Specialized in bone and joint treatments.',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    firstName: 'James',
    lastName: 'Wilson',
    specialty: 'Pediatrics',
    email: 'james.wilson@hospital.com',
    phone: '+1 (555) 456-7890',
    hospital: 'Sunrise Medical Complex',
    experience: '8 years',
    rating: 4.9,
    patients: 1567,
    status: 'on-leave',
    nextAvailable: 'Next Week',
    avatar: null,
    licenseNumber: 'MD-45678901',
    education: 'MD from Yale Medical School',
    consultationFee: 120,
    bio: 'Caring pediatrician dedicated to children\'s health.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    firstName: 'Lisa',
    lastName: 'Anderson',
    specialty: 'Dermatology',
    email: 'lisa.anderson@hospital.com',
    phone: '+1 (555) 567-8901',
    hospital: 'Valley Regional Hospital',
    experience: '7 years',
    rating: 4.6,
    patients: 654,
    status: 'available',
    nextAvailable: 'Today, 11:00 AM',
    avatar: null,
    licenseNumber: 'MD-56789012',
    education: 'MD from UCLA Medical School',
    consultationFee: 140,
    bio: 'Expert in skin conditions and cosmetic dermatology.',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
  },
  {
    id: 6,
    name: 'Dr. Robert Taylor',
    firstName: 'Robert',
    lastName: 'Taylor',
    specialty: 'Oncology',
    email: 'robert.taylor@hospital.com',
    phone: '+1 (555) 678-9012',
    hospital: 'City General Hospital',
    experience: '20 years',
    rating: 4.9,
    patients: 2134,
    status: 'in-consultation',
    nextAvailable: 'Today, 5:00 PM',
    avatar: null,
    licenseNumber: 'MD-67890123',
    education: 'MD from Columbia University',
    consultationFee: 200,
    bio: 'Renowned oncologist with extensive cancer treatment experience.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
  },
];

const DoctorsContext = createContext<DoctorsContextType | undefined>(undefined);

export function DoctorsProvider({ children }: { children: ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);

  const addDoctor = (doctorData: Omit<Doctor, 'id' | 'name' | 'rating' | 'patients' | 'status' | 'nextAvailable' | 'avatar'>) => {
    const newDoctor: Doctor = {
      ...doctorData,
      id: Math.max(...doctors.map(d => d.id), 0) + 1,
      name: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
      rating: 5.0,
      patients: 0,
      status: 'available',
      nextAvailable: 'Today',
      avatar: null,
    };
    setDoctors(prev => [...prev, newDoctor]);
  };

  const updateDoctor = (id: number, doctorData: Partial<Doctor>) => {
    setDoctors(prev =>
      prev.map(doctor =>
        doctor.id === id ? { ...doctor, ...doctorData } : doctor
      )
    );
  };

  const deleteDoctor = (id: number) => {
    setDoctors(prev => prev.filter(doctor => doctor.id !== id));
  };

  const getDoctorById = (id: number) => {
    return doctors.find(doctor => doctor.id === id);
  };

  return (
    <DoctorsContext.Provider value={{ doctors, addDoctor, updateDoctor, deleteDoctor, getDoctorById }}>
      {children}
    </DoctorsContext.Provider>
  );
}

export function useDoctors() {
  const context = useContext(DoctorsContext);
  if (!context) {
    throw new Error('useDoctors must be used within a DoctorsProvider');
  }
  return context;
}
