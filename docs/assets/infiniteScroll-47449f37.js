import{_ as r,i as a,r as d,k as l,g,o as _,c as m,a as i,n as u}from"./index-733b1c16.js";const f={setup(){let e=a(0),o=a(!1);const s=d({second:0,first:l(()=>s.second-1<0?s.imgList.length-1:s.second-1),last:l(()=>s.second+1>s.imgList.length-1?0:s.second+1),imgList:[{id:"1",src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/BanffEvergreens_EN-AU12780032283_1920x1080.jpg"},{id:"2",src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/BrazilianPine_EN-AU10074166204_1920x1080.jpg"},{id:"3",src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/CommonPipistrelle_EN-AU7421359791_1920x1080.jpg"},{id:"4",src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/Dongjiang_ZH-CN10434068279_1920x1080.jpg"},{id:"5",src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/DulangIsland_ZH-CN7669462147_1920x1080.jpg"}]}),n=t=>{o.value||t.deltaY&&(e.value=t.deltaY,o.value=!0,e.value>0?s.second=s.second+1>s.imgList.length-1?0:s.second+1:s.second=s.second-1<0?s.imgList.length-1:s.second-1)},c=()=>{o.value=!1,e.value=0};return g(()=>{window.addEventListener("wheel",n),document.querySelector(".demo_content").addEventListener("transitionend",c)}),{imgConfig:s,scrollStatus:e,isScrolling:o}}},h={class:"first_one demo_item"},p=["src"],v={class:"second_one demo_item"},y=["src"],j={class:"last_one demo_item"},C=["src"];function L(e,o,s,n,c,t){return _(),m("div",{class:u([{scroll_down:n.scrollStatus<0,scroll_up:n.scrollStatus>0},"demo_content"])},[i("div",h,[i("img",{src:n.imgConfig.imgList[n.imgConfig.first].src,alt:""},null,8,p)]),i("div",v,[i("img",{src:n.imgConfig.imgList[n.imgConfig.second].src,alt:""},null,8,y)]),i("div",j,[i("img",{src:n.imgConfig.imgList[n.imgConfig.last].src,alt:""},null,8,C)])],2)}const E=r(f,[["render",L],["__scopeId","data-v-2af02667"]]);export{E as default};
