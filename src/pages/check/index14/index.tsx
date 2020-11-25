import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Button, Card, Modal, message } from 'antd';
import { Constants } from '@/utils/constants';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/pages/user/login/model';
import { ColumnProps } from 'antd/es/table';
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { commonHandleTableChange, downloadFile, formatFormParams } from '@/utils/common';
import StandardTable from '@/components/StandTable1';
import { TableListData, TableListItem } from './data.d';
// @ts-ignore
import styles from './style.less';
import SearchBar from "@/components/SearchBar";
import moment from "moment";

interface TableListProps {
  dispatch: Dispatch;
  checkIndex14: StateType;
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
      type: 'checkIndex14/list',
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
      render: (text, record, checkIndex14) => <span>{checkIndex14 + 1}</span>,
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width: 100,
    },
    {
      title: '科室',
      dataIndex: 'deptHbName',
      width: 120,
    },
    {
      title: '医生项目',
      dataIndex: 'doctorRatio',
      width: 120,
    },
    {
      title: '护士项目',
      dataIndex: 'nurseRatio',
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

  const calc = () => {
    Modal.confirm({
      title:'提示',
      content:'确定计算',
      onOk:()=>{
        dispatch({
          type: 'checkIndex14/calc',
          payload: formValues ,
          callback: (response: {code:number,msg:string}) => {
            const {code,msg} = response;
            if(code===1){
              message.success(msg);
            }else{
              message.error(msg);
            }
            list(formValues);
          },
        });
      }
    })
  };

  const download = () => {
    dispatch({
      type: 'checkIndex14/download',
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
              deptName:'',
            }}
            calc={calc}
            searchKeys={['compCode','acctYear','deptName']}
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
              <span className={styles.title}>科室成本收入比</span>
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
    checkIndex14,
    loading,
  }: {
    checkIndex14: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex14,
    submitting: loading.effects['checkIndex14/list']||loading.effects['checkIndex14/calc']||loading.effects['checkIndex14/download'],
  }),
)(TableList);
