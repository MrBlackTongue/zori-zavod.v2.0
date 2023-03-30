import {TablePaginationConfig} from "antd/es/table";

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}