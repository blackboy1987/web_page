import { Effect } from 'umi';

import { list, download } from './service';
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
  };
}

const Model: ModelType = {
  namespace: 'checkIndex18',
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
  },
};

export default Model;
