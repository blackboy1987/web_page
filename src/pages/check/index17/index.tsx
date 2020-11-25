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
  checkIndex17: StateType;
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
      type: 'checkIndex17/list',
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
      render: (text, record, checkIndex17) => <span>{checkIndex17 + 1}</span>,
    },
    {
      title: '合并科室',
      dataIndex: 'deptHbName',
      width: 120,
    },
    {
      title: '收入',
      children:[
        {
          title: '收入明细金额',
          dataIndex: 'chargeAmount',
        },
        {
          title: '床位费收入金额',
          dataIndex: 'bedIncome',
        },
      ]
    },
    {
      title: '人员经费',
      children:[
        {
          title: '报表金额',
          dataIndex: 'wageReport',
        },
        {
          title: '上报清单金额',
          dataIndex: 'wageDetail',
        },
        {
          title: '报表-上报清单',
          dataIndex: 'wageReportDetail',
        },
        {
          title: '计算结果',
          dataIndex: 'wageJieguo',
        },
        {
          title: '其中医生金额',
          dataIndex: 'wageJieguoDoc',
        },
        {
          title: '其中护士金额',
          dataIndex: 'wageJieguoNur',
        },
        {
          title: '报表-计算结果',
          dataIndex: 'wageReportJieguo',
        },
        {
          title: '核减金额',
          dataIndex: 'wageReduce',
        },
      ]
    },
    {
      title: '卫生材料',
      children:[
        {
          title: '报表金额',
          dataIndex: 'mateReport',
        },
        {
          title: '上报清单金额',
          dataIndex: 'mateDetail',
        },
        {
          title: '报表-上报清单',
          dataIndex: 'mateReportDetail',
        },
        {
          title: '计算结果',
          dataIndex: 'mateJieguo',
        },
        {
          title: '其中可收费卫生材料',
          dataIndex: 'mateDetailCharg',
        },
        {
          title: '其中不可收费卫生材料(合计)',
          dataIndex: 'mateDetailNocharg',
        },
        {
          title: '不可收费卫生材料(共享)',
          dataIndex: 'mateDetailNochargShare',
        },
        {
          title: '不可收费卫生材料(专属)',
          dataIndex: 'mateDetailNochargOto',
        },
        {
          title: '清单-计算结果',
          dataIndex: 'mateDetailJieguo',
        },
        {
          title: '核减金额',
          dataIndex: 'mateReduce',
        },
      ]
    },
    {
      title: '资产折旧',
      children:[
        {
          title: '报表金额',
          dataIndex: 'equiReport',
        },
        {
          title: '上报清单金额',
          dataIndex: 'equiDetail',
        },
        {
          title: '报表-上报清单',
          dataIndex: 'equiReportDetail',
        },
        {
          title: '计算结果',
          dataIndex: 'equiJieguo',
        },
        {
          title: '其中固定资产折旧（共享）',
          dataIndex: 'equiDetailShare',
        },
        {
          title: '其中固定资产折旧（专属）',
          dataIndex: 'equiDetailOto',
        },
        {
          title: '其中固定资产折旧（床位费）',
          dataIndex: 'equiDetailBed',
        },
        {
          title: '清单-计算结果',
          dataIndex: 'equiDetailJieguo',
        },
        {
          title: '核减金额',
          dataIndex: 'equiReduce',
        },
      ]
    },
    {
      title: '无形资产',
      children:[
        {
          title: '报表金额',
          dataIndex: 'intangibleReport',
        },
        {
          title: '计算结果',
          dataIndex: 'intangibleJieguo',
        },
        {
          title: '其中无形资产（床位费）',
          dataIndex: 'intangibleDetailBed',
        },
        {
          title: '核减金额',
          dataIndex: '其中无形资产（非床位费）',
        },
        {
          title: '报表-计算结果',
          dataIndex: 'intangibleReportJieguo',
        },
        {
          title: '核减数',
          dataIndex: 'intangibleReduce',
        },
      ]
    },
    {
      title: '提取风险基金',
      children:[
        {
          title: '报表金额',
          dataIndex: 'riskReport',
        },
        {
          title: '计算结果',
          dataIndex: 'riskJieguo',
        },
        {
          title: '报表-计算结果',
          dataIndex: 'riskReportJieguo',
        },
      ]
    },
    {
      title: '其他费用',
      children:[
        {
          title: '报表金额',
          dataIndex: 'otherReport',
        },
        {
          title: '计算结果',
          dataIndex: 'otherJieguo',
        },
        {
          title: '计算结果金额（床位费）',
          dataIndex: 'otherDetailBed',
        },
        {
          title: '计算结果金额（非床位费）',
          dataIndex: 'otherDetailNobed',
        },
        {
          title: '报表-计算结果',
          dataIndex: 'otherReportJieguo',
        },
        {
          title: '核减数',
          dataIndex: 'otherReduce',
        },
        {
          title: '气垫床等剔除成本',
          dataIndex: 'qidianReduce',
        },
      ]
    },
    {
      title: '间接费用',
      children:[
        {
          title: '间接费用报表金额',
          dataIndex: 'jianjieReport',
        },
        {
          title: '间接费用结果金额',
          dataIndex: 'jianjieJieguo',
        },
        {
          title: '间接费用报表-结果',
          dataIndex: 'jianjieReportJieguo',
        },
        {
          title: '核减数',
          dataIndex: 'jianjieReduce',
        },
      ]
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
      type: 'checkIndex17/download',
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
              <span className={styles.title}>科室收入成本核对</span>
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
    checkIndex17,
    loading,
  }: {
    checkIndex17: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    checkIndex17,
    submitting: loading.effects['checkIndex17/list2']||loading.effects['checkIndex17/calc']||loading.effects['checkIndex17/download'],
  }),
)(TableList);
