<template>
    <div>
        <h1>Main</h1>

        <div class="d-flex gap-3">
            <router-link :to="{ name: 'new_game'}" class="btn btn--danger">
                <span>New game</span>
            </router-link>

            <router-link :to="{ name: 'new_map'}" class="btn btn--danger">
                <span>New map</span>
            </router-link>

            <router-link :to="{ name: 'actions'}" class="btn">
                <span>My actions</span>
            </router-link>

            <router-link :to="{ name: 'decks'}" class="btn">
                <span>My decks</span>
            </router-link>
        </div>
    </div>
</template>
<script>
import AuthService from "@/services/auth.service";

export default {
    created() {
        if (!AuthService.isLoggedIn()) {
            this.$router.push({name: 'login'})
        }
    }
};
</script>