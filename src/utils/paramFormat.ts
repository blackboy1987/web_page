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
      compCode:string,
      acctYear:string,
      invCode:string,
      deptCode:string,
      isCharg:string,
      _pageNumber:number,
      _pageSize:number,
      _calc:boolean
    }
  }
}


export const DanWeiParams = {
  header:{
    code:0,
    message:{
      title:"",
      detail:""
    }
  },
  body:{
    dataStores:{},
    parameters:{_boId:"bdHospitalServiceImpl",_methodName:"findALl"}
  }
}


export const KeShiLaiYuanParams = {
  header:{
    code:0,
    message:{
      title:"",
      detail:""
    }
  },
  body:{
    dataStores:{},
    parameters:{_boId:"bdHospitalServiceImpl",_methodName:"findALl"}
  }
}

export const KeShiMingChen = {
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
              "deptServiceType":"cbcs"
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
    "parameters":{
      "_boId":"bdDeptServiceImpl",
      "_methodName":"findAllByCompYear",
      "_methodParameterTypes":"String,String,String",
      "_parameters":"compCode,acctYear,deptServiceType",
      "compCode":"100001",
      "acctYear":"2019",
      "deptServiceType":"cbcs"
    }
  }
}

const defaultParam:ParamFormat = {
  header:{
    code:0,
    message:{
      title:"",
      detail:""
    }
  },
  body:{
    dataStores:{
      item:{
        rowSet:{
          primary:[
            {
              compCode:"100001",
              acctYear:"2017"
            }
          ],
          delete:[

          ],
          filter:[

          ]
        },
        name:"item",
        pageNumber:1,
        pageSize:2147483647,
        recordCount:1,
        rowSetName:"com.viewhigh.excel.domain.entity.BdChargesHos"
      }
    },
    parameters:{
      _boId:"hpdetailServiceImpl",
      _methodName:"queryData",
      _methodParameterTypes:"com.viewhigh.excel.domain.entity.BdChargesHos",
      _parameters:"item",
      _pageNumber:1,
      _pageSize:100,
      _calc:true
    }
  }
}


export const paramFormat = ({params,methodName,rowSetName,boId}:{
  params?:{[key:string]:any},
  methodName:string,
  rowSetName:string,
  boId:string,
}) =>{
  return {
    ...defaultParam,
    body:{
      dataStores:{
        item:{
          rowSet:{
            primary:[
              {
                ...params
              }
            ],
          },
          name:"item",
          pageNumber:params?.pageNumber||1,
          pageSize:params?.pageSize||20,
          rowSetName,
        }
      },
      parameters:{
        _boId:boId,
        _methodName:methodName,
        _methodParameterTypes:rowSetName,
        _parameters:"item",
        _pageNumber:params?.pageNumber||1,
        _pageSize:params?.pageSize||20,
        _calc:true
      }
    }
  }
}


export interface ApiResponse {
  header:{
    code:number,
    message:{
      title:string,
      detail:string
    }
  },
  body:{
    parameters:{

    },
    dataStores:{
      result:{
        name:string,
        pageNumber:number,
        pageSize:number,
        recordCount:number,
        metaData:{
          columns:[

          ],
          order:{
            orderStyle:string,
            propertyName:string
          },
          condition:null
        },
        rowSet:{
          primary:[
            {
              result:any[],
              recordCount:number,
              pageSize:number,
              pageNumber:number,
              pageContext:{
                key:string,
                type:string,
                queryString:string,
                params:string,
                pojo:string,
                dataSourceID:string,
                sessionFactoryId:string
              },
              autoCalcCount:string
            }
          ],
          rowCount:number
        },
        "rowSetName":string,
        rowDatas:[
          {
            result:any[],
            recordCount:number,
            pageSize:number,
            pageNumber:number,
            pageContext:{
              key:null,
              type:null,
              queryString:null,
              params:null,
              pojo:null,
              dataSourceID:null,
              sessionFactoryId:null
            },
            "autoCalcCount":false
          }
        ]
      }
    }
  }
}
