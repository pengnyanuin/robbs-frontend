<template>
    <div class="main-header">
        <h1 class="main-title">Active</h1>
        <a href="#" @click.prevent="refreshGames" class="btn-reload"
           :class="{'disabled': loading, 'loading': reloadLoading}"><img src="@/assets/images/refresh.svg"
                                                                         alt="refresh"/></a>
    </div>
    <div class="main-inner">
        <Loader v-if="loading || reloadLoading"/>
        <div class="notice" v-if="error"> Error :c</div>
        <div v-if="!loading && !error">
            <div v-if="games.myGames || games.myTurnGames">
                <h2>My turn</h2>
                <router-link :to="{ name: 'game', params: {id: myTurnGame.id} }"
                             v-for="(myTurnGame, i) in games.myTurnGames" :key="i" class="game__button">
                    <span class="game__button__title">{{ myTurnGame.title }}</span>
                    <img class="game__button__my-turn" v-if="myTurnGame.myTurn" src="@/assets/images/dice.svg"
                         alt="Dice"/>
                </router-link>
                <h2>Waiting</h2>
                <router-link :to="{ name: 'game', params: {id: myGame.id} }"
                             v-for="(myGame, i) in games.myGames" :key="i" class="game__button">
                    <span class="game__button__title">{{ myGame.title }}</span>
                    <img class="game__button__my-turn" v-if="myGame.myTurn" src="@/assets/images/dice.svg"
                         alt="Dice"/>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AuthService from "@/services/auth.service";
import Loader from "@/views/components/Loader.vue";

export default {
    name: "games",
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
        mountedMethod() {
            axios
                .get(AuthService.getApiUrl() + 'games', AuthService.getAuthHeader())
                .then(response => {
                    console.log(response.data);
                    this.games = response.data.games;
                })
                .catch(error => {
                    console.log(error);
                    this.error = true;

                    if (error.response.status === 401) {
                        // Unauthorized
                        // TODO axios retry
                    }
                })
                .finally(() => {
                    this.loading = false;
                    this.reloadLoading = false;
                });
        },
        refreshGames() {
            // this.games = null;
            // this.loading = true;
            this.error = false;
            this.reloadLoading = true;

            this.mountedMethod();
        }
    },
    mounted() {
        this.mountedMethod();
    }
}
</script>
<style scoped>
</style>