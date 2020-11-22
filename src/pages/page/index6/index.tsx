
import React, {useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import { Form, Select, Button,Card,DatePicker } from 'antd';

import styles from './style.less';
import {ApiResponse} from "@/utils/paramFormat";


const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const columns: ProColumns<TableListItem>[] = [
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
      fixed:'left',
      width:60,
    },
    {
      title: '门诊住院',
      dataIndex: 'incomeType',
      fixed:'left',
      width:80,
    },
    {
      title: '开单科室编码',
      dataIndex: 'orderedBy',
      fixed:'left',
      width:120,
    },
    {
      title: '开单科室名称',
      dataIndex: 'orderedName',
      fixed:'left',
      width:120,
    },
    {
      title: '执行科室编码',
      dataIndex: 'performBy',
      width:120,
    },
    {
      title: '执行科室名称',
      dataIndex: 'performName',
      width:120,
    },
    {
      title: '收费项目编码',
      dataIndex: 'chargeCode',
      width:120,
    },
    {
      title: '收费项目名称',
      dataIndex: 'chargeName',
      width:120,
    },
    {
      title: '明细分类',
      dataIndex: 'detailType',
      width:80,
    },
    {
      title: '单价',
      dataIndex: 'chargePrice',
      width:40,
    },
    {
      title: '数量',
      dataIndex: 'chargeWorkload',
      width:40,
    },
    {
      title: '金额',
      width:60,
      dataIndex: 'chargeAmount',
    },
    {
      title: '归属门诊',
      width:80,
      dataIndex: 'belongMenzhen',
    },
    {
      title: '医生姓名',
      width:80,
      dataIndex: 'docName',
    },
  ];

  const onFinish = (values:{[key:string]:any}) => {
    console.log('Finish:', values);
  };

  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Card bordered={false} size='small'>
          <Form form={form} layout="inline" onFinish={onFinish}>
            <Form.Item label='单位' name="danwei">
              <Select style={{width:100}} allowClear>
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
            <Form.Item label='年度' name="username">
              <DatePicker format='YYYY' picker="year" />
            </Form.Item>
            <Form.Item>
              <div className={styles.btns}>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button type="primary" htmlType="submit">导入</Button>
                <Button type="primary" htmlType="submit">导出</Button>
                <Button type="primary" htmlType="submit">模版下载</Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <ProTable<TableListItem>
        bordered
        size='small'
        headerTitle="收入频次录入"
        actionRef={actionRef}
        rowKey="levelNum"
        search={false}
        request={
          (params, sorter, filter) =>{
            let values = { ...params, sorter, filter };
            values = {
              ...values,
              pageNumber:values.current || 1,
            }
            if(values.sorter){
              for(const key in values.sorter){
                values = {
                  ...values,
                  orderProperty:key,
                  orderDirection:values.sorter[`${key}`]==='"ascend"' ? 'ASC' : 'DESC',
                }
              }
              delete values.sorter;
            }
            delete values.current;
            console.log(values);
            return queryRule(values).then((res:ApiResponse)=>{
              const {pageNumber,pageSize,recordCount,result=[]} = res.body.dataStores.result.rowDatas[0];
              return {
                data:result||[],
                total:recordCount,
                success:0,
                pageSize:pageSize,
                current:pageNumber
              }
            })
          }
        }
        columns={columns}
        scroll={{x:1700}}
      />
    </PageContainer>
  );
};

export default TableList;
