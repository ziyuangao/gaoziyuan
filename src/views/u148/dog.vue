<template>
  <div class="dog">
    <el-space direction="vertical" size="large">
      <el-row type="flex" justify="center">
        <img :src="imgUrl" alt="" class="top-img" />
      </el-row>
      <el-row type="flex" justify="center">
        <el-radio-group v-model="type">
          <el-radio value="1" label="舔狗男">舔狗男</el-radio>
          <el-radio value="2" label="舔狗女">舔狗女</el-radio>
          <el-radio value="3" label="记仇男">记仇男</el-radio>
          <el-radio value="4" label="记仇女">记仇女</el-radio>
        </el-radio-group>
      </el-row>
      <el-row>
        <el-input v-model="dogText" style="width: 360px" autosize type="textarea" placeholder="Please input" />
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="getDogText">随机文案</el-button>
        <el-button type="primary" @click="getDogImg">生成图片</el-button>
      </el-row>
    </el-space>
    <!-- canvas预览 -->
    <canvas ref="canvas" width="340"></canvas>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import dogImg1 from '@/assets/u148/dog-1.jpg'
import dogImg2 from '@/assets/u148/dog-2.jpg'
import dogImg3 from '@/assets/u148/dog-3.jpg'
import dogImg4 from '@/assets/u148/dog-4.jpg'
// fetch对象
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
}

const canvas = ref(null);//创建canvas对象
const ctx = ref(null);//导出出canvas对象

// 图片类型
const type = ref('1')

// 阿里云图片地址
const imgUrl = computed(() => {
  return `https://gaoziyuan.oss-cn-beijing.aliyuncs.com/u148/dog-${type.value}.jpg`
})
// 日期格式化
const formatDate = (date, format = 'yyyy-mm-dd') => {
  // 处理传入的日期参数
  const parsedDate = new Date(date);

  // 验证日期是否有效
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date provided');
  }

  // 获取日期各部分
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();

  // 替换格式化字符串中的占位符
  return format
    .replace(/yyyy/g, year)
    .replace(/yy/g, String(year).slice(-2))
    .replace(/mm/g, String(month).padStart(2, '0'))
    .replace(/m/g, month)
    .replace(/dd/g, String(day).padStart(2, '0'))
    .replace(/d/g, day);
}


// 舔狗文案
const dogText = ref('')

// 获取舔狗文案
const getDogText = () => {
  const today = formatDate(new Date(), 'yyyy年mm月dd日')
  fetch("https://v2.xxapi.cn/api/dog", requestOptions)
    .then(response => response.text())
    .then(data => {
      const result = JSON.parse(data)
      dogText.value = `${today},${result.data}`
    })
    .catch(error => console.log('error', error))
}
// 生成图片
const getDogImg = () => {
  if (!dogText.value) {
    ElMessage.warning('请先获取文案或输入文案');
    return;
  }

  // 创建图片对象
  const img = new Image();

  img.onload = function () {
    // 文字换行处理和绘制
    const maxWidth = 680; // 设置文字区域的最大宽度为340px
    const lineHeight = 28; // 根据字体大小24px，适当增加行高至28px以提高可读性
    let x = 30; // 左边距保持不变
    let y = 0; // 初始化y坐标

    // 分割文字为行
    const lines = [];
    const fontSize = 24; // 设置字体大小为24px
    ctx.value.font = `${fontSize}px Arial`; // 更新字体样式

    let currentLine = '';
    for (let char of dogText.value) {
        if (ctx.value.measureText(currentLine + char).width > maxWidth) {
            // 当前行已满，添加到lines数组并开始新行
            lines.push(currentLine);
            currentLine = char;
        } else {
            // 继续添加当前字符到currentLine
            currentLine += char;
        }
    }

    // 添加最后一行
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    // 计算整个内容的高度，包括顶部图片、下面的文字及上下留白
    const imgAspectRatio = img.width / img.height;
    const imgWidth = 340; // canvas宽度减去留白
    const imgHeight = imgWidth / imgAspectRatio;
    const totalContentHeight = imgHeight + 20 /* 上方留白 */ + (lines.length * lineHeight) /* 每行文字的高度 */ + 30 /* 下方留白 */;
    
    // 设置canvas尺寸
    canvas.value.width = 340; // 考虑到左边距和右边距，总宽设置为340px
    canvas.value.height = totalContentHeight; // 动态高度

    // 清除canvas
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

    // 绘制背景（全白）
    ctx.value.fillStyle = '#ffffff';
    ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height);

    // 绘制图片（顶部）
    ctx.value.drawImage(img, 20, 20, imgWidth, imgHeight);

    // 重新计算文字起始位置y坐标
    y = imgHeight + 40; // 图片下方开始的位置加上额外的留白

    // 设置文字颜色为黑色
    ctx.value.fillStyle = '#000000';

    // 绘制文字
    for (let line of lines) {
        // 使用固定的x坐标（左边距）来绘制文字
        ctx.value.fillText(line, x, y);
        y += lineHeight; // 更新y坐标至下一行文字的起始位置
    }

    // 绘制边框（可选）
    ctx.value.strokeStyle = '#ebeef5';
    ctx.value.lineWidth = 1;
    ctx.value.strokeRect(20, 20, canvas.value.width - 40, canvas.value.height - 40);

    ElMessage.success('图片生成成功！');
    downloadImage()
}

  img.onerror = function () {
    ElMessage.error('图片加载失败，请检查网络连接');
  };

  // 根据选择的类型加载不同的图片
  const imgConfig = {
    '1': dogImg1,
    '2': dogImg2,
    '3': dogImg3,
    '4': dogImg4,
  };
  img.src = imgConfig[type.value];
  
}

// 下载图片
const downloadImage = () => {
  if (!canvas.value) return;

  const link = document.createElement('a');
  link.download = `舔狗日记-${formatDate(new Date(), 'yyyy-mm-dd')}.png`;
  link.href = canvas.value.toDataURL('image/png');
  link.click();
}

onMounted(() => {
  ctx.value = canvas.value.getContext('2d');
})

</script>


<style lang="css" scoped>
.dog {
  min-width: 768px;
  margin: 100px auto;
  width: 768px;
  text-align: center;
}

.top-img {
  width: 328px;
  height: 222px;
}
</style>