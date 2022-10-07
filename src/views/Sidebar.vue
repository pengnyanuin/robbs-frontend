<template>
    <div class="sidebar">
        <nav class="sidebar__menu">
            <template v-if="loggedIn">
                <router-link :to="{ name: 'games'}" class="nav-link">
                    <span>Active</span>
                </router-link>
                <router-link :to="{ name: 'games_join'}" class="nav-link">
                    <span>Open</span>
                </router-link>
                <router-link :to="{ name: 'games_history'}" class="nav-link">
                    <span>History</span>
                </router-link>
            </template>
            <template v-else>
                <router-link :to="{ name: 'login'}" class="nav-link">
                    <span>Login</span>
                </router-link>
            </template>
        </nav>
    </div>
</template>
<script>
import AuthService from "@/services/auth.service";

export default {
    name: "sidebar",
    data() {
        return {
            loggedIn: false,
        }
    },
    created() {
        if (AuthService.isLoggedIn()) {
            this.loggedIn = true;
        }
    },
    methods: {}
}
</script>