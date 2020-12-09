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

        },
        "parameters":{
          "_boId":"checkEiskRatioServiceImpl",
          "_methodName":"findAllByCompYear",
          "_methodParameterTypes":"String,String",
          "_parameters":"compCode,acctYear",
          "compCode":params.compCode,
          "acctYear":params.acctYear,
        }
      }
    }
  });
}

export async function save(params:TableListParams) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: {"header":{"code":0,"message":{"title":"","detail":""}},"body":{"dataStores":{"row":{"rowSet":{"primary":[{"dataId":params.dataId,"compCode":params.compCode,"acctYear":params.acctYear,"riskRatio":"0"}],"delete":[],"filter":[]},"name":"row","pageNumber":1,"pageSize":2147483647,"recordCount":1,"rowSetName":"com.viewhigh.entity.CheckRiskRatio"}},"parameters":{"_boId":"checkEiskRatioServiceImpl","_methodName":"saveEiskRatio","_methodParameterTypes":"java.util.List<com.viewhigh.entity.CheckRiskRatio>","_parameters":"row"}}}
  });
}
