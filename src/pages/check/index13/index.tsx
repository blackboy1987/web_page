import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Select, Button, Card, DatePicker, message, Modal } from 'antd';
import { Constants } from '@/utils/constants';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/pages/user/login/model';
import { ColumnProps } from 'antd/es/table';
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { commonHandleTableChange, downloadFile, formatFormParams } from '@/utils/common';
import moment from 'moment';
import StandardTable from '@/components/StandTable1';
import { TableListData, TableListItem } from './data.d';
// @ts-ignore
import styles from './style.less';

interface TableListProps {
  dispatch: Dispatch;
  checkIndex13: StateType;
  submitting: boolean;
}



const TableList: React.FC<TableListProps> = ({ dispatch, submitting }) => {
  const [height, setHeight] = useState<number>(window.innerHeight - Constants.tableHeight);
  const [selectedRows, setSelectRows] = useState<TableListItem[]>([]);
  const [danWeis, setDanWeis] = useState<{ compCode: string }[]>([]);
  const [keShis, setKeShis] = useState<any[]>([]);

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
      type: 'checkIndex13/list',
      payload: params,
      callback: (response: TableListData) => {
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
  const keShi = () => {
    dispatch({
      type: 'common/keShi',
      callback: (response: { compCode: string }[]) => {
        setKeShis(response);
      },
    });
  };
  useEffect(() => {
    list({ ...formatFormParams(form.getFieldsValue()) });
    danWei();
    keShi()
  }, []);

  const calc = () => {
    Modal.confirm({
      title:'提示',
      content:'确定计算',
      onOk:()=>{
        dispatch({
          type: 'checkIndex13/calc',
          payload: { ...formatFormParams(form.getFieldsValue()) },
          callback: (response: {code:number,msg:string}) => {
            const {code,msg} = response;
            if(code===1){
              message.success(msg);
            }else{
              message.error(msg);
            }
            list({...formatFormParams(form.getFieldsValue())});
          },
        });
      }
    })
  };

  const columns: ColumnProps<TableListItem>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 40,
      fixed: 'left',
      render: (text, record, checkIndex13) => <span>{checkIndex13 + 1}</span>,
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width: 100,
    },
    {
      title: '合并科室名称',
      dataIndex: 'deptName',
      width: 120,
    },
    {
      title: '医护标识',
      dataIndex: 'personType',
      width: 120,
    },
    {
      title: '人员经费',
      dataIndex: 'wageCount',
      width: 120,
    },
    {
      title: '卫生材料(公摊)',
      dataIndex: 'mateCount',
      width: 80,
    },
    {
      title: '固定资产折旧(公摊)',
      dataIndex: 'equiCount',
      width: 80,
    },
    {
      title: '无形资产 ',
      dataIndex: 'assetsCount',
      width: 80,
    },
    {
      title: '提取风险基金',
      dataIndex: 'riskCount',
      width: 80,
    },
    {
      title: '其他费用 ',
      dataIndex: 'otherCount',
      width: 80,
    },
    {
      title: '医辅费用',
      dataIndex: 'reduceAmount',
      width: 80,
    },
    {
      title: '管理费用',
      dataIndex: 'medicalassistCount',
      width: 80,
    },
    {
      title: '剔除成本（躺椅等)',
      dataIndex: 'reduceAmount',
      width: 80,
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
    commonHandleTableChange(pagination,filtersArg,sorter,form.getFieldsValue(),(params)=>{
      list(params);
    });
  };

  const handleSelectRows = (rows: TableListItem[]) => {
    setSelectRows(rows);
  };

  const download = () => {
    dispatch({
      type: 'checkIndex13/download',
      payload: { ...formatFormParams(form.getFieldsValue()) },
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
              deptName:'',
            }}
          >
            <Form.Item label="单位" name="compCode">
              <Select style={{ width: 100 }}>
                {danWeis.map((item,index) => (
                  <Select.Option key={index} value={`${item.compCode}`}>{item.compCode}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="年度" name="acctYear">
              <DatePicker format="YYYY" picker="year" />
            </Form.Item>
            <Form.Item label="科室" name="deptName">
              <Select style={{ width: 160 }}>
                <Select.Option value=''>全部</Select.Option>
                {keShis.map((item,index) => (
                  <Select.Option key={index} value={`${item.code}`}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <div className={styles.btns}>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button type="primary" onClick={calc}>计算</Button>
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
              <span className={styles.title}>科室成本归集</span>
              <div>
                <Button type="primary" onClick={download}>导出</Button>
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
    checkIndex13,
    loading,
  }: {
    checkIndex13: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex13,
    submitting: loading.effects['checkIndex13/list']||loading.effects['checkIndex13/calc'],
  }),
)(TableList);
