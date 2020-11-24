import request from '@/utils/request';
import {DanWeiParams, ParamFormat} from "@/utils/paramFormat";
const defaultQueryRuleParams:ParamFormat = {
  header: {
    code: 0,
    message: {
      title: "",
      detail: ""
    },
  },
  body:{
    dataStores:{},
    parameters:{
      _boId:"remateDetailService",
      _methodName:"findEqui",
      _methodParameterTypes:"String,String,String,String,String",
      _parameters:"compCode,acctYear,invCode,deptCode,isCharg",
      compCode:"100001",
      acctYear:"2019",
      invCode:"",
      deptCode:"",
      isCharg:"",
      _pageNumber:1,
      _pageSize:20,
      _calc:true
    }
  }
}

export async function list(params?: {[key:string]:any}) {
  let methodParameterTypes = [];
  let parameters = [];
  for(let key in params){
    if(key==='pageSize'){
      params._pageSize = params.pageSize || 20;
      delete params.pageSize;
    }else if(key==='currentPage'){
      params._pageNumber = params.currentPage || 1;
      delete params.currentPage;
    }else{
      methodParameterTypes.push("String");
      parameters.push(key);
      if(!params[`${key}`]){
        params[`${key}`] = '';
      }
    }
    if(!params._pageNumber){
      params._pageNumber = 1;
    }
    if(!params._pageSize){
      params._pageSize = 20;
    }
  }
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
          "items":{
            "rowSet":{
              "primary":[
                {
                  ...params,
                  "deptServiceType":"cbcs"
                }
              ],
              "delete":[

              ],
              "filter":[

              ]
            },
            "name":"items",
            "pageNumber":params._pageNumber,
            "pageSize":params._pageSize,
            "recordCount":1,
            "rowSetName":"com.viewhigh.excel.domain.entity.BdDept"
          }
        },
        "parameters":{
          "_boId":"healthMaterialValidationServiceImpl",
          "_methodName":"findByParam",
          "_methodParameterTypes":"com.viewhigh.excel.domain.entity.BdDept",
          "_parameters":"items",
          "_pageNumber":params._pageNumber,
          "_pageSize":params._pageSize,
          "_calc":true
        }
      }
    }
  });
}

export async function danWei(params?: {[key:string]:any}) {
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: DanWeiParams,
  });
}
