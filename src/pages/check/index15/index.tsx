import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Button, Card, Modal, message } from 'antd';
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
  checkIndex15: StateType;
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
      type: 'checkIndex15/list',
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
      render: (text, record, checkIndex15) => <span>{checkIndex15 + 1}</span>,
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width: 100,
    },
    {
      title: '医院编码',
      dataIndex: 'itemCode',
      width: 120,
    },
    {
      title: '项目名称',
      dataIndex: 'itemName',
      width: 120,
    },
    {
      title: '医院价格',
      dataIndex: 'itemPrice',
      width: 120,
    },
    {
      title: '单位定价成本',
      dataIndex: 'unitCost',
      width: 120,
    },
    {
      title: '盈亏率',
      dataIndex: 'ratio',
      width: 120,
    },
    {
      title: '频次',
      dataIndex: 'itemCount',
      width: 120,
    },
    {
      title: '总成本',
      dataIndex: 'allCost',
      width: 120,
    },
    {
      title: '人员经费',
      dataIndex: 'wagCountUnit',
      width: 120,
    },
    {
      title: '卫生材料',
      dataIndex: 'mateCountUnit',
      width: 120,
    },
    {
      title: '固定资产折旧',
      dataIndex: 'equiCountUnit',
      width: 120,
    },
    {
      title: '无形资产',
      dataIndex: 'immaterialAssetsCountUnit',
      width: 120,
    },
    {
      title: '提取风险基金',
      dataIndex: 'extractTheRiskFundCountUnit',
      width: 120,
    },
    {
      title: '其它费用',
      dataIndex: 'otherCountUnit',
      width: 120,
    },
    {
      title: '医辅费用',
      dataIndex: 'indirectAuxiliaryCountUnit',
      width: 120,
    },
    {
      title: '管理费用',
      dataIndex: 'indirectManageCountUnit',
      width: 120,
    },
    {
      title: '材料专属',
      dataIndex: 'otoMateCountUnit',
      width: 120,
    },
    {
      title: '资产专属',
      dataIndex: 'otoEquiCountUnit',
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

  const calc = () => {
    Modal.confirm({
      title:'提示',
      content:'确定计算',
      onOk:()=>{
        dispatch({
          type: 'checkIndex15/calc',
          payload: formValues ,
          callback: (response: {code:number,msg:string}) => {
            const {code,msg} = response;
            if(code===1){
              message.success(msg);
            }else{
              message.error(msg);
            }
            list(formValues);
          },
        });
      }
    })
  };

  const download = () => {
    dispatch({
      type: 'checkIndex15/download',
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
              itemCode:'',
            }}
            searchKeys={['compCode','acctYear','itemCode']}
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
              <span className={styles.title}>未匹配项目结果</span>
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
    checkIndex15,
    loading,
  }: {
    checkIndex15: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex15,
    submitting: loading.effects['checkIndex15/list']||loading.effects['checkIndex15/calc']||loading.effects['checkIndex15/download'],
  }),
)(TableList);
