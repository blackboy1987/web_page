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

              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"items",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":0
          }
        },
        "parameters":{
          "_boId":"chargeDeptCheckServiceImpl",
          "_methodName":"queryData",
          "_methodParameterTypes":"String,String",
          "_parameters":"compCode,acctYear",
          "_pageNumber":params.pageNumber||1,
          "_pageSize":params.pageSize||20,
          "compCode":params.compCode,
          "acctYear":params.acctYear,
          "_calc":true
        }
      }
    }
  });
}


export async function check(params:TableListParams) {
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

              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"items",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":0
          }
        },
        "parameters":{
          "_boId":"chargeDeptCheckServiceImpl",
          "_methodName":"queryData",
          "_methodParameterTypes":"String,String",
          "_parameters":"compCode,acctYear",
          "_pageNumber":params.pageNumber||1,
          "_pageSize":params.pageSize||20,
          "compCode":params.compCode,
          "acctYear":params.acctYear,
          "_calc":true
        }
      }
    }
  });
}


export async function check1(params:TableListParams) {
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

              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"items",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":0
          }
        },
        "parameters":{
          "_boId":"chargeDeptCheckServiceImpl",
          "_methodName":"queryDataDept",
          "_methodParameterTypes":"String,String",
          "_parameters":"compCode,acctYear",
          "_pageNumber":params.pageNumber||1,
          "_pageSize":params.pageSize||20,
          "compCode":params.compCode,
          "acctYear":params.acctYear,
          "_calc":true
        }
      }
    }
  });
}
