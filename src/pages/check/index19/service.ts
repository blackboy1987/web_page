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
          "TotalCostCheckVO":{
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
            "name":"TotalCostCheckVO",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.vo.TotalCostCheckVO"
          }
        },
        "parameters":{
          "_boId":"totalCostCheckServiceImpl",
          "_methodName":"queryTotalCostData",
          "_methodParameterTypes":"com.viewhigh.vo.TotalCostCheckVO",
          "_parameters":"TotalCostCheckVO",
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
          "TotalCostCheckVO":{
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
            "name":"TotalCostCheckVO",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.vo.TotalCostCheckVO"
          }
        },
        "parameters":{
          "_boId":"totalCostCheckServiceImpl",
          "_methodName":"exportExcel",
          "_methodParameterTypes":"com.viewhigh.vo.TotalCostCheckVO",
          "_parameters":"TotalCostCheckVO"
        }
      }
    }
  });
}
