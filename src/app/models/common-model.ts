export interface ISubAdminUser {
  country_code: string | number | null;
  created_at: string;
  email: string;
  id: string;
  is_active: boolean;
  is_default?: boolean;
  name: string;
  phone_number: string | number | null;
  picture_url: string;
  user_id: string;
  permissions?: IPermissions[];
  is_2fa_setup_done?: boolean;
}

export interface IPermissions {
  group_id: string;
  title: string;
  is_read?: boolean;
  is_active?: boolean;
  is_write?: boolean;
  slug?: string;
}

export interface IRoute {
  path: string;
  label: string;
  fullUrl: string;
}
