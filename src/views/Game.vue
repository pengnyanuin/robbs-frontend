<template>
    <div class="main-header">
        <h1 class="main-title">{{ gameLoading ? 'Loading game...' : game.title }}<template v-if="!gameLoading"> - Round {{ displayEndOfGame ? game.roundNumber - 1 : game.roundNumber }}</template></h1>
    </div>
    <div class="main-inner">
        <div class="loader" v-if="gameLoading"></div>
        <template v-else>
            <div>
                <div v-if="!gameRunning && game.canJoin">
                    <a class="btn btn--danger" href="#" @click.prevent="joinGame()">Join!</a>
                </div>

                <div v-if="displayEndOfGame" class="end-screen" :class="{'end-screen--winner': isWinner}">
                    <span class="end-screen__result">{{ isWinner ? 'Victory' : 'Defeat' }}</span>
                    <p>Game has ended</p>
                    <p>Game took {{ endOfGameData.length }} rounds</p>
                </div>

                <div class="mt-3" v-if="gameRunning">
                    <span v-if="cardsCanSend">It's your turn!</span>
                    <span v-else>Waiting for the opponent...</span>
                </div>
                <a class="btn btn--danger" href="#" v-if="(gameRunning || displayEndOfGame) && game.roundNumber > 1"
                   @click.prevent="getRoundData()">{{ buttonLoading ? buttonTextLoading : buttonText }}</a>

                <div class="map mt-5" v-if="gameRunning || displayEndOfGame">
                    <Robb v-for="(player, playerIndex) in game.players" :key="playerIndex" :id="player.id"
                          v-if="gameRunning || displayEndOfGame" :class="robbClasses[player.id]"
                          :playerPosition="game.playerPositions[game.roundNumber][player.id]"
                          :currentPlayer="player.id === game.myId" :movement="roundMovementData"/>
                    <MapObject v-for="(mapObject, mapObjectIndex) in game.mapObjects" :key="mapObjectIndex"
                               v-if="gameRunning || displayEndOfGame"
                               :objectPosition="game.objectPositions[game.roundNumber][mapObject.id]"/>

                    <div v-for="(row, rowKey, rowIndex) in game.map" :key="rowIndex" class="map__row">
                        <div v-for="(column, colKey, colIndex) in row" :key="colIndex" class="map__field"
                             :class="{ 'wall' : column !== 1 }">
                            <div class="crown"
                                 v-if="game.objective[1][0] === parseInt(rowKey) && game.objective[1][1] === parseInt(colKey)"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-2" v-if="gameRunning">
                <template v-if="roundMovementData">
                    <div v-for="(move, i) in roundMovementData" :key="i">
                        <div>
                            <b>{{ move.player_name }}: </b>
                            <span v-for="(step, y) in move.movement" :key="y">
                                    <span>X:{{ step[0] }}, Y:{{ step[1] }}, Rot: {{ step[2] }}<span
                                        v-if="y !== move.movement.length - 1"> | </span></span>
                                </span>
                        </div>
                    </div>
                </template>
            </div>
            <div class="mt-5" v-if="cardsCanSend && gameRunning">
                <div class="action-board mb-3">
                    <div class="action-board__tile" v-for="(tile, i) in actionsToSend" :key="i">
                        <span>{{ i }}</span>
                        <div class="action-board__tile__selected">
                            {{ tile }}
                        </div>
                    </div>
                </div>

                <div class="action__wrap">
                    <a href="#" class="action" v-for="(action, i) in actionBoard" @click.prevent="selectAction(i)"
                       :key="i" :class="{ 'selected' : action.selected }">
                        <div v-if="action.selected" class="d-flex justify-content-between"><span>{{
                                action.selected
                            }}</span><span>{{ i }}</span></div>
                        <div>Speed: {{ action.speed }}</div>
                        <div v-if="action.distance !== 0">Distance: {{ action.distance }}</div>
                        <div v-if="action.turn !== 0">Turn: {{ action.turn }}</div>
                    </a>
                </div>
                <a v-if="cardsCanSend" href="#" class="btn" @click.prevent="sendCards()">Send the cards</a>
                <div>
                    <a href="#" class="btn" @click.prevent="consoleTest()">Test</a>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import axios from 'axios';
import Robb from './components/Robb.vue';
import MapObject from './components/MapObject.vue';
import AuthService from "@/services/auth.service";

export default {
    name: "game",
    props: {
        id: Number
    },
    components: {
        Robb,
        MapObject,
    },
    data() {
        return {
            buttonText: 'Play the turn',
            buttonTextLoading: 'Getting turn data...',
            buttonLoading: false,
            roundMovementData: null,
            originalPositions: null,
            originalObjectPositions: null,
            game: null,
            gameLoading: true,
            gameError: false,
            playTimeout: [],
            cardsCanSend: false,
            gameRunning: false,
            displayEndOfGame: false,
            endOfGameData: null,
            isWinner: false,
            robbClasses: {},

            // Actions
            actionsSelected: 0,
            actionBoard: null,
            actionsToSend: {
                1: null,
                2: null,
                3: null,
                4: null,
                5: null
            }
        }
    },
    methods: {
        consoleTest() {
            console.log(this.actionsToSend);
        },
        getRoundData() {
            if (!this.roundMovementData) {
                this.buttonLoading = true;
                axios
                    .get(AuthService.getApiUrl() + 'game/' + this.$route.params.id + '/process', AuthService.getAuthHeader())
                    .then(response => {
                        console.log(response.data);
                        this.roundMovementData = response.data;
                        this.buttonText = 'Replay the turn'
                        this.playRound();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.buttonLoading = false;
                    });
            } else {
                this.game.playerPositions[this.game.roundNumber] = JSON.parse(JSON.stringify(this.originalPositions));
                this.game.objectPositions[this.game.roundNumber] = JSON.parse(JSON.stringify(this.originalObjectPositions));
                console.log(this.game.playerPositions[this.game.roundNumber]);
                this.playTimeout.forEach((timer) => clearTimeout(timer));
                this.playTimeout = [];
                this.playRound();
            }

        },
        playRound() {
            let animationIndex = 1;
            this.game.playerPositions[this.game.roundNumber] = this.game.playerPositions[this.game.roundNumber - 1];
            this.game.objectPositions[this.game.roundNumber] = this.game.objectPositions[this.game.roundNumber - 1];
            this.roundMovementData.forEach((el) => {

                el.movement.forEach((step) => {
                    console.log(step);
                    if (Object.hasOwn(step, 'player_id')) {
                        const player = step.player_id;
                        this.playTimeout.push(setTimeout(() => {
                            if (step.new_position) {
                                this.game.playerPositions[this.game.roundNumber][player] = step.new_position;
                                console.log(this.game.playerPositions[this.game.roundNumber][player]);
                            } else {
                                this.robbClasses[step.player_id] = this.robbClasses[step.player_id] + ' shake-anim';
                                setTimeout(() => this.robbClasses[step.player_id] = this.robbClasses[step.player_id].replace("shake-anim", ""), 200);
                                console.log('STAAAAY');
                            }
                        }, animationIndex * 500))
                    } else if (Object.hasOwn(step, 'object_id')) {
                        const mapObject = step.object_id;
                        this.playTimeout.push(setTimeout(() => {
                            if (step.new_position) {
                                this.game.objectPositions[this.game.roundNumber][mapObject] = step.new_position;
                                console.log(this.game.objectPositions[this.game.roundNumber][mapObject]);
                            } else {
                                console.log('STAAAAY');
                            }
                        }, animationIndex * 500))
                    }

                    if (!step.follow_up) {
                        animationIndex++;
                    }
                })
            })
        },
        sendCards() {
            if (this.actionsSelected < 5) {
                console.log('not enough actions selected');
                return;
            }

            let playerActions = [];
            Object.keys(this.actionsToSend).forEach((key) => {
                playerActions.push(this.actionBoard[this.actionsToSend[key]].id);
            });

            axios
                .post(AuthService.getApiUrl() + 'game/' + this.$route.params.id + '/play', {"moves": playerActions}, AuthService.getAuthHeader())
                .then(response => {
                    console.log(response.data);
                    this.$router.push({path: '/games'});
                })
                .catch(function (error) {
                    console.log(error);
                    this.gameError = true;
                })
                .finally(() => {
                    console.log('cards sent maybe')
                });
        },
        selectAction(index) {
            // If action is currently selected
            if (Object.hasOwn(this.actionBoard[index], 'selected') && this.actionBoard[index].selected !== null) {
                const actionIndex = this.actionBoard[index].selected;
                this.actionsSelected--;
                this.actionBoard[index].selected = null;
                this.actionsToSend[actionIndex] = null;

                // todo reorder

                return;
            }

            if (this.actionsSelected >= 5) {
                console.log('Action field is full');
                return;
            }

            // Save index of action selected
            this.actionsSelected++;
            this.actionBoard[index].selected = this.actionsSelected;
            this.actionsToSend[this.actionsSelected] = index;
        },
        joinGame() {
            this.gameLoading = true;
            axios
                .get(AuthService.getApiUrl() + 'game/' + this.$route.params.id + '/join', AuthService.getAuthHeader())
                .then(response => {
                    console.log(response.data);

                    this.mountedMethod();
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        mountedMethod() {
            axios
                .get(AuthService.getApiUrl() + 'game/' + this.$route.params.id, AuthService.getAuthHeader())
                .then(response => {
                    // console.log(response.data);
                    this.game = response.data;

                    if (response.data.status === 2) {
                        this.originalPositions = JSON.parse(JSON.stringify(response.data.playerPositions[response.data.roundNumber]));
                        if (response.data.objectPositions.length > 0) {
                            this.originalObjectPositions = JSON.parse(JSON.stringify(response.data.objectPositions[response.data.roundNumber]));
                        }
                        this.cardsCanSend = response.data.myTurn;
                        this.actionBoard = JSON.parse(JSON.stringify(response.data.playerCards));
                        this.gameRunning = true;

                        // prepare empty classes for all robbs to be adjustable later
                        Object.entries(this.game.players).forEach(([playerNum, player]) => {
                            this.robbClasses[player.id] = '';
                        });
                        console.log(this.game);
                        return;
                    }

                    if (response.data.status === 3) {
                        this.originalPositions = JSON.parse(JSON.stringify(response.data.playerPositions[response.data.roundNumber]));
                        if (response.data.objectPositions.length > 0) {
                            this.originalObjectPositions = JSON.parse(JSON.stringify(response.data.objectPositions[response.data.roundNumber]));
                        }
                        this.displayEndOfGame = true;
                        const winnerId = response.data.winner;

                        this.endOfGameData = {
                            'winner': response.data.players[winnerId],
                            'length': response.data.roundNumber - 1,
                        }

                        if (this.endOfGameData.winner.id === response.data.myId) {
                            this.isWinner = true;
                        }
                    }

                    this.gameRunning = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.gameError = true;
                })
                .finally(() => {
                    this.gameLoading = false;
                });
        }
    },
    mounted() {
        this.mountedMethod();
    }
}
</script>
