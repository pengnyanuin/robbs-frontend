<template>
    <div>
        <div>
            <a class="btn" :class="{'btn--danger': !createNewDeckActive}" href="#" @click.prevent="createNewDeck()">Create
                new</a>
        </div>

        <div v-if="createNewDeckActive" class="mt-5">
            <div class="mb-3">
                <input v-model="newDeckName" type="text" placeholder="Name the deck..." />
            </div>
            <div class="loader" v-if="actionsLoading"></div>
            <div v-else>
                <div class="action__wrap mb-3">
                    <a href="#" class="action" v-for="(action, i) in actions" @click.prevent="selectAction(i)"
                       :key="i" :class="{ 'selected' : actionsSelected.includes(i) }">
                        <div>Speed: {{ action.speed }}</div>
                        <div v-if="action.distance !== 0">Distance: {{ action.distance }}</div>
                        <div v-if="action.turn !== 0">Turn: {{ action.turn }}</div>
                    </a>
                </div>
                <a class="btn" href="#" @click.prevent="createNewDeckSend()">Create!</a>
            </div>
        </div>

        <hr class="m-5 mb-5"/>

        <div class="loader" v-if="decksLoading"></div>
        <div v-else>
            <h2>Decks</h2>
            <div class="deck__wrap" v-if="decks.length">
                <div class="deck" v-for="(deck, i) in decks" :key="i">
                    <div class="deck__name">{{ deck.name }}</div>
                    <div class="deck__action" v-for="(action, y) in deck.actions" :key="y">{{ action.id }} / speed: {{ action.speed }} - distance: {{ action.distance }} - turn: {{ action.turn }}</div>
                    <div class="deck__button d-flex justify-content-between">
                        <router-link :to="{ name: 'edit_deck', params: {id: deck.id} }" class="btn"><span>Edit</span></router-link>
                        <a href="#" class="btn btn--danger" @click.prevent="deleteDeck(deck)">Delete</a>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Nothing</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: "decks",
    data() {
        return {
            decks: null,
            decksLoading: true,
            decksError: false,
            newDeckName: '',
            deckSize: 10,

            createNewDeckActive: false,

            actions: null,
            actionsLoading: true,
            actionsError: false,
            actionsSelected: []
        }
    },
    methods: {
        createNewDeck() {
            this.createNewDeckActive = !this.createNewDeckActive;

            if (!this.actions) {
                this.loadActions();
            }
        },
        createNewDeckSend() {
            if (this.actionsSelected.length < this.deckSize) {
                alert('need at least ' + this.deckSize);
                return;
            }

            if (!this.newDeckName) {
                alert('need a name!');
                return;
            }

            let actionIdsToSend = [];
            this.actionsSelected.forEach((el) => {
                actionIdsToSend.push(this.actions[el].id);
            })

            axios
                .post('http://127.0.0.1:8000/decks/create', {
                    "name": this.newDeckName,
                    "actions": actionIdsToSend,
                })
                .then(response => {
                    console.log(response.data);
                    this.decks.push(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    console.log('deck created hopefully')
                });
        },
        loadActions() {
            axios
                .get('http://127.0.0.1:8000/actions')
                .then(response => {
                    console.log(response.data);
                    this.actions = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                    this.actionsError = true;
                })
                .finally(() => {
                    this.actionsLoading = false;
                });
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
        deleteDeck(deck) {
            if (confirm('Are you sure?')) {
                console.log('delete');
                axios
                    .get('http://127.0.0.1:8000/deck/delete/' + deck.id)
                    .then(response => {
                        console.log(response);
                        console.log('remove' + deck);
                        this.decks = this.decks.filter(e => e !== deck);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                console.log('back');
            }
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:8000/decks')
            .then(response => {
                console.log(response.data);
                this.decks = response.data;
            })
            .catch(function (error) {
                console.log(error);
                this.decksError = true;
            })
            .finally(() => {
                this.decksLoading = false;
            });
    }
}
</script>
