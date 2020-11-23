import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Select, Button, Card, DatePicker } from 'antd';
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
  index10: StateType;
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
      type: 'index10/list',
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
      render: (text, record, index10) => <span>{index10 + 1}</span>,
    },
    {
      title: '病房等级',
      dataIndex: 'wardLevel',
      width: 60,
    },
    {
      title: '病房规格（床/间）',
      dataIndex: 'wardStand',
    },
    {
      title: '收费标准（元/床.日）',
      dataIndex: 'changeStand',
    },
    {
      title: '病房面积（平方米/间）',
      dataIndex: 'wardArea',
      width: 140,
    },
    {
      title: '病房数量（间）',
      dataIndex: 'wardNum',
      width: 120,
    },
    {
      title: '床位数',
      dataIndex: 'bedNum',
      width: 80,
    },
    {
      title: '病房面积合计（平方米）',
      dataIndex: 'wardAreaAll',
      width: 160,
    },
    {
      title: '住院大楼名称',
      dataIndex: 'buildName',
      width: 120,
    },
    {
      title: '住院大楼竣工时间',
      dataIndex: 'buildCompleteTime',
      width: 120,
    },
    {
      title: '住院大楼总造价',
      dataIndex: 'buildCost',
      width: 120,
    },
    {
      title: '住院大楼总建筑面积',
      dataIndex: 'buildArea',
      width: 120,
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
              acctYear: moment('2019'),
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
              <span className={styles.title}>医疗机构病房构成明细表</span>
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
    index10,
    loading,
  }: {
    index10: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    index10,
    submitting: loading.effects['index10/list'],
  }),
)(TableList);
