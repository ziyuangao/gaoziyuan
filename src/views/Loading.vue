<template>
  <div class="loadingTemplate">
      <img src="../assets/loading.gif" class="loadingImg">
      <!-- 保留灵感 dnf像素雪人头跑动 跑动到横向进度条末端时转跳页面 -->
        <el-progress class="progress" :percentage="progressConfig.percentage" :stroke-width="progressConfig.strokeWidth" :show-text="progressConfig.showText"></el-progress>
  </div>
</template>

<script>
export default {
    data(){
        return {
            progressConfig:{
                percentage:0,
                strokeWidth:18,
                showText:false 
            }
        }
    },
    methods:{
        loading(){
            setTimeout(() => {
                if(this.progressConfig.percentage>= 100){
                    return
                }else{
                    this.progressConfig.percentage ++
                    this.loading()
                }
            }, 30);

        },
        equipmentMonitoring(){
            // 运行环境监测
            if(sessionStorage.getItem('isPc')){
                // 本地以保存过该数据 说明用户手动初始化页面 直接进入首页 不展示loading动画
                this.$router.push('/home')
            }else{//首次进入项目 展示loading动画 同时判断当前运行环境
                this.loading();
                if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                    sessionStorage.setItem('isPc',2)
                }else {
                    sessionStorage.setItem('isPc',1)
                }
                setTimeout(() => {
                    this.$router.push('/home')
                    // 保证loading动画播放完毕
                }, 4000);
            }
        }
    },
    mounted(){
        // this.equipmentMonitoring()
    }
}
</script>
<style scoped>
.progress{
    position: absolute;
    width: 60%;
    left: 20%;
    bottom: 15%;
}
.loadingImg{
    z-index: 999;
    position: absolute;
    bottom: 18%;
    left: 76%;
    animation-name: loading;
    animation-duration: 3.6s;
    animation-timing-function:linear;
}

@keyframes loading {
  0% {left:18%}
  50% {left:50%}
  80% {left:60%}
  100% {left:76%}
}
</style>
