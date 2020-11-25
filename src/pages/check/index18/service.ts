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
          "OriColleCheckVO":{
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
            "name":"OriColleCheckVO",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.vo.OriColleCheckVO"
          }
        },
        "parameters":{
          "_boId":"oriColleCheckServiceImpl",
          "_methodName":"queryOriColleData",
          "_methodParameterTypes":"com.viewhigh.vo.OriColleCheckVO",
          "_parameters":"OriColleCheckVO",
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
          "OriColleCheckVO":{
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
            "name":"OriColleCheckVO",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.vo.OriColleCheckVO"
          }
        },
        "parameters":{
          "_boId":"oriColleCheckServiceImpl",
          "_methodName":"exportExcel",
          "_methodParameterTypes":"com.viewhigh.vo.OriColleCheckVO",
          "_parameters":"OriColleCheckVO"
        }
      }
    }
  });
}
