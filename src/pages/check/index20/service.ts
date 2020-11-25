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
          "item":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "acctYear":params.acctYear,
                  "userCode":"fgw",
                  "menuid":params.menuid||'',
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"item",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.entity.ScHospDataLock"
          }
        },
        "parameters":{
          "_boId":"openLockingDataServiceImpl",
          "_methodName":"queryData",
          "_methodParameterTypes":"com.viewhigh.entity.ScHospDataLock",
          "_parameters":"item",
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
          "item":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "acctYear":params.acctYear,
                  "menuid":params.menuid||'',
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"item",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.entity.ScHospDataLock"
          }
        },
        "parameters":{
          "_boId":"openLockingDataServiceImpl",
          "_methodName":"exportExcel",
          "_methodParameterTypes":"com.viewhigh.entity.ScHospDataLock",
          "_parameters":"item"
        }
      }
    }
  });
}


export async function lock(params:TableListParams) {
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
                  "menuid":params.menuid||'',
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"item",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.entity.ScHospDataLock"
          }
        },
        "parameters":{
          "_boId":"lockingDataServiceImpl",
          "_methodName":"checkLock",
          "_methodParameterTypes":"com.viewhigh.entity.ScHospDataLock",
          "_parameters":"item"
        }
      }
    }
  });
}

export async function unLock(params:TableListParams) {
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
                  "menuid":params.menuid||'',
                  "userCode":"fgw",
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"item",
            "pageNumber":params.pageNumber||1,
            "pageSize":params.pageSize||20,
            "recordCount":1,
            "rowSetName":"com.viewhigh.entity.ScHospDataLock"
          }
        },
        "parameters":{
          "_boId":"openLockingDataServiceImpl",
          "_methodName":"save",
          "_methodParameterTypes":"java.util.List&lt;ScHospDataLock&gt;",
          "_parameters":"item"
        }
      }
    }
  });
}
