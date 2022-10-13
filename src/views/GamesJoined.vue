<template>
    <div class="secondary-menu">
    </div>
    <div class="main-header">
        <h1 class="main-title">Open - joined</h1>
        <a href="#" @click.prevent="refreshGames" class="btn-reload"
           :class="{'disabled': loading, 'loading': reloadLoading}"><img src="@/assets/images/refresh.svg"
                                                                         alt="refresh"/></a>
        <router-link :to="{ name: 'new_game'}" class="btn btn--danger">
            <span>New game</span>
        </router-link>
    </div>
    <div class="main-inner">
        <Loader v-if="loading || reloadLoading || loadingMore"/>
        <div class="notice" v-if="error"> Error :c</div>
        <div v-if="!loading && !error">
            <div v-if="games && games.length">
                <router-link :to="{ name: 'game', params: {id: game.id} }" v-for="(game, i) in games" :key="i"
                             class="game__button">
                    <span class="game__button__title">{{ game.title }}</span>
                    <!--                    <span class="game__button__created-by">Made by: {{ game.created_by.name }}</span>-->
                </router-link>
                <a href="#" @click.prevent="loadMore" class="btn mt-5" v-if="maxGames > games.length">More</a>
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
            loadingMore: false,
            error: false,
            games: [],
            page: 1,
            maxGames: 0,
        }
    },
    methods: {
        async mountedMethod() {
            const checked = await AuthService.checkUser(this, false);
            if (checked) {
                await axios
                    .get(AuthService.getApiUrl() + 'games/joined/' + this.page, AuthService.getAuthHeader())
                    .then(response => {
                        console.log(response.data);
                        if (response.data.games) {
                            this.games.push(...response.data.games);
                        }
                        this.maxGames = response.data.numberOfPosts;
                    })
                    .catch(async error => {
                        console.log(error);
                        this.error = true;

                    })
                    .finally(() => {
                        this.loading = false;
                        this.reloadLoading = false;
                        this.loadingMore = false;
                    });

            }
            return true;
        },
        loadMore() {
            this.page++;
            this.loadingMore = true;
            this.mountedMethod()
        },
        refreshGames() {
            this.page = 1;
            this.games = [];
            this.error = false;
            this.reloadLoading = true;

            this.mountedMethod();
        }
    },
    mounted() {
        this.mountedMethod();
    },
    created() {
        AuthService.checkUser(this, false);
    }
}
</script>
<style scoped>
</style>