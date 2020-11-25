import request from '@/utils/request';
import { TableListParams } from '@/common';


export async function list(params:TableListParams) {
  console.log("params",params);
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
          "HospDeptCostIncomeThanVO":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "acctYear":params.acctYear,
                  "eAcctYear":params.eAcctYear,
                  "deptCode":params.deptCode,
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"HospDeptCostIncomeThanVO",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.vo.HospDeptCostIncomeThanVO"
          }
        },
        "parameters":{
          "_boId":"hospDeptCostIncomeThanServiceImpl",
          "_methodName":"queryList",
          "_methodParameterTypes":"com.viewhigh.vo.HospDeptCostIncomeThanVO",
          "_parameters":"HospDeptCostIncomeThanVO",
          "_pageNumber":params.pageNumber||1,
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
          "items":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "acctYear":params.acctYear,
                  "itemCode":params.itemCode,
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
            "rowSetName":"com.viewhigh.entity.costcalc.CalcItemQueryVo"
          }
        },
        "parameters":{
          "_boId":"deptInRatioService",
          "_methodName":"exportData",
          "_methodParameterTypes":"com.viewhigh.entity.costcalc.CalcItemQueryVo",
          "_parameters":"items"
        }
      }
    }
  });
}
