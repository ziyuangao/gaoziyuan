import{_ as d}from"./index-a7e6d29f.js";import{ab as m,a as p,aQ as o,T as l,U as s,a5 as _,$ as n,I as u,ar as v,_ as f,V as b}from"./vendor-09eb5a69.js";const h={setup(){const r=m([{id:1,title:"关于ES6中 var/let/const 的个人理解",html:`先说区别 </br>
         1. var 存在变量提升 let/const没有 </br> 
         2. 暂时性死区 let/const存在 var没有 </br>
         3. 允许重复声明 var允许会保留最后声明的的值，let/const不允许 </br>
         4. let表示该值允许被修改（例如 重新给对象赋值或者重新给字符串定义值）const表示该值可不修改，但是子属性是允许改动的（例如 通过const创建一个对象，仍然可以对象内的某个属性进行修改） </br>
         5. 关于for循环时使用var和let 首先要理解var变量提升 那么在for循环创建循环条件的时候，var创建的是一个全局变量(可以在for循环外拿到，公用同一个指针)，而let因为块级作用域的原因，仅在当前作用域内生效（循环外无法获取，单独的指针指向）</br>
         ps. 关于第四点的补充 默认情况使用const创建变量，当且仅当已知某值会被修改时才使用let创建`},{id:2,title:"关于拓展运算符...刚学到的一些应用",html:`假如给定一个数组 arr = [11,22,14,12,33,21,35] 需要获取到最大值，我首先的想法是对数组排序(sort)然后拿最后一位（length-1）</br>
        在其他地方看到，完全可以使用Math来进行纯数学运算，只需要通过Math.max(...arr)即可`},{id:3,title:"关于 箭头函数 的个人理解",html:`在没看书之前，我自己使用箭头函数最多的是用在保持this指针指向(vue中),原来es6中箭头函数有这么多特性特点，仅做mark一下。</br>
        1 箭头函数没有this指针  箭头函数内使用打的this是取决父一级this指针。</br>
        2 不能使用new调用箭头函数 因为箭头函数是没有构造器的 也就是 [Construct] ，因此箭头函数无法作为构造函数(同样没有 prototype 属性)</br>
        3 箭头函数是没有arguments对象 接受参数时需要通过形式参数或者剩余参数(...)的方式获取函数的参数 （如果在函数体内使用，获取到的是上一级的arguments）`},{id:4,title:"关于 ... 拓展符最近踩的坑",html:`最近项目中遇到一个相对复杂的表单信息，页面大概5个左右，每个页面之间需要互相通过$route.query传递7-8个参数信息，
        前人通过 ...query 的方式将数据向下传递，在某页中，其中一个key需要改变，但是在下一页发现该数据总是拿不到最新的值。排查问题发现，页面中某处使用了 两次拓展符对query进行了拓展，
        出现的问题就是后面的拓展的对象中的key值覆盖了前面需要的key值。</br>所以在使用拓展符时首先要确认的是原对象内的key值，以及目标对象内的key值，如果存在冲突，将需要保存的内容还在对象尾部，进行覆盖。`},{id:5,title:"关于业务前置和业务后置的问题",html:`开发时时常会遇到前后端都能实现的功能到底谁来实现的问题，有人说需要看业务改动情况，有人说看影响范围，有人说具体情况具体分析。
        关于这件事，分享一些我的看法，首先声明我是一名前端开发，回写一点点nodejs，了解一点点增删查改的过程，入门可能都算不上，所以，以下内容仅供参考。首先从用户使用场景分析，我们使用的app，是一个增量的过程，
        也就是说，app功能在不断增多，服务内容，产生的业务场景，系统交互在不断增多的一个过程，业务前置的优点在于后端无需考虑复杂的业务场景，数据按前端传送为准，后端可以更专注数据存储，我理解的缺点，数据安全性打折扣（前端数据），
        逻辑严谨程度打折扣（数据以前端为准），用户体验打折扣（app体量增大），源数据来源于数据库，处理在前端，项目的使用分配头重脚轻，核心业务由前端的处理数据不安全，不准确。`},{id:6,title:"关于前端项目优化的一个思路",html:`最近做了一个关于图片展示优化的活，从用户体验的角度来看，确实比之前“流畅”了一些，
        实现的方案是这样的，1取消promise.all事件，改为单个图片加载.2图片新增加载失败的函数处理（重试）.3关闭全局loading改为每个小图片的loading，不阻塞用户操作。
        以上改动点属于纯前端操作，接口还是原本的响应速度，但是从用户体验上来讲，用户觉得页面“响应”要比之前快多了，而且没有全局的loading阻塞用户行为，体验感提升了不少。`},{id:7,title:"JS的计时器是否准确？为什么？",html:`分为四个层面。1硬件。不存在绝对意义的精确计时，相对意义精确的计时是原子钟，计算机硬件并非原子钟，所以硬件方面计时并不准确。2软件。浏览器中js代码
        例如settimeout或者setinterval这些代码，并不是浏览器开始计时，而是浏览器交给操作系统去计时，不同的操作系统有不同的实现方式，但这些实现方式都是尽可能的去模拟最精确的样子。3标准。w3c标准，计时嵌套标准 当大于4层时，最小时间
        间隔是4ms(毫秒)。4事件循环。计时器到达后也不一定会马上执行，而是要等待执行栈清空后才会执行。`},{id:8,title:"记录日常开发遇到的关于&&的bug",html:`日常开发时为了判断对象内某一个属性是否存在，会使用 obj && obj.data 的方式去获取这个属性，在开发时遇到这样一个错误，
        我在创建变量时将obj初始化为空字符串后续给他赋值成接口返回数据，在进行逻辑判断时，如果存在 obj&&obj.data 那么运行某些代码，此时的判断就出现了问题，
        false && true 一定返回是false而不是预期的 判断对象内是否存在这个data属性。两个问题，1思路有问题，初始化声明为空字符串后续设置为对象，数据类型变更了。2判断逻辑也有问题，源于
        初始化设置值的位置，&&确实可以用来确认对象是否存在这个属性，但是放在if判断就存在歧义了。还是源于日常开发时自己对细节没有严格要求导致的。`}]);let t=p("");return{list:r,activeName:t}}},y=["innerHTML"];function k(r,t,g,a,j,x){const i=o("el-collapse-item"),c=o("el-collapse");return l(),s("div",null,[_(c,{modelValue:a.activeName,"onUpdate:modelValue":t[0]||(t[0]=e=>a.activeName=e),accordion:"",class:"collapse-content"},{default:n(()=>[(l(!0),s(u,null,v(a.list,e=>(l(),f(i,{key:e.id,title:e.title,name:`item-${e.id}`},{default:n(()=>[b("div",{innerHTML:e.html},null,8,y)]),_:2},1032,["title","name"]))),128))]),_:1},8,["modelValue"])])}const B=d(h,[["render",k],["__scopeId","data-v-5eff7988"]]);export{B as default};
