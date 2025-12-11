import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface StaffMember {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  hospital: string;
  shift: string;
  status: 'on-duty' | 'off-duty' | 'on-leave';
  joinDate: string;
  employeeId: string;
  salary: number;
  emergencyContact: string;
}

interface StaffContextType {
  staffMembers: StaffMember[];
  addStaff: (staff: Omit<StaffMember, 'id' | 'name' | 'status'>) => void;
  updateStaff: (id: number, staff: Partial<StaffMember>) => void;
  deleteStaff: (id: number) => void;
  getStaffById: (id: number) => StaffMember | undefined;
}

const initialStaff: StaffMember[] = [
  {
    id: 1,
    name: 'Jennifer Adams',
    firstName: 'Jennifer',
    lastName: 'Adams',
    role: 'Head Nurse',
    department: 'ICU',
    email: 'jennifer.adams@hospital.com',
    phone: '+1 (555) 111-2222',
    hospital: 'City General Hospital',
    shift: 'Morning',
    status: 'on-duty',
    joinDate: '2019-03-15',
    employeeId: 'EMP-001',
    salary: 5500,
    emergencyContact: '+1 (555) 999-1111',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    firstName: 'Marcus',
    lastName: 'Johnson',
    role: 'Nurse',
    department: 'Emergency',
    email: 'marcus.johnson@hospital.com',
    phone: '+1 (555) 222-3333',
    hospital: 'City General Hospital',
    shift: 'Night',
    status: 'off-duty',
    joinDate: '2020-07-22',
    employeeId: 'EMP-002',
    salary: 4200,
    emergencyContact: '+1 (555) 999-2222',
  },
  {
    id: 3,
    name: 'Patricia Lee',
    firstName: 'Patricia',
    lastName: 'Lee',
    role: 'Lab Technician',
    department: 'Laboratory',
    email: 'patricia.lee@hospital.com',
    phone: '+1 (555) 333-4444',
    hospital: 'Metro Health Center',
    shift: 'Morning',
    status: 'on-duty',
    joinDate: '2018-11-08',
    employeeId: 'EMP-003',
    salary: 3800,
    emergencyContact: '+1 (555) 999-3333',
  },
  {
    id: 4,
    name: 'David Brown',
    firstName: 'David',
    lastName: 'Brown',
    role: 'Pharmacist',
    department: 'Pharmacy',
    email: 'david.brown@hospital.com',
    phone: '+1 (555) 444-5555',
    hospital: 'City General Hospital',
    shift: 'Afternoon',
    status: 'on-duty',
    joinDate: '2017-05-30',
    employeeId: 'EMP-004',
    salary: 5000,
    emergencyContact: '+1 (555) 999-4444',
  },
  {
    id: 5,
    name: 'Rachel Green',
    firstName: 'Rachel',
    lastName: 'Green',
    role: 'Radiologist Tech',
    department: 'Radiology',
    email: 'rachel.green@hospital.com',
    phone: '+1 (555) 555-6666',
    hospital: 'Sunrise Medical Complex',
    shift: 'Morning',
    status: 'on-leave',
    joinDate: '2021-02-14',
    employeeId: 'EMP-005',
    salary: 4500,
    emergencyContact: '+1 (555) 999-5555',
  },
  {
    id: 6,
    name: 'Thomas White',
    firstName: 'Thomas',
    lastName: 'White',
    role: 'Administrative Assistant',
    department: 'Administration',
    email: 'thomas.white@hospital.com',
    phone: '+1 (555) 666-7777',
    hospital: 'Valley Regional Hospital',
    shift: 'Morning',
    status: 'on-duty',
    joinDate: '2022-08-01',
    employeeId: 'EMP-006',
    salary: 3200,
    emergencyContact: '+1 (555) 999-6666',
  },
];

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export function StaffProvider({ children }: { children: ReactNode }) {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(initialStaff);

  const addStaff = (staffData: Omit<StaffMember, 'id' | 'name' | 'status'>) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: Math.max(...staffMembers.map(s => s.id), 0) + 1,
      name: `${staffData.firstName} ${staffData.lastName}`,
      status: 'on-duty',
    };
    setStaffMembers(prev => [...prev, newStaff]);
  };

  const updateStaff = (id: number, staffData: Partial<StaffMember>) => {
    setStaffMembers(prev =>
      prev.map(staff =>
        staff.id === id ? { ...staff, ...staffData } : staff
      )
    );
  };

  const deleteStaff = (id: number) => {
    setStaffMembers(prev => prev.filter(staff => staff.id !== id));
  };

  const getStaffById = (id: number) => {
    return staffMembers.find(staff => staff.id === id);
  };

  return (
    <StaffContext.Provider value={{ staffMembers, addStaff, updateStaff, deleteStaff, getStaffById }}>
      {children}
    </StaffContext.Provider>
  );
}

export function useStaff() {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
}
