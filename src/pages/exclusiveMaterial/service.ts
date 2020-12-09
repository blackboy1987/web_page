import request from '@/utils/request';
import { TableListParams } from '@/common';


export async function list(params:TableListParams) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: {"header":{"code":0,"message":{"title":"","detail":""}},"body":{"dataStores":{"item":{"rowSet":{"primary":[{"compCode":params.compCode,"acctYear":params.acctYear,"itemCode":params.itemCode,"mateInvCode":params.mateInvCode,"deptCode":params.deptCode}],"delete":[],"filter":[]},"name":"item","pageNumber":params.currentPage||1,"pageSize":params.pageSize||20,"recordCount":1,"rowSetName":"com.viewhigh.entity.DeptOtoMate"}},"parameters":{"_boId":"eMaterialServiceImpl","_methodName":"queryAll","_methodParameterTypes":"com.viewhigh.entity.DeptOtoMate","_parameters":"item","_pageNumber":params.currentPage||1,"_pageSize":params.pageSize||20,"_calc":true}}}
  });
}
