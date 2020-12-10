import request from '@/utils/request';
import { TableListParams } from '@/common';


export async function list(params:TableListParams) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: {"header":{"code":0,"message":{"title":"","detail":""}},"body":{"dataStores":{"item":{"rowSet":{"primary":[{"compCode":params.compCode,"acctYear":params.acctYear,"itemCode":params.itemCode,"equiCode":params.equiCode,"deptCode":params.deptCode}],"delete":[],"filter":[]},"name":"item","pageNumber":params.currentPage||1,"pageSize":params.pageSize||20,"recordCount":1,"rowSetName":"com.viewhigh.entity.DeptOtoEqui"}},"parameters":{"_boId":"assetMaterialImpl","_methodName":"queryAll","_methodParameterTypes":"com.viewhigh.entity.DeptOtoEqui","_parameters":"item","_pageNumber":params.currentPage||1,"_pageSize":params.pageSize||20,"_calc":true}}}
  });
}
export async function download(params:TableListParams) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: {"header":{"code":0,"message":{"title":"","detail":""}},"body":{"dataStores":{"item":{"rowSet":{"primary":[{"compCode":params.compCode,"acctYear":params.acctYear,"itemCode":params.itemCode,"equiCode":params.equiCode,"deptCode":params.deptCode}],"delete":[],"filter":[]},"name":"item","pageNumber":params.currentPage||1,"pageSize":params.pageSize||20,"recordCount":1,"rowSetName":"com.viewhigh.entity.DeptOtoEqui"}},"parameters":{"_boId":"assetMaterialImpl","_methodName":"exportExcel","_methodParameterTypes":"com.viewhigh.entity.DeptOtoEqui","_parameters":"item"}}}
  });
}
