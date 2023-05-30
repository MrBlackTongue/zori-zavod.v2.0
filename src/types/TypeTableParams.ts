import {TablePaginationConfig} from "antd/es/table";

export interface TableParam {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}