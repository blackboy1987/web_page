import { Effect } from 'umi';

import { list, check,check1 } from './service';
import {ApiResponse} from "@/utils/paramFormat";
import {parseListResponse} from "@/utils/common";

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    list: Effect;
    check:Effect;
    check1:Effect;
  };
}

const Model: ModelType = {
  namespace: 'checkIndex23',
  state: {
    status: undefined,
  },

  effects: {
    *list({ payload,callback }, { call }) {
      const response:ApiResponse = yield call(list, payload);
      if(callback){
        callback(parseListResponse(response));
      }
    },
    *check({ payload,callback }, { call }) {
      const response:ApiResponse = yield call(check, payload);
      const {status,message} = response.body.dataStores.result.rowDatas[0];
      if(callback){
        callback({status,msg:message});
      }
    },
    *check1({ payload,callback }, { call }) {
      const response:ApiResponse = yield call(check1, payload);
      const {result} = response.body.parameters;
      if(callback){
        callback({code:result});
      }
    },
  },
};

export default Model;
