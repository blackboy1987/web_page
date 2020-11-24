import { Effect } from 'umi';
import { danWei, keShi, keShiMingChen } from '@/services/common';

export interface StateType {

}

export interface CommonModelType {
  namespace: string;
  state :StateType,
  effects: {
    danWei: Effect;
    keShiMingChen:Effect;
    keShiLeiXin:Effect;
    keShi:Effect;
  };
}

const Model: CommonModelType = {
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
    *keShi({ payload,callback }, { call }) {
      const response = yield call(keShi, payload);
      if(callback){
        const result = response.body.dataStores.result.rowDatas;
        callback(result);
      }
    },
  },
};

export default Model;
