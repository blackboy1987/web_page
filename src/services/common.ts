import request from '@/utils/request';
import {DanWeiParams} from "@/utils/paramFormat";


export async function danWei(params?: {[key:string]:any}) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: DanWeiParams,
  });
}
