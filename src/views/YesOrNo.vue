<template>
    <div class="YesOrNo">
        <CoinFlip />
    </div>
</template>

<script>
import CoinFlip from '@/components/CoinFlip.vue';

export default {
    name: 'YesOrNo',
    components: {
        CoinFlip,
    },
};
</script>

<style scoped>
.YesOrNo{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>