import { Effect } from 'umi';

import { list, save } from './service';
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
    save:Effect;
  };
}

const Model: ModelType = {
  namespace: 'exclusiveMaterial',
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
    *save({ payload,callback }, { call }) {
      const response:ApiResponse = yield call(save, payload);
      const {code} = response.header;
      const {result} = response.body.parameters;
      if(callback){
        callback({code,msg:result});
      }
    },
  },
};

export default Model;
