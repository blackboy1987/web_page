
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
  index7: StateType;
  submitting: boolean;
}

const getValue = (obj:any) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const TableList: React.FC<TableListProps> = ({dispatch,submitting}) => {
  const [height,setHeight] = useState<number>(window.innerHeight-Constants.tableHeight);
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
      type:'index7/list',
      payload:params,
      callback:(response:TableListData)=>{
        console.log("response",response);
        setData(response);
      }
    })
  }

  useEffect(()=>{
    list({...formatFormParams(form.getFieldsValue())});
  },[]);

  const columns: ColumnProps<TableListItem>[] = [
    {
      title: '',
      dataIndex: 'id',
      width:40,
      fixed:'left',
      render:(text,record,index)=><span>{index+1}</span>
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width:60,
    },
    {
      title: '科室编码',
      dataIndex: 'deptCode',
      width:90,
    },
    {
      title: '科室名称',
      dataIndex: 'deptName',
      width:80,
    },
    {
      title: '物资编码',
      dataIndex: 'invCode',
      width:90,
    },
    {
      title: '物资名称',
      dataIndex: 'invName',
    },
    {
      title: '计量单位',
      dataIndex: 'unitName',
      width:80,
    },
    {
      title: '规格型号',
      dataIndex: 'chargeCode',
      width:80,
    },
    {
      title: '数量',
      dataIndex: 'invNum',
      sorter:true,
      width:70,
    },
    {
      title: '单价',
      dataIndex: 'price',
      sorter:true,
      width:70,
    },
    {
      title: '金额',
      dataIndex: 'invAmount',
      sorter:true,
      width:70,
    },
    {
      title: '是否单收费',
      dataIndex: 'isCharg',
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
                <Select.Option value='100001'>100001</Select.Option>
                <Select.Option value='100002'>100002</Select.Option>
                <Select.Option value='100003'>100003</Select.Option>
                <Select.Option value='100004'>100004</Select.Option>
                <Select.Option value='100005'>100005</Select.Option>
                <Select.Option value='100006'>100006</Select.Option>
                <Select.Option value='100007'>100007</Select.Option>
                <Select.Option value='100008'>100008</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='年度' name="acctYear">
              <DatePicker format='YYYY' picker="year" />
            </Form.Item>
            <Form.Item label='材料名称' name="invCode">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='科室名称' name="deptCode">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='是否单收费' name="isCharg">
              <Select style={{width:80}}>
                <Select.Option value=''>全部</Select.Option>
                <Select.Option value='是'>是</Select.Option>
                <Select.Option value='否'>否</Select.Option>
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
          selectedRows={[]}
          onSelectRow={()=>console.log("aa")}
          onChange={handleTableChange}
        />
      </Card>
    </PageContainer>
  );
};


export default connect(
  ({
     index7,
     loading,
   }: {
    index7: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    index7,
    submitting: loading.effects['index7/list'],
  }),
)(TableList);
