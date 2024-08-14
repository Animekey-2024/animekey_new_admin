export interface UserListingResponse {
  data: UserListingResponse[];
  total: number;
  page: number;
  limit: number;
}

export interface UserList {
  isSubscribed: boolean;
  isActive: boolean;
  phone: {
    code: string;
    number: string;
  };
  name: {
    first: string;
    last: string;
  };
  _id: string;
  plan: string;
  subscription: string;
  email: string;
  createdAt :  string;
}
export interface UserDetail {
  isSubscribed: boolean;
  isActive: boolean;
  phone: {
    code: string;
    number: string;
  };
  name: {
    first: string;
    last: string;
  };
  _id: string;
  plan: string;
  subscription: string;
  email: string;
}
