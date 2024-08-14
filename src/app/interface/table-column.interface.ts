export interface Column {
  key: string;
  name: string;
  dataKey: string;
  showWithImage?: boolean;
  imageKey?: string | any;
  isSortable?: boolean;
}
