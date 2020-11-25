import { Effect } from 'umi';

import { list, download,lock,unLock } from './service';
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
    download:Effect;
    lock:Effect;
    unLock:Effect;
  };
}

const Model: ModelType = {
  namespace: 'checkIndex21',
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
    *download({ payload,callback }, { call }) {
      const response:ApiResponse = yield call(download, payload);
      const {status,message} = response.body.dataStores.result.rowDatas[0];
      if(callback){
        callback({status,msg:message});
      }
    },
    *lock({ payload,callback }, { call }) {
      const response:ApiResponse = yield call(lock, payload);
      const {result} = response.body.parameters;
      if(callback){
        callback({code:result});
      }
    },
    *unLock({ payload,callback }, { call }) {
      const response:ApiResponse = yield call(unLock, payload);
      const {result} = response.body.parameters;
      if(callback){
        callback({code:result});
      }
    },
  },
};

export default Model;
