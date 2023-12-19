<template>
    <div class="test">
        <p>css实现故障风格图片</p>
        <div class="fault_img">
            <div class="fault_img_child"></div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.test{
    color: #fff;
}
.fault_img{
    position: relative;
    width: 203px;
    height: 152px;
    background: url('../../assets/test_gif.gif') no-repeat #0ff;
    background-blend-mode: lighten;
    background-size: contain;
}
.fault_img_child{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/test_gif.gif') no-repeat #f40;
    background-blend-mode: lighten;
    mix-blend-mode: darken;
    background-size: cover;
    margin-left: 6px;
    animation:  shaken 30ms infinite;
}
@keyframes shaken{
    50%{
        transform: translateX(3px);
    }
}
</style>