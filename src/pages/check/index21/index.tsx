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
  checkIndex21: StateType;
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
      type: 'checkIndex21/list',
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
      render: (text, record, checkIndex21) => <span>{checkIndex21 + 1}</span>,
    },
    {
      title: '成本科室编码',
      dataIndex: 'deptCode',
      width: 120,
    },
    {
      title: '成本科室名称',
      dataIndex: 'deptName',
      width: 120,
    },
    {
      title: '总收入',
      dataIndex: 'deptIncome',
      width: 120,
    },
    {
      title: '总成本',
      dataIndex: 'deptCost',
      width: 120,
    },
    {
      title: '人员经费',
      dataIndex: 'deptCostWage',
      width: 120,
    },
    {
      title: '材料',
      dataIndex: 'deptCostMate',
      width: 120,
    },
    {
      title: '资产折旧',
      dataIndex: 'deptCostEqui',
      width: 120,
    },
    {
      title: '无形资产',
      dataIndex: 'deptCostWuxing',
      width: 120,
    },
    {
      title: '其他费用',
      dataIndex: 'deptCostOther',
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

  const download = () => {
    dispatch({
      type: 'checkIndex21/download',
      payload: formValues,
      callback: (response: {status:number,msg:string}) => {
        const {status,msg} = response;
        if(status===1){
          message.success('文件正在下载...');
          downloadFile(msg,msg);
        }else{
          message.error('文件下载失败');
        }
        console.log(status,msg);
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
              <span className={styles.title}>有成本无收入</span>
              <div>
                <Button type="primary" onClick={download}>导出</Button>
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
    checkIndex21,
    loading,
  }: {
    checkIndex21: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex21,
    submitting: loading.effects['checkIndex21/list']||loading.effects['checkIndex21/calc']||loading.effects['checkIndex21/download'],
  }),
)(TableList);
