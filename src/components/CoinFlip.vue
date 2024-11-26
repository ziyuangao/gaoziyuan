<template>
    <div class="coin-container" @click="tossCoin">
        <div :class="['coin', { tossing: isTossing, 'back-face': isBackFace }]" ref="coinElement">
            <div class="side front">YES</div>
            <div class="side back">NO</div>
        </div>
    </div>
</template>

<script>
/**
 * 无聊的计算器
 * 随机 yes or no
 * 代码99.99% 由 同义千问 实现
 */
import { ref } from 'vue';

export default {
    name: 'CoinToss',
    setup() {
        const isTossing = ref(false);
        const isBackFace = ref(false);

        const tossCoin = () => {
            if (isTossing.value) return; // 如果硬币正在抛掷，则不执行新的抛掷

            isTossing.value = true;

            setTimeout(() => {
                isTossing.value = false;
                // 模拟随机性决定硬币最终显示哪一面
                isBackFace.value = Math.random() > 0.5;
            }, 2000); // 动画持续时间
        };

        return {
            isTossing,
            isBackFace,
            tossCoin,
        };
    },
};
</script>

<style scoped>
.coin-container {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
}

.coin {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: transform 0.5s ease-in-out, top 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    transform-style: preserve-3d;
}

.coin.tossing {
    animation: toss 2s ease-in-out forwards;
}


@keyframes toss {
  0% {
    transform: translate(0, 0) rotateX(0deg);
  }
  20% {
    transform: translate(0, -200px) rotateX(360deg);
  }
  60% {
    transform: translate(0, -200px) rotateX(1440deg);
  }
  80% {
    transform: translate(0, -200px) rotateX(360deg);
  }
  100% {
    transform: translate(0, 0) rotateX(0deg);
  }
}

.side {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.front {
    background-color: #fdd835;
    color: #757575;
}

.back {
    background-color: #757575;
    color: #fdd835;
    transform: rotateX(180deg);
}

.coin.back-face .front {
    transform: rotateX(180deg);
}

.coin.back-face .back {
    transform: rotateX(0deg);
}
</style>