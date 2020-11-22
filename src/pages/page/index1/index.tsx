
import React, {useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import { Form, Select, Button,Card,DatePicker } from 'antd';

import styles from './style.less';


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
      title: '资产',
      dataIndex: 'name',
      render:()=><span>特需病房</span>
    },
    {
      title: '期末余额',
      dataIndex: 'name',
      render:()=><span>0.00</span>
    },
    {
      title: '年初余额',
      dataIndex: 'name',
      render:()=><span>0.00</span>
    },
    {
      title: '负债和净资产',
      dataIndex: 'name',
      render:()=><span>0.00</span>
    },
    {
      title: '期末余额',
      dataIndex: 'name',
      render:()=><span>0.00</span>
    },
    {
      title: '年初余额',
      dataIndex: 'name',
      render:()=><span>0.00</span>
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
        headerTitle="资产负债表"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
