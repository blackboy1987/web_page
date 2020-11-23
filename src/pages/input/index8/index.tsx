
import React, {useEffect, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {TableListData, TableListItem} from './data.d';
import { Form, Select, Button,Card,DatePicker } from 'antd';
import styles from './style.less';
import {Constants} from "@/utils/constants";
import {connect,Dispatch} from "umi";
import {StateType} from "@/pages/user/login/model";
import {ColumnProps} from "antd/es/table";
import {Key, SorterResult, TablePaginationConfig} from "antd/lib/table/interface";
import {formatFormParams} from "@/utils/common";
import moment from "moment";
import StandardTable from '@/components/StandTable1';

interface TableListProps {
  dispatch: Dispatch;
  index8: StateType;
  submitting: boolean;
}

const getValue = (obj:any) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const TableList: React.FC<TableListProps> = ({dispatch,submitting}) => {
  const [height,setHeight] = useState<number>(window.innerHeight-Constants.tableHeight);
  const [selectedRows,setSelectRows] = useState<TableListItem[]>([]);
  const [danWeis,setDanWeis] = useState<{compCode:string}[]>([]);
  const [form] = Form.useForm();
  const [data,setData] = useState<TableListData>({
    list:[],
    pagination:{
      pageSize:20,
      current:1,
      total:0,
    }

  });
  useEffect(()=>{
    setHeight(window.innerHeight-Constants.tableHeight)
  },[height])

  const list = (params:{[key:string]:any}) =>{
    dispatch({
      type:'index8/list',
      payload:params,
      callback:(response:TableListData)=>{
        console.log("response",response);
        setData(response);
      }
    })
  }
  const danWei = () =>{
    dispatch({
      type:'common/danWei',
      callback:(response:{compCode:string}[])=>{
        setDanWeis(response);
      }
    })
  }
  useEffect(()=>{
    list({...formatFormParams(form.getFieldsValue())});
    danWei();
  },[]);

  const columns: ColumnProps<TableListItem>[] = [
    {
      title: '',
      dataIndex: 'id',
      width:40,
      fixed:'left',
      render:(text,record,index8)=><span>{index8+1}</span>
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width:60,
    },
    {
      title: '月份',
      dataIndex: 'month',
      width:60,
    },
    {
      title: '资产编码',
      dataIndex: 'devCode',
    },
    {
      title: '资产名称',
      dataIndex: 'devName',
    },
    {
      title: '科室编码',
      dataIndex: 'deptCode',
    },
    {
      title: '科室名称',
      dataIndex: 'deptName',
    },
    {
      title: '开始使用时间',
      dataIndex: 'startUsingDate',
      width:120,
    },
    {
      title: '使用年限',
      dataIndex: 'serviceLife',
      width:120,
    },
    {
      title: '类别名称',
      dataIndex: 'equiType',
    },
    {
      title: '资产原值',
      dataIndex: 'devPrim',
      sorter:true,
      width:100,
    },
    {
      title: '本年计提折旧',
      dataIndex: 'devAmount',
      sorter:true,
      width:120,
    },
    {
      title: '自筹比例',
      dataIndex: 'raiseRatio',
      sorter:true,
      width:100,
    },
    {
      title: '资金来源',
      dataIndex: 'sourceFund',
      width:80,
    },
  ];

  const onFinish = (values:{[key:string]:any}) => {
    list(formatFormParams(values));
  };

  const handleTableChange=(pagination: TablePaginationConfig, filtersArg: Record<string, Key[] | null>, sorter: SorterResult<TableListItem>)=>{
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params:{[key:string]:any} = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formatFormParams(form.getFieldsValue()),
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    list(params);
  }

  const handleSelectRows = (rows: TableListItem[]) => {
    setSelectRows(rows);
  };

  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Card bordered={false} size='small' className={styles.searchBar}>
          <Form form={form} layout="inline" onFinish={onFinish} initialValues={{
            isCharg:'',
            compCode:'100001',
            acctYear:moment('2019'),
            devCode:"",
            deptCode:"",
            sourceFund:"",
          }}>
            <Form.Item label='单位' name="compCode">
              <Select style={{width:100}}>
                {
                  danWeis.map(item=>(<Select.Option value={`${item.compCode}`}>{item.compCode}</Select.Option>))
                }
              </Select>
            </Form.Item>
            <Form.Item label='年度' name="acctYear">
              <DatePicker format='YYYY' picker="year" />
            </Form.Item>
            <Form.Item label='资产名称' name="devCode">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='科室名称' name="deptCode">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='资金来源' name="sourceFund">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <div className={styles.btns}>
                <Button type="primary" htmlType="submit">查询</Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Card size='small' bordered={false} bodyStyle={{padding:16}}>
        <StandardTable
          loading={submitting}
          bordered
          size='small'
          title={()=>(
            <div className={styles.tableTitle}>
              <span className={styles.title}>收入频次录入</span>
              <div>
                <Button type='primary'>导入</Button>
                <Button type='primary'>导出</Button>
                <Button type='primary'>模版下载</Button>
              </div>
            </div>
          )}
          scroll={{
            x:1200,
            y:height
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
     index8,
     loading,
   }: {
    index8: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    index8,
    submitting: loading.effects['index8/list'],
  }),
)(TableList);
