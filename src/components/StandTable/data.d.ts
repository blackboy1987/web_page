import { ColumnProps } from 'antd/es/table';


export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: ColumnProps<CommonTableListItem>[];
  pagination: Partial<TableListPagination>;
}
