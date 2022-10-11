<template>
    <div class="main-header">
        <h1 class="main-title">Actions</h1>
        <a class="btn" :class="{'disabled': !unlockNewActive}" href="#" @click.prevent="unlockNewAction()" >{{ unlockNewActive ? unlockNewText : unlockNewTextLoading }}</a>
    </div>
    <div class="main-inner">
        <Loader v-if="actionsLoading"/>

        <hr class="m-5 mb-5"/>

        <div class="loader" v-if="actionsLoading"></div>
        <div v-else>
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
import AuthService from "@/services/auth.service";
import Loader from "@/views/components/Loader.vue";

export default {
    name: "actions",
    components: {
        Loader
    },
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
                .get(AuthService.getApiUrl() + 'actions/unlock', AuthService.getAuthHeader())
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
            .get(AuthService.getApiUrl() + 'actions', AuthService.getAuthHeader())
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
