import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Form, Select, Button, Card, DatePicker} from 'antd';
import { Constants } from '@/utils/constants';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/pages/user/login/model';
import { ColumnProps } from 'antd/es/table';
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { formatFormParams } from '@/utils/common';
import moment from 'moment';
import StandardTable from '@/components/StandTable1';
import { TableListData, TableListItem } from './data.d';
// @ts-ignore
import styles from './style.less';

interface TableListProps {
  dispatch: Dispatch;
  checkIndex12: StateType;
  submitting: boolean;
}

const getValue = (obj: any) =>
  Object.keys(obj)
    .map((key) => obj[key])
    .join(',');

const TableList: React.FC<TableListProps> = ({ dispatch, submitting }) => {
  const [height, setHeight] = useState<number>(window.innerHeight - Constants.tableHeight);
  const [selectedRows, setSelectRows] = useState<TableListItem[]>([]);
  const [danWeis, setDanWeis] = useState<{ compCode: string }[]>([]);
  const [keShiMingChens, setKeShiMingChen] = useState<any[]>([]);

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
    dispatch({
      type: 'checkIndex12/list',
      payload: params,
      callback: (response: TableListData) => {
        console.log('response', response);
        setData(response);
      },
    });
  };
  const danWei = () => {
    dispatch({
      type: 'common/danWei',
      callback: (response: { compCode: string }[]) => {
        setDanWeis(response);
      },
    });
  };
  const keShiMingChen = () => {
    dispatch({
      type: 'common/keShiMingChen',
      callback: (response: { compCode: string }[]) => {
        setKeShiMingChen(response);
      },
    });
  };
  useEffect(() => {
    list({ ...formatFormParams(form.getFieldsValue()) });
    danWei();
    keShiMingChen()
  }, []);

  const columns: ColumnProps<TableListItem>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 40,
      fixed: 'left',
      render: (text, record, checkIndex12) => <span>{checkIndex12 + 1}</span>,
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width: 100,
    },
    {
      title: '项目编码',
      dataIndex: 'chargeCode',
      width: 120,
    },
    {
      title: '项目名称',
      dataIndex: 'chargeName',
      width: 120,
    },
    {
      title: '省价格',
      dataIndex: 'unitPrice',
      width: 120,
    },
    {
      title: '市价格',
      dataIndex: 'price',
      width: 120,
    },
    {
      title: '医院价格',
      dataIndex: 'unitPrices',
      width: 120,
    },
    {
      title: '工作量',
      dataIndex: 'chargeWorkload',
      width: 120,
    },
    {
      title: '单位成本',
      dataIndex: 'dwcb',
      width: 120,
    },
    {
      title: '总成本',
      dataIndex: 'zcb',
      width: 120,
    },
    {
      title: '人员经费',
      dataIndex: 'type01',
      width: 120,
    },
    {
      title: '卫生材料',
      dataIndex: 'type02',
      width: 120,
    },
    {
      title: '固定资产折旧',
      dataIndex: 'type03',
      width: 120,
    },
    {
      title: '无形资产',
      dataIndex: 'type04',
      width: 120,
    },
    {
      title: '风险基金',
      dataIndex: 'type05',
      width: 120,
    },
    {
      title: '其他费用',
      dataIndex: 'type06',
      width: 120,
    },
    {
      title: '医辅费用',
      dataIndex: 'type07',
      width: 120,
    },
    {
      title: '管理费用',
      dataIndex: 'type08',
      width: 120,
    },
    {
      title: '协作科室医生薪酬',
      dataIndex: 'type09',
      width: 120,
    },
  ];

  const onFinish = (values: { [key: string]: any }) => {
    list(formatFormParams(values));
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filtersArg: Record<string, Key[] | null>,
    sorter: SorterResult<TableListItem>,
  ) => {
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: { [key: string]: any } = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formatFormParams(form.getFieldsValue()),
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    list(params);
  };

  const handleSelectRows = (rows: TableListItem[]) => {
    setSelectRows(rows);
  };

  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Card bordered={false} size="small" className={styles.searchBar}>
          <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            initialValues={{
              compCode: '100001',
              addYear: moment('2019'),
            }}
          >
            <Form.Item label="单位" name="compCode">
              <Select style={{ width: 100 }}>
                {danWeis.map((item,index) => (
                  <Select.Option key={index} value={`${item.compCode}`}>{item.compCode}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="年度" name="addYear">
              <DatePicker format="YYYY" picker="year" />
            </Form.Item>
            <Form.Item>
              <div className={styles.btns}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Card size="small" bordered={false} bodyStyle={{ padding: 16 }}>
        <StandardTable
          loading={submitting}
          bordered
          size="small"
          title={() => (
            <div className={styles.tableTitle}>
              <span className={styles.title}>外协项目</span>
              <div>
                <Button type="primary">导入</Button>
                <Button type="primary">导出</Button>
                <Button type="primary">模版下载</Button>
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
    checkIndex12,
    loading,
  }: {
    checkIndex12: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex12,
    submitting: loading.effects['checkIndex12/list'],
  }),
)(TableList);
