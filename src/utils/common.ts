import {ApiResponse} from "@/utils/paramFormat";

export const parseRequestParams = (params:{[key:string]:any}) =>{
  let values:{[key:string]:any} = {
    ...params,
    pageNumber:params.current || 1,
  }
  if(values.sorter){
    for(const key in values.sorter){
      values = {
        ...values,
        orderProperty:key,
        orderDirection:values.sorter[`${key}`]==='"ascend"' ? 'ASC' : 'DESC',
      }
    }
    delete values.sorter;
  }
  delete values.current;
  delete values.filter;
  return values;
}

export const parseListResponse=(res:ApiResponse)=>{
  const {pageNumber,pageSize,recordCount,result=[]} = res.body.dataStores.result.rowDatas[0]
  return {
    list:result||[],
    pagination:{
      total:recordCount,
      pageSize,
      current:pageNumber
    }
  }
}

export const parseResponse=(res:ApiResponse)=>{
  const {result=[]} = res.body.dataStores.result.rowDatas[0];
  return result;
}

export const formatFormParams = (params:{[key:string]:any }) =>{
  console.log(params.acctYear);
  if(params.acctYear){
    console.log(params.acctYear.format("YYYY"),"params.acctYear");
    return {
      ...params,
      acctYear:params.acctYear.format("YYYY"),
    }
  }
  return params;
}
