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
          "DeptIncomeCostCheckVO":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "acctYear":params.acctYear
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"DeptIncomeCostCheckVO",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.vo.DeptIncomeCostCheckVO"
          }
        },
        "parameters":{
          "_boId":"deptIncomeCostCheckServiceImpl",
          "_methodName":"queryCostCheckData",
          "_methodParameterTypes":"com.viewhigh.vo.DeptIncomeCostCheckVO",
          "_parameters":"DeptIncomeCostCheckVO",
          "_pageNumber":1,
          "_pageSize":100,
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
                  "acctYear":params.acctYear
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
            "rowSetName":"com.viewhigh.entity.costcalc.BedFeeCalcVo"
          }
        },
        "parameters":{
          "_boId":"bedFeeCalcServiceImpl",
          "_methodName":"exportExcel",
          "_methodParameterTypes":"com.viewhigh.entity.costcalc.BedFeeCalcVo",
          "_parameters":"items"
        }
      }
    }
  });
}
