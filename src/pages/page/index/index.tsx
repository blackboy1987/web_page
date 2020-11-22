
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
      title: '病房等级',
      dataIndex: 'wardLevel',
      width:80,
    },
    {
      title: '病房规格（床/间）',
      dataIndex: 'bedNum',
      width:140,
    },
    {
      title: '收费标准（元/床.日）',
      dataIndex: 'name',
      width:160,
      render:()=><span>0.00</span>
    },
    {
      title: '病房面积（平方米/间）',
      dataIndex: 'name',
      width:170,
      render:()=><span>0.00</span>
    },
    {
      title: '病房数量（间）',
      dataIndex: 'name',
      width:120,
      render:()=><span>0.00</span>
    },
    {
      title: '床位数',
      dataIndex: 'bedNum',
      width:90,
    },
    {
      title: '病房面积合计（平方米）',
      dataIndex: 'name',
      width:180,
      render:()=><span>0.00</span>
    },
    {
      title: '住院大楼名称',
      dataIndex: 'name',
      width:120,
      render:()=><span>0.00</span>
    },
    {
      title: '住院大楼竣工时间',
      dataIndex: 'name',
      width:160,
      render:()=><span>0.00</span>
    },
    {
      title: '住院大楼总造价',
      dataIndex: 'name',
      width:160,
      render:()=><span>0.00</span>
    },
    {
      title: '住院大楼总建筑面积',
      dataIndex: 'name',
      width:150,
      render:()=><span>0.00</span>
    },
    {
      title: '备注',
      dataIndex: 'name',
      render:()=><span>备注</span>
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
        headerTitle="医疗机构病房构成明细表"
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
