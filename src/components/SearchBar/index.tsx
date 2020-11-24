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
}

const SearchBar:React.FC<SearchBarProps>=({initialValues,searchKeys,dispatch,onSearch})=>{
  const [form] = Form.useForm();

  const [danWeis, setDanWeis] = useState<{ compCode: string }[]>([]);
  const [keShiMingChens, setKeShiMingChen] = useState<any[]>([]);
  const [keShiLeiXins, setKeShiLeiXins] = useState<any[]>([]);

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

  const onFinish = (values: { [key: string]: any }) => {
    onSearch({...formatFormParams(values)});
  };

  useEffect(() => {
    onSearch({ ...formatFormParams(form.getFieldsValue()) });
    danWei();
    keShiMingChen();
    keShiLeiXin();
  }, []);
  return (
    <div className={styles.standardTable}>
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        {
          searchKeys.includes('compCode') ? (
            <Form.Item label="单位" name="compCode">
              <Select style={{ width: 100 }}>
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
          searchKeys.includes('deptCode') ? (
            <Form.Item label="成本科室名称" name="deptCode">
              <Select style={{ width: 160 }}>
                <Select.Option value=''>全部</Select.Option>
                {keShiMingChens.map((item,index) => (
                  <Select.Option key={index} value={`${item.compCode}`}>{item.deptName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : null
        }
        {
          searchKeys.includes('deptCode') ? (
            <Form.Item label="成本科室类型" name="deptKind">
              <Select style={{ width: 100 }}>
                <Select.Option value=''>全部</Select.Option>
                {keShiLeiXins.map((item,index) => (
                  <Select.Option value={`${item}`} key={index}>{item}</Select.Option>
                ))}
                <Select.Option value='其他'>其他</Select.Option>
              </Select>
            </Form.Item>
          ) : null
        }

        <Form.Item>
          <div className={styles.btns}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
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
