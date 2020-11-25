import request from '@/utils/request';
import { TableListParams } from '@/common.d.ts';


export async function list(params: TableListParams) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data:{
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
                  "deptServiceType":"cbcs"
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
            "rowSetName":"com.viewhigh.excel.domain.entity.BdDept"
          }
        },
        "parameters":{
          "_boId":"dataCheckServiceImpl",
          "_methodName":"queryDataWX",
          "_methodParameterTypes":"String,String",
          "_parameters":"compCode,acctYear",
          "compCode":params.compCode,
          "acctYear":params.acctYear,
          "_pageNumber":params.pageNumber||1,
          "_pageSize":params.pageSize||20,
          "_calc":true
        }
      }
    }
  });
}
