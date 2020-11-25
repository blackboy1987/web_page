import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Button, Card, message } from 'antd';
import { Constants } from '@/utils/constants';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/pages/user/login/model';
import { ColumnProps } from 'antd/es/table';
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { commonHandleTableChange, downloadFile } from '@/utils/common';
import StandardTable from '@/components/StandTable1';
import { TableListData, TableListItem } from './data.d';
// @ts-ignore
import styles from './style.less';
import SearchBar from "@/components/SearchBar";
import moment from "moment";

interface TableListProps {
  dispatch: Dispatch;
  checkIndex18: StateType;
  submitting: boolean;
}



const TableList: React.FC<TableListProps> = ({ dispatch, submitting }) => {
  const [height, setHeight] = useState<number>(window.innerHeight - Constants.tableHeight);
  const [selectedRows, setSelectRows] = useState<TableListItem[]>([]);
  const [formValues,setFormValues] = useState<{[key:string]:any}>({})
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
    setFormValues(params);
    dispatch({
      type: 'checkIndex18/list',
      payload: params,
      callback: (response: TableListData) => {
        console.log('response', response);
        setData(response);
      },
    });
  };

  const columns: ColumnProps<TableListItem>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 40,
      fixed: 'left',
      render: (text, record, checkIndex18) => <span>{checkIndex18 + 1}</span>,
    },
    {
      title: '成本类型',
      dataIndex: 'costDeptType',
      width: 120,
    },
    {
      title: '行次级关系',
      dataIndex: 'rowRelation',
      width: 120,
    },
    {
      title: '总额',
      dataIndex: 'tolAmount',
      width: 120,
    },
    {
      title: '卫生材料',
      dataIndex: 'mateAmount',
      width: 120,
    },
    {
      title: '固定资产折旧',
      dataIndex: 'equiAmount',
      width: 120,
    },
    {
      title: '无形资产',
      dataIndex: 'immaterialAmount',
      width: 120,
    },
    {
      title: '提取风险基金',
      dataIndex: 'riskAmount',
      width: 120,
    },
    {
      title: '其他费用',
      dataIndex: 'otherAmount',
      width: 120,
    },
    {
      title: '医辅费用',
      dataIndex: 'auxiliaryAmount',
      width: 120,
    },
    {
      title: '管理费用',
      dataIndex: 'manageAmount',
      width: 120,
    },
  ];

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
      type: 'checkIndex18/download',
      payload: formValues,
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
          <SearchBar
            initialValues={{
              compCode: '100001',
              acctYear: moment('2019'),
            }}
            searchKeys={['compCode','acctYear']}
            onSearch={(params:{[key:string]:any}) => list(params)}
          />
        </Card>
      </div>
      <Card size="small" bordered={false} bodyStyle={{ padding: 16 }}>
        <StandardTable
          loading={submitting}
          bordered
          size="small"
          title={() => (
            <div className={styles.tableTitle}>
              <span className={styles.title}>原始归集结果核对</span>
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
    checkIndex18,
    loading,
  }: {
    checkIndex18: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex18,
    submitting: loading.effects['checkIndex18/list']||loading.effects['checkIndex18/calc']||loading.effects['checkIndex18/download'],
  }),
)(TableList);
