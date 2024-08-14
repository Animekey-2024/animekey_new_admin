export interface PermissionSearchResult {
  data: PermissionSearchData[];
  total: number;
}

export interface PermissionSearchData {
  _id: string;
  title: string;
  access: PermissionAccess[];
}

export interface PermissionAccess {
  userType: string;
  actions: string[];
}

export interface RolesList {
  data: Role[];
  total: number;
  page: number;
  limit: number;
}

export interface Role {
  _id: string;
  title: string;
  id: string;
  createdAt: string;
  isActive: boolean;
}

export interface RoleListParams {
  search?: string;
}

export interface AddRolePayload {
  description: string;
  title: string;
  permissions: PermissionsDetails[];
}

export interface PermissionsDetails {
  _id: string;
  title?: string;
  options?: [];
  actions: string[];
}

export interface RoleDetails {
  id: string;
  _id: string;
  title: string;
  description: string;
  permissions: PermissionsDetails[];
  blockedAt: string;
  createdAt: string;
  isActive: boolean;
  isRoot: boolean;
}

export interface RoleFilterData {
  isActive?: string | boolean;
}

export interface PermissionModule {
  isAdd: boolean;
  isView: boolean;
  isEdit: boolean;
  isStatus: boolean;
  isDelete: boolean;
}
