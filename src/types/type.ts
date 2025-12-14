export interface DoctorType {
    id: number;
    username: string;
    email: string;
    picture?: string;
    hospital: string;
    role: 'doctor';
}

export interface AdminType {
    id: number;
    username: string;
    email: string;
    picture?: string;
    hospital: string;
    role: 'admin';
}

export interface StaffType {
    id: number;
    username: string;
    hospital: string;
}

interface googleSignInResponseType {
  token: string;
  user: DoctorType | AdminType;
}


export interface loginCredentialsType {
  email: string;
  password: string;
}

export interface signupCredentialsType {
  username: string;
  email: string;
  password: string;
}