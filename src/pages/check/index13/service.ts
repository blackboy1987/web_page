import request from '@/utils/request';
import { TableListParams } from '@/common';


export async function list(params:TableListParams) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: {
      "header":{
        "code":0,
        "message":{
          "title":"",
          "detail":""
        }
      },
      "body":{
        "dataStores":{
          "items":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "acctYear":params.acctYear,
                  "deptName":params.deptName,
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"items",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.entity.costcalc.CalcDeptCostVo"
          }
        },
        "parameters":{
          "_boId":"deptCostCollServiceImp",
          "_methodName":"queryData",
          "_methodParameterTypes":"com.viewhigh.entity.costcalc.CalcDeptCostVo",
          "_parameters":"items",
          "_pageNumber":params.pageNumber||1,
          "_pageSize":params.pageSize||20,
          "_calc":true
        }
      }
    }
  });
}


export async function calc(params:TableListParams) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: {
      "header":{
        "code":0,
        "message":{
          "title":"",
          "detail":""
        }
      },
      "body":{
        "dataStores":{
          "items":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "acctYear":params.acctYear,
                  "deptName":params.deptName,
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"items",
            "pageNumber":params.pageNumber,
            "pageSize":params.pageSize,
            "recordCount":1,
            "rowSetName":"com.viewhigh.entity.costcalc.CalcDeptCostVo"
          }
        },
        "parameters":{
          "_boId":"deptCostCollServiceImp",
          "_methodName":"calc",
          "_methodParameterTypes":"com.viewhigh.entity.costcalc.CalcDeptCostVo",
          "_parameters":"items"
        }
      }
    }
  });
}


export async function download(params:TableListParams) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: {
      "header":{
        "code":0,
        "message":{
          "title":"",
          "detail":""
        }
      },
      "body":{
        "dataStores":{
          "items":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "acctYear":params.acctYear,
                  "deptName":params.deptName
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"items",
            "pageNumber":params.pageNumber,
            "pageSize":params.pageSize,
            "recordCount":1,
            "rowSetName":"com.viewhigh.entity.costcalc.CalcDeptCostVo"
          }
        },
        "parameters":{
          "_boId":"deptCostCollServiceImp",
          "_methodName":"exprotData",
          "_methodParameterTypes":"com.viewhigh.entity.costcalc.CalcDeptCostVo",
          "_parameters":"items"
        }
      }
    }
  });
}
