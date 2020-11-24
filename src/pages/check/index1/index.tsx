import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Button, Card} from 'antd';
import { Constants } from '@/utils/constants';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/pages/user/login/model';
import { ColumnProps } from 'antd/es/table';
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import {commonHandleTableChange} from '@/utils/common';
import StandardTable from '@/components/StandTable1';
import { TableListData, TableListItem } from './data.d';
// @ts-ignore
import styles from './style.less';
import SearchBar from "@/components/SearchBar";

interface TableListProps {
  dispatch: Dispatch;
  checkIndex1: StateType;
  submitting: boolean;
}

const TableList: React.FC<TableListProps> = ({ dispatch, submitting }) => {
  const [height, setHeight] = useState<number>(window.innerHeight - Constants.tableHeight);
  const [selectedRows, setSelectRows] = useState<TableListItem[]>([]);
  const [formValues, setFormValues] = useState<{[key:string]:any}>({});
  const [data, setData] = useState<TableListData>({
    list: [],
    pagination: {
      pageSize: 20,
      current: 1,
      total: 0,
    },
  });
  useEffect(() => {
    setHeight(window.innerHeight - Constants.tableHeight);
  }, [height]);

  const list = (params: { [key: string]: any }) => {
    setFormValues(params);
    dispatch({
      type: 'checkIndex1/list',
      payload: params,
      callback: (response: TableListData) => {
        console.log('response', response);
        setData(response);
      },
    });
  };

  const columns: ColumnProps<TableListItem>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 40,
      fixed: 'left',
      render: (text, record, checkIndex1) => <span>{checkIndex1 + 1}</span>,
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width: 100,
    },
    {
      title: '类型',
      dataIndex: 'amountType',
      width: 120,
    },
    {
      title: '收入报表金额',
      dataIndex: 'detailAmount',
      width: 120,
    },
    {
      title: '收入明细汇总金额',
      dataIndex: 'reportAmount',
      width: 120,
    },
    {
      title: '差额',
      dataIndex: 'addYear',
      width: 80,
      render:(text,record)=><span>{record.detailAmount-record.reportAmount}</span>
    },
    {
      title: '是否通过',
      dataIndex: 'isCheck',
      width: 80,
    },
    {
      title: '差额比例 ',
      dataIndex: 'addYear',
      width: 80,
      render:(text,record)=><span>{(record.detailAmount-record.reportAmount)*100/record.detailAmount}%</span>
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filtersArg: Record<string, Key[] | null>,
    sorter: SorterResult<TableListItem>,
  ) => {
    commonHandleTableChange(pagination,filtersArg,sorter,formValues,(params)=>{
      list(params);
    })
  };

  const handleSelectRows = (rows: TableListItem[]) => {
    setSelectRows(rows);
  };

  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Card bordered={false} size="small" className={styles.searchBar}>
          <SearchBar onSearch={(params:{[key:string]:any})=>list(params)} />
        </Card>
      </div>
      <Card size="small" bordered={false} bodyStyle={{ padding: 16 }}>
        <StandardTable
          loading={submitting}
          bordered
          size="small"
          title={() => (
            <div className={styles.tableTitle}>
              <span className={styles.title}>收费项目对照</span>
              <div>
                <Button type="primary">导入</Button>
                <Button type="primary">导出</Button>
                <Button type="primary">模版下载</Button>
              </div>
            </div>
          )}
          scroll={{
            x: 1200,
            y: height,
          }}
          columns={columns}
          data={data}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRows}
          onChange={handleTableChange}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(
  ({
    checkIndex1,
    loading,
  }: {
    checkIndex1: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex1,
    submitting: loading.effects['checkIndex1/list'],
  }),
)(TableList);
