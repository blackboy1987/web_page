export const header={
  code: 0,
  message: {
    title: "",
    detail: ""
  },
};

export const dataStores={};

export interface ParamFormat {
  header:{
    code:number;
    message:{
      title:string,
      detail:string
    }
  },
  body:{
    dataStores:{
    },
    parameters:{
      _boId:string,
      _methodName:string,
      _methodParameterTypes:string,
      _parameters:string,
      compCode?:string,
      acctYear?:string,
      invCode?:string,
      deptCode?:string,
      isCharg?:string,
      _pageNumber:number,
      _pageSize:number,
      _calc:boolean
    }
  }
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  pageNumber?:number;
  currentPage?: number;
  compCode?:string;
  acctYear?:string;
  eAcctYear?:string;
  deptCode?:string;
  deptKind?:string;
  deptName?:string;
  itemCode?:string;
  menuid?:string;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
