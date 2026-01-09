const homeMenuList = [
    { id: 1, menuName: "首页", path: "/home", disabled: false },
    { id: 2, menuName: "笔记", path: "/note", disabled: false },
    { id: 3, menuName: "照片墙", path: "/photoWall", disabled: false },
    { id: 4, menuName: "关于", path: "/about", disabled: false },
]

const noteMenuList = [
    {id: 1,title: "原生js",disabled: false,path:'/notes/javaScript',index:'1'},
    {id: 3,title: "Vue",disabled: false,path:'/notes/vue',index:'3'},
    {id: 4,title: "小程序相关",disabled: true,path:'/notes/miniProgram',index:'4'},
    {id: 4,title: "流水账",disabled: false,path:'/notes/networkfile',index:'5'},
]

const toyMenuList = [
    { id:1,text:"抛硬币",path:"/coin"},
    { id:3,text:"转动地球",path:"/rotateTheEarth"},
    { id:4,text:"滑动进入",path:"/slidein"},
    { id:2,text:"星空背景",path:"/starrySky"},
]

const u148MenuList = [
    { id:3,text:"deepseek",path:"/deepseek"},
    { id:2,text:"舔狗日记",path:"/dog"},
    { id:1,text:"LOL随机英雄",path:"/lol"},
    { id:4,text:"本地播放器",path:"/music"},
    { id:5,text:"随机id生成器",path:"/random"},
]

export { homeMenuList, noteMenuList,u148MenuList,toyMenuList }