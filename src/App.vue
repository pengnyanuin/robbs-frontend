<template>
    <div>
        <header>
            <div class="container">
                <nav>
                    <router-link :to="{ name: 'login'}" class="p-3">
                        <span>Login</span>
                    </router-link>
                    <router-link :to="{ name: 'welcome'}" class="p-3">
                        <span>Welcome</span>
                    </router-link>
                    <router-link :to="{ name: 'games'}" class="p-3">
                        <span>Games</span>
                    </router-link>
                </nav>
            </div>
        </header>
        <div class="container">
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

export default {
    name: "mains",
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