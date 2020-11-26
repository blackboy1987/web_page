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
  dataAnalysisIndex1: StateType;
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
      render: (text, record, dataAnalysisIndex1) => <span>{dataAnalysisIndex1 + 1}</span>,
    },
    {
      title: '成本科室',
      dataIndex: 'costDept',
      width: 100,
    },
    {
      title: '医生成本收入比',
      children:[
        {
          title: '2017',
          dataIndex: 'dRatio2017',
          width: 50,
        },
        {
          title: '2018',
          dataIndex: 'dRatio2018',
          width: 50,
        },
        {
          title: '2019',
          dataIndex: 'dRatio2019',
          width: 50,
        },
      ]
    },
    {
      title: '护士成本收入比',
      children:[
        {
          title: '2017',
          dataIndex: 'nRatio2017',
          width: 50,
        },
        {
          title: '2018',
          dataIndex: 'nRatio2018',
          width: 50,
        },
        {
          title: '2019',
          dataIndex: 'nRatio2019',
          width: 50,
        },
      ]
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
    const {acctYear,eAcctYear} = params;
    console.log("params",params);
    const acctYearInt = parseInt(acctYear);
    const eAcctYearInt = parseInt(eAcctYear);
    const years = [];
    for(let start=acctYearInt;start<=eAcctYearInt;start+=1){
      years.push(start);
    }
    console.log("years",years);
    setColumns([
      {
        title: '',
        dataIndex: 'id',
        width: 40,
        fixed: 'left',
        render: (text, record, dataAnalysisIndex1) => <span>{dataAnalysisIndex1 + 1}</span>,
      },
      {
        title: '成本科室',
        dataIndex: 'costDept',
        width: 100,
      },
      {
        title: '医生成本收入比',
        children:years.map(year=>({
          title: `${year}`,
          dataIndex: `dRatio${year}`,
          width: 50,
        }))
      },
      {
        title: '护士成本收入比',
        children:years.map(year=>({
          title: `${year}`,
          dataIndex: `nRatio${year}`,
          width: 50,
        }))
      },
    ])
  }

  const list = (params: { [key: string]: any }) => {
    refreshColumns(params);
    dispatch({
      type: 'dataAnalysisIndex1/list',
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
              rangeYear: [moment('2017'),moment('2019')],
              deptCode:'',
            }}
            searchKeys={['compCode','deptCode','rangeYear']}
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
    dataAnalysisIndex1,
    loading,
  }: {
    dataAnalysisIndex1: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    dataAnalysisIndex1,
    submitting: loading.effects['dataAnalysisIndex1/list']||loading.effects['dataAnalysisIndex1/calc']||loading.effects['dataAnalysisIndex1/download'],
  }),
)(TableList);
