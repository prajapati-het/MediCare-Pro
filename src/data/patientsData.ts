// Patient data mapped to specific doctors by doctorId
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
  tag: 'critical' | 'follow-up' | 'normal' | 'new' | 'chronic';
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
    bmi: string;
    oxygenSaturation: string;
    respiratoryRate: string;
  };
  bodyCharacteristics: {
    skinType: string;
    eyeColor: string;
    hairColor: string;
    bodyType: string;
  };
  lifestyle: {
    smokingStatus: string;
    alcoholConsumption: string;
    exerciseFrequency: string;
    dietType: string;
    sleepHours: string;
  };
  labResults: {
    testName: string;
    value: string;
    normalRange: string;
    date: string;
    status: 'Normal' | 'Abnormal' | 'Critical';
  }[];
  prescriptions: {
    medication: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
    prescribedBy: string;
  }[];
  visitHistory: {
    date: string;
    reason: string;
    diagnosis: string;
    treatment: string;
  }[];
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
    lastVisit: "2025-12-10",
    nextAppointment: "2025-12-25",
    condition: "Hypertension",
    diagnosis: "Stage 2 Hypertension with mild cardiac stress",
    status: "Active",
    tag: "chronic",
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
      height: "5'10\"",
      bmi: "26.5",
      oxygenSaturation: "97%",
      respiratoryRate: "16 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Normal",
      eyeColor: "Brown",
      hairColor: "Gray",
      bodyType: "Endomorph"
    },
    lifestyle: {
      smokingStatus: "Former smoker (quit 2019)",
      alcoholConsumption: "Occasional (1-2 drinks/week)",
      exerciseFrequency: "2-3 times/week",
      dietType: "Low sodium diet",
      sleepHours: "6-7 hours"
    },
    labResults: [
      { testName: "Cholesterol", value: "210 mg/dL", normalRange: "<200 mg/dL", date: "2025-12-05", status: "Abnormal" },
      { testName: "Blood Glucose", value: "105 mg/dL", normalRange: "70-100 mg/dL", date: "2025-12-05", status: "Abnormal" },
      { testName: "Creatinine", value: "1.1 mg/dL", normalRange: "0.7-1.3 mg/dL", date: "2025-12-05", status: "Normal" }
    ],
    prescriptions: [
      { medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2025-11-01", endDate: "2026-05-01", prescribedBy: "Dr. Sarah Mitchell" },
      { medication: "Metoprolol", dosage: "50mg", frequency: "Twice daily", startDate: "2025-11-01", endDate: "2026-05-01", prescribedBy: "Dr. Sarah Mitchell" }
    ],
    visitHistory: [
      { date: "2025-12-10", reason: "Follow-up", diagnosis: "Hypertension controlled", treatment: "Continue current medications" },
      { date: "2025-11-15", reason: "Blood pressure spike", diagnosis: "Uncontrolled hypertension", treatment: "Increased Lisinopril dosage" }
    ],
    notes: "Patient responding well to medication. Continue current treatment plan. Monitor sodium intake closely."
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
    lastVisit: "2025-12-12",
    nextAppointment: "2025-12-28",
    condition: "Cardiac Arrhythmia",
    diagnosis: "Atrial Fibrillation with controlled ventricular response",
    status: "Critical",
    tag: "critical",
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
      height: "5'11\"",
      bmi: "27.2",
      oxygenSaturation: "94%",
      respiratoryRate: "18 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Dry",
      eyeColor: "Blue",
      hairColor: "White",
      bodyType: "Mesomorph"
    },
    lifestyle: {
      smokingStatus: "Never smoked",
      alcoholConsumption: "None",
      exerciseFrequency: "Light walking daily",
      dietType: "Diabetic-friendly diet",
      sleepHours: "5-6 hours"
    },
    labResults: [
      { testName: "INR", value: "2.5", normalRange: "2.0-3.0", date: "2025-12-10", status: "Normal" },
      { testName: "HbA1c", value: "7.2%", normalRange: "<7%", date: "2025-12-10", status: "Abnormal" },
      { testName: "BNP", value: "450 pg/mL", normalRange: "<100 pg/mL", date: "2025-12-10", status: "Critical" }
    ],
    prescriptions: [
      { medication: "Warfarin", dosage: "5mg", frequency: "Once daily", startDate: "2025-10-01", endDate: "2026-04-01", prescribedBy: "Dr. Sarah Mitchell" },
      { medication: "Digoxin", dosage: "0.25mg", frequency: "Once daily", startDate: "2025-10-01", endDate: "2026-04-01", prescribedBy: "Dr. Sarah Mitchell" }
    ],
    visitHistory: [
      { date: "2025-12-12", reason: "Irregular heartbeat", diagnosis: "AFib episode", treatment: "Adjusted Digoxin dosage" },
      { date: "2025-11-28", reason: "Routine check", diagnosis: "Stable AFib", treatment: "Continue treatment" }
    ],
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
    lastVisit: "2025-12-08",
    nextAppointment: "2026-01-08",
    condition: "Heart Failure",
    diagnosis: "Congestive heart failure with preserved ejection fraction",
    status: "Follow-up",
    tag: "follow-up",
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
      height: "5'5\"",
      bmi: "25.8",
      oxygenSaturation: "96%",
      respiratoryRate: "17 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Combination",
      eyeColor: "Green",
      hairColor: "Brown with gray",
      bodyType: "Ectomorph"
    },
    lifestyle: {
      smokingStatus: "Never smoked",
      alcoholConsumption: "None",
      exerciseFrequency: "Light activity as tolerated",
      dietType: "Heart-healthy, low sodium",
      sleepHours: "7-8 hours"
    },
    labResults: [
      { testName: "BNP", value: "180 pg/mL", normalRange: "<100 pg/mL", date: "2025-12-05", status: "Abnormal" },
      { testName: "Sodium", value: "138 mEq/L", normalRange: "136-145 mEq/L", date: "2025-12-05", status: "Normal" },
      { testName: "Potassium", value: "4.2 mEq/L", normalRange: "3.5-5.0 mEq/L", date: "2025-12-05", status: "Normal" }
    ],
    prescriptions: [
      { medication: "Furosemide", dosage: "40mg", frequency: "Once daily", startDate: "2025-09-01", endDate: "2026-03-01", prescribedBy: "Dr. Sarah Mitchell" },
      { medication: "Lisinopril", dosage: "20mg", frequency: "Once daily", startDate: "2025-09-01", endDate: "2026-03-01", prescribedBy: "Dr. Sarah Mitchell" }
    ],
    visitHistory: [
      { date: "2025-12-08", reason: "Routine follow-up", diagnosis: "Stable heart failure", treatment: "Continue current regimen" },
      { date: "2025-11-08", reason: "Shortness of breath", diagnosis: "Mild fluid retention", treatment: "Increased Furosemide temporarily" }
    ],
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
    lastVisit: "2025-12-11",
    nextAppointment: "2025-12-26",
    condition: "Migraine",
    diagnosis: "Chronic migraine with aura",
    status: "Active",
    tag: "chronic",
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
      height: "5'6\"",
      bmi: "22.6",
      oxygenSaturation: "99%",
      respiratoryRate: "14 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Oily",
      eyeColor: "Brown",
      hairColor: "Black",
      bodyType: "Mesomorph"
    },
    lifestyle: {
      smokingStatus: "Never smoked",
      alcoholConsumption: "Minimal (triggers migraines)",
      exerciseFrequency: "3-4 times/week",
      dietType: "Migraine-trigger free diet",
      sleepHours: "7-8 hours"
    },
    labResults: [
      { testName: "CBC", value: "Normal", normalRange: "Normal", date: "2025-12-01", status: "Normal" },
      { testName: "Thyroid Panel", value: "Normal", normalRange: "Normal", date: "2025-12-01", status: "Normal" }
    ],
    prescriptions: [
      { medication: "Sumatriptan", dosage: "50mg", frequency: "As needed for migraine", startDate: "2025-10-15", endDate: "2026-04-15", prescribedBy: "Dr. Michael Chen" },
      { medication: "Topiramate", dosage: "100mg", frequency: "Once daily", startDate: "2025-10-15", endDate: "2026-04-15", prescribedBy: "Dr. Michael Chen" }
    ],
    visitHistory: [
      { date: "2025-12-11", reason: "Migraine frequency check", diagnosis: "Reduced migraine episodes", treatment: "Continue current treatment" },
      { date: "2025-11-11", reason: "New aura symptoms", diagnosis: "Migraine with visual aura", treatment: "Added Topiramate" }
    ],
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
    lastVisit: "2025-12-09",
    nextAppointment: "2025-12-30",
    condition: "Parkinson's Disease",
    diagnosis: "Early-stage Parkinson's disease with mild tremor",
    status: "Active",
    tag: "chronic",
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
      height: "5'9\"",
      bmi: "24.8",
      oxygenSaturation: "97%",
      respiratoryRate: "15 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Normal",
      eyeColor: "Hazel",
      hairColor: "Gray",
      bodyType: "Ectomorph"
    },
    lifestyle: {
      smokingStatus: "Former smoker (quit 2000)",
      alcoholConsumption: "None",
      exerciseFrequency: "Daily physical therapy",
      dietType: "Balanced diet",
      sleepHours: "6-7 hours"
    },
    labResults: [
      { testName: "Dopamine levels", value: "Within range", normalRange: "Variable", date: "2025-11-20", status: "Normal" },
      { testName: "Vitamin D", value: "28 ng/mL", normalRange: "30-100 ng/mL", date: "2025-11-20", status: "Abnormal" }
    ],
    prescriptions: [
      { medication: "Carbidopa-Levodopa", dosage: "25/100mg", frequency: "Three times daily", startDate: "2025-08-01", endDate: "2026-02-01", prescribedBy: "Dr. Michael Chen" },
      { medication: "Pramipexole", dosage: "0.5mg", frequency: "Three times daily", startDate: "2025-08-01", endDate: "2026-02-01", prescribedBy: "Dr. Michael Chen" }
    ],
    visitHistory: [
      { date: "2025-12-09", reason: "Tremor assessment", diagnosis: "Stable Parkinson's", treatment: "Continue medications" },
      { date: "2025-11-09", reason: "Gait issues", diagnosis: "Mild freezing episodes", treatment: "Physical therapy added" }
    ],
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
    lastVisit: "2025-12-13",
    nextAppointment: "2026-01-13",
    condition: "Multiple Sclerosis",
    diagnosis: "Relapsing-remitting multiple sclerosis",
    status: "Follow-up",
    tag: "follow-up",
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
      height: "5'4\"",
      bmi: "23.2",
      oxygenSaturation: "98%",
      respiratoryRate: "14 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Sensitive",
      eyeColor: "Brown",
      hairColor: "Black",
      bodyType: "Ectomorph"
    },
    lifestyle: {
      smokingStatus: "Never smoked",
      alcoholConsumption: "None",
      exerciseFrequency: "Gentle yoga 2x/week",
      dietType: "Anti-inflammatory diet",
      sleepHours: "8-9 hours"
    },
    labResults: [
      { testName: "MRI Brain", value: "No new lesions", normalRange: "N/A", date: "2025-12-01", status: "Normal" },
      { testName: "Vitamin B12", value: "450 pg/mL", normalRange: "200-900 pg/mL", date: "2025-12-01", status: "Normal" }
    ],
    prescriptions: [
      { medication: "Ocrelizumab", dosage: "300mg", frequency: "Every 6 months", startDate: "2025-06-01", endDate: "2026-06-01", prescribedBy: "Dr. Michael Chen" },
      { medication: "Baclofen", dosage: "10mg", frequency: "Three times daily", startDate: "2025-09-01", endDate: "2026-03-01", prescribedBy: "Dr. Michael Chen" }
    ],
    visitHistory: [
      { date: "2025-12-13", reason: "MRI follow-up", diagnosis: "Stable MS", treatment: "Continue infusion therapy" },
      { date: "2025-10-13", reason: "Muscle spasms", diagnosis: "MS-related spasticity", treatment: "Started Baclofen" }
    ],
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
    lastVisit: "2025-12-14",
    nextAppointment: "2025-12-21",
    condition: "ACL Tear",
    diagnosis: "Complete anterior cruciate ligament tear - post-surgery recovery",
    status: "Follow-up",
    tag: "follow-up",
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
      height: "6'0\"",
      bmi: "23.7",
      oxygenSaturation: "99%",
      respiratoryRate: "14 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Normal",
      eyeColor: "Blue",
      hairColor: "Brown",
      bodyType: "Mesomorph"
    },
    lifestyle: {
      smokingStatus: "Never smoked",
      alcoholConsumption: "Social drinker",
      exerciseFrequency: "Currently in PT (was active athlete)",
      dietType: "High protein for recovery",
      sleepHours: "7-8 hours"
    },
    labResults: [
      { testName: "CRP", value: "0.8 mg/L", normalRange: "<3 mg/L", date: "2025-12-10", status: "Normal" },
      { testName: "CBC", value: "Normal", normalRange: "Normal", date: "2025-12-10", status: "Normal" }
    ],
    prescriptions: [
      { medication: "Acetaminophen", dosage: "500mg", frequency: "As needed for pain", startDate: "2025-11-20", endDate: "2025-12-31", prescribedBy: "Dr. Emily Davis" },
      { medication: "Gabapentin", dosage: "300mg", frequency: "At bedtime", startDate: "2025-11-20", endDate: "2025-12-31", prescribedBy: "Dr. Emily Davis" }
    ],
    visitHistory: [
      { date: "2025-12-14", reason: "Post-op check", diagnosis: "Good healing progress", treatment: "Continue PT" },
      { date: "2025-11-20", reason: "ACL surgery", diagnosis: "Complete ACL tear repair", treatment: "Surgery performed" }
    ],
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
    lastVisit: "2025-12-07",
    nextAppointment: "2026-01-07",
    condition: "Osteoarthritis",
    diagnosis: "Severe osteoarthritis of both knees",
    status: "Active",
    tag: "chronic",
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
      height: "5'7\"",
      bmi: "25.8",
      oxygenSaturation: "97%",
      respiratoryRate: "16 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Dry",
      eyeColor: "Hazel",
      hairColor: "Blonde with gray",
      bodyType: "Endomorph"
    },
    lifestyle: {
      smokingStatus: "Never smoked",
      alcoholConsumption: "Wine occasionally",
      exerciseFrequency: "Water aerobics 2x/week",
      dietType: "Anti-inflammatory diet",
      sleepHours: "6-7 hours"
    },
    labResults: [
      { testName: "X-Ray Left Knee", value: "Severe OA", normalRange: "N/A", date: "2025-12-01", status: "Abnormal" },
      { testName: "ESR", value: "25 mm/hr", normalRange: "<20 mm/hr", date: "2025-12-01", status: "Abnormal" }
    ],
    prescriptions: [
      { medication: "Celecoxib", dosage: "200mg", frequency: "Once daily", startDate: "2025-10-01", endDate: "2026-04-01", prescribedBy: "Dr. Emily Davis" },
      { medication: "Glucosamine", dosage: "1500mg", frequency: "Once daily", startDate: "2025-10-01", endDate: "2026-04-01", prescribedBy: "Dr. Emily Davis" }
    ],
    visitHistory: [
      { date: "2025-12-07", reason: "Pain management", diagnosis: "Progressive left knee OA", treatment: "Discuss surgery options" },
      { date: "2025-11-07", reason: "X-ray review", diagnosis: "Bone-on-bone left knee", treatment: "Consider replacement" }
    ],
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
    lastVisit: "2025-12-06",
    nextAppointment: "2026-01-06",
    condition: "Asthma",
    diagnosis: "Mild persistent asthma",
    status: "Active",
    tag: "normal",
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
      height: "4'2\"",
      bmi: "16.1",
      oxygenSaturation: "98%",
      respiratoryRate: "20 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Normal",
      eyeColor: "Brown",
      hairColor: "Black",
      bodyType: "Average for age"
    },
    lifestyle: {
      smokingStatus: "N/A - Child",
      alcoholConsumption: "N/A - Child",
      exerciseFrequency: "Active, plays soccer",
      dietType: "Standard pediatric diet",
      sleepHours: "9-10 hours"
    },
    labResults: [
      { testName: "Peak Flow", value: "280 L/min", normalRange: "260-340 L/min", date: "2025-12-06", status: "Normal" },
      { testName: "Allergy Panel", value: "Positive for dust, peanuts", normalRange: "N/A", date: "2025-11-01", status: "Abnormal" }
    ],
    prescriptions: [
      { medication: "Albuterol", dosage: "90mcg", frequency: "As needed", startDate: "2025-09-01", endDate: "2026-09-01", prescribedBy: "Dr. James Wilson" },
      { medication: "Fluticasone", dosage: "44mcg", frequency: "Twice daily", startDate: "2025-09-01", endDate: "2026-09-01", prescribedBy: "Dr. James Wilson" }
    ],
    visitHistory: [
      { date: "2025-12-06", reason: "Asthma check", diagnosis: "Well-controlled asthma", treatment: "Continue inhalers" },
      { date: "2025-09-06", reason: "Wheezi episode", diagnosis: "Asthma exacerbation", treatment: "Started daily inhaler" }
    ],
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
    lastVisit: "2025-12-12",
    nextAppointment: "2025-12-19",
    condition: "Ear Infection",
    diagnosis: "Acute otitis media - bilateral",
    status: "Active",
    tag: "new",
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
      height: "3'6\"",
      bmi: "15.8",
      oxygenSaturation: "98%",
      respiratoryRate: "22 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Sensitive",
      eyeColor: "Brown",
      hairColor: "Black",
      bodyType: "Average for age"
    },
    lifestyle: {
      smokingStatus: "N/A - Child",
      alcoholConsumption: "N/A - Child",
      exerciseFrequency: "Active preschooler",
      dietType: "Standard pediatric diet",
      sleepHours: "10-11 hours"
    },
    labResults: [
      { testName: "Ear Exam", value: "Bilateral fluid", normalRange: "Clear", date: "2025-12-12", status: "Abnormal" },
      { testName: "Temperature", value: "100.2°F", normalRange: "97-99°F", date: "2025-12-12", status: "Abnormal" }
    ],
    prescriptions: [
      { medication: "Azithromycin", dosage: "100mg/5mL", frequency: "Once daily for 5 days", startDate: "2025-12-12", endDate: "2025-12-17", prescribedBy: "Dr. James Wilson" },
      { medication: "Acetaminophen", dosage: "160mg", frequency: "Every 4-6 hours as needed", startDate: "2025-12-12", endDate: "2025-12-19", prescribedBy: "Dr. James Wilson" }
    ],
    visitHistory: [
      { date: "2025-12-12", reason: "Ear pain, fever", diagnosis: "Bilateral otitis media", treatment: "Antibiotic started" },
      { date: "2025-09-15", reason: "Wellness check", diagnosis: "Healthy", treatment: "Vaccinations updated" }
    ],
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
    lastVisit: "2025-12-10",
    nextAppointment: "2026-01-10",
    condition: "Acne",
    diagnosis: "Moderate inflammatory acne vulgaris",
    status: "Active",
    tag: "normal",
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
      height: "5'5\"",
      bmi: "21.6",
      oxygenSaturation: "99%",
      respiratoryRate: "14 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Oily, acne-prone",
      eyeColor: "Blue",
      hairColor: "Blonde",
      bodyType: "Ectomorph"
    },
    lifestyle: {
      smokingStatus: "Never smoked",
      alcoholConsumption: "Social drinker",
      exerciseFrequency: "5x/week gym",
      dietType: "Low dairy, low sugar",
      sleepHours: "7-8 hours"
    },
    labResults: [
      { testName: "Hormone Panel", value: "Normal", normalRange: "Normal", date: "2025-11-15", status: "Normal" }
    ],
    prescriptions: [
      { medication: "Tretinoin", dosage: "0.025%", frequency: "Once at bedtime", startDate: "2025-10-01", endDate: "2026-04-01", prescribedBy: "Dr. Lisa Anderson" },
      { medication: "Doxycycline", dosage: "100mg", frequency: "Twice daily", startDate: "2025-10-01", endDate: "2026-01-01", prescribedBy: "Dr. Lisa Anderson" }
    ],
    visitHistory: [
      { date: "2025-12-10", reason: "Acne follow-up", diagnosis: "Improving acne", treatment: "Continue treatment" },
      { date: "2025-10-10", reason: "Acne flare", diagnosis: "Moderate acne", treatment: "Started oral antibiotic" }
    ],
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
    lastVisit: "2025-12-08",
    nextAppointment: "2025-12-22",
    condition: "Skin Cancer Screening",
    diagnosis: "Basal cell carcinoma - excised",
    status: "Follow-up",
    tag: "follow-up",
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
      height: "5'10\"",
      bmi: "24.7",
      oxygenSaturation: "96%",
      respiratoryRate: "16 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Fair, sun-damaged",
      eyeColor: "Blue",
      hairColor: "White",
      bodyType: "Mesomorph"
    },
    lifestyle: {
      smokingStatus: "Former smoker (quit 1990)",
      alcoholConsumption: "Occasional beer",
      exerciseFrequency: "Daily walks",
      dietType: "Standard",
      sleepHours: "6-7 hours"
    },
    labResults: [
      { testName: "Biopsy", value: "BCC - margins clear", normalRange: "N/A", date: "2025-11-20", status: "Abnormal" }
    ],
    prescriptions: [
      { medication: "Imiquimod", dosage: "5%", frequency: "3x/week for 6 weeks", startDate: "2025-11-25", endDate: "2026-01-06", prescribedBy: "Dr. Lisa Anderson" }
    ],
    visitHistory: [
      { date: "2025-12-08", reason: "Post-excision check", diagnosis: "Healing well", treatment: "Continue Imiquimod" },
      { date: "2025-11-20", reason: "Suspicious lesion", diagnosis: "BCC confirmed", treatment: "Excision performed" }
    ],
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
    lastVisit: "2025-12-11",
    nextAppointment: "2025-12-18",
    condition: "Lung Cancer",
    diagnosis: "Stage IIIA non-small cell lung cancer",
    status: "Critical",
    tag: "critical",
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
      height: "5'11\"",
      bmi: "22.6",
      oxygenSaturation: "93%",
      respiratoryRate: "20 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Normal",
      eyeColor: "Brown",
      hairColor: "Gray (thin from treatment)",
      bodyType: "Ectomorph"
    },
    lifestyle: {
      smokingStatus: "Former smoker (quit 2020)",
      alcoholConsumption: "None",
      exerciseFrequency: "Light activity as tolerated",
      dietType: "High calorie, high protein",
      sleepHours: "Variable"
    },
    labResults: [
      { testName: "PET Scan", value: "Partial response", normalRange: "N/A", date: "2025-12-01", status: "Abnormal" },
      { testName: "CEA", value: "8.5 ng/mL", normalRange: "<3 ng/mL", date: "2025-12-05", status: "Abnormal" },
      { testName: "WBC", value: "3.2 K/uL", normalRange: "4.5-11 K/uL", date: "2025-12-05", status: "Abnormal" }
    ],
    prescriptions: [
      { medication: "Pembrolizumab", dosage: "200mg", frequency: "Every 3 weeks", startDate: "2025-09-01", endDate: "2026-09-01", prescribedBy: "Dr. Robert Taylor" },
      { medication: "Ondansetron", dosage: "8mg", frequency: "As needed for nausea", startDate: "2025-09-01", endDate: "2026-09-01", prescribedBy: "Dr. Robert Taylor" }
    ],
    visitHistory: [
      { date: "2025-12-11", reason: "Treatment cycle", diagnosis: "Partial response", treatment: "Continue immunotherapy" },
      { date: "2025-11-20", reason: "PET scan review", diagnosis: "Tumor shrinkage noted", treatment: "Continue treatment" }
    ],
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
    lastVisit: "2025-12-10",
    nextAppointment: "2025-12-24",
    condition: "Breast Cancer",
    diagnosis: "Stage II invasive ductal carcinoma - post-radiation",
    status: "Follow-up",
    tag: "follow-up",
    allergies: [],
    medications: ["Tamoxifen 20mg", "Vitamin D3"],
    medicalHistory: ["Lumpectomy (2025)", "Radiation therapy completed"],
    insuranceProvider: "Cigna",
    insuranceNumber: "CIG-267951753",
    emergencyContact: {
      name: "Robert Johnson",
      relation: "Spouse",
      phone: "+1 (555) 567-8902"
    },
    vitals: {
      bloodPressure: "118/76 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "145 lbs",
      height: "5'6\"",
      bmi: "23.4",
      oxygenSaturation: "98%",
      respiratoryRate: "14 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Normal",
      eyeColor: "Green",
      hairColor: "Brown",
      bodyType: "Mesomorph"
    },
    lifestyle: {
      smokingStatus: "Never smoked",
      alcoholConsumption: "Rare",
      exerciseFrequency: "Walking daily, yoga 2x/week",
      dietType: "Plant-based, low fat",
      sleepHours: "7-8 hours"
    },
    labResults: [
      { testName: "Mammogram", value: "No recurrence", normalRange: "Clear", date: "2025-11-15", status: "Normal" },
      { testName: "CA 27-29", value: "18 U/mL", normalRange: "<38 U/mL", date: "2025-12-01", status: "Normal" }
    ],
    prescriptions: [
      { medication: "Tamoxifen", dosage: "20mg", frequency: "Once daily", startDate: "2025-08-01", endDate: "2030-08-01", prescribedBy: "Dr. Robert Taylor" },
      { medication: "Vitamin D3", dosage: "2000 IU", frequency: "Once daily", startDate: "2025-08-01", endDate: "2026-08-01", prescribedBy: "Dr. Robert Taylor" }
    ],
    visitHistory: [
      { date: "2025-12-10", reason: "Surveillance", diagnosis: "No evidence of disease", treatment: "Continue Tamoxifen" },
      { date: "2025-10-10", reason: "Post-radiation check", diagnosis: "Good recovery", treatment: "Started hormone therapy" }
    ],
    notes: "Excellent recovery. Continue hormone therapy for 5 years."
  },
  {
    id: 15,
    doctorId: 6,
    name: "William Clark",
    age: 65,
    gender: "Male",
    phone: "+1 (555) 678-9012",
    email: "w.clark@email.com",
    address: "378 Sequoia Boulevard, New York, NY 10008",
    bloodGroup: "O-",
    lastVisit: "2025-12-09",
    nextAppointment: "2026-01-09",
    condition: "Colon Cancer",
    diagnosis: "Stage I colon adenocarcinoma - surgically resected",
    status: "Recovered",
    tag: "normal",
    allergies: ["Morphine"],
    medications: ["Aspirin 81mg", "Multivitamin"],
    medicalHistory: ["Colonoscopy with polypectomy (2022)", "Colectomy (2025)"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MED-378159486",
    emergencyContact: {
      name: "Margaret Clark",
      relation: "Spouse",
      phone: "+1 (555) 678-9013"
    },
    vitals: {
      bloodPressure: "130/82 mmHg",
      heartRate: "70 bpm",
      temperature: "98.5°F",
      weight: "178 lbs",
      height: "5'10\"",
      bmi: "25.5",
      oxygenSaturation: "97%",
      respiratoryRate: "15 breaths/min"
    },
    bodyCharacteristics: {
      skinType: "Normal",
      eyeColor: "Brown",
      hairColor: "Gray",
      bodyType: "Endomorph"
    },
    lifestyle: {
      smokingStatus: "Never smoked",
      alcoholConsumption: "1-2 drinks/week",
      exerciseFrequency: "Walking 30 min daily",
      dietType: "High fiber, low red meat",
      sleepHours: "7-8 hours"
    },
    labResults: [
      { testName: "CEA", value: "1.8 ng/mL", normalRange: "<3 ng/mL", date: "2025-12-01", status: "Normal" },
      { testName: "CT Abdomen", value: "No evidence of recurrence", normalRange: "Clear", date: "2025-11-15", status: "Normal" }
    ],
    prescriptions: [
      { medication: "Aspirin", dosage: "81mg", frequency: "Once daily", startDate: "2025-07-01", endDate: "2026-07-01", prescribedBy: "Dr. Robert Taylor" }
    ],
    visitHistory: [
      { date: "2025-12-09", reason: "Surveillance scan", diagnosis: "No recurrence", treatment: "Continue surveillance" },
      { date: "2025-09-09", reason: "Post-surgical follow-up", diagnosis: "Complete healing", treatment: "Begin surveillance protocol" }
    ],
    notes: "Complete surgical remission. Continue regular surveillance scans."
  }
];

// Helper function to get patients by doctor ID
export const getPatientsByDoctorId = (doctorId: number): Patient[] => {
  return patientsData.filter(patient => patient.doctorId === doctorId);
};

// Helper function to filter patients by tag
export const getPatientsByTag = (doctorId: number, tag: Patient['tag']): Patient[] => {
  return patientsData.filter(patient => patient.doctorId === doctorId && patient.tag === tag);
};

// Helper function to filter patients by date range
export const getPatientsByDateRange = (doctorId: number, startDate: string, endDate: string): Patient[] => {
  return patientsData.filter(patient => {
    if (patient.doctorId !== doctorId) return false;
    const lastVisit = new Date(patient.lastVisit);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return lastVisit >= start && lastVisit <= end;
  });
};
