import {ApiResponse} from "@/utils/paramFormat";
import { Key, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { TableListItem } from '@/pages/check/index2/data';

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
  if(params.addYear){
    console.log(params.addYear.format("YYYY"),"params.addYear");
    return {
      ...params,
      addYear:params.addYear.format("YYYY"),
    }
  }
  return params;
}

const getValue = (obj: any) =>
  Object.keys(obj)
    .map((key) => obj[key])
    .join(',');

export const commonHandleTableChange = (
  pagination: TablePaginationConfig,
  filtersArg: Record<string, Key[] | null>,
  sorter: SorterResult<TableListItem>,
  formValues:{[key:string]:any},
  callback:(params:{[key:string]:any})=>void
) => {
  const filters = Object.keys(filtersArg).reduce((obj, key) => {
    const newObj = { ...obj };
    newObj[key] = getValue(filtersArg[key]);
    return newObj;
  }, {});

  const params: { [key: string]: any } = {
    currentPage: pagination.current,
    pageSize: pagination.pageSize,
    ...formatFormParams(formValues),
    ...filters,
  };
  if (sorter.field) {
    params.sorter = `${sorter.field}_${sorter.order}`;
  }
  callback(params);
};

export const downloadFile=(url:string,fileName:string)=>{
  const ele = document.createElement('a');
  ele.setAttribute('href',`http://120.25.198.191:8080/api/common/downLoad.jsp?fname=${url}`);
  ele.setAttribute('download' , fileName);
  ele.click();
}
