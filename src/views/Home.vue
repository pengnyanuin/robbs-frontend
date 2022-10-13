<template>
    <div class="main-header">
        <h1 class="main-title">Main</h1>
        <!--        <a href="#" @click.prevent="refreshGames" class="btn-reload"-->
        <!--           :class="{'disabled': loading, 'loading': reloadLoading}"><img src="@/assets/images/refresh.svg"-->
        <!--                                                                         alt="refresh"/></a>-->
    </div>
    <div class="main-inner">
        <div v-if="loggedIn" class="d-flex gap-3">
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
        <div v-else>
            <div>hi.</div>
            <router-link :to="{ name: 'login'}" class="btn">
                <span>Login / Register</span>
            </router-link>
        </div>
    </div>
</template>
<script>
import AuthService from "@/services/auth.service";

export default {
    name: 'home',
    data() {
        return {
            loggedIn: false,
        }
    },
    async created() {
        this.loggedIn = await AuthService.checkUser(this, false);
    }
};
</script>