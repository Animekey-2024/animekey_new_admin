export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  result: T;
}

export interface Name {
  first: string;
  last: string;
}

export interface Role {
  _id: string;
  id: string;
  title: string;
  isRoot: boolean;
}

export interface Email {
  id: string;
  isVerified?: boolean;
}

export interface Phone {
  code: string;
  number: string;
  isVerified?: boolean;
}

export interface CustomDateInterface {
  fromDate: string;
  toDate: string;
}

//  Glabal date filtr interface

export interface GlobalDateFilterIData {
  key: string;
  value: DateValue;
  displayDate: string;
}

export interface DateValue {
  fromDate: string;
  toDate: string;
}
export interface BLOCK_UNBLOCK_BODY {
  blockUnblockReason?: string;
  isActive: boolean;
}

// Dropdown Value  interface data

export interface DropdownValueTypeIData {
  name: string;
  value: any;
}
export interface Params {
  limit: number;
  page: number;
  search?: string;
  toDate?: string;
  fromDate?: string;
  sort?: string;
  sortBy?: string;
}

export interface CountryListingResponseData {
  data: CountryListingResponse[];
  metadata: CountryListingResponseMetaData;
}

export interface CountryListingResponseMetaData {
  limit: number;
  page: number;
  total: number;
}
export interface CountryListingResponse {
  id?: string;
  iso2: string;
  name: string;
  currency: string;
  flag?: string;
  code?: string;
  distanceUnit?: string;
  dateFormat?: string;
  timeFormat?: string;
  weightUnit?: string;
  priceRoundOff?: boolean;
  cardTimer?: number;
  errandCardTimer?: number;
  errandDriverSearchRadius?: number;
  errandDriverSearchCount?: number;
  sos: string;
}

export interface DropdownValue {
  label: string;
  value: string;
}

export interface DistanceUnitResponse {
  Kilometer: string;
  Mile: string;
}

export interface WeightUnitResponse {
  Kilogram: string;
  Pound: string;
}

export interface CountryDetailByIdIData {
  id: string;
  iso3: string;
  name: string;
  flag: string;
  code: string;
  currencySymbol: string;
  distanceUnit: string;
  priceRoundOff: boolean;
  weightUnit: string;
  errandCardTimer: number;
  cardTimer: number;
  dateFormat: string;
  timeFormat: string;
  errandDriverSearchCount: number;
  errandDriverSearchRadius: number;
  sos: string;
}

export interface Zone {
  name: string;
  description: string;
  _id: string;
}

export interface State {
  name: string;
  state_code: any;
  stateId: any;
  value: any;
}

export interface City {
  name: string;
  cityId: any;
  state: any;
  value: any;
}
