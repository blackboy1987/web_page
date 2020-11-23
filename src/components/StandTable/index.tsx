import { Table } from 'antd';
import { ColumnProps, TableProps } from 'antd/es/table';
import React, { Component } from 'react';

import { TableListItem } from './data.d';
import styles from './index.less';
import { TableRowSelection } from 'antd/lib/table/interface';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface StandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: StandardTableColumnProps[];
  data: {
    list: TableListItem[];
    pagination: StandardTableProps<TableListItem>['pagination'];
  };
  selectedRows: TableListItem[];
  onSelectRow: (rows: any) => void;
}

export interface StandardTableColumnProps extends ColumnProps<TableListItem> {

}

interface StandardTableState {
  selectedRowKeys: string[];
}

class StandardTable extends Component<StandardTableProps<TableListItem>, StandardTableState> {

  state = {
    selectedRowKeys:[]
  }

  handleRowSelectChange: TableRowSelection<TableListItem>['onChange'] = (
    selectedRowKeys,
    selectedRows: TableListItem[],
  ) => {
    const currySelectedRowKeys = selectedRowKeys as string[];
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys: currySelectedRowKeys });
  };

  handleTableChange: TableProps<TableListItem>['onChange'] = (
    pagination,
    filters,
    sorter,
    ...rest
  ) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter, ...rest);
    }
  };

  cleanSelectedKeys = () => {
    if (this.handleRowSelectChange) {
      this.handleRowSelectChange([], []);
    }
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { data, rowKey, ...rest } = this.props;
    const { list = [], pagination = false } = data || {};
    const paginationProps = pagination
      ? {
          hideOnSinglePage:true,
          showLessItems:false,
          showSizeChanger: true,
          showQuickJumper: true,
          ...pagination,
        }
      : false;

    const rowSelection: TableRowSelection<TableListItem> = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={rowKey || 'id'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
