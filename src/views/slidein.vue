<template>
    <div class="slidein">
        <div v-myslide-in class="slidein-content" v-for="item in 20" :key="item">
            {{ item }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@function random-pastel() {
    $hue: random(360);
    @return hsl($hue, 70%, 85%);
}

.slidein {
    max-width: 1024px;
    margin: 0 auto;
    text-align: center;
    font-size: 120px;

    .slidein-content {
        border-radius: 6px;
        margin-top: 80px;
        height: 400px;
        line-height: 400px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    }

    @for $i from 1 through 20 {
        .slidein-content {
            &:nth-child(#{$i}) {
                background-color: random-pastel();
            }
        }
    }

}
</style>