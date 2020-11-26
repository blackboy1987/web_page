import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Card } from 'antd';
import { Constants } from '@/utils/constants';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/pages/user/login/model';
import { ColumnProps } from 'antd/es/table';
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { commonHandleTableChange } from '@/utils/common';
import StandardTable from '@/components/StandTable1';
import { TableListData, TableListItem } from './data.d';
// @ts-ignore
import styles from './style.less';
import SearchBar from "@/components/SearchBar";
import moment from "moment";

interface TableListProps {
  dispatch: Dispatch;
  dataAnalysisIndex2: StateType;
  submitting: boolean;
}



const TableList: React.FC<TableListProps> = ({ dispatch, submitting }) => {
  const [height, setHeight] = useState<number>(window.innerHeight - Constants.tableHeight);
  const [selectedRows, setSelectRows] = useState<TableListItem[]>([]);
  const [columns,setColumns] = useState<ColumnProps<TableListItem>[]>([
    {
      title: '',
      dataIndex: 'id',
      width: 40,
      fixed: 'left',
      render: (text, record, dataAnalysisIndex2) => <span>{dataAnalysisIndex2 + 1}</span>,
    },
    {
      title: '标准项目编码',
      dataIndex: 'sItemCode',
      width: 100,
    },
    {
      title: '标准项目名称',
      dataIndex: 'chargeName',
      width: 150,
    },
    {
      title: '省价格',
      dataIndex: 'sItemPrice',
      width: 90,
    },
    {
      title: '市价格',
      dataIndex: 'price',
      width: 90,
    },
    {
      title: '医院价格',
      dataIndex: 'itemPrice',
      width: 90,
    },
    {
      title: '单位成',
      children:[],
    },
    {
      title: '盈亏率',
      children:[],
    },
  ]);
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


  const refreshColumns=(params: { [key: string]: any })=>{
    const {deptName1} = params;
    setColumns([
      {
        title: '',
        dataIndex: 'id',
        width: 40,
        fixed: 'left',
        render: (text, record, dataAnalysisIndex2) => <span>{dataAnalysisIndex2 + 1}</span>,
      },
      {
        title: '标准项目编码',
        dataIndex: 'sItemCode',
        width: 100,
      },
      {
        title: '标准项目名称',
        dataIndex: 'chargeName',
        width: 150,
      },
      {
        title: '省价格',
        dataIndex: 'sItemPrice',
        width: 100,
      },
      {
        title: '市价格',
        dataIndex: 'price',
        width: 100,
      },
      {
        title: '医院价格',
        dataIndex: 'itemPrice',
        width: 100,
      },
      {
        title: '单位成本',
        children:deptName1.map(deptName=>({
          title: `${deptName.label}`,
          dataIndex: `costSum${deptName.value}`,
          width: 50,
        }))
      },
      {
        title: '盈亏率',
        children:deptName1.map(deptName=>({
          title: `${deptName.label}`,
          dataIndex: `proLoRate${deptName.value}`,
          width: 50,
        }))
      },
    ])
  }

  const list = (params: { [key: string]: any }) => {
    refreshColumns(params);
    dispatch({
      type: 'dataAnalysisIndex2/list',
      payload: params,
      callback: (response: TableListData) => {
        console.log('response', response);
        setData(response);
      },
    });
  };

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
              deptName1:[{key:'708',label:'内科',value:'708'},{key:'709',label:'外一科',value:'709'}],
            }}
            searchKeys={['compCode','acctYear','deptName1','sItemCode']}
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
              <span className={styles.title}>院内科室成本收入比</span>
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
    dataAnalysisIndex2,
    loading,
  }: {
    dataAnalysisIndex2: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    dataAnalysisIndex2,
    submitting: loading.effects['dataAnalysisIndex2/list']||loading.effects['dataAnalysisIndex2/calc']||loading.effects['dataAnalysisIndex2/download'],
  }),
)(TableList);
