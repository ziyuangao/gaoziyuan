import{_ as l,j as o,g as r,q as u,o as s,c as f}from"./index-efa604e8.js";const _={name:"StarField",props:{width:{type:Number,default:800},height:{type:Number,default:600},starCount:{type:Number,default:100},speed:{type:Number,default:.1}},setup(t){const c=o(null);let n=[],i=null;const h=()=>{n=[];for(let e=0;e<t.starCount;e++)n.push({x:Math.random()*t.width,y:Math.random()*t.height,radius:Math.random()*1.5,velocity:Math.random()*t.speed})},d=()=>{const e=c.value.getContext("2d");e.clearRect(0,0,t.width,t.height),e.fillStyle="#000",e.fillRect(0,0,t.width,t.height),n.forEach(a=>{e.beginPath(),e.arc(a.x,a.y,a.radius,0,Math.PI*2),e.fillStyle="#fff",e.fill(),a.x-=a.velocity,a.x<0&&(a.x=t.width,a.y=Math.random()*t.height)}),i=requestAnimationFrame(d)};return r(()=>{h(),d()}),u(()=>{i&&cancelAnimationFrame(i)}),{canvas:c}}},m=["width","height"];function y(t,c,n,i,h,d){return s(),f("canvas",{ref:"canvas",width:n.width,height:n.height},null,8,m)}const x=l(_,[["render",y],["__scopeId","data-v-a81cc76b"]]);export{x as default};
