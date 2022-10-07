<template>
    <div class="main-header">
        <h1 class="main-title">Open</h1>
        <a href="#" @click.prevent="refreshGames" class="btn-reload"
           :class="{'disabled': loading, 'loading': reloadLoading}"><img src="@/assets/images/refresh.svg"
                                                                         alt="refresh"/></a>
        <router-link :to="{ name: 'new_game'}" class="btn btn--danger">
            <span>New game</span>
        </router-link>
    </div>
    <div class="main-inner">
        <Loader v-if="loading || reloadLoading"/>
        <div class="notice" v-if="error"> Error :c</div>
        <div v-if="!loading && !error">
            <div v-if="games && games.length">
                <router-link :to="{ name: 'game', params: {id: game.id} }"
                             v-for="(game, i) in games" :key="i" class="game__button">
                    <span class="game__button__title">{{ game.title }}</span>
                </router-link>
            </div>
            <div v-else>
                <!-- Nothing is open -->
                Nothing ._.
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AuthService from "@/services/auth.service";
import Loader from "@/views/components/Loader.vue";

export default {
    name: "games_join",
    components: {
        Loader
    },
    data() {
        return {
            reloadLoading: false,
            loading: true,
            error: false,
            games: null,
        }
    },
    methods: {
        async mountedMethod(retrying) {
            axios
                .get(AuthService.getApiUrl() + 'games/open', AuthService.getAuthHeader())
                .then(response => {
                    console.log(response.data);
                    this.games = response.data.games;
                })
                .catch(async error => {
                    console.log(error);
                    this.error = true;

                    if (error.response.status === 401 && !retrying) {
                        const hasRefreshed = await AuthService.refreshUser();
                        if (hasRefreshed) {
                            await this.mountedMethod(true)
                        }
                    }
                })
                .finally(() => {
                    this.loading = false;
                    this.reloadLoading = false;
                });
        },
        refreshGames() {
            this.error = false;
            this.reloadLoading = true;

            this.mountedMethod();
        }
    },
    mounted() {
        this.mountedMethod();
    },
    created() {
        if (!AuthService.isLoggedIn()) {
            this.$router.push({name: 'login'})
        }
    }
}
</script>
<style scoped>
</style>