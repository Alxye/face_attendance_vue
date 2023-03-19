import{q as V,d as L,J as T,_ as I,r as s,K as P,M as z,o as y,c as v,b as l,N as G,w as r,a as f,e as C,t as S,j as b,k as h,h as O,z as H,E as D,v as $,C as A,F as j,p as q,f as M,L as J,G as K}from"./index.31a1378a.js";import{s as Q,h as U}from"./loading.6f6d4371.js";function R(){return V({url:"/department/info",method:"get"})}function W(e){return V({url:"/department/add",method:"post",data:e})}function X(e){return V({url:"/department/update",method:"post",data:e})}function Y(e){return V({url:"/department/delete",method:"post",data:e})}const Z=L({methods:{warning(){return warning}},props:{layer:{type:Object,default:()=>({show:!1,title:"",showButton:!1}),required:!0}},directives:{drag:T},setup(e,n){function u(){n.emit("confirm")}function m(){e.layer.show=!1}return{confirm:u,close:m}}});function x(e,n,u,m,_,c){const d=s("el-button"),t=s("el-dialog"),i=P("drag");return z((y(),v("div",null,[l(t,{modelValue:e.layer.show,"onUpdate:modelValue":n[0]||(n[0]=a=>e.layer.show=a),title:"\u6CE8\u610F\uFF01",width:e.layer.width,center:""},G({default:r(()=>[f("span",null,S(e.layer.title),1)]),_:2},[e.layer.showButton?{name:"footer",fn:r(()=>[f("div",null,[l(d,{type:"primary",onClick:e.confirm},{default:r(()=>[C("\u786E\u8BA4")]),_:1},8,["onClick"]),l(d,{onClick:e.close},{default:r(()=>[C("\u53D6\u6D88")]),_:1},8,["onClick"])])]),key:"0"}:void 0]),1032,["modelValue","width"])])),[[i,e.layer.show]])}var ee=I(Z,[["render",x]]);const te=L({components:{Layer:ee},props:{dic:{type:Object,default:()=>({name:"",notice:"",staff_count:0,id:0})},layer:{type:Object,default:()=>({show:!1,title:"",showButton:!0})}},setup(e,n){let u=b(e.dic);const m=h(null),_=h(null),c=b({width:"30%",show:!1,title:"",showButton:!0}),d=O();let t=b({id:u.id,name:u.name,notice:u.notice,staff_count:u.staff_count,clockin:[new Date("2023-01-01 "+u.clock_in_start),new Date("2023-01-01 "+u.clock_in_end)],clockout:[new Date("2023-01-01 "+u.clock_out_start),new Date("2023-01-01 "+u.clock_out_end)],disabled:u.id!=d.state.user.info.department_id});H(()=>e.dic,(o,g)=>{t.id=o.id,t.name=o.name,t.notice=o.notice,t.staff_count=o.staff_count,t.clockin=[new Date("2023-01-01 "+o.clock_in_start),new Date("2023-01-01 "+o.clock_in_end)],t.clockout=[new Date("2023-01-01 "+o.clock_out_start),new Date("2023-01-01 "+o.clock_out_end)],t.disabled=o.id!=d.state.user.info.department_id});const i={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D",trigger:"blur"}]};function a(o){const g=":";let k=o.getHours(),w=o.getMinutes(),B=o.getSeconds();return k>=0&&k<=9&&(k="0"+k),w>=0&&w<=9&&(w="0"+w),B>=0&&B<=9&&(B="0"+B),k+g+w+g+B}function p(){m.value&&m.value.validate(o=>{if(o){if(t.name==u.name&&t.notice==u.notice&&a(t.clockin[0])==u.clock_in_start&&a(t.clockin[1])==u.clock_in_end&&a(t.clockout[0])==u.clock_out_start&&a(t.clockout[1])==u.clock_out_end)return D({type:"warning",message:"\u672A\u4F5C\u4EFB\u4F55\u6539\u53D8"}),!1;{let g={id:t.id,name:t.name,notice:t.notice,clock_in_start:a(t.clockin[0]),clock_in_end:a(t.clockin[1]),clock_out_start:a(t.clockout[0]),clock_out_end:a(t.clockout[1])};X(g).then(k=>{D({type:"success",message:"\u66F4\u65B0\u6210\u529F"}),location.reload()})}}else return!1})}function E(){if(t.staff_count!=0)return D({type:"warning",message:"\u8BE5\u90E8\u95E8\u5C1A\u6709\u5458\u5DE5"}),c.show=!1,!1;{let o={id:t.id};Y(o).then(g=>{D({type:"success",message:"\u5220\u9664\u6210\u529F"}),location.reload()})}}function F(){c.show=!0,c.title="\u8BE5\u90E8\u95E8\u5C06\u88AB\u6C38\u4E45\u5220\u9664"}return{form:t,rules:i,layerDom:_,ruleForm:m,update:p,findDelete:F,Delete:E,DeleteConfirmBox:c}}}),oe=e=>(q("data-v-17dcbeb2"),e=e(),M(),e),ue=oe(()=>f("div",{class:"wrapper"},null,-1));function ne(e,n,u,m,_,c){const d=s("el-input"),t=s("el-form-item"),i=s("el-time-picker"),a=s("el-button"),p=s("el-col"),E=s("el-form"),F=s("Layer");return y(),v(j,null,[f("div",{onConfirm:n[4]||(n[4]=(...o)=>e.submit&&e.submit(...o)),ref:"layerDom"},[l(E,{model:e.form,rules:e.rules,ref:"ruleForm","label-width":"150px",style:{margin:"20px"}},{default:r(()=>[l(t,{label:"\u90E8\u95E8\u540D\uFF1A",prop:"name"},{default:r(()=>[l(d,{disabled:e.form.disabled,modelValue:e.form.name,"onUpdate:modelValue":n[0]||(n[0]=o=>e.form.name=o),placeholder:"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D"},null,8,["disabled","modelValue"])]),_:1}),l(t,{label:"\u90E8\u95E8\u516C\u544A\uFF1A",prop:"notice"},{default:r(()=>[l(d,{disabled:e.form.disabled,modelValue:e.form.notice,"onUpdate:modelValue":n[1]||(n[1]=o=>e.form.notice=o),placeholder:"\u8BF7\u8F93\u5165\u90E8\u95E8\u516C\u544A",type:"textarea"},null,8,["disabled","modelValue"])]),_:1}),l(t,{label:"\u90E8\u95E8\u4EBA\u6570\uFF1A",prop:"staff_count"},{default:r(()=>[f("span",null,S(e.form.staff_count)+" \u4EBA",1)]),_:1}),l(t,{label:"\u4E0A\u73ED\u6253\u5361\u65F6\u95F4\u6BB5\uFF1A",prop:"clock_in"},{default:r(()=>[l(i,{disabled:e.form.disabled,modelValue:e.form.clockin,"onUpdate:modelValue":n[2]||(n[2]=o=>e.form.clockin=o),"is-range":"","range-separator":"To","start-placeholder":"Start time","end-placeholder":"End time"},null,8,["disabled","modelValue"])]),_:1}),l(t,{label:"\u4E0B\u73ED\u6253\u5361\u65F6\u95F4\u6BB5\uFF1A",prop:"clock_out"},{default:r(()=>[l(i,{disabled:e.form.disabled,modelValue:e.form.clockout,"onUpdate:modelValue":n[3]||(n[3]=o=>e.form.clockout=o),"is-range":"","range-separator":"To","start-placeholder":"Start time","end-placeholder":"End time"},null,8,["disabled","modelValue"])]),_:1}),ue,l(p,{class:"wrapper"},{default:r(()=>[l(a,{disabled:e.form.disabled,class:"wrapper-content",type:"primary",onClick:e.update},{default:r(()=>[C("\u786E\u8BA4")]),_:1},8,["disabled","onClick"]),l(a,{disabled:!e.form.disabled,class:"wrapper-content",type:"danger",onClick:e.findDelete},{default:r(()=>[C("\u5220\u9664")]),_:1},8,["disabled","onClick"])]),_:1})]),_:1},8,["model","rules"])],544),e.DeleteConfirmBox.show?(y(),$(F,{key:0,layer:e.DeleteConfirmBox,onConfirm:e.Delete,ref:"layerDom"},null,8,["layer","onConfirm"])):A("",!0)],64)}var le=I(te,[["render",ne],["__scopeId","data-v-17dcbeb2"]]);const ae=L({components:{Layer:J},props:{layer:{type:Object,default:()=>({show:!1,title:"",showButton:!0})}},setup(e,n){const u=h(null),m={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u65B0\u90E8\u95E8\u540D\u79F0",trigger:"blur"}]},_=h(null);O().state.corp.info;let d=h({name:"",notice:""});function t(){u.value&&u.value.validate(i=>{if(i){let a={department_name:d.value.name,notice:d.value.notice};W(a).then(p=>{D({type:"success",message:"\u90E8\u95E8\u65B0\u589E\u6210\u529F\uFF01"}),_.value&&_.value.close(),location.reload()})}else return!1})}return{form:d,rules:m,ruleForm:u,layerDom:_,submit:t}}});function re(e,n,u,m,_,c){const d=s("el-input"),t=s("el-form-item"),i=s("el-form"),a=s("Layer");return y(),$(a,{layer:e.layer,onConfirm:e.submit,ref:"layerDom"},{default:r(()=>[l(i,{model:e.form,rules:e.rules,ref:"ruleForm","label-width":"120px",style:{"margin-right":"30px"}},{default:r(()=>[l(t,{label:"\u65B0\u90E8\u95E8\u540D\u79F0\uFF1A",prop:"name"},{default:r(()=>[l(d,{modelValue:e.form.name,"onUpdate:modelValue":n[0]||(n[0]=p=>e.form.name=p),placeholder:"\u8BF7\u8F93\u5165\u65B0\u90E8\u95E8\u540D\u79F0"},null,8,["modelValue"])]),_:1}),l(t,{label:"\u65B0\u90E8\u95E8\u516C\u544A\uFF1A",prop:"notice"},{default:r(()=>[l(d,{modelValue:e.form.notice,"onUpdate:modelValue":n[1]||(n[1]=p=>e.form.notice=p),placeholder:"\u8BF7\u8F93\u5165\u65B0\u90E8\u95E8\u516C\u544A",type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["layer","onConfirm"])}var se=I(ae,[["render",re]]);const de=L({components:{MangeInfo:le,AddDepartmentLayer:se},setup(){const e=b({width:"50%",show:!1,showButton:!0}),n=b({width:"30%",show:!1,showButton:!0}),u=()=>{e.show=!0};let m=h({dic:["\u70B9\u51FB\u5DE6\u4FA7\u90E8\u95E8\u4FE1\u606F\uFF0C\u53EF\u67E5\u770B\u5E76\u7BA1\u7406\u5230\u6BCF\u4E2A\u90E8\u95E8\u7684\u4FE1\u606F"]});const _=t=>{n.show=!0,m.value=t,console.log("row:",t)};let c=h([{}]);return console.log(c),console.log(typeof c),(t=>{Q(),R().then(i=>{console.log(i);let a=[];for(const p in i.data){if(!i.data.hasOwnProperty(p))continue;const E=i.data[p];a.push(E)}c.value=b(a),console.log(c),console.log(typeof c)}).catch(i=>{U()}).finally(()=>{U()})})(),{data:c,active:m,handleNodeClick:_,layer:n,layer_AddDepartment:e,showAddDepartmentLayer:u}}}),N=e=>(q("data-v-fc56a60e"),e=e(),M(),e),ie={class:"layout-container"},ce=N(()=>f("h1",{style:{"margin-top":"30px"}},"\u90E8\u95E8\u4FE1\u606F\u7BA1\u7406",-1)),me=N(()=>f("h2",null,"\u90E8\u95E8\u7ED3\u6784",-1)),pe={class:"custom-tree"},fe={class:"custom-tree-node"},_e=N(()=>f("h2",null,"\u90E8\u95E8\u4FE1\u606F",-1)),ye={class:"custom-tree des"},Ee={key:1};function Fe(e,n,u,m,_,c){const d=s("el-tree"),t=s("el-button"),i=s("AddDepartmentLayer"),a=s("el-col"),p=s("mange-info"),E=s("el-row");return y(),v("div",ie,[ce,l(E,{gutter:12},{default:r(()=>[l(a,{span:12,class:"el-col-tree-box"},{default:r(()=>[me,f("div",pe,[l(d,{data:e.data,props:e.defaultProps,"highlight-current":!0,onNodeClick:e.handleNodeClick},{default:r(({data:F})=>[f("div",fe,[f("span",null,S(F.name),1)])]),_:1},8,["data","props","onNodeClick"])]),l(t,{type:"primary",class:"button-type",onClick:e.showAddDepartmentLayer},{default:r(()=>[C("\u65B0\u589E\u90E8\u95E8")]),_:1},8,["onClick"]),e.layer_AddDepartment.show?(y(),$(i,{key:0,layer:e.layer_AddDepartment},null,8,["layer"])):A("",!0)]),_:1}),l(a,{span:12,class:"el-col-tree-box"},{default:r(()=>[_e,f("div",ye,[e.layer.show?(y(!0),v(j,{key:0},K([e.active],(F,o)=>(y(),$(p,{layer:e.layer,dic:F,key:o},null,8,["layer","dic"]))),128)):A("",!0),e.layer.show?A("",!0):(y(),v("p",Ee,"\u70B9\u51FB\u5DE6\u4FA7\u90E8\u95E8\uFF0C\u53EF\u67E5\u770B\u5E76\u7BA1\u7406\u5230\u6BCF\u4E2A\u90E8\u95E8\u7684\u4FE1\u606F"))])]),_:1})]),_:1})])}var ke=I(de,[["render",Fe],["__scopeId","data-v-fc56a60e"]]);export{ke as default};