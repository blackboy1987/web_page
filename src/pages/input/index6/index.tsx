
import React, {useEffect, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {TableListData, TableListItem} from './data.d';
import { Form, Select, Button,Card,DatePicker } from 'antd';
import styles from './style.less';
import {Constants} from "@/utils/constants";
import {connect,Dispatch} from "umi";
import {StateType} from "@/pages/user/login/model";
import {ColumnProps} from "antd/es/table";
import {Key, SorterResult, TablePaginationConfig} from "antd/lib/table/interface";
import {formatFormParams} from "@/utils/common";
import moment from "moment";
import StandardTable from '@/components/StandTable1';

interface TableListProps {
  dispatch: Dispatch;
  index6: StateType;
  submitting: boolean;
}

const getValue = (obj:any) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const TableList: React.FC<TableListProps> = ({dispatch,submitting}) => {
  const [height,setHeight] = useState<number>(window.innerHeight-Constants.tableHeight);
  const [selectedRows,setSelectRows] = useState<TableListItem[]>([]);
  const [danWeis,setDanWeis] = useState<{compCode:string}[]>([]);
  const [form] = Form.useForm();
  const [data,setData] = useState<TableListData>({
    list:[],
    pagination:{
      pageSize:20,
      current:1,
      total:0,
    }

  });
  useEffect(()=>{
    setHeight(window.innerHeight-Constants.tableHeight)
  },[height])

  const list = (params:{[key:string]:any}) =>{
    dispatch({
      type:'index6/list',
      payload:params,
      callback:(response:TableListData)=>{
        console.log("response",response);
        setData(response);
      }
    })
  }
  const danWei = () =>{
    dispatch({
      type:'common/danWei',
      callback:(response:{compCode:string}[])=>{
        setDanWeis(response);
      }
    })
  }
  useEffect(()=>{
    list({...formatFormParams(form.getFieldsValue())});
    danWei();
  },[]);

  const columns: ColumnProps<TableListItem>[] = [
    {
      title: '',
      dataIndex: 'id',
      width:40,
      fixed:'left',
      render:(text,record,index6)=><span>{index6+1}</span>
    },
    {
      title: '年度',
      dataIndex: 'acctYear',
      width:60,
    },
    {
      title: '门诊住院',
      dataIndex: 'incomeType',
      width:60,
    },
    {
      title: '开单科室编码',
      dataIndex: 'orderedBy',
    },
    {
      title: '开单科室名称',
      dataIndex: 'orderedName',
    },
    {
      title: '执行科室编码',
      dataIndex: 'performBy',
    },
    {
      title: '执行科室名称',
      dataIndex: 'performName',
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
    },
    {
      title: '单价',
      dataIndex: 'chargePrice',
      sorter:true,
      width:70,
    },
    {
      title: '数量',
      dataIndex: 'chargeWorkload',
      sorter:true,
      width:70,
    },
    {
      title: '金额',
      dataIndex: 'chargeAmount',
      sorter:true,
      width:70,
    },
    {
      title: '归属门诊',
      dataIndex: 'belongMenzhen',
      width:80,
    },
    {
      title: '医生姓名',
      dataIndex: 'docName',
      width:90,
    },
  ];

  const onFinish = (values:{[key:string]:any}) => {
    list(formatFormParams(values));
  };

  const handleTableChange=(pagination: TablePaginationConfig, filtersArg: Record<string, Key[] | null>, sorter: SorterResult<TableListItem>)=>{
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params:{[key:string]:any} = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formatFormParams(form.getFieldsValue()),
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    list(params);
  }

  const handleSelectRows = (rows: TableListItem[]) => {
    setSelectRows(rows);
  };

  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Card bordered={false} size='small' className={styles.searchBar}>
          <Form form={form} layout="inline" onFinish={onFinish} initialValues={{
            isCharg:'',
            compCode:'100001',
            acctYear:moment('2019'),
            itemCode:"",
            detailType:"",
            KDeptCode:"",
            ZDeptCode:"",
            belongMen:"",
            docName:"",
          }}>
            <Form.Item label='单位' name="compCode">
              <Select style={{width:100}}>
                {
                  danWeis.map(item=>(<Select.Option value={`${item.compCode}`}>{item.compCode}</Select.Option>))
                }
              </Select>
            </Form.Item>
            <Form.Item label='年度' name="acctYear">
              <DatePicker format='YYYY' picker="year" />
            </Form.Item>
            <Form.Item label='项目名称' name="itemCode">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='明细分类' name="detailType">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='开单科室' name="KDeptCode">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='执行科室' name="ZDeptCode">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='归属门诊' name="belongMen">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='医生姓名' name="docName">
              <Select style={{width:100}}>
                <Select.Option value=''>全部</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <div className={styles.btns}>
                <Button type="primary" htmlType="submit">查询</Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Card size='small' bordered={false} bodyStyle={{padding:16}}>
        <StandardTable
          loading={submitting}
          bordered
          size='small'
          title={()=>(
            <div className={styles.tableTitle}>
              <span className={styles.title}>收入频次录入</span>
              <div>
                <Button type='primary'>导入</Button>
                <Button type='primary'>导出</Button>
                <Button type='primary'>模版下载</Button>
              </div>
            </div>
          )}
          scroll={{
            x:1200,
            y:height
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
     index6,
     loading,
   }: {
    index6: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    index6,
    submitting: loading.effects['index6/list'],
  }),
)(TableList);
