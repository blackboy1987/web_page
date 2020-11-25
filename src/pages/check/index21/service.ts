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
            "rowSetName":"com.viewhigh.entity.DeptWageCost"
          }
        },
        "parameters":{
          "_boId":"dataCheckToolService",
          "_methodName":"findWage",
          "_methodParameterTypes":"String,String",
          "_parameters":"compCode,acctYear",
          "compCode":"100001",
          "acctYear":"2019",
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

        },
        "parameters":{
          "params":"100001,2019",
          "importObj":"DataCheckTool",
          "_boId":"incomeDetailServiceImpl",
          "_methodName":"ImportExcel",
          "_methodParameterTypes":"java.util.List&lt;String&gt;,String",
          "_parameters":"params,importObj"
        }
      }
    }
  });
}
