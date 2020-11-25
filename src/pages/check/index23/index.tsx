import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Button, Card, message, Modal } from 'antd';
import { Constants } from '@/utils/constants';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/pages/user/login/model';
import { ColumnProps } from 'antd/es/table';
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { commonHandleTableChange, downloadFile } from '@/utils/common';
import StandardTable from '@/components/StandTable1';
import { TableListData, TableListItem } from './data.d';
// @ts-ignore
import styles from './style.less';
import SearchBar from "@/components/SearchBar";
import moment from "moment";

interface TableListProps {
  dispatch: Dispatch;
  checkIndex23: StateType;
  submitting: boolean;
}



const TableList: React.FC<TableListProps> = ({ dispatch, submitting }) => {
  const [height, setHeight] = useState<number>(window.innerHeight - Constants.tableHeight);
  const [selectedRows, setSelectRows] = useState<TableListItem[]>([]);
  const [formValues,setFormValues] = useState<{[key:string]:any}>({})
  const [form] = Form.useForm();
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
      type: 'checkIndex23/list',
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
      render: (text, record, checkIndex23) => <span>{checkIndex23 + 1}</span>,
    },
    {
      title: '收费编码',
      dataIndex: 'chargeCode',
      width: 80,
    },
    {
      title: '收费名称',
      dataIndex: 'chargeName',
      width: 100,
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      width: 120,
    },
    {
      title: '是否核算',
      dataIndex: 'isCheck',
      width: 120,
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filtersArg: Record<string, Key[] | null>,
    sorter: SorterResult<TableListItem>,
  ) => {
    commonHandleTableChange(pagination,filtersArg,sorter,form.getFieldsValue(),(params)=>{
      list(params);
    });
  };

  const handleSelectRows = (rows: TableListItem[]) => {
    setSelectRows(rows);
  };

  const check = () => {
    dispatch({
      type: 'checkIndex23/check',
      payload: formValues,
    });
  };

  const check1 = () => {
    dispatch({
      type: 'checkIndex23/check1',
      payload: formValues,
    });
  };

  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Card bordered={false} size="small" className={styles.searchBar}>
          <SearchBar
            initialValues={{
              compCode: '100001',
              acctYear: moment('2019'),
            }}
            searchKeys={['compCode','acctYear']}
            onSearch={(params:{[key:string]:any}) => list(params)}
            formValuesChange={(values:{[key:string]:any})=>setFormValues(values)}
          />
        </Card>
      </div>
      <Card size="small" bordered={false} bodyStyle={{ padding: 16 }}>
        <StandardTable
          loading={submitting}
          bordered
          size="small"
          title={() => (
            <div className={styles.tableTitle}>
              <span className={styles.title}>成本数据校验</span>
              <div>
                <Button type="primary" onClick={check}>收费项目校验</Button>
                <Button type="primary" onClick={check1}>成本科室校验</Button>
              </div>
            </div>
          )}
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
    checkIndex23,
    loading,
  }: {
    checkIndex23: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex23,
    submitting: loading.effects['checkIndex23/list']||loading.effects['checkIndex23/check']||loading.effects['checkIndex23/check1'],
  }),
)(TableList);
