import { Name, Role, Zone } from './common.interface';

export interface AdminProfileData {
  id: string;
  _id: string;
  name: Name;
  email: string;
  avatar: string;
  role: Role;
  countryCode: string;
  phoneNumber: number | string;
  createdAt: string;
  createdBy: string;
  lastLogin: string;
  isMFASetup?: boolean;
  isActive?: boolean;
  zone?: Zone;
}

/**
 * Admin profile delete data interface
 */

export interface AdminDeleteProfile {
  statusCode: number;
  message: string;
  result: boolean;
}

/**
 * Admin update profile data interface
 */

export interface AdminUpdateProfile {
  name: Name;
  avatar: string;
  countryCode: string;
  phoneNumber: string;
}
