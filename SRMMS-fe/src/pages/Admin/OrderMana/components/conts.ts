export interface FormFields {
  fromDate: string;
  toDate: string;
  tableName: string;
  statusId: number;
  pagination: { pageNumber: number; pageSize: number };
  pageNumber: number;
  pageSize: number;
  totalOrders: number;
}
