<template>
    <div>
        <div class="mb-3">
            <h2>Title: </h2>
            <input v-model="game.title" type="text"/>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="mb-3">
                    <h2>Select a map:</h2>
                    <div class="loader" v-if="mapsLoading"></div>
                    <div class="action__wrap" v-else-if="!mapsError">
                        <a href="#" class="action" v-for="(map, i) in maps" @click.prevent="selectMap(i)"
                           :key="i" :class="{ 'selected' : game.mapSelected === i }">
                            <div>{{ map.title }}</div>
                            <div>{{ map.width }} x {{ map.height }}</div>
                            <div>{{ map.maxPlayers }} players</div>
                        </a>
                    </div>
                    <div class="notice-message error" v-else><p>There was an error while loading available maps.</p>
                    </div>
                </div>

                <div class="mb-3">
                    <h2>Select a deck:</h2>
                    <div class="loader" v-if="decksLoading"></div>
                    <div class="action__wrap mb-3" v-else-if="!decksError">
                        <a href="#" class="action" v-for="(deck, i) in decks" @click.prevent="selectDeck(i)"
                           :key="i" :class="{ 'selected' : game.deckSelected === i }">
                            {{ deck.name }}
                        </a>
                    </div>
                    <div class="notice-message error" v-else><p>There was an error while loading available decks.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="map__preview" v-if="game.mapSelected !== null">
                    <div class="map__preview__view">
                        <div v-for="(row, rowKey, rowIndex) in maps[game.mapSelected].fields" :key="rowIndex"
                             class="map__preview__row">
                            <div v-for="(column, colKey, colIndex) in row" :key="colIndex" class="map__preview__field"
                                 :class="{
                                    'wall-field': column !== 1,
                                    'box-field': maps[game.mapSelected].objectPositionsMap[rowKey][colKey],
                                    'crown-field': maps[game.mapSelected].objectivePosition['1'][0] === parseInt(rowKey) && maps[game.mapSelected].objectivePosition['1'][1] === parseInt(colKey),
                                    'player-field': Object.values(maps[game.mapSelected].startingPositions).filter((el) => el[0] === parseInt(rowKey) && el[1] === parseInt(colKey)).length,
                                 }">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="deck__preview">

                </div>
            </div>
        </div>

        <div>
            <a href="#" @click.prevent="createGame()" class="btn"
               :class="{'disabled': game.mapSelected === null || game.deckSelected === null}">Create</a>
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
            game: {
                'title': '',
                'mapSelected': null,
                'deckSelected': null,
            },

            decks: null,
            decksError: false,
            decksLoading: true,

            maps: null,
            mapsError: false,
            mapsLoading: true,
        }
    },
    methods: {
        selectDeck(index) {
            this.game.deckSelected = index;
        },
        selectMap(index) {
            this.game.mapSelected = index;
        },
        createGame() {
            if (!this.game.title) {
                alert('need a title!');
                return;
            }

            if (this.game.mapSelected === null || this.game.deckSelected === null) {
                alert('Error!');
                return;
            }

            axios
                .post(AuthService.getApiUrl() + 'game/new', {
                    'title': this.game.title,
                    'deck': this.decks[this.game.deckSelected].id,
                    'map': this.maps[this.game.mapSelected].id,
                }, AuthService.getAuthHeader())
                .then(response => {
                    console.log(response.data);
                    this.$router.push({name: 'game', params: {id: response.data.id}})
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    console.log('done')
                });
        }
    },
    mounted() {
        axios
            .get(AuthService.getApiUrl() + 'decks', AuthService.getAuthHeader())
            .then(response => {
                console.log(response.data);
                this.decks = response.data;
            })
            .catch((error) => {
                console.log(error);
                this.decksError = true;
            })
            .finally(() => {
                this.decksLoading = false;
            });

        axios
            .get(AuthService.getApiUrl() + 'maps', AuthService.getAuthHeader())
            .then(response => {
                console.log(response.data);
                this.maps = response.data;
            })
            .catch((error) => {
                console.log(error);
                this.mapsError = true;
            })
            .finally(() => {
                this.mapsLoading = false;
            });
    }

}
</script>