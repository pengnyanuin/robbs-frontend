<template>
    <div class="main-header">
        <h1 class="main-title">Login</h1>
    </div>
    <div class="main-inner">
        <Loader v-if="loading || loadingLoginForm || loadingRegisterForm"/>
        <div v-if="!loading">
            <div v-if="hasToken">
                <router-link :to="{ name: 'home'}" class="btn">
                    <span>Continue as {{ name }}</span>
                </router-link>
                <div class="mt-3">
                    Not you? <a href="#" @click.prevent="logout">Logout</a>
                </div>
            </div>
            <div v-else-if="!registered" class="row">
                <div class="col-md-6">
                    <form @submit.prevent="login">
                        <p>
                            <input v-model="loginData.username" placeholder="username"/>
                        </p>
                        <p>
                            <input v-model="loginData.password" placeholder="password" type="password"/>
                        </p>
                        <button type="submit" class="btn">Login</button>
                    </form>
                </div>
                <div class="col-md-6">
                    <form @submit.prevent="register">
                        <p>
                            <input v-model="registerData.username" placeholder="username" minlength="4"/>
                        </p>
                        <p>
                            <input v-model="registerData.password" placeholder="password" type="password"
                                   minlength="4"/>
                        </p>
                        <p>
                            <input v-model="registerData.confirmPassword" placeholder="confirm password" type="password"
                                   minlength="4"/>
                        </p>
                        <div class="color-danger" v-if="registerErrors">
                            <div v-for="(error, i) in registerErrors" :key="i">{{ error.message }}</div>
                        </div>
                        <button type="submit" class="btn">Register</button>
                    </form>
                </div>
            </div>
            <div v-else class="d-flex gap-3 flex-column justify-content-center align-items-center"
                 style="padding: 200px">
                <input v-model="registeredPlayerName" style="font-size: 30px"/>
                <a href="#" class="btn btn--danger" @click.prevent="registerPlayerName">Confirm name & login</a>
            </div>
        </div>
    </div>
</template>
<script>

import AuthService from "@/services/auth.service";
import axios from "axios";
import Loader from "@/views/components/Loader.vue";
import {nextTick} from "vue";

export default {
    name: "login",
    components: {
        Loader
    },
    data: () => {
        return {
            loading: false,
            loadingLoginForm: false,
            loadingRegisterForm: false,
            hasToken: false,
            name: "",
            registerErrors: [],
            registered: false,
            registeredPlayerName: '',
            loginData: {
                username: "",
                password: ""
            },
            registerData: {
                username: "",
                password: "",
                confirmPassword: ""
            },
        };
    },
    methods: {
        register() {
            this.loadingRegisterForm = true;
            this.registerErrors = [];
            const user = {
                username: this.registerData.username,
                password: this.registerData.password,
                confirmPassword: this.registerData.confirmPassword
            }

            axios
                .post(AuthService.getApiUrl() + 'register', user)
                .then(response => {
                    console.log(response.data);
                    const errors = response.data.errors;
                    if (errors) {
                        errors.forEach((el) => {
                            this.registerErrors.push(el);
                        })

                        return;
                    }
                    console.log('successfully registered');
                    this.registered = true;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.loadingRegisterForm = false;
                });

        },
        registerPlayerName() {
            const user = {
                username: this.registerData.username,
                password: this.registerData.password,
                playerName: this.registeredPlayerName,
            }

            axios
                .post(AuthService.getApiUrl() + 'register_name', user)
                .then(response => {
                    console.log(response.data);

                    this.loginData.username = this.registerData.username;
                    this.loginData.password = this.registerData.password;
                    this.login();
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        async login() {
            this.loadingLoginForm = true;
            const user = {
                username: this.loginData.username,
                password: this.loginData.password
            }

            const data = await AuthService.login(user);
            console.log(data);
            if (data && Object.hasOwn(data, 'token') && Object.hasOwn(data, 'refresh_token')) {
                // Successful login
                this.hasToken = true;
                await this.axiosPlayerData();
                this.$router.push({name: 'home'}); // todo fix, doesnt work, only refreshes the same page
            }

            // Error on login
            this.loadingLoginForm = false;
        },
        logout() {
            AuthService.logout();
            this.$router.go({name: 'login'});
        },
        axiosPlayerData() {
            axios
                .get(AuthService.getApiUrl() + 'player/data', AuthService.getAuthHeader())
                .then(response => {
                    console.log(response.data);
                    this.name = response.data.name;
                })
                .catch(async (error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
    async created() {
        // const tokens = AuthService.getTokens();

        // if (tokens && Object.hasOwn(tokens, 'token') && Object.hasOwn(tokens, 'refresh_token')) {
        //     this.hasToken = true;
        //
        //     this.axiosPlayerData(false);
        //
        //     return;
        // }

        const checked = await AuthService.checkUser(this, true);
        if (checked) {
            this.axiosPlayerData();
            this.hasToken = true;
        }
        this.loading = false;
    }
};
</script>