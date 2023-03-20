import{d as M,a as T,b as P,g as H}from"./department.643f9d19.js";import{s as J,h as N}from"./loading.30174c85.js";import{d as V,J as K,_ as L,r as s,K as z,M as G,o as y,c as v,b as l,N as Q,w as r,a as f,e as C,t as I,k as b,j as h,h as U,B as R,E as D,q as $,m as A,F as O,p as j,f as q,L as W,v as X}from"./index.30d7a9e9.js";const Y=V({methods:{warning(){return warning}},props:{layer:{type:Object,default:()=>({show:!1,title:"",showButton:!1}),required:!0}},directives:{drag:K},setup(e,n){function u(){n.emit("confirm")}function m(){e.layer.show=!1}return{confirm:u,close:m}}});function Z(e,n,u,m,_,c){const d=s("el-button"),o=s("el-dialog"),i=z("drag");return G((y(),v("div",null,[l(o,{modelValue:e.layer.show,"onUpdate:modelValue":n[0]||(n[0]=a=>e.layer.show=a),title:"\u6CE8\u610F\uFF01",width:e.layer.width,center:""},Q({default:r(()=>[f("span",null,I(e.layer.title),1)]),_:2},[e.layer.showButton?{name:"footer",fn:r(()=>[f("div",null,[l(d,{type:"primary",onClick:e.confirm},{default:r(()=>[C("\u786E\u8BA4")]),_:1},8,["onClick"]),l(d,{onClick:e.close},{default:r(()=>[C("\u53D6\u6D88")]),_:1},8,["onClick"])])]),key:"0"}:void 0]),1032,["modelValue","width"])])),[[i,e.layer.show]])}var x=L(Y,[["render",Z]]);const ee=V({components:{Layer:x},props:{dic:{type:Object,default:()=>({name:"",notice:"",staff_count:0,id:0})},layer:{type:Object,default:()=>({show:!1,title:"",showButton:!0})}},setup(e,n){let u=b(e.dic);const m=h(null),_=h(null),c=b({width:"30%",show:!1,title:"",showButton:!0}),d=U();let o=b({id:u.id,name:u.name,notice:u.notice,staff_count:u.staff_count,clockin:[new Date("2023-01-01 "+u.clock_in_start),new Date("2023-01-01 "+u.clock_in_end)],clockout:[new Date("2023-01-01 "+u.clock_out_start),new Date("2023-01-01 "+u.clock_out_end)],disabled:u.id!=d.state.user.info.department_id});R(()=>e.dic,(t,g)=>{o.id=t.id,o.name=t.name,o.notice=t.notice,o.staff_count=t.staff_count,o.clockin=[new Date("2023-01-01 "+t.clock_in_start),new Date("2023-01-01 "+t.clock_in_end)],o.clockout=[new Date("2023-01-01 "+t.clock_out_start),new Date("2023-01-01 "+t.clock_out_end)],o.disabled=t.id!=d.state.user.info.department_id});const i={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D",trigger:"blur"}]};function a(t){const g=":";let k=t.getHours(),w=t.getMinutes(),B=t.getSeconds();return k>=0&&k<=9&&(k="0"+k),w>=0&&w<=9&&(w="0"+w),B>=0&&B<=9&&(B="0"+B),k+g+w+g+B}function p(){m.value&&m.value.validate(t=>{if(t){if(o.name==u.name&&o.notice==u.notice&&a(o.clockin[0])==u.clock_in_start&&a(o.clockin[1])==u.clock_in_end&&a(o.clockout[0])==u.clock_out_start&&a(o.clockout[1])==u.clock_out_end)return D({type:"warning",message:"\u672A\u4F5C\u4EFB\u4F55\u6539\u53D8"}),!1;{let g={id:o.id,name:o.name,notice:o.notice,clock_in_start:a(o.clockin[0]),clock_in_end:a(o.clockin[1]),clock_out_start:a(o.clockout[0]),clock_out_end:a(o.clockout[1])};M(g).then(k=>{D({type:"success",message:"\u66F4\u65B0\u6210\u529F"}),location.reload()})}}else return!1})}function E(){if(o.staff_count!=0)return D({type:"warning",message:"\u8BE5\u90E8\u95E8\u5C1A\u6709\u5458\u5DE5"}),c.show=!1,!1;{let t={id:o.id};T(t).then(g=>{D({type:"success",message:"\u5220\u9664\u6210\u529F"}),location.reload()})}}function F(){c.show=!0,c.title="\u8BE5\u90E8\u95E8\u5C06\u88AB\u6C38\u4E45\u5220\u9664"}return{form:o,rules:i,layerDom:_,ruleForm:m,update:p,findDelete:F,Delete:E,DeleteConfirmBox:c}}}),oe=e=>(j("data-v-17dcbeb2"),e=e(),q(),e),te=oe(()=>f("div",{class:"wrapper"},null,-1));function ue(e,n,u,m,_,c){const d=s("el-input"),o=s("el-form-item"),i=s("el-time-picker"),a=s("el-button"),p=s("el-col"),E=s("el-form"),F=s("Layer");return y(),v(O,null,[f("div",{onConfirm:n[4]||(n[4]=(...t)=>e.submit&&e.submit(...t)),ref:"layerDom"},[l(E,{model:e.form,rules:e.rules,ref:"ruleForm","label-width":"150px",style:{margin:"20px"}},{default:r(()=>[l(o,{label:"\u90E8\u95E8\u540D\uFF1A",prop:"name"},{default:r(()=>[l(d,{disabled:e.form.disabled,modelValue:e.form.name,"onUpdate:modelValue":n[0]||(n[0]=t=>e.form.name=t),placeholder:"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D"},null,8,["disabled","modelValue"])]),_:1}),l(o,{label:"\u90E8\u95E8\u516C\u544A\uFF1A",prop:"notice"},{default:r(()=>[l(d,{disabled:e.form.disabled,modelValue:e.form.notice,"onUpdate:modelValue":n[1]||(n[1]=t=>e.form.notice=t),placeholder:"\u8BF7\u8F93\u5165\u90E8\u95E8\u516C\u544A",type:"textarea"},null,8,["disabled","modelValue"])]),_:1}),l(o,{label:"\u90E8\u95E8\u4EBA\u6570\uFF1A",prop:"staff_count"},{default:r(()=>[f("span",null,I(e.form.staff_count)+" \u4EBA",1)]),_:1}),l(o,{label:"\u4E0A\u73ED\u6253\u5361\u65F6\u95F4\u6BB5\uFF1A",prop:"clock_in"},{default:r(()=>[l(i,{disabled:e.form.disabled,modelValue:e.form.clockin,"onUpdate:modelValue":n[2]||(n[2]=t=>e.form.clockin=t),"is-range":"","range-separator":"To","start-placeholder":"Start time","end-placeholder":"End time"},null,8,["disabled","modelValue"])]),_:1}),l(o,{label:"\u4E0B\u73ED\u6253\u5361\u65F6\u95F4\u6BB5\uFF1A",prop:"clock_out"},{default:r(()=>[l(i,{disabled:e.form.disabled,modelValue:e.form.clockout,"onUpdate:modelValue":n[3]||(n[3]=t=>e.form.clockout=t),"is-range":"","range-separator":"To","start-placeholder":"Start time","end-placeholder":"End time"},null,8,["disabled","modelValue"])]),_:1}),te,l(p,{class:"wrapper"},{default:r(()=>[l(a,{disabled:e.form.disabled,class:"wrapper-content",type:"primary",onClick:e.update},{default:r(()=>[C("\u786E\u8BA4")]),_:1},8,["disabled","onClick"]),l(a,{disabled:!e.form.disabled,class:"wrapper-content",type:"danger",onClick:e.findDelete},{default:r(()=>[C("\u5220\u9664")]),_:1},8,["disabled","onClick"])]),_:1})]),_:1},8,["model","rules"])],544),e.DeleteConfirmBox.show?(y(),$(F,{key:0,layer:e.DeleteConfirmBox,onConfirm:e.Delete,ref:"layerDom"},null,8,["layer","onConfirm"])):A("",!0)],64)}var ne=L(ee,[["render",ue],["__scopeId","data-v-17dcbeb2"]]);const le=V({components:{Layer:W},props:{layer:{type:Object,default:()=>({show:!1,title:"",showButton:!0})}},setup(e,n){const u=h(null),m={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u65B0\u90E8\u95E8\u540D\u79F0",trigger:"blur"}]},_=h(null);U().state.corp.info;let d=h({name:"",notice:""});function o(){u.value&&u.value.validate(i=>{if(i){let a={department_name:d.value.name,notice:d.value.notice};P(a).then(p=>{D({type:"success",message:"\u90E8\u95E8\u65B0\u589E\u6210\u529F\uFF01"}),_.value&&_.value.close(),location.reload()})}else return!1})}return{form:d,rules:m,ruleForm:u,layerDom:_,submit:o}}});function ae(e,n,u,m,_,c){const d=s("el-input"),o=s("el-form-item"),i=s("el-form"),a=s("Layer");return y(),$(a,{layer:e.layer,onConfirm:e.submit,ref:"layerDom"},{default:r(()=>[l(i,{model:e.form,rules:e.rules,ref:"ruleForm","label-width":"120px",style:{"margin-right":"30px"}},{default:r(()=>[l(o,{label:"\u65B0\u90E8\u95E8\u540D\u79F0\uFF1A",prop:"name"},{default:r(()=>[l(d,{modelValue:e.form.name,"onUpdate:modelValue":n[0]||(n[0]=p=>e.form.name=p),placeholder:"\u8BF7\u8F93\u5165\u65B0\u90E8\u95E8\u540D\u79F0"},null,8,["modelValue"])]),_:1}),l(o,{label:"\u65B0\u90E8\u95E8\u516C\u544A\uFF1A",prop:"notice"},{default:r(()=>[l(d,{modelValue:e.form.notice,"onUpdate:modelValue":n[1]||(n[1]=p=>e.form.notice=p),placeholder:"\u8BF7\u8F93\u5165\u65B0\u90E8\u95E8\u516C\u544A",type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["layer","onConfirm"])}var re=L(le,[["render",ae]]);const se=V({components:{MangeInfo:ne,AddDepartmentLayer:re},setup(){const e=b({width:"50%",show:!1,showButton:!0}),n=b({width:"30%",show:!1,showButton:!0}),u=()=>{e.show=!0};let m=h({dic:["\u70B9\u51FB\u5DE6\u4FA7\u90E8\u95E8\u4FE1\u606F\uFF0C\u53EF\u67E5\u770B\u5E76\u7BA1\u7406\u5230\u6BCF\u4E2A\u90E8\u95E8\u7684\u4FE1\u606F"]});const _=o=>{n.show=!0,m.value=o,console.log("row:",o)};let c=h([{}]);return console.log(c),console.log(typeof c),(o=>{J(),H().then(i=>{console.log(i);let a=[];for(const p in i.data){if(!i.data.hasOwnProperty(p))continue;const E=i.data[p];a.push(E)}c.value=b(a),console.log(c),console.log(typeof c)}).catch(i=>{N()}).finally(()=>{N()})})(),{data:c,active:m,handleNodeClick:_,layer:n,layer_AddDepartment:e,showAddDepartmentLayer:u}}}),S=e=>(j("data-v-fc56a60e"),e=e(),q(),e),de={class:"layout-container"},ie=S(()=>f("h1",{style:{"margin-top":"30px"}},"\u90E8\u95E8\u4FE1\u606F\u7BA1\u7406",-1)),ce=S(()=>f("h2",null,"\u90E8\u95E8\u7ED3\u6784",-1)),me={class:"custom-tree"},pe={class:"custom-tree-node"},fe=S(()=>f("h2",null,"\u90E8\u95E8\u4FE1\u606F",-1)),_e={class:"custom-tree des"},ye={key:1};function Ee(e,n,u,m,_,c){const d=s("el-tree"),o=s("el-button"),i=s("AddDepartmentLayer"),a=s("el-col"),p=s("mange-info"),E=s("el-row");return y(),v("div",de,[ie,l(E,{gutter:12},{default:r(()=>[l(a,{span:12,class:"el-col-tree-box"},{default:r(()=>[ce,f("div",me,[l(d,{data:e.data,props:e.defaultProps,"highlight-current":!0,onNodeClick:e.handleNodeClick},{default:r(({data:F})=>[f("div",pe,[f("span",null,I(F.name),1)])]),_:1},8,["data","props","onNodeClick"])]),l(o,{type:"primary",class:"button-type",onClick:e.showAddDepartmentLayer},{default:r(()=>[C("\u65B0\u589E\u90E8\u95E8")]),_:1},8,["onClick"]),e.layer_AddDepartment.show?(y(),$(i,{key:0,layer:e.layer_AddDepartment},null,8,["layer"])):A("",!0)]),_:1}),l(a,{span:12,class:"el-col-tree-box"},{default:r(()=>[fe,f("div",_e,[e.layer.show?(y(!0),v(O,{key:0},X([e.active],(F,t)=>(y(),$(p,{layer:e.layer,dic:F,key:t},null,8,["layer","dic"]))),128)):A("",!0),e.layer.show?A("",!0):(y(),v("p",ye,"\u70B9\u51FB\u5DE6\u4FA7\u90E8\u95E8\uFF0C\u53EF\u67E5\u770B\u5E76\u7BA1\u7406\u5230\u6BCF\u4E2A\u90E8\u95E8\u7684\u4FE1\u606F"))])]),_:1})]),_:1})])}var ke=L(se,[["render",Ee],["__scopeId","data-v-fc56a60e"]]);export{ke as default};
