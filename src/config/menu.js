const homeMenuList = [
    { id: 1, menuName: "首页", path: "/home", disabled: false },
    { id: 2, menuName: "笔记", path: "/notes", disabled: false },
    { id: 3, menuName: "照片墙", path: "/photos", disabled: false },
    { id: 4, menuName: "关于", path: "/about", disabled: false },
]

const noteMenuList = [
    {id: 1,title: "原生js",disabled: false,path:'/notes/javaScript',index:'1'},
    {id: 3,title: "Vue",disabled: false,path:'/notes/vue',index:'3'},
    {id: 4,title: "小程序相关",disabled: true,path:'/notes/miniProgram',index:'4'},
    {id: 4,title: "流水账",disabled: false,path:'/notes/networkfile',index:'5'},
]
// 小工具 具备一定功能的 能解决问题的
const toolsMenuList = [
    { id:1,text:"抛硬币",path:"/tools/coin"},
    { id:2,text:"LOL随机英雄",path:"/tools/lol"},
    { id:3,text:"随机id生成器",path:"/tools/randomName"},
    { id:4,text:"本地播放器",path:"/tools/music"},
]
// 好玩的 娱乐性质的
const u148MenuList = [
    { id:1,text:"deepseek",path:"/u148/deepseek"},
    { id:2,text:"舔狗日记",path:"/u148/dog"},
]

const quickLinksList = [
    { id:1,text:"滑动进入",path:"/links/slidein"},
    { id:2,text:"星空背景",path:"/links/starrySky"},
    { id:3,text:"转动地球",path:"/links/rotateTheEarth"},
]

export { homeMenuList, noteMenuList,u148MenuList,toolsMenuList,quickLinksList }