<template>
    <div class="sidebar">
        <nav class="sidebar__menu">
            <router-link :to="{ name: 'games'}" class="nav-link">
                <span>Active</span>
            </router-link>
            <router-link :to="{ name: 'games_join'}" class="nav-link">
                <span>Open</span>
            </router-link>
            <router-link :to="{ name: 'games_history'}" class="nav-link">
                <span>History</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
import AuthService from "@/services/auth.service";

export default {
    name: "sidebar",
    created() {
        if (!AuthService.isLoggedIn()) {
            this.$router.push({name: 'login'})
        }
    },
    methods: {}
}
</script>