export const STATUS_DATA = [
  { name: 'All', value: 'all' },
  { name: 'Activated', value: 'active' },
  { name: 'Deactivated', value: 'inactive' },
];

export const VERIFICATION_STATUS = [
  { name: 'All', value: 'all' },
  { name: 'Failed', value: 'failed' },
  { name: 'Completed', value: 'completed' },
  { name: 'In Progress', value: 'in_progress' },
  { name: 'Pending', value: 'pending' },
];

export const FILTER_DATA = [
  { name: 'Today', value: 'today' },
  { name: 'Yesterday', value: 'yesterday' },
  { name: 'Last 07 days', value: 'last_7_days' },
  { name: 'Last month', value: 'last_month' },
  { name: 'Last Year', value: 'last_year' },
  { name: 'Custom Date', value: 'custom' },
];

export const RECEPIENT_DATA = [
  // { name: 'All', value: '4' },
  { name: 'IOS', value: '1' },
  { name: 'Android', value: '2' },
  { name: 'Web', value: '3' },
];

export const PERSONA_TYPE = [
  { name: 'All', value: '4' },
  { name: 'Driver', value: '2' },
  { name: 'Customer', value: '3' },
];
export const CONTENT_TYPE = [
  { name: 'MOVIE', value: 'MOVIE' },
  { name: 'SERIES', value: 'SERIES' },
  { name: 'VIDEO', value: 'VIDEO' },
];

export const CATEGORIES = [
  { name: 'FEATURED', value: 'FEATURED' },
  { name: 'TRENDING', value: 'TRENDING' },
  { name: 'LATEST', value: 'LATEST' },
  { name: 'MOVIES FOR YOU', value: 'MOVIES_FOR_YOU' },
];

export const GLOBAL_DATE_FILTER_DATA = [
  {
    key: 'today',
    value: { fromDate: '', toDate: '' },
    displayDate: 'Today',
  },
  {
    key: 'yesterday',
    value: { fromDate: '', toDate: '' },
    displayDate: 'Yesterday',
  },
  {
    key: 'lastWeek',
    value: { fromDate: '', toDate: '' },
    displayDate: 'Last 7 days',
  },
  {
    key: 'lastMonth',
    value: { fromDate: '', toDate: '' },
    displayDate: 'Last Month',
  },
  {
    key: 'lastYear',
    value: { fromDate: '', toDate: '' },
    displayDate: 'Last 1 Year',
  },
  {
    key: 'custom',
    value: { fromDate: '', toDate: '' },
    displayDate: 'Custom Selection',
  },
];

export const COUNTRY_CODE = [{ name: '+91', value: '+91' }];

export const BILLING_FREQUENCY = [
  { name: 'Monthly', value: 'MONTHLY' },
  { name: 'Quarterly', value: 'QUARTERLY' },
  { name: 'Half Yearly', value: 'HALF-YEARLY' },
  { name: 'Yealy', value: 'YEARLY' },
];

export const ASPECT_RATIOS = [
  { name: '16:9', value: 16 / 9 },
  { name: '9:16', value: 9 / 16 },
  { name: '2:3', value: 2 / 3 },
  { name: '1:1', value: 1 / 1 },
];
