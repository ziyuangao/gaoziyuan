<template>
    <div class="test">
        <p>跑马灯效果</p>
        <div class="colorful">
            <span class="colorful">C</span>
            <span class="colorful">O</span>
            <span class="colorful">L</span>
            <span class="colorful">O</span>
            <span class="colorful">R</span>
            <span class="colorful">F</span>
            <span class="colorful">U</span>
            <span class="colorful">L</span>
        </div>
    </div>
</template>


<style scoped lang="scss">
.test {
    color: #fff;
    .colorful{
        font-size: 24px;
        font-weight: bold;
        color: #FFFFFF;
        display: inline-block;
        padding: 8px 12px;
        animation: colorChange 1s infinite alternate;
    }
}
@keyframes shaken {
    50% {
        transform: translateX(3px);
    }
}
@keyframes colorChange {
    to{
        color: #ff0266;
    }
}
@for $i from 1 through 10 {
    .colorful:nth-child(#{$i}){
        animation-delay: $i * 0.1s;
    }
}
</style>