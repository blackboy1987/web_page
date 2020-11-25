import {Button, DatePicker, Form, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './index.less';
import {formatFormParams} from "@/utils/common";
import {connect,Dispatch} from "umi";
import {StateType} from "@/models/common";

export interface SearchBarProps {
  dispatch: Dispatch;
  initialValues:{[key:string]:any};
  searchKeys:string[];
  onSearch:(params:{[key:string]:string})=>void;
  calc?:()=>void;
  onSave?:()=>void;
  formValuesChange?:(params:{[key:string]:string})=>void;
}

const SearchBar:React.FC<SearchBarProps>=({formValuesChange,onSave,calc,initialValues,searchKeys,dispatch,onSearch})=>{
  const [form] = Form.useForm();

  const [danWeis, setDanWeis] = useState<{ compCode: string }[]>([]);
  const [keShiMingChens, setKeShiMingChen] = useState<any[]>([]);
  const [keShiLeiXins, setKeShiLeiXins] = useState<any[]>([]);
  const [itemCodes, setItemCodes] = useState<any[]>([]);
  const [menuIds,setMenuIds] = useState<any[]>([]);

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

  const keShiLeiXin = () => {
    dispatch({
      type: 'common/keShiLeiXin',
      callback: (response: { compCode: string }[]) => {
        setKeShiLeiXins(response);
      },
    });
  };

  const itemCode = () => {
    dispatch({
      type: 'common/itemCode',
      callback: (response: any[]) => {
        setItemCodes(response);
      },
    });
  };

  const menuid = () => {
    dispatch({
      type: 'common/menuid',
      callback: (response: any[]) => {
        setMenuIds(response);
      },
    });
  };

  const onFinish = (values: { [key: string]: any }) => {
    onSearch({...formatFormParams(values)});
  };

  const onValuesChange=()=>{
    if(formValuesChange){
      formValuesChange({...formatFormParams(form.getFieldsValue())});
    }
  }

  useEffect(() => {
    onSearch({ ...formatFormParams(form.getFieldsValue()) });
    if(searchKeys.includes('compCode')){
      danWei();;
    }
    if(searchKeys.includes('deptCode')){
      keShiMingChen();
    }
    if(searchKeys.includes('deptKind')){
      keShiLeiXin();
    }
    if(searchKeys.includes('itemCode')){
      itemCode();
    }
    if(searchKeys.includes('menuid')){
      menuid();
    }

  }, []);
  return (
    <div className={styles.standardTable}>
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        initialValues={initialValues}
        onValuesChange={onValuesChange}
      >
        {
          searchKeys.includes('compCode') ? (
            <Form.Item label="单位" name="compCode">
              <Select style={{ width: 100 }} showSearch filterOption={(inputValue, option)=>option.children.indexOf(inputValue)>=0}>
                {danWeis.map((item) => (
                  <Select.Option value={`${item.compCode}`}>{item.compCode}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : null
        }
        {
          searchKeys.includes('addYear') ? (
            <Form.Item label="年度" name="addYear">
              <DatePicker format="YYYY" picker="year" />
            </Form.Item>
          ) : null
        }
        {
          searchKeys.includes('acctYear') ? (
            <Form.Item label="年度" name="acctYear">
              <DatePicker format="YYYY" picker="year" />
            </Form.Item>
          ) : null
        }
        {
          searchKeys.includes('deptCode') ? (
            <Form.Item label="成本科室名称" name="deptCode">
              <Select style={{ width: 160 }} showSearch filterOption={(inputValue, option)=>option.children.indexOf(inputValue)>=0}>
                <Select.Option value=''>全部</Select.Option>
                {keShiMingChens.map((item,index) => (
                  <Select.Option key={index} value={`${item.compCode}`}>{item.deptName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : null
        }
        {
          searchKeys.includes('deptName') ? (
            <Form.Item label="科室" name="deptName">
              <Select style={{ width: 160 }} showSearch filterOption={(inputValue, option)=>option.children.indexOf(inputValue)>=0}>
                <Select.Option value=''>全部</Select.Option>
                {keShiMingChens.map((item,index) => (
                  <Select.Option key={index} value={`${item.deptName}`}>{item.deptName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : null
        }
        {
          searchKeys.includes('deptKind') ? (
            <Form.Item label="成本科室类型" name="deptKind">
              <Select style={{ width: 100 }} showSearch filterOption={(inputValue, option)=>option.children.indexOf(inputValue)>=0}>
                <Select.Option value=''>全部</Select.Option>
                {keShiLeiXins.map((item,index) => (
                  <Select.Option value={`${item}`} key={index}>{item}</Select.Option>
                ))}
                <Select.Option value='其他'>其他</Select.Option>
              </Select>
            </Form.Item>
          ) : null
        }
        {
          searchKeys.includes('itemCode') ? (
            <Form.Item label="项目" name="itemCode">
              <Select style={{ width: 240 }} showSearch filterOption={(inputValue, option)=>option.children.indexOf(inputValue)>=0}>
                <Select.Option value=''>全部</Select.Option>
                {itemCodes.map((item) => (
                  <Select.Option value={`${item.standCode}`} key={`${item.standCode}`}>{item.chargeName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : null
        }
        {
          searchKeys.includes('menuid') ? (
            <Form.Item label="菜单" name="menuid">
              <Select style={{ width: 240 }} showSearch filterOption={(inputValue, option)=>option.children.indexOf(inputValue)>=0}>
                <Select.Option value=''>全部</Select.Option>
                {menuIds.map((item) => (
                  <Select.Option value={`${item.menuid}`} key={`${item.menuid}`}>{item.menuid}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : null
        }
        <Form.Item>
          <div className={styles.btns}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            {
              calc ? (
                <Button type="primary" onClick={calc}>计算</Button>
              ) : null
            }
            {
              onSave ? (
                <Button type="primary" onClick={onSave}>保存</Button>
              ) : null
            }
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect(
  ({
     common,
     loading,
   }: {
    common: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    common,
    submitting: loading.effects['checkIndex2/list'],
  }),
)(SearchBar);
