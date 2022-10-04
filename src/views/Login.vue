<template>
    <div>
        <h1>LOGIN</h1>
        <div class="loader" v-if="loading"></div>
        <div v-else>
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
                        <div class="loader" v-if="loadingLoginForm"></div>
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
                        <div class="loader" v-if="loadingRegisterForm"></div>
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

export default {
    name: "login",
    data: () => {
        return {
            loading: true,
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
                this.axiosPlayerData(false);
                this.$router.push({name: 'home'})
            }

            // Error on login
            this.loadingLoginForm = false;
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