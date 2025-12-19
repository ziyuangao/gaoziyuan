<template>
    <div class="homeWrap">
        <div class="content">
            <user-info />
            <div class="printer">
                <div id="myName"></div>
                <div>2016年毕业于华北水利水电大学</div>
                <div>2018年9月23日开始从事前端开发</div>
                <div>距离今天已经<span id="targetId"></span>天</div>
            </div>
        </div>
        <div class="flex-box">
            <div id="chinaMap"></div>
            <div id="skills"></div>
        </div>
        <!-- <div>part6 electron +vue 无聊的计算器下载</div> -->
    </div>
</template>

<script>
import userInfo from './userInfo.vue';
import { onMounted, reactive } from 'vue';
import { CountUp } from "countup.js";
import * as echarts from 'echarts';
import chinaJson from "@/dataPool/china.json";
echarts.registerMap('china', chinaJson);
export default {
    components: {
        userInfo,
    },
    setup() {
        const state = reactive({
            days: undefined,
            timer: null,
            btnArr: [
                { id: 1, text: "抛硬币", path: "/YesOrNo" },
                { id: 2, text: "星空背景", path: "/starrySky" },
                { id: 3, text: "转动地球", path: "/Earth" },
            ]
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
        const setCharts1 = () => {
            const chinaMap = echarts.init(document.getElementById('chinaMap'));
            if (!chinaMap) {
                return
            }
            chinaMap.setOption({
                title: {
                    text: "工作经验",
                    left: "center",
                    color: "#606266",
                    fontSize: 24,
                    lineHeight: 36,
                    fontWeight: "bold"
                },
                tooltip: {}, // 鼠标移到图里面的浮动提示框
                dataRange: {
                    show: false,
                    min: 0,
                    max: 1000,
                    text: ["High", "Low"],
                    realtime: true,
                    calculable: true,
                    color: ["#C0C4CC", "#409EFF"],
                },
                geo: {
                    roam: true,
                    map: 'china',
                    label: {
                        show: true, // 是否显示对应地名
                        color: "#303133",
                    },
                    itemStyle: {
                        borderColor: "#E4E7ED",
                        borderWidth: "2",
                        areaColor: "rgba(64,158,255,0.3)",
                    },
                    emphasis: {
                        areaColor: "rgba(64,158,255,1)",
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: "#409EFF",
                    }
                },
                series: [
                    {
                        type: "scatter",
                        coordinateSystem: "geo", // 对应上方配置
                    },
                    {
                        name: "工作年限", // 浮动框的标题
                        type: "map",
                        geoIndex: 0,
                        data: [
                            {
                                name: "北京",
                                value: 3,
                            },
                            {
                                name: "上海",
                                value: 2,
                            },
                            {
                                name: "陕西",
                                value: 1,
                            },
                        ],
                    },
                ]
            })
        }
        const setCharts2 = () => {
            const skillsChart = echarts.init(document.getElementById('skills'));
            if (!skillsChart) {
                return
            }
            skillsChart.setOption({
                title: {
                    text: '使用技能',
                    subtext: 'skills',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Skill From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 50, name: 'Vue2' },
                            { value: 25, name: 'Vue3' },
                            { value: 10, name: 'jQuery' },
                            { value: 14, name: 'uniapp' },
                            { value: 18, name: 'wxml' },
                            { value: 8, name: 'react' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
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
            setCharts1();
            setCharts2();
        })
        return { state }
    }
}
</script>
<style scoped>
.homeWrap {
    width: 100%;
    background: rgba(233, 233, 233, .5);
    padding: 1rem 0;
    box-sizing: border-box;
}

.homeWrap .content {
    padding: 1rem;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.contentForMobile {
    width: 96%;
    margin: 0 auto;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.printer {
    flex-basis: 40%;
    font-size: 24px;
    line-height: 40px;
    position: relative;
}

.printerForMobile {
    flex: 1;
    margin-left: .4rem;
    font-size: .8rem;
    line-height: 1rem;
}

#myName {
    height: 8rem;
}

#chinaMap {
    height: 80vh;
    width: 60%;
    margin-top: 10px;
}

#skills {
    width: 30%;
    height: 400px;
}

.flex-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
}

.toys {
    width: 50%;
    margin: 0 auto;
}

.printer::after {
    position: absolute;
    opacity: 0;
    width: 150px;
    height: 150px;
    content: '';
    background-image: url('../../assets/miniprogram.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    top: 130px;
    right: 100%;
}

.printer:hover::after {
    top: 130px;
    right: 0px;
    transform: translateX(-50%);
    opacity: 1;
    transition: all 0.2s ease-in-out;
    z-index: 10;
}
</style>