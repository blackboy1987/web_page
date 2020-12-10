import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Form, Card, message, Button} from 'antd';
import { Constants } from '@/utils/constants';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/pages/user/login/model';
import { ColumnProps } from 'antd/es/table';
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import {commonHandleTableChange, download} from '@/utils/common';
import StandardTable from '@/components/StandTable1';
import { TableListData, TableListItem } from './data.d';
// @ts-ignore
import styles from './style.less';
import SearchBar from "@/components/SearchBar";
import moment from "moment";

interface TableListProps {
  dispatch: Dispatch;
  assetMaterial: StateType;
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
      type: 'assetMaterial/list',
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
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '年',
      dataIndex: 'acctYear',
      width: 40,
    },
    {
      title: '科室编码',
      dataIndex: 'deptCode',
      width: 60,
    },
    {
      title: '科室名称',
      dataIndex: 'deptName',
      width: 100,
    },
    {
      title: '成本科室',
      dataIndex: 'costDept',
      width: 100,
    },
    {
      title: '材料编码',
      dataIndex: 'mateInvCode',
      width: 80,
    },
    {
      title: '资产名称',
      dataIndex: 'equi_name',
    },
    {
      title: '核对运算金额',
      dataIndex: 'itemApportionAmount',
      width: 100,
    },
    {
      title: '系统运算金额',
      dataIndex: 'equiAmount',
      width: 100,
    },
    {
      title: '项目编码',
      dataIndex: 'itemCode',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'itemName',
      width: 220,
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

  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Card bordered={false} size="small" className={styles.searchBar}>
          <SearchBar
            initialValues={{
              compCode: '100001',
              acctYear: moment('2019'),
              itemCode:'',
              equiCode:'',
              deptCode:'',
            }}
            searchKeys={['compCode','acctYear','itemCode','equiCode','deptCode']}
            onSearch={(params:{[key:string]:any}) => list(params)}
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
              <span className={styles.title}>资产专属查询</span>
              <div>
                <Button type="primary" onClick={()=>download(dispatch,'assetMaterial/download',formValues)}>导出</Button>
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
     assetMaterial,
    loading,
  }: {
    assetMaterial: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    assetMaterial,
    submitting: loading.effects['assetMaterial/list']||loading.effects['assetMaterial/download'],
  }),
)(TableList);
