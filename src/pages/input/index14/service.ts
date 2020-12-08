import request from '@/utils/request';
import { TableListParams } from '@/common';


export async function list(params:TableListParams) {
  console.log("paramsparams",params);
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
          "item":{
            "rowSet":{
              "primary":[
                {
                  "compCode":"100001",
                  "acctYear":"2019",
                  "deptName":"",
                  "deptCode":""
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"item",
            "pageNumber":params.currentPage||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.entity.ScDeptGroupRelated"
          }
        },
        "parameters":{
          "_boId":"mergerDtServiceImpl",
          "_methodName":"queryAll",
          "_methodParameterTypes":"com.viewhigh.entity.ScDeptGroupRelated",
          "_parameters":"item",
          "_pageNumber":params.currentPage||1,
          "_pageSize":params.pageSize||20,
          "_calc":true
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
          "item":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "acctYear":params.acctYear,
                  "deptName":params.deptName,
                  "deptCode":params.deptCode,
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"item",
            "pageNumber":1,
            "pageSize":2147483647,
            "recordCount":1,
            "rowSetName":"com.viewhigh.entity.ScDeptGroupRelated"
          }
        },
        "parameters":{
          "_boId":"mergerDtServiceImpl",
          "_methodName":"exportExcel",
          "_methodParameterTypes":"com.viewhigh.entity.ScDeptGroupRelated",
          "_parameters":"item"
        }
      }
    }
  });
}
