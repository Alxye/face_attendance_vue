import{_ as D,d as V,h as A,u as T,i as $,j as F,k as z,s as L,l as S,o as n,c as f,a,t as c,m as i,b as y,w as r,n as j,q as u,F as I,v as N,e as w,R as P,E as l,r as d,p as U,f as q}from"./index.2c3d48fc.js";import{g as M}from"./department.d24309c9.js";var O="./assets/left.167ce885.jpg";const G=V({setup(){const e=A();T(),$(),F(!1);const s=z({isRegister:!1,staff_id:"1112",password:"123456",loading:!1,loading_register:!1,name:"\u8BF7\u9009\u62E9\u90E8\u95E8",departmentList:[""]});function _(){M().then(o=>{console.log(o);let t=[];for(const B in o.data){if(!o.data.hasOwnProperty(B))continue;const R=o.data[B].name;t.push(R)}console.log(t),console.log(typeof t),s.departmentList=t})}_();const m=F("password"),h=()=>{m.value===""?m.value="password":m.value=""},C=()=>new Promise((o,t)=>{if(s.staff_id===""){l.warning({message:"\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A",type:"warning"});return}if(s.password===""){l.warning({message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",type:"warning"});return}if(s.name==="\u8BF7\u9009\u62E9\u90E8\u95E8"){l.warning({message:"\u8BF7\u9009\u62E9\u90E8\u95E8",type:"warning"});return}o(!0)}),g=()=>new Promise((o,t)=>{if(s.staff_id===""){l.warning({message:"\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A",type:"warning"});return}if(s.password===""){l.warning({message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",type:"warning"});return}o(!0)});return{loginLeftPng:O,systemTitle:L,systemSubTitle:S,form:s,passwordType:m,passwordTypeChange:h,submit:()=>{g().then(()=>{s.loading=!0;let o={staff_id:s.staff_id,password:s.password};e.dispatch("user/login",o).then(async()=>{l.success({message:"\u767B\u5F55\u6210\u529F",type:"success",showClose:!0,duration:1e3}),location.reload()}).finally(()=>{s.loading=!1})})},register:()=>{C().then(()=>{s.loading=!0;let o={staff_id:s.staff_id,password:s.password,department_name:s.name};P(o).then(t=>{l({type:"success",message:"\u6CE8\u518C\u6210\u529F"}),location.reload()}).finally(()=>{s.loading=!1})})},toregister:()=>{s.isRegister=!0},tologin:()=>{s.isRegister=!1}}}}),b=e=>(U("data-v-720afe2b"),e=e(),q(),e),H={class:"container"},J={class:"box"},K={class:"login-content-left"},Q=["src"],W={class:"login-content-left-mask"},X={class:"box-inner"},Y={key:0},Z={key:1},x=b(()=>a("i",{class:"sfont system-xingmingyonghumingnicheng"},null,-1)),ee=b(()=>a("i",{class:"sfont system-mima"},null,-1)),se={style:{display:"flex"}},te={class:"fixed-top-right"};function oe(e,s,_,m,h,C){const g=d("el-input"),k=d("el-option"),E=d("el-select"),p=d("el-button"),v=d("el-form"),o=d("select-lang");return n(),f("div",H,[a("div",J,[a("div",K,[a("img",{src:e.loginLeftPng},null,8,Q),a("div",W,[a("div",null,c(e.$t(e.systemTitle)),1),a("div",null,c(e.$t(e.systemSubTitle)),1)])]),a("div",X,[e.form.isRegister?i("",!0):(n(),f("h1",Y,c(e.$t("message.system.welcome")),1)),e.form.isRegister?(n(),f("h1",Z,"\u6B22\u8FCE\u6CE8\u518C")):i("",!0),y(v,{class:"form"},{default:r(()=>[y(g,{size:"large",modelValue:e.form.staff_id,"onUpdate:modelValue":s[0]||(s[0]=t=>e.form.staff_id=t),placeholder:e.$t("message.system.userName"),type:"text",maxlength:"50"},{prepend:r(()=>[x]),_:1},8,["modelValue","placeholder"]),y(g,{size:"large",ref:"password",modelValue:e.form.password,"onUpdate:modelValue":s[2]||(s[2]=t=>e.form.password=t),type:e.passwordType,placeholder:e.$t("message.system.password"),name:"password",maxlength:"50"},{prepend:r(()=>[ee]),append:r(()=>[a("i",{class:j(["sfont password-icon",e.passwordType?"system-yanjing-guan":"system-yanjing"]),onClick:s[1]||(s[1]=(...t)=>e.passwordTypeChange&&e.passwordTypeChange(...t))},null,2)]),_:1},8,["modelValue","type","placeholder"]),e.form.isRegister?(n(),u(E,{key:0,modelValue:e.form.name,"onUpdate:modelValue":s[3]||(s[3]=t=>e.form.name=t),size:"large",type:"text",maxlength:"150",style:{width:"100%"}},{default:r(()=>[(n(!0),f(I,null,N(e.form.departmentList,t=>(n(),u(k,{key:t,label:t,value:t},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])):i("",!0),a("div",se,[e.form.isRegister?i("",!0):(n(),u(p,{key:0,type:"primary",loading:e.form.loading,onClick:e.submit,style:{width:"100%","margin-top":"20px"},size:"medium"},{default:r(()=>[w(c(e.$t("message.system.login")),1)]),_:1},8,["loading","onClick"])),e.form.isRegister?i("",!0):(n(),u(p,{key:1,type:"primary",loading:e.form.loading_register,onClick:e.toregister,style:{width:"100%","margin-top":"20px","margin-left":"10px"},size:"medium"},{default:r(()=>[w(" \u53BB\u6CE8\u518C ")]),_:1},8,["loading","onClick"])),e.form.isRegister?(n(),u(p,{key:2,type:"primary",loading:e.form.loading_register,onClick:e.tologin,style:{width:"100%","margin-top":"20px"},size:"medium"},{default:r(()=>[w(" \u53BB\u767B\u5F55 ")]),_:1},8,["loading","onClick"])):i("",!0),e.form.isRegister?(n(),u(p,{key:3,type:"primary",loading:e.form.loading_register,onClick:e.register,style:{width:"100%","margin-top":"20px","margin-left":"10px"},size:"medium"},{default:r(()=>[w(" \u6CE8\u518C ")]),_:1},8,["loading","onClick"])):i("",!0)])]),_:1}),a("div",te,[y(o)])])])])}var re=D(G,[["render",oe],["__scopeId","data-v-720afe2b"]]);export{re as default};