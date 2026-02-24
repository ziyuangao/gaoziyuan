<template>
    <div class="home-content">
        <div class="home-content-area">
            <user-info />
            <div class="printer">
                <div id="myName"></div>
                <div>2016年毕业于华北水利水电大学</div>
                <div>2018年9月23日开始从事前端开发</div>
                <div>距离今天已经<span id="targetId"></span>天</div>
            </div>
        </div>
    </div>
</template>

<script>
import userInfo from './userInfo.vue';
import { onMounted, reactive } from 'vue';
import { CountUp } from "countup.js";
import * as echarts from 'echarts';
export default {
    name: "HomeContent",
    components: {
        userInfo,
    },
    setup() {
        const state = reactive({
            days: undefined,
        })
        const computedDays = () => {
            // 开始时间 时间戳 - 结束日期 时间戳 / 1000 / 60 / 24 
            const startDay = new Date('2018/09/23').getTime();
            const now = new Date().getTime();
            let days = Math.floor((now - startDay) / (1000 * 60 * 60 * 24))
            return days;
        }
        const setCharts = () => {
            const myName = echarts.init(document.getElementById('myName'));
            if (!myName) {
                return
            }
            myName.setOption({
                graphic: {
                    elements: [
                        {
                            type: 'text',
                            left: 'center',
                            top: 'center',
                            style: {
                                text: '高梓原',
                                fontSize: 80,
                                fontWeight: 'bold',
                                lineDash: [0, 200],
                                lineDashOffset: 0,
                                fill: 'transparent',
                                stroke: '#000',
                                lineWidth: 1
                            },
                            keyframeAnimation: {
                                duration: 3000,
                                loop: false,
                                keyframes: [
                                    {
                                        percent: 0.7,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 200,
                                            lineDash: [200, 0]
                                        }
                                    },
                                    {
                                        // Stop for a while.
                                        percent: 0.8,
                                        style: {
                                            fill: 'transparent'
                                        }
                                    },
                                    {
                                        percent: 1,
                                        style: {
                                            fill: 'black'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            })
        }
        onMounted(() => {
            state.days = computedDays();//计算2018年9月23日距离今天一共多少天
            const countup = new CountUp('targetId', state.days);
            if (!countup.error) {
                countup.start()
            } else {
                console.log(countup.error)
            }
            setCharts();
        })
        return { state }
    }
}
</script>
<style scoped lang="scss">
.home-content {
    width: 100%;
    background: rgba(233, 233, 233, .5);
    padding: 1rem 0;
    box-sizing: border-box;

    .home-content-area {
        padding: 1rem;
        background: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .printer {
            flex-basis: 40%;
            font-size: 24px;
            line-height: 40px;
            position: relative;

            &::after {
                position: absolute;
                opacity: 0;
                width: 150px;
                height: 150px;
                content: '';
                background-image: url('../../assets/miniprogram.png');
                background-size: contain;
                background-repeat: no-repeat;
                top: 130px;
                right: 100%;
            }

            /**
            * &:hover::after {
                top: 130px;
                right: 0px;
                transform: translateX(-50%);
                opacity: 1;
                transition: all 0.2s ease-in-out;
                z-index: 10;
            }
            */

            #myName {
                height: 8rem;
            }
        }

    }
}
</style>