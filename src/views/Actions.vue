<template>
    <div>
        <div>
            <a class="btn" :class="{'disabled': !unlockNewActive}" href="#" @click.prevent="unlockNewAction()" >{{ unlockNewActive ? unlockNewText : unlockNewTextLoading }}</a>
        </div>

        <hr class="m-5 mb-5"/>

        <div class="loader" v-if="actionsLoading"></div>
        <div v-else>
            <h2>Actions</h2>
            <div class="action__wrap" v-if="actions.length">
                <div class="action" v-for="(action, i) in actions" :key="i">
                    <div>Speed: {{ action.speed }}</div>
                    <div v-if="action.distance !== 0">Distance: {{ action.distance }}</div>
                    <div v-if="action.turn !== 0">Turn: {{ action.turn }}</div>
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
    name: "actions",
    data() {
        return {
            actions: null,
            actionsLoading: true,
            actionsError: false,

            unlockNewText: 'New one',
            unlockNewTextLoading: 'Getting...',
            unlockNewActive: true,
        }
    },
    methods: {
        unlockNewAction() {
            this.unlockNewActive = false;

            axios
                .get('http://127.0.0.1:8000/actions/unlock')
                .then(response => {
                    console.log(response.data);

                    if (response.data) {
                        this.actions.push(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    this.unlockNewActive = true;
                });
        }
    },
    mounted() {
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
    }
}
</script>
