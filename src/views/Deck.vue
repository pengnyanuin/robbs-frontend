<template>
    <div>
        <div class="loader" v-if="deckLoading && !deckError"></div>
        <div class="error" v-else-if="deckError"><p>Error while loading</p></div>
        <div v-else>
            <div class="deck__wrap mb-5">
                <div class="deck w-100">
                    <h2 class="deck__name" v-if="!deckNameEdit" @click="editName()">{{ deck.name }}</h2>
                    <div v-else class="deck__name deck__name--edit"><input ref="nameInput" v-model="deck.name" type="text" @focusout="editNameStop()" /></div>
                    <div class="action__wrap mb-3">
                        <a href="#" class="action" v-for="(action, i) in actions" @click.prevent="selectAction(i)"
                           :key="i" :class="{ 'selected' : actionsSelected.includes(i) }">
                            <div>Speed: {{ action.speed }}</div>
                            <div v-if="action.distance !== 0">Distance: {{ action.distance }}</div>
                            <div v-if="action.turn !== 0">Turn: {{ action.turn }}</div>
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <a class="btn" href="#" @click.prevent="saveDeck()">Save & return</a>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {nextTick} from "vue";
import AuthService from "@/services/auth.service";

export default {
    name: "decks",
    data() {
        return {
            deck: null,
            deckLoading: true,
            deckError: false,
            deckSize: 10,
            deckNameEdit: false,
            actions: null,
            actionsSelected: []
        }
    },
    methods: {
        editName() {
            this.deckNameEdit = true;
            nextTick(() => {
                this.$refs.nameInput.focus();
            })
        },
        editNameStop() {
            this.deckNameEdit = false;
        },
        setupActionsSelected() {
            this.deck.actions.forEach((el) => {
                const actionIndex = this.actions.findIndex((actionEl) => actionEl.id === el.id);
                this.actionsSelected.push(actionIndex);
            })
        },
        selectAction(index) {
            if (this.actionsSelected.includes(index)) {
                this.actionsSelected = this.actionsSelected.filter(e => e !== index);
                console.log(this.actionsSelected);
                return;
            }

            if (this.actionsSelected.length >= this.deckSize) {
                console.log('max reached');
                return;
            }

            this.actionsSelected.push(index);
            console.log(this.actionsSelected);
        },
        saveDeck() {
            if (this.actionsSelected.length < this.deckSize) {
                alert('need at least ' + this.deckSize);
                return;
            }

            if (!this.deck.name) {
                alert('need a name!');
                return;
            }

            let actionIdsToSend = [];
            this.actionsSelected.forEach((el) => {
                actionIdsToSend.push(this.actions[el].id);
            })

            axios
                .post(AuthService.getApiUrl() + 'deck/edit/' + this.$route.params.id, {
                    "name": this.deck.name,
                    "actions": actionIdsToSend,
                }, AuthService.getAuthHeader())
                .then(response => {
                    // console.log(response.data);
                    this.$router.push({ path: '/decks' });
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
            .get(AuthService.getApiUrl() + 'deck/edit/' + this.$route.params.id, AuthService.getAuthHeader())
            .then((response) => {
                console.log(response.data);
                if (response.data.hasOwnProperty('deck') && response.data.deck && response.data.hasOwnProperty('actions') && response.data.actions) {
                    this.deck = response.data.deck;
                    this.actions = response.data.actions;
                    this.setupActionsSelected();
                } else {
                    this.deckError = true;
                }
            })
            .catch((error) => {
                console.log(error);
                this.deckError = true;
            })
            .finally(() => {
                this.deckLoading = false;
            });
    }
}
</script>
