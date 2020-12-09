import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Card, message } from 'antd';
import { Constants } from '@/utils/constants';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/pages/user/login/model';
import { ColumnProps } from 'antd/es/table';
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { commonHandleTableChange } from '@/utils/common';
import StandardTable from '@/components/StandTable2';
import { TableListData, TableListItem } from './data.d';
// @ts-ignore
import styles from './style.less';
import SearchBar from "@/components/SearchBar";
import moment from "moment";

interface TableListProps {
  dispatch: Dispatch;
  eiskRatio: StateType;
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
      type: 'eiskRatio/list',
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
      title: '年度',
      dataIndex: 'acctYear',
      width: 100,
    },
    {
      title: 'compCode',
      dataIndex: 'compCode',
      width: 80,
    },
    {
      title: 'dataId',
      dataIndex: 'dataId',
      width: 80,
    },
    {
      title: 'riskRatio',
      dataIndex: 'riskRatio',
      width: 80,
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


  const save = () => {
    console.log(selectedRows);
    dispatch({
      type: 'eiskRatio/save',
      payload: {
        acctYear: selectedRows[0].acctYear,
        compCode: selectedRows[0].compCode,
        dataId: selectedRows[0].dataId,
      },
      callback: (response: {code:number,msg:string}) => {
        const {code,msg} = response;
        if(code===1){
          message.success('保存成功!');
        }else{
          message.error(msg);
        }
      },
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
              riskRatio:'0',
            }}
            onSave={save}
            searchKeys={['compCode','acctYear','riskRatio']}
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
              <span className={styles.title}>风险基金审核</span>
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
     eiskRatio,
    loading,
  }: {
    eiskRatio: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    eiskRatio,
    submitting: loading.effects['eiskRatio/list']||loading.effects['eiskRatio/calc']||loading.effects['eiskRatio/download'],
  }),
)(TableList);
