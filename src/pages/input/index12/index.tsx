import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Form, Select, Button, Card, DatePicker, Input} from 'antd';
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
  index12: StateType;
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
      type: 'index12/list',
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
  useEffect(() => {
    list({ ...formatFormParams(form.getFieldsValue()) });
    danWei();
  }, []);

  const columns: ColumnProps<TableListItem>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 40,
      fixed: 'left',
      render: (text, record, index12) => <span>{index12 + 1}</span>,
    },
    {
      title: '收费项目编码',
      dataIndex: 'chargeCode',
      width: 100,
    },
    {
      title: '收费项目名称',
      dataIndex: 'chargeName',
      width: 180,
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      width: 50,
    },
    {
      title: '是否核算',
      dataIndex: '"isCheck"',
      width: 80,
    },
    {
      title: '标准项目编码',
      dataIndex: 'standardCode',
      width: 120,
    },
    {
      title: '标准项目名称',
      dataIndex: 'standardName',
      width: 120,
    },
    {
      title: '标准项目单价',
      dataIndex: 'standardUnitPrice',
      sorter: true,
      width: 120,
    },
    {
      title: '创建年度',
      dataIndex: 'createYear',
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
              isCheck: '',
              compCode: '100001',
              acctYear: moment('2019'),
              iscontrast: '',
              chargeName:'',
            }}
          >
            <Form.Item label="单位" name="compCode">
              <Select style={{ width: 100 }}>
                {danWeis.map((item) => (
                  <Select.Option value={`${item.compCode}`}>{item.compCode}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="年度" name="acctYear">
              <DatePicker format="YYYY" picker="year" />
            </Form.Item>
            <Form.Item label="收费项目" name="chargeName">
              <Input />
            </Form.Item>
            <Form.Item label="是否核算" name="isCheck">
              <Select style={{ width: 100 }}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">是</Select.Option>
                <Select.Option value="0">否</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="是否对应" name="iscontrast">
              <Select style={{ width: 100 }}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">是</Select.Option>
                <Select.Option value="0">否</Select.Option>
              </Select>
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
              <span className={styles.title}>收费项目对照</span>
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
    index12,
    loading,
  }: {
    index12: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    index12,
    submitting: loading.effects['index12/list'],
  }),
)(TableList);
