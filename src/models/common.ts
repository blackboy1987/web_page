import { Effect } from 'umi';
import { danWei,keShiMingChen } from '@/services/common';

export interface LoginModelType {
  namespace: string;
  state :{},
  effects: {
    danWei: Effect;
    keShiMingChen:Effect;
    keShiLeiXin:Effect;
  };
}

const Model: LoginModelType = {
  namespace: 'common',
  state:{},
  effects: {
    *danWei({ payload,callback }, { call }) {
      const response = yield call(danWei, payload);
      if(callback){
        const {result=[]} = response.body.dataStores.result.rowDatas[0];
        callback(result);
      }
    },
    *keShiMingChen({ payload,callback }, { call }) {
      const response = yield call(keShiMingChen, payload);
      if(callback){
        const {result=[]} = response.body.dataStores.result.rowDatas[0];
        callback(result);
      }
    },
    *keShiLeiXin({ payload,callback }, { call }) {
      const response = yield call(keShiMingChen, payload);
      if(callback){
        const set = new Set();
        const {result=[]} = response.body.dataStores.result.rowDatas[0];
        result.forEach(item=>set.add(item.deptKind));
        callback(set);
      }
    },
  },
};

export default Model;
