<template>
    <div>
        <h1>LOGIN</h1>
        <div class="loader" v-if="loading"></div>
        <div v-else>
            <div v-if="hasToken">
                <router-link :to="{ name: 'welcome'}" class="btn">
                    <span>Continue as {{ name }}</span>
                </router-link>
                <div class="mt-3">
                    Not you? <a href="#" @click.prevent="logout">Logout</a>
                </div>
            </div>
            <div v-else>
                <form @submit.prevent="login">
                    <p>
                        <input v-model="username" placeholder="username"/>
                    </p>
                    <p>
                        <input v-model="password" placeholder="password" type="password"/>
                    </p>
                    <button type="submit" class="btn">Login</button>
                    <div class="loader" v-if="loadingForm"></div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>

import AuthService from "@/services/auth.service";
import axios from "axios";

export default {
    name: "login",
    data: () => {
        return {
            loading: true,
            loadingForm: false,
            hasToken: false,
            username: "",
            password: "",
            name: "",
        };
    },
    methods: {
        async login() {
            this.loadingForm = true;
            const user = {
                username: this.username,
                password: this.password
            }

            const data = await AuthService.login(user);
            console.log(data);
            if (data && Object.hasOwn(data, 'token') && Object.hasOwn(data, 'refresh_token')) {
                // Successful login
                this.$router.push({name: 'welcome'})
            }

            // Error on login
            this.loadingForm = false;
        },
        logout() {
            AuthService.logout();
            this.$router.go({name: 'login'});
        },
        async axiosPlayerData(retrying) {
            axios
                .get(AuthService.getApiUrl() + 'player/data', AuthService.getAuthHeader())
                .then(response => {
                    console.log(response.data);
                    this.name = response.data.name;
                })
                .catch(async (error) => {
                    console.log(error);

                    if (error.response.status === 401 && !retrying) {
                        const hasRefreshed = await AuthService.refreshUser();
                        if (hasRefreshed) {
                            await this.axiosPlayerData(true)
                        }
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
    created() {
        const tokens = AuthService.getTokens();
        console.log(tokens);

        if (tokens && Object.hasOwn(tokens, 'token') && Object.hasOwn(tokens, 'refresh_token')) {
            this.hasToken = true;

            this.axiosPlayerData(false);

            return;
        }

        this.loading = false;
    }
};
</script>