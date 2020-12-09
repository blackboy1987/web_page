import { Effect } from 'umi';
import { danWei, keShi, keShiMingChen,itemCode,menuid,chenBenKeShi,biaoZhunXiangMu,caiLiaoMingCheng } from '@/services/common';

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
    itemCode:Effect;
    menuid:Effect;
    chenBenKeShi:Effect;
    biaoZhunXiangMu:Effect;
    caiLiaoMingCheng:Effect;
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
    *itemCode({ payload,callback }, { call }) {
      const response = yield call(itemCode, payload);
      if(callback){
        const result = response.body.dataStores.result.rowDatas;
        callback(result);
      }
    },
    *menuid({ payload,callback }, { call }) {
      const response = yield call(menuid, payload);
      if(callback){
        const {result=[]} = response.body.dataStores.result.rowDatas[0];
        callback(result);
      }
    },
    *chenBenKeShi({ payload,callback }, { call }) {
      const response = yield call(chenBenKeShi, payload);
      if(callback){
        const result = response.body.dataStores.result.rowDatas;
        callback(result);
      }
    },
    *biaoZhunXiangMu({ payload,callback }, { call }) {
      const response = yield call(biaoZhunXiangMu, payload);
      if(callback){
        const result = response.body.dataStores.result.rowDatas;
        callback(result);
      }
    },
    *caiLiaoMingCheng({ payload,callback }, { call }) {
      const response = yield call(caiLiaoMingCheng, payload);
      if(callback){
        const result = response.body.dataStores.result.rowDatas[0].result;
        console.log("aa",result);
        callback(result);
      }
    },
  },
};

export default Model;
