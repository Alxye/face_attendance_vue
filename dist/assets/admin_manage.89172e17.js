import{d as D,o as f,q as h,b as s,j as y,O as H,_ as S,r as m,c as F,w as d,e as $,t as w,m as P,P as M,D as U,L as j,h as I,Q as q,S as G,F as z,v as L,k as B,K as J,a as C,M as K,E,T as Q}from"./index.4a834fb8.js";import{b as R}from"./corporation.78024ffd.js";import{s as W,h as O}from"./loading.1d525210.js";import{g as X}from"./department.b6aaf8b3.js";var A=D({name:"Delete"});const Y={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},Z=s("path",{fill:"currentColor",d:"M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"},null,-1);function x(e,a,o,n,c,u){return f(),h("svg",Y,[Z])}A.render=x;A.__file="packages/components/Delete.vue";var ee=A,V=D({name:"Plus"});const ae={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},te=s("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"},null,-1);function oe(e,a,o,n,c,u){return f(),h("svg",ae,[te])}V.render=oe;V.__file="packages/components/Plus.vue";var le=V,T=D({name:"Search"});const ne={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},se=s("path",{fill:"currentColor",d:"m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"},null,-1);function re(e,a,o,n,c,u){return f(),h("svg",ne,[se])}T.render=re;T.__file="packages/components/Search.vue";var ue=T;const ie=D({props:{data:{type:Array,default:()=>[]},select:{type:Array,default:()=>[]},showIndex:{type:Boolean,default:!1},showSelection:{type:Boolean,default:!1},showPage:{type:Boolean,default:!0},page:{type:Object,default:()=>({index:1,size:20,total:0})},pageLayout:{type:String,default:"total, sizes, prev, pager, next, jumper"},pageSizes:{type:Array,default:[10,20,50,100]}},setup(e,a){const o=y(null);let n=null;const c=l=>{n?e.page.index=1:(e.page.index=l,a.emit("getTableData"))},u=l=>{n="work",setTimeout(()=>{n=null},100),e.page.size=l,a.emit("getTableData",!0)},p=l=>{a.emit("selection-change",l)};return H(()=>{o.value.doLayout()}),{table:o,handleCurrentChange:c,handleSizeChange:u,handleSelectionChange:p}}}),de={class:"system-table-box"};function pe(e,a,o,n,c,u){const p=m("el-table-column"),l=m("el-table");return f(),F("div",de,[s(l,U(e.$attrs,{ref:"table",class:"system-table",border:"",height:"100%",data:e.data,onSelectionChange:e.handleSelectionChange}),{default:d(()=>[e.showIndex?(f(),h(p,{key:0,label:"\u5E8F\u53F7",width:"60",align:"center"},{default:d(g=>[$(w((e.page.index-1)*e.page.size+g.$index+1),1)]),_:1})):P("",!0),M(e.$slots,"default",{},void 0,!0)]),_:3},16,["data","onSelectionChange"])])}var me=S(ie,[["render",pe],["__scopeId","data-v-75a64faf"]]);const ce=[{value:2,label:"\u7BA1\u7406\u5458"},{value:3,label:"\u5F85\u5BA1\u6279\u7BA1\u7406\u5458"}],fe=D({components:{Layer:j},props:{layer:{type:Object,default:()=>({show:!1,title:"",showButton:!0,staff_id:""})}},setup(e,a){const o=I(),n=y(null),c=y(null);let u=y({staff_id:"",department_id:"",type:"",needUpdate:!1}),p=y([{}]);const l={staff_id:[{required:!0,message:"\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u5DE5\u53F7",trigger:"blur"}],department_id:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:"blur"}],type:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:"blur"}]};g();function g(){e.layer.row&&(u.value=JSON.parse(JSON.stringify(e.layer.row)),u.value.needUpdate=u.value.staff_id==o.state.user.info.staff_id)}return(b=>{W(),X().then(_=>{console.log(_);let i=[];for(const r in _.data){if(!_.data.hasOwnProperty(r))continue;const t={label:_.data[r].name,value:_.data[r].id};i.push(t)}p.value=i}).catch(_=>{O()}).finally(()=>{O()})})(),{form:u,rules:l,layerDom:c,ruleForm:n,selectData:p,radioData:ce}},methods:{submit(){this.ruleForm&&this.ruleForm.validate(e=>{if(e){let a=this.form;this.layer.row?this.updateForm(a):this.addForm(a)}else return!1})},addForm(e){console.log(e),q(e).then(a=>{this.$message({type:"success",message:"\u65B0\u589E\u6210\u529F"}),this.$emit("getTableData",!0),this.layerDom&&this.layerDom.close()})},updateForm(e){G(e).then(a=>{this.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F"}),this.$emit("getTableData",!1),this.layerDom&&this.layerDom.close()})}}});function _e(e,a,o,n,c,u){const p=m("el-input"),l=m("el-form-item"),g=m("el-option"),v=m("el-select"),b=m("el-radio"),_=m("el-radio-group"),i=m("el-form"),r=m("Layer",!0);return f(),h(r,{layer:e.layer,onConfirm:e.submit,ref:"layerDom"},{default:d(()=>[s(i,{model:e.form,rules:e.rules,ref:"ruleForm","label-width":"120px",style:{"margin-right":"30px"}},{default:d(()=>[s(l,{label:"\u7BA1\u7406\u5458\u5DE5\u53F7\uFF1A",prop:"staff_id"},{default:d(()=>[s(p,{modelValue:e.form.staff_id,"onUpdate:modelValue":a[0]||(a[0]=t=>e.form.staff_id=t),placeholder:"\u8BF7\u8F93\u5165\u5DE5\u53F7"},null,8,["modelValue"])]),_:1}),s(l,{label:"\u6240\u5C5E\u90E8\u95E8\uFF1A",prop:"select"},{default:d(()=>[s(v,{modelValue:e.form.department_id,"onUpdate:modelValue":a[1]||(a[1]=t=>e.form.department_id=t),placeholder:"\u8BF7\u9009\u62E9",clearable:""},{default:d(()=>[(f(!0),F(z,null,L(e.selectData,t=>(f(),h(g,{key:t.value,label:t.label,value:t.value},{default:d(()=>[$(w(t.label),1)]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),s(l,{label:"\u7C7B\u578B\uFF1A",prop:"radio"},{default:d(()=>[s(_,{modelValue:e.form.type,"onUpdate:modelValue":a[2]||(a[2]=t=>e.form.type=t)},{default:d(()=>[(f(!0),F(z,null,L(e.radioData,t=>(f(),h(b,{key:t.value,label:t.value},{default:d(()=>[$(w(t.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["layer","onConfirm"])}var ge=S(fe,[["render",_e]]);const he=D({name:"crudTable",components:{Table:me,Layer:ge},setup(){const e=I(),a=B({input:""}),o=B({show:!1,title:"\u65B0\u589E",showButton:!0}),n=B({index:1,size:20,total:0}),c=y(!0),u=y([]),p=y([]),l=i=>{p.value=i},g=i=>{c.value=!0,i&&(n.index=1),{page:n.index,pageSize:n.size,...a},R().then(r=>{r.data.list;let t=[];for(const k in r.data.list){if(!r.data.list.hasOwnProperty(k))continue;const N=r.data.list[k];t.push(N)}u.value=t,n.total=Number(r.data.pager.total)}).catch(r=>{u.value=[],n.index=1,n.total=0}).finally(()=>{c.value=!1})},v=i=>{let r={staff_id:i.map(t=>t.staff_id).join(",")};console.log(r),r.staff_id==e.state.user.info.staff_id?E({type:"warning",message:"\u4E0D\u53EF\u5220\u9664\u81EA\u5DF1\uFF01"}):Q(r).then(t=>{E({type:"success",message:"\u5220\u9664\u6210\u529F"}),g(u.value.length===1)})},b=()=>{o.title="\u65B0\u589E\u7BA1\u7406\u5458",o.show=!0,delete o.row},_=i=>{o.staff_id==e.state.user.info.staff_id?E({type:"warning",message:"\u65E0\u6743\u9650\uFF01"}):(o.staff_id=e.state.user.info.staff_id,o.title="\u7F16\u8F91\u7BA1\u7406\u5458",o.row=i,o.show=!0)};return g(!0),{Plus:le,Search:ue,Delete:ee,query:a,tableData:u,chooseData:p,loading:c,page:n,layer:o,handleSelectionChange:l,handleAdd:b,handleEdit:_,handleDel:v,getTableData:g}}}),ye={class:"layout-container"},ve={class:"layout-container-form flex space-between"},be={class:"layout-container-form-handle"},$e={class:"layout-container-table"};function we(e,a,o,n,c,u){const p=m("el-button"),l=m("el-table-column"),g=m("el-popconfirm"),v=m("Table"),b=m("Layer"),_=J("loading");return f(),F("div",ye,[C("div",ve,[C("div",be,[s(p,{type:"primary",icon:e.Plus,onClick:e.handleAdd},{default:d(()=>[$(w(e.$t("message.common.add")),1)]),_:1},8,["icon","onClick"])])]),C("div",$e,[K((f(),h(v,{ref:"table",page:e.page,"onUpdate:page":a[0]||(a[0]=i=>e.page=i),showIndex:!0,showSelection:!0,data:e.tableData,onGetTableData:e.getTableData,onSelectionChange:e.handleSelectionChange},{default:d(()=>[s(l,{prop:"staff_id",label:"\u5DE5\u53F7",align:"center"}),s(l,{prop:"type_name",label:"\u7C7B\u578B",align:"center"}),s(l,{prop:"department_name",label:"\u90E8\u95E8\u6240\u5C5E",align:"center"}),s(l,{label:e.$t("message.common.handle"),align:"center",fixed:"right",width:"200"},{default:d(i=>[s(p,{onClick:r=>e.handleEdit(i.row)},{default:d(()=>[$(w(e.$t("message.common.update")),1)]),_:2},1032,["onClick"]),s(g,{title:e.$t("message.common.delTip"),onConfirm:r=>e.handleDel([i.row])},{reference:d(()=>[s(p,{type:"danger"},{default:d(()=>[$(w(e.$t("message.common.del")),1)]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1},8,["label"])]),_:1},8,["page","data","onGetTableData","onSelectionChange"])),[[_,e.loading]]),e.layer.show?(f(),h(b,{key:0,layer:e.layer,onGetTableData:e.getTableData},null,8,["layer","onGetTableData"])):P("",!0)])])}var Ee=S(he,[["render",we]]);export{Ee as default};
