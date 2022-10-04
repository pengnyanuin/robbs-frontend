<template>
    <header class="header">
        <div class="main-menu__wrap">
            <nav class="main-menu">
                <router-link :to="{ name: 'home'}" class="nav-link">
                    <span>Home</span>
                </router-link>
            </nav>
            <nav class="main-menu main-menu--secondary">
                <router-link :to="{ name: 'login'}" class="nav-link">
                    <span>Login</span>
                </router-link>
            </nav>
        </div>
    </header>
    <div class="main-wrap">
        <Sidebar />
        <div class="main-content">
            <router-view v-slot="{Component}">
                <keep-alive include="login">
                    <component :is="Component"></component>
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>
<script>
import AuthService from "@/services/auth.service";
import Sidebar from "@/views/Sidebar.vue";

export default {
    name: "mains",
    components: {
        Sidebar
    },
    created() {
        if (!AuthService.isLoggedIn()) {
            this.$router.push({name: 'login'})
        }
    },
    methods: {}
}
</script>
<style scoped>
</style>