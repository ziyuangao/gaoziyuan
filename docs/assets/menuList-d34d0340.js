import{_ as i,u as l,r as u,b as _,o as a,c as n,a as p,F as m,e as h,f as b,w as f,h as v,t as N}from"./index-21be58db.js";const k={setup(){const s=l();return{state:u({drawerConfig:{direction:"ltr"},menuList:[{id:1,menuName:"首页",path:"/home",disabled:!1},{id:2,menuName:"笔记",path:"/notes",disabled:!1},{id:3,menuName:"生活",path:"/daily",disabled:!0},{id:4,menuName:"关于",path:"/about",disabled:!1}]}),switchRouter:e=>{e.path&&!e.disabled&&s.push(e.path)}}}},w={class:"menuList"};function x(s,o,d,e,L,y){const c=_("el-button");return a(),n("div",null,[p("div",w,[(a(!0),n(m,null,h(e.state.menuList,(t,r)=>(a(),b(c,{key:r,plain:"",disabled:t.disabled,onClick:C=>e.switchRouter(t)},{default:f(()=>[v(N(t.menuName),1)]),_:2},1032,["disabled","onClick"]))),128))])])}const B=i(k,[["render",x],["__scopeId","data-v-2acdd01c"]]);export{B as m};