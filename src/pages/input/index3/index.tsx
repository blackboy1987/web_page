
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
  index3: StateType;
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
      type:'index3/list',
      payload:params,
      callback:(response:TableListData)=>{
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
      render:(text,record,index3)=><span>{index3+1}</span>
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width:60,
    },
    {
      title: '级次',
      dataIndex: 'deptOrder',
      width:60,
    },
    {
      title: '科室编码',
      dataIndex: 'deptCode',
      width:80,
    },
    {
      title: '科室名称',
      dataIndex: 'deptName',
      width:100,
    },
    {
      title: '人员经费',
      dataIndex: 'wageAmount',
    },
    {
      title: '卫生材料费',
      dataIndex: 'mateAmount',
      width:80,
    },
    {
      title: '药品费',
      dataIndex: 'drugsAmount',
      width:80,
    },
    {
      title: '固定资产折旧',
      dataIndex: 'equiAmount',
      sorter:true,
      width:120,
    },
    {
      title: '无形资产摊销',
      dataIndex: 'intangibleAssetsAmount',
      sorter:true,
      width:120,
    },
    {
      title: '提取风险基金',
      dataIndex: 'riskFundAmount',
      sorter:true,
      width:120,
    },
    {
      title: '其他费用 ',
      dataIndex: 'otherAmount',
      width:100,
    },
    {
      title: '其他费用 ',
      dataIndex: 'deptAmount',
      width:100,
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
            invCode:'',
            deptCode:'',
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
            <Form.Item label='科室名称' name="deptCode">
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
              <span className={styles.title}>全成本报表录入</span>
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
     index3,
     loading,
   }: {
    index3: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    index3,
    submitting: loading.effects['index3/list']||loading.effects['common/danWei'],
  }),
)(TableList);
