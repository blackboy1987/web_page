import request from '@/utils/request';
import {paramFormat} from "@/utils/paramFormat";

export async function queryRule(params?: {[key:string]:any}) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: paramFormat({
      params,
      boId: "hpdetailServiceImpl",
      methodName: "queryData",
      rowSetName:
        "com.viewhigh.excel.domain.entity.BdChargesHos"
    }),
  });
}
