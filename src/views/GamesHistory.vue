<template>
    <div class="secondary-menu">
        aaa
    </div>
    <!--        <div class="loader" v-if="gamesLoading"></div>-->
    <!--        <div class="notice" v-else-if="gamesError"> Error :c</div>-->
    <!--        <div v-else>-->
    <!--            <a href="#" @click.prevent="refreshGames" class="btn"><img src="@/assets/images/refresh.svg" alt="refresh"/></a>-->
    <!--            <div class="mt-3" v-if="games.myGames || games.myTurnGames">-->
    <!--                <h2>My</h2>-->
    <!--                <div v-for="(myTurnGame, i) in games.myTurnGames" :key="i" class="mb-2">-->
    <!--                    <router-link :to="{ name: 'game', params: {id: myTurnGame.id} }" class="btn">-->
    <!--                        <span>Go to game {{ myTurnGame.title }}</span>-->
    <!--                    </router-link>-->
    <!--                    &nbsp;<span v-if="myTurnGame.myTurn">!!! your turn !!!</span>-->
    <!--                </div>-->
    <!--                <div v-for="(myGame, i) in games.myGames" :key="i" class="mb-2">-->
    <!--                    <router-link :to="{ name: 'game', params: {id: myGame.id} }" class="btn">-->
    <!--                        <span>Go to game {{ myGame.title }}</span>-->
    <!--                    </router-link>-->
    <!--                    &nbsp;<span v-if="myGame.myTurn">!!! your turn !!!</span>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <div class="mt-3" v-if="games.canJoin">-->
    <!--                <h2>Open</h2>-->
    <!--                <div v-for="(myGame, i) in games.canJoin" :key="i" class="mb-2">-->
    <!--                    <router-link :to="{ name: 'game', params: {id: myGame.id} }" class="btn">-->
    <!--                        <span>Go to game {{ myGame.title }}</span>-->
    <!--                    </router-link>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <div class="mt-3" v-if="games.endedGames">-->
    <!--                <h2>Ended</h2>-->
    <!--                <div v-for="(myGame, i) in games.endedGames" :key="i" class="mb-2">-->
    <!--                    <router-link :to="{ name: 'game', params: {id: myGame.id} }" class="btn">-->
    <!--                        <span>{{ myGame.title }} - {{ myGame.winner ? 'WON' : 'LOST' }}</span>-->
    <!--                    </router-link>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->

    <div class="d-flex gap-3">
        <router-link :to="{ name: 'new_game'}" class="btn btn--danger">
            <span>New game</span>
        </router-link>
    </div>
</template>
<script>
import axios from 'axios'
import AuthService from "@/services/auth.service";

export default {
    name: "games_history",
    data() {
        return {
            // games: null,
            // gamesLoading: true,
            // gamesError: false,
        }
    },
    methods: {
        mountedMethod() {
            // axios
            //     .get(AuthService.getApiUrl() + 'games', AuthService.getAuthHeader())
            //     .then(response => {
            //         console.log(response.data);
            //         this.games = response.data;
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         this.gamesError = true;
            //
            //         if (error.response.status === 401) {
            //             // Unauthorized
            //         }
            //     })
            //     .finally(() => {
            //         this.gamesLoading = false;
            //     });
        },
        refreshGames() {
            this.games = null;
            this.gamesLoading = true;
            this.gamesError = false;

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