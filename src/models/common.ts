import { Effect } from 'umi';
import { danWei } from '@/services/common';

export interface LoginModelType {
  namespace: string;
  state :{},
  effects: {
    danWei: Effect;
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
  },
};

export default Model;
