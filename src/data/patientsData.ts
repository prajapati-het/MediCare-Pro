export interface Patient {
  id: number;
  doctorId: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  lastVisit: string;
  nextAppointment: string;
  condition: string;
  diagnosis: string;
  status: 'Active' | 'Critical' | 'Follow-up' | 'Recovered';
  allergies: string[];
  medications: string[];
  medicalHistory: string[];
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
    height: string;
  };
  notes: string;
}

export const patientsData: Patient[] = [
  // Dr. Sarah Mitchell (id: 1) - Cardiologist at City General Hospital
  {
    id: 1,
    doctorId: 1,
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 234-5678",
    email: "john.smith@email.com",
    address: "123 Oak Street, New York, NY 10001",
    bloodGroup: "A+",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-25",
    condition: "Hypertension",
    diagnosis: "Stage 2 Hypertension with mild cardiac stress",
    status: "Active",
    allergies: ["Penicillin", "Sulfa drugs"],
    medications: ["Lisinopril 10mg", "Metoprolol 50mg"],
    medicalHistory: ["Heart murmur (2018)", "Mild stroke (2020)"],
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceNumber: "BCB-123456789",
    emergencyContact: {
      name: "Mary Smith",
      relation: "Spouse",
      phone: "+1 (555) 234-5679"
    },
    vitals: {
      bloodPressure: "145/92 mmHg",
      heartRate: "78 bpm",
      temperature: "98.6°F",
      weight: "185 lbs",
      height: "5'10\""
    },
    notes: "Patient responding well to medication. Continue current treatment plan."
  },
  {
    id: 2,
    doctorId: 1,
    name: "Robert Wilson",
    age: 62,
    gender: "Male",
    phone: "+1 (555) 345-6789",
    email: "r.wilson@email.com",
    address: "456 Maple Avenue, New York, NY 10002",
    bloodGroup: "O+",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-28",
    condition: "Cardiac Arrhythmia",
    diagnosis: "Atrial Fibrillation with controlled ventricular response",
    status: "Critical",
    allergies: ["Aspirin"],
    medications: ["Warfarin 5mg", "Digoxin 0.25mg", "Metoprolol 100mg"],
    medicalHistory: ["Coronary bypass surgery (2019)", "Diabetes Type 2 (2015)"],
    insuranceProvider: "Aetna",
    insuranceNumber: "AET-987654321",
    emergencyContact: {
      name: "Susan Wilson",
      relation: "Daughter",
      phone: "+1 (555) 345-6780"
    },
    vitals: {
      bloodPressure: "138/88 mmHg",
      heartRate: "92 bpm (irregular)",
      temperature: "98.4°F",
      weight: "195 lbs",
      height: "5'11\""
    },
    notes: "Requires close monitoring. Consider ablation procedure if condition doesn't improve."
  },
  {
    id: 3,
    doctorId: 1,
    name: "Patricia Anderson",
    age: 55,
    gender: "Female",
    phone: "+1 (555) 456-7890",
    email: "p.anderson@email.com",
    address: "789 Pine Road, New York, NY 10003",
    bloodGroup: "B+",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-02-08",
    condition: "Heart Failure",
    diagnosis: "Congestive heart failure with preserved ejection fraction",
    status: "Follow-up",
    allergies: [],
    medications: ["Furosemide 40mg", "Lisinopril 20mg", "Spironolactone 25mg"],
    medicalHistory: ["Hypertension (2010)", "Heart attack (2021)"],
    insuranceProvider: "UnitedHealth",
    insuranceNumber: "UHC-456789123",
    emergencyContact: {
      name: "James Anderson",
      relation: "Spouse",
      phone: "+1 (555) 456-7891"
    },
    vitals: {
      bloodPressure: "128/82 mmHg",
      heartRate: "72 bpm",
      temperature: "98.5°F",
      weight: "155 lbs",
      height: "5'5\""
    },
    notes: "Stable condition. Continue current medications and lifestyle modifications."
  },

  // Dr. Michael Chen (id: 2) - Neurologist at Metro Health Center
  {
    id: 4,
    doctorId: 2,
    name: "Emily Martinez",
    age: 38,
    gender: "Female",
    phone: "+1 (555) 567-8901",
    email: "emily.martinez@email.com",
    address: "321 Elm Street, Chicago, IL 60601",
    bloodGroup: "AB+",
    lastVisit: "2024-01-11",
    nextAppointment: "2024-01-26",
    condition: "Migraine",
    diagnosis: "Chronic migraine with aura",
    status: "Active",
    allergies: ["Codeine"],
    medications: ["Sumatriptan 50mg", "Topiramate 100mg"],
    medicalHistory: ["Tension headaches (2018)"],
    insuranceProvider: "Cigna",
    insuranceNumber: "CIG-789012345",
    emergencyContact: {
      name: "Carlos Martinez",
      relation: "Spouse",
      phone: "+1 (555) 567-8902"
    },
    vitals: {
      bloodPressure: "118/75 mmHg",
      heartRate: "68 bpm",
      temperature: "98.7°F",
      weight: "140 lbs",
      height: "5'6\""
    },
    notes: "Migraine frequency reduced with current treatment. Consider Botox if no further improvement."
  },
  {
    id: 5,
    doctorId: 2,
    name: "David Thompson",
    age: 67,
    gender: "Male",
    phone: "+1 (555) 678-9012",
    email: "d.thompson@email.com",
    address: "654 Cedar Lane, Chicago, IL 60602",
    bloodGroup: "A-",
    lastVisit: "2024-01-09",
    nextAppointment: "2024-01-30",
    condition: "Parkinson's Disease",
    diagnosis: "Early-stage Parkinson's disease with mild tremor",
    status: "Active",
    allergies: [],
    medications: ["Carbidopa-Levodopa 25/100mg", "Pramipexole 0.5mg"],
    medicalHistory: ["Essential tremor (2019)"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MED-321654987",
    emergencyContact: {
      name: "Linda Thompson",
      relation: "Spouse",
      phone: "+1 (555) 678-9013"
    },
    vitals: {
      bloodPressure: "132/84 mmHg",
      heartRate: "74 bpm",
      temperature: "98.3°F",
      weight: "168 lbs",
      height: "5'9\""
    },
    notes: "Symptoms manageable with medication. Physical therapy recommended."
  },
  {
    id: 6,
    doctorId: 2,
    name: "Jennifer Lee",
    age: 42,
    gender: "Female",
    phone: "+1 (555) 789-0123",
    email: "j.lee@email.com",
    address: "987 Birch Avenue, Chicago, IL 60603",
    bloodGroup: "O-",
    lastVisit: "2024-01-13",
    nextAppointment: "2024-02-13",
    condition: "Multiple Sclerosis",
    diagnosis: "Relapsing-remitting multiple sclerosis",
    status: "Follow-up",
    allergies: ["Latex"],
    medications: ["Ocrelizumab infusion", "Baclofen 10mg"],
    medicalHistory: ["Optic neuritis (2020)", "Fatigue syndrome (2021)"],
    insuranceProvider: "Humana",
    insuranceNumber: "HUM-654321789",
    emergencyContact: {
      name: "Michael Lee",
      relation: "Brother",
      phone: "+1 (555) 789-0124"
    },
    vitals: {
      bloodPressure: "115/72 mmHg",
      heartRate: "70 bpm",
      temperature: "98.6°F",
      weight: "135 lbs",
      height: "5'4\""
    },
    notes: "No new lesions on recent MRI. Continue infusion therapy every 6 months."
  },

  // Dr. Emily Davis (id: 3) - Orthopedics at City General Hospital
  {
    id: 7,
    doctorId: 3,
    name: "Michael Brown",
    age: 35,
    gender: "Male",
    phone: "+1 (555) 890-1234",
    email: "m.brown@email.com",
    address: "147 Walnut Street, New York, NY 10004",
    bloodGroup: "B-",
    lastVisit: "2024-01-14",
    nextAppointment: "2024-01-21",
    condition: "ACL Tear",
    diagnosis: "Complete anterior cruciate ligament tear - post-surgery recovery",
    status: "Follow-up",
    allergies: ["Ibuprofen"],
    medications: ["Acetaminophen 500mg", "Gabapentin 300mg"],
    medicalHistory: ["Knee sprain (2022)"],
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceNumber: "BCB-147258369",
    emergencyContact: {
      name: "Sarah Brown",
      relation: "Spouse",
      phone: "+1 (555) 890-1235"
    },
    vitals: {
      bloodPressure: "122/78 mmHg",
      heartRate: "65 bpm",
      temperature: "98.4°F",
      weight: "175 lbs",
      height: "6'0\""
    },
    notes: "Surgery successful. Begin physical therapy in 2 weeks."
  },
  {
    id: 8,
    doctorId: 3,
    name: "Karen White",
    age: 58,
    gender: "Female",
    phone: "+1 (555) 901-2345",
    email: "k.white@email.com",
    address: "258 Cherry Lane, New York, NY 10005",
    bloodGroup: "A+",
    lastVisit: "2024-01-07",
    nextAppointment: "2024-02-07",
    condition: "Osteoarthritis",
    diagnosis: "Severe osteoarthritis of both knees",
    status: "Active",
    allergies: ["Shellfish"],
    medications: ["Celecoxib 200mg", "Glucosamine supplement"],
    medicalHistory: ["Knee replacement - right (2020)"],
    insuranceProvider: "Aetna",
    insuranceNumber: "AET-258369147",
    emergencyContact: {
      name: "Tom White",
      relation: "Spouse",
      phone: "+1 (555) 901-2346"
    },
    vitals: {
      bloodPressure: "135/85 mmHg",
      heartRate: "72 bpm",
      temperature: "98.5°F",
      weight: "165 lbs",
      height: "5'7\""
    },
    notes: "Consider left knee replacement. Patient hesitant, will reassess in 1 month."
  },

  // Dr. James Wilson (id: 4) - Pediatrics at Sunrise Medical Complex
  {
    id: 9,
    doctorId: 4,
    name: "Tommy Garcia",
    age: 8,
    gender: "Male",
    phone: "+1 (555) 012-3456",
    email: "garcia.family@email.com",
    address: "369 Spruce Drive, Austin, TX 73301",
    bloodGroup: "O+",
    lastVisit: "2024-01-06",
    nextAppointment: "2024-02-06",
    condition: "Asthma",
    diagnosis: "Mild persistent asthma",
    status: "Active",
    allergies: ["Peanuts", "Dust mites"],
    medications: ["Albuterol inhaler", "Fluticasone inhaler"],
    medicalHistory: ["Bronchitis (2022)", "Ear infections (2021)"],
    insuranceProvider: "UnitedHealth",
    insuranceNumber: "UHC-369147258",
    emergencyContact: {
      name: "Maria Garcia",
      relation: "Mother",
      phone: "+1 (555) 012-3457"
    },
    vitals: {
      bloodPressure: "95/60 mmHg",
      heartRate: "88 bpm",
      temperature: "98.6°F",
      weight: "58 lbs",
      height: "4'2\""
    },
    notes: "Asthma well controlled. Continue current medications. Review inhaler technique."
  },
  {
    id: 10,
    doctorId: 4,
    name: "Sophia Chen",
    age: 5,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "chen.family@email.com",
    address: "741 Ash Street, Austin, TX 73302",
    bloodGroup: "AB-",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-19",
    condition: "Ear Infection",
    diagnosis: "Acute otitis media - bilateral",
    status: "Active",
    allergies: ["Amoxicillin"],
    medications: ["Azithromycin suspension", "Acetaminophen"],
    medicalHistory: ["Previous ear infections (2023)"],
    insuranceProvider: "Cigna",
    insuranceNumber: "CIG-741852963",
    emergencyContact: {
      name: "Lisa Chen",
      relation: "Mother",
      phone: "+1 (555) 123-4568"
    },
    vitals: {
      bloodPressure: "90/58 mmHg",
      heartRate: "95 bpm",
      temperature: "100.2°F",
      weight: "42 lbs",
      height: "3'6\""
    },
    notes: "Mild fever. If no improvement in 48 hours, consider ENT referral."
  },

  // Dr. Lisa Anderson (id: 5) - Dermatology at Valley Regional Hospital
  {
    id: 11,
    doctorId: 5,
    name: "Amanda Taylor",
    age: 29,
    gender: "Female",
    phone: "+1 (555) 234-5678",
    email: "a.taylor@email.com",
    address: "852 Hickory Road, Denver, CO 80014",
    bloodGroup: "A+",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-02-10",
    condition: "Acne",
    diagnosis: "Moderate inflammatory acne vulgaris",
    status: "Active",
    allergies: [],
    medications: ["Tretinoin cream 0.025%", "Doxycycline 100mg"],
    medicalHistory: [],
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceNumber: "BCB-852963741",
    emergencyContact: {
      name: "Mark Taylor",
      relation: "Brother",
      phone: "+1 (555) 234-5679"
    },
    vitals: {
      bloodPressure: "110/70 mmHg",
      heartRate: "68 bpm",
      temperature: "98.6°F",
      weight: "130 lbs",
      height: "5'5\""
    },
    notes: "Good improvement noted. Continue treatment for 3 more months."
  },
  {
    id: 12,
    doctorId: 5,
    name: "George Miller",
    age: 72,
    gender: "Male",
    phone: "+1 (555) 345-6789",
    email: "g.miller@email.com",
    address: "963 Willow Lane, Denver, CO 80015",
    bloodGroup: "O+",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-01-22",
    condition: "Skin Cancer Screening",
    diagnosis: "Basal cell carcinoma - excised",
    status: "Follow-up",
    allergies: ["Latex"],
    medications: ["Imiquimod cream"],
    medicalHistory: ["Previous skin cancer (2019)", "Sun damage"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MED-963852741",
    emergencyContact: {
      name: "Helen Miller",
      relation: "Spouse",
      phone: "+1 (555) 345-6780"
    },
    vitals: {
      bloodPressure: "142/88 mmHg",
      heartRate: "76 bpm",
      temperature: "98.4°F",
      weight: "172 lbs",
      height: "5'10\""
    },
    notes: "Excision margins clear. Schedule 6-month full body skin exam."
  },

  // Dr. Robert Taylor (id: 6) - Oncology at City General Hospital
  {
    id: 13,
    doctorId: 6,
    name: "Richard Davis",
    age: 58,
    gender: "Male",
    phone: "+1 (555) 456-7890",
    email: "r.davis@email.com",
    address: "159 Cypress Avenue, New York, NY 10006",
    bloodGroup: "B+",
    lastVisit: "2024-01-11",
    nextAppointment: "2024-01-18",
    condition: "Lung Cancer",
    diagnosis: "Stage IIIA non-small cell lung cancer",
    status: "Critical",
    allergies: ["Contrast dye"],
    medications: ["Pembrolizumab infusion", "Ondansetron 8mg", "Dexamethasone 4mg"],
    medicalHistory: ["Smoker for 30 years (quit 2020)", "COPD (2018)"],
    insuranceProvider: "Aetna",
    insuranceNumber: "AET-159357486",
    emergencyContact: {
      name: "Nancy Davis",
      relation: "Spouse",
      phone: "+1 (555) 456-7891"
    },
    vitals: {
      bloodPressure: "128/80 mmHg",
      heartRate: "82 bpm",
      temperature: "98.8°F",
      weight: "162 lbs",
      height: "5'11\""
    },
    notes: "Responding to immunotherapy. Next PET scan in 4 weeks."
  },
  {
    id: 14,
    doctorId: 6,
    name: "Sandra Johnson",
    age: 45,
    gender: "Female",
    phone: "+1 (555) 567-8901",
    email: "s.johnson@email.com",
    address: "267 Redwood Street, New York, NY 10007",
    bloodGroup: "A-",
    lastVisit: "2024-01-13",
    nextAppointment: "2024-01-20",
    condition: "Breast Cancer",
    diagnosis: "Stage IIA invasive ductal carcinoma - post-lumpectomy",
    status: "Follow-up",
    allergies: [],
    medications: ["Tamoxifen 20mg", "Vitamin D supplement"],
    medicalHistory: ["BRCA2 positive"],
    insuranceProvider: "UnitedHealth",
    insuranceNumber: "UHC-267159348",
    emergencyContact: {
      name: "David Johnson",
      relation: "Spouse",
      phone: "+1 (555) 567-8902"
    },
    vitals: {
      bloodPressure: "118/74 mmHg",
      heartRate: "70 bpm",
      temperature: "98.5°F",
      weight: "145 lbs",
      height: "5'6\""
    },
    notes: "Radiation therapy completed. Continue hormone therapy for 5 years."
  },
  {
    id: 15,
    doctorId: 6,
    name: "William Clark",
    age: 65,
    gender: "Male",
    phone: "+1 (555) 678-9012",
    email: "w.clark@email.com",
    address: "378 Sequoia Drive, New York, NY 10008",
    bloodGroup: "O+",
    lastVisit: "2024-01-09",
    nextAppointment: "2024-02-09",
    condition: "Colon Cancer",
    diagnosis: "Stage II colon adenocarcinoma - post-surgery",
    status: "Recovered",
    allergies: ["Morphine"],
    medications: ["Multivitamin", "Iron supplement"],
    medicalHistory: ["Polyps removed (2018)", "Family history of colon cancer"],
    insuranceProvider: "Cigna",
    insuranceNumber: "CIG-378264159",
    emergencyContact: {
      name: "Margaret Clark",
      relation: "Spouse",
      phone: "+1 (555) 678-9013"
    },
    vitals: {
      bloodPressure: "125/78 mmHg",
      heartRate: "68 bpm",
      temperature: "98.6°F",
      weight: "178 lbs",
      height: "6'0\""
    },
    notes: "Cancer free for 2 years. Annual colonoscopy scheduled."
  }
];

export const getPatientsByDoctorId = (doctorId: number): Patient[] => {
  return patientsData.filter(patient => patient.doctorId === doctorId);
};

export const getPatientById = (patientId: number): Patient | undefined => {
  return patientsData.find(patient => patient.id === patientId);
};
