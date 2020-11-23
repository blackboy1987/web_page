import { Effect } from 'umi';

import { list } from './service';
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
  };
}

const Model: ModelType = {
  namespace: 'index1',
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
  },
};

export default Model;
