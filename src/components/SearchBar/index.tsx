import {Button, DatePicker, Form, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import styles from './index.less';
import {formatFormParams} from "@/utils/common";
import {connect,Dispatch} from "umi";
import {StateType} from "@/models/common";

export interface SearchBarProps {
  dispatch: Dispatch;
  onSearch:(params:{[key:string]:string})=>void;
}

const SearchBar:React.FC<SearchBarProps>=({dispatch,onSearch})=>{
  const [form] = Form.useForm();

  const [danWeis, setDanWeis] = useState<{ compCode: string }[]>([]);

  const danWei = () => {
    dispatch({
      type: 'common/danWei',
      callback: (response: { compCode: string }[]) => {
        setDanWeis(response);
      },
    });
  };

  const onFinish = (values: { [key: string]: any }) => {
    onSearch({...formatFormParams(values)});
  };

  useEffect(() => {
    onSearch({ ...formatFormParams(form.getFieldsValue()) });
    danWei();
  }, []);
  return (
    <div className={styles.standardTable}>
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
            {danWeis.map((item) => (
              <Select.Option value={`${item.compCode}`}>{item.compCode}</Select.Option>
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
