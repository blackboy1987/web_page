import { Effect } from 'umi';

import { list,calc, download } from './service';
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
    calc:Effect;
    download:Effect;
  };
}

const Model: ModelType = {
  namespace: 'checkIndex14',
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
    *calc({ payload,callback }, { call }) {
      const response:ApiResponse = yield call(calc, payload);
      const {code} = response.header;
      const {result} = response.body.parameters;
      if(callback){
        callback({code,msg:result});
      }
    },
    *download({ payload,callback }, { call }) {
      const response:ApiResponse = yield call(download, payload);
      const {status,message} = response.body.dataStores.result.rowDatas[0];
      if(callback){
        callback({status,msg:message});
      }
    },
  },
};

export default Model;
