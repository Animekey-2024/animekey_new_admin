import { Name, Zone } from './common.interface';

export interface SubAdminListingResponse {
  data: SubAdminList[];
  total: number;
  page: number;
  limit: number;
}

export interface SubAdminList {
  _id: string;
  name: Name;
  id: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  role: SubAdminRole;
  avatar: string;
  isMFASetup: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface SubAdminRole {
  _id?: string;
  id: string;
  title: string;
  isRoot: boolean;
}
export interface SubAdminDetail {
  name: Name;
  id: string;
  email: string;
  countryCode?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  role: SubAdminRole;
  avatar: string;
  createdBy: CreatedBy;
  zone: Zone;
  isMFASetup: boolean;
  createdAt: string;
  blockUnblockReason: string;
  isActive: boolean;
  lastLogin: string;
}
export interface CreatedBy {
  name: Name;
}

export interface SubAdminAdd {
  name: Name;
  email: string;
  role: string;
  zone: string;
  avatar: string;
  countryCode: string;
  phoneNumber: string;
}
