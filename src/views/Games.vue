<template>
    <div>
        <div class="loader" v-if="gamesLoading"></div>
        <div class="notice" v-else-if="gamesError"> Error :c</div>
        <div v-else>
            <div class="mt-3" v-if="games.myGames || games.myTurnGames">
                <h2>My</h2>
                <div v-for="(myTurnGame, i) in games.myTurnGames" :key="i" class="mb-2">
                    <router-link :to="{ name: 'game', params: {id: myTurnGame.id} }" class="btn">
                        <span>Go to game {{ myTurnGame.title }}</span>
                    </router-link>
                    &nbsp;<span v-if="myTurnGame.myTurn">!!! your turn !!!</span>
                </div>
                <div v-for="(myGame, i) in games.myGames" :key="i" class="mb-2">
                    <router-link :to="{ name: 'game', params: {id: myGame.id} }" class="btn">
                        <span>Go to game {{ myGame.title }}</span>
                    </router-link>
                    &nbsp;<span v-if="myGame.myTurn">!!! your turn !!!</span>
                </div>
            </div>
            <div class="mt-3" v-if="games.canJoin">
                <h2>Open</h2>
                <div v-for="(myGame, i) in games.canJoin" :key="i" class="mb-2">
                    <router-link :to="{ name: 'game', params: {id: myGame.id} }" class="btn">
                        <span>Go to game {{ myGame.title }}</span>
                    </router-link>
                </div>
            </div>
            <div class="mt-3" v-if="games.endedGames">
                <h2>Ended</h2>
                <div v-for="(myGame, i) in games.endedGames" :key="i" class="mb-2">
                    <router-link :to="{ name: 'game', params: {id: myGame.id} }" class="btn">
                        <span>{{ myGame.title }} - {{ myGame.winner ? 'WON' : 'LOST' }}</span>
                    </router-link>
                </div>
            </div>
        </div>

        <hr class="mt-5 mb-5" />

        <div class="d-flex gap-3">
            <router-link :to="{ name: 'new_game'}" class="btn btn--danger">
                <span>New game</span>
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
import axios from 'axios'
import AuthService from "@/services/auth.service";

export default {
    name: "games",
    data() {
        return {
            games: null,
            gamesLoading: true,
            gamesError: false,
        }
    },
    mounted() {
        axios
            .get(AuthService.getApiUrl() + 'games', AuthService.getAuthHeader())
            .then(response => {
                console.log(response.data);
                this.games = response.data;
            })
            .catch(error => {
                console.log(error);
                this.gamesError = true;

                if (error.response.status === 401) {
                    // Unauthorized
                }
            })
            .finally(() => {
                this.gamesLoading = false;
            });
    }
}
</script>
<style scoped>
</style>