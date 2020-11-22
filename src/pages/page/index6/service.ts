import request from '@/utils/request';
const defaultQueryRuleParams = {
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
              "compCode":"100001",
              "acctYear":"2019",
              "chargeCode":"",
              "detailType":"",
              "orderedBy":"",
              "performBy":"",
              "belongMenzhen":"",
              "docName":""
            }
          ],
          "delete":[

          ],
          "filter":[

          ]
        },
        "name":"items",
        "pageNumber":1,
        "pageSize":2147483647,
        "recordCount":1,
        "rowSetName":"com.viewhigh.excel.domain.IncomeDetailBean"
      }
    },
    "parameters":{
      "_boId":"includeFreService",
      "_methodName":"find",
      "_methodParameterTypes":"String,String,String,String,String,String,String,String",
      "_parameters":"compCode,acctYear,itemCode,detailType,KDeptCode,ZDeptCode,belongMen,docName",
      "compCode":"100001",
      "acctYear":"2019",
      "itemCode":"",
      "detailType":"",
      "KDeptCode":"",
      "ZDeptCode":"",
      "belongMen":"",
      "docName":"",
      "_pageNumber":1,
      "_pageSize":100,
      "_calc":true
    }
  }
}

export async function queryRule(params?: {[key:string]:any}) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: defaultQueryRuleParams,
  });
}
