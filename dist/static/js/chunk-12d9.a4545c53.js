(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-12d9"],{JAVJ:function(t,e,n){"use strict";n.r(e);var a=n("Nkno"),l={data:function(){return{listLoading:!0,list:null,total:0,page:1,limit:10,searchObj:{},multipleSelection:[]}},created:function(){console.log("list created......"),this.fetchData()},mounted:function(){console.log("list mounted......")},methods:{changeSize:function(t){console.log(t),this.limit=t,this.fetchData(1)},fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;console.log("翻页。。。"+e),this.page=e,a.a.getPageList(this.page,this.limit).then(function(e){t.list=e.data.records,t.total=e.data.total,t.listLoading=!1})},onSale:function(t){var e=this;a.a.onSale(t).then(function(t){e.$message({type:"success",message:"操作成功!"}),e.fetchData(e.page)})},cancelSale:function(t){var e=this;a.a.cancelSale(t).then(function(t){e.$message({type:"success",message:"操作成功!"}),e.fetchData(e.page)})},resetData:function(){console.log("重置查询表单"),this.searchObj={},this.fetchData()},handleSelectionChange:function(t){console.log("handleSelectionChange......"),console.log(t),this.multipleSelection=t}}},i=n("KHd+"),o=Object(i.a)(l,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,stripe:""},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),n("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s((t.page-1)*t.limit+e.$index+1)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"id",label:"SKU ID",width:"100"}}),t._v(" "),n("el-table-column",{attrs:{label:"banner",width:"320",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("div",{staticClass:"info"},[n("div",{staticClass:"pic"},[n("img",{staticStyle:{width:"50px"},attrs:{src:t.row.skuDefaultImg,alt:"scope.row.title"}})])])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"skuName",label:"名称"}}),t._v(" "),n("el-table-column",{attrs:{prop:"price",label:"价格",width:"70"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.isSale?n("el-button",{attrs:{size:"mini",icon:"el-icon-edit"},on:{click:function(n){t.onSale(e.row.id)}}},[t._v("上架")]):t._e(),t._v(" "),1==e.row.isSale?n("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(n){t.cancelSale(e.row.id)}}},[t._v("下架")]):t._e()]}}])})],1),t._v(" "),n("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,total:t.total,"page-size":t.limit,"page-sizes":[5,10,20,30,40,50,100],layout:"sizes, prev, pager, next, jumper, ->, total, slot"},on:{"current-change":t.fetchData,"size-change":t.changeSize}})],1)},[],!1,null,null,null);o.options.__file="list.vue";e.default=o.exports},Nkno:function(t,e,n){"use strict";var a=n("t3Un");e.a={getPageList:function(t,e){return Object(a.a)({url:"/product/querySkuInfoByPage/"+t+"/"+e,method:"get"})},saveSkuInfo:function(t){return Object(a.a)({url:"/product/saveSkuInfo",method:"post",data:t})},onSale:function(t){return Object(a.a)({url:"/product/onSale/"+t,method:"get"})},cancelSale:function(t){return Object(a.a)({url:"/product/offSale/"+t,method:"get"})}}},t3Un:function(t,e,n){"use strict";var a=n("4d7F"),l=n.n(a),i=n("vDqi"),o=n.n(i).a.create({baseURL:"http://192.168.229.2",timeout:5e3});o.interceptors.response.use(function(t){return t.data},function(t){return console.log("err"+t),l.a.reject(t)}),e.a=o}}]);