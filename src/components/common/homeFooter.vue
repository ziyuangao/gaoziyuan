<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h2 class="footer-logo">Blog</h2>
                <p class="footer-description">分享创意</p>
            </div>

            <!-- <div class="footer-section">
                <h3 class="footer-heading">快速链接</h3>
                <ul class="footer-list">
                    <li v-for="link in quickLinks" :key="link.text">
                        <a :href="link.url">{{ link.text }}</a>
                    </li>
                </ul>
            </div> -->

            <div class="footer-section">
                <h3 class="footer-heading">有点意思</h3>
                <ul class="footer-list">
                    <li v-for="item in u148" :key="item">
                        <el-button @click="navigatorTo(item.path)" link type="primary" >{{ item.text }}</el-button>
                    </li>
                </ul>
            </div>

            <div class="footer-section">
                <h3 class="footer-heading">小玩具</h3>
                <ul class="footer-list">
                    <li v-for="item in toys" :key="item">
                        <el-button @click="navigatorTo(item.path)" link type="primary" >{{ item.text }}</el-button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; {{ currentYear }} gaoziyuan</p>
        </div>
    </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { u148MenuList,toyMenuList } from '@/config/menu';
const route = useRouter();

const toys = ref(toyMenuList)

const u148 = ref(u148MenuList)

const currentYear = computed(() => new Date().getFullYear())

const navigatorTo = (path)=>{
    route.push({ path })
}
</script>

<style scoped>
.footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 2rem 0;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 1rem;
}

.footer-section {
    flex: 1;
    min-width: 200px;
    margin-bottom: 1rem;
}

.footer-logo {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.footer-description {
    font-size: 0.9rem;
    color: #bdc3c7;
}

.footer-heading {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.footer-list {
    list-style: none;
    padding: 0;
}

.footer-list li {
    margin-bottom: 0.5rem;
}

.footer-list a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-list a:hover {
    color: #ecf0f1;
}

.social-icons {
    display: flex;
    gap: 1rem;
}

.social-icons a {
    color: #bdc3c7;
    transition: color 0.3s ease;
}

.social-icons a:hover {
    color: #ecf0f1;
}

.footer-bottom {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #34495e;
}

@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
    }

    .footer-section {
        margin-bottom: 2rem;
    }
}
</style>