import request from '@/utils/request';
import { dataStores, header, ParamFormat } from '@/common.d.ts';
import { TableListParams } from '@/pages/check/index4/data';

const defaultQueryRuleParams:ParamFormat = {
  header,
  body:{
    dataStores,
    parameters:{
      _boId:"allCostEntryServiceimpl",
      _methodName:"find",
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


export async function list(params: TableListParams) {
  const methodParameterTypes = [];
  const parameters = [];
  const newParams = {
    ...params,
  }

  for(const key in params){
    if(key==='pageSize'){
      // eslint-disable-next-line no-underscore-dangle
      newParams._pageSize = params.pageSize || 20;
      delete newParams.pageSize;
    }else if(key==='currentPage'){
      // eslint-disable-next-line no-underscore-dangle
      newParams._pageNumber = params.currentPage || 1;
      delete newParams.currentPage;
    }else{
      methodParameterTypes.push("String");
      parameters.push(key);
      if(!newParams[`${key}`]){
        newParams[`${key}`] = '';
      }
    }
    // eslint-disable-next-line no-underscore-dangle
    if(!newParams._pageNumber){
      // eslint-disable-next-line no-underscore-dangle
      newParams._pageNumber = 1;
    }
    // eslint-disable-next-line no-underscore-dangle
    if(!newParams._pageSize){
      // eslint-disable-next-line no-underscore-dangle
      newParams._pageSize = 20;
    }
  }
  return request('http://120.25.198.191:8080/api/commonProcessor/commonMethod', {
    method: 'POST',
    data: {
      ...defaultQueryRuleParams,
      body:{
        dataStores:{
          "items":{
            "rowSet":{
              "primary":[
                {
                  "compCode":params.compCode,
                  "addYear":params.addYear,
                  "deptCode":params.deptCode,
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
            "rowSetName":"com.viewhigh.excel.domain.entity.BdDept"
          }
        },
        parameters:{
          "_boId":"otherChargesValidationServiceImpl",
          "_methodName":"findByParam",
          "_methodParameterTypes":"com.viewhigh.excel.domain.entity.BdDept",
          "_parameters":"items",
          "_pageNumber":params._pageNumber,
          "_pageSize":params._pageSize,
          "_calc":true
        }
      },
    },
  });
}
