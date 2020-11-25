import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Button, Card, message, Modal } from 'antd';
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
  checkIndex20: StateType;
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
      type: 'checkIndex20/list',
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
      render: (text, record, checkIndex20) => <span>{checkIndex20 + 1}</span>,
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width: 120,
    },
    {
      title: '菜单',
      dataIndex: 'menuid',
      width: 120,
    },
    {
      title: '医院编码',
      dataIndex: 'compName',
      width: 120,
    },
    {
      title: '医院名称',
      dataIndex: 'compCode',
      width: 120,
    },
    {
      title: '是否锁定',
      dataIndex: 'isOrNo',
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
      type: 'checkIndex20/download',
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

  const lock = () => {
    if(!formValues.menuid){
      message.error("请选择菜单");
      return;
    }


    Modal.confirm({
      title:'提示',
      content:'确定解锁菜单?',
      onOk:()=>{
        dispatch({
          type: 'checkIndex20/lock',
          payload: formValues,
          callback: (response: {code:string}) => {
            const {code} = response;
            if(code==='0'){
              message.success('操作成功');
            }else{
              message.error('已是锁定状态');
            }
            list(formValues);
          },
        });
      }
    })
  };

  const unLock = () => {
    if(!formValues.menuid){
      message.error("请选择菜单");
      return;
    }
    Modal.confirm({
      title:'提示',
      content:'确定锁定菜单?',
      onOk:()=>{
        dispatch({
          type: 'checkIndex20/unLock',
          payload: formValues,
          callback: (response: {code:string}) => {
            const {code} = response;
            if(code==='0'){
              message.success('操作成功');
            }else{
              message.error('已是解锁状态');
            }
            list(formValues);
          },
        });
      }
    })
  };


  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Card bordered={false} size="small" className={styles.searchBar}>
          <SearchBar
            initialValues={{
              compCode: '100001',
              acctYear: moment('2019'),
              menuid: '',
            }}
            searchKeys={['compCode','acctYear','menuid']}
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
              <span className={styles.title}>解锁医院数据</span>
              <div>
                <Button type="primary" onClick={download}>导出</Button>
                <Button type="primary" onClick={lock}>锁定</Button>
                <Button type="primary" onClick={unLock}>解锁</Button>
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
    checkIndex20,
    loading,
  }: {
    checkIndex20: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex20,
    submitting: loading.effects['checkIndex20/list']||loading.effects['checkIndex20/calc']||loading.effects['checkIndex20/download'],
  }),
)(TableList);
