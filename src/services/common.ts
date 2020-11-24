import request from '@/utils/request';
import {DanWeiParams,KeShiLaiYuanParams,KeShiMingChen} from "@/utils/paramFormat";


export async function danWei(params?: {[key:string]:any}) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: DanWeiParams,
  });
}

/**
 * 科室来源
 * @param params
 */
export async function keShiLaiYuan(params?: {[key:string]:any}) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: KeShiLaiYuanParams,
  });
}

/**
 * 科室名称
 * @param params
 */
export async function keShiMingChen(params?: {[key:string]:any}) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: KeShiMingChen,
  });
}
