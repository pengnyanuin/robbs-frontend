import axios from 'axios';
import authHeader from './auth-header';
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const COOKIE_TOKEN = 'token';
const COOKIE_REFRESH_TOKEN = 'refresh_token';

const API_URL = 'http://127.0.0.1:8000/api/';
// const API_URL = 'https://robbs.alwaysdata.net/api/';

class AuthService {
    async login(user) {
        return axios
            .post(API_URL + 'login_check', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data && Object.hasOwn(response.data, 'token') && Object.hasOwn(response.data, 'refresh_token')) {
                    const tokensSaved = this.setTokens(response);
                    return response.data;
                }

                return response;
            });
    }

    logout() {
        // localStorage.removeItem('user');
        cookies.remove(COOKIE_TOKEN);
        cookies.remove(COOKIE_REFRESH_TOKEN);
    }

    isLoggedIn() {
        const tokens = this.getTokens();
        return !!(tokens && tokens.token && tokens.refresh_token);
    }

    async checkUser($this, returns) {
        const tokens = this.getTokens();

        if (tokens && tokens[COOKIE_TOKEN]) {
            return true;
        }

        if (tokens && tokens[COOKIE_REFRESH_TOKEN]) {
            const refreshed = await this.refreshUser()
            if (refreshed) {
                return true;
            }

            if (returns) {
                return false;
            }
            $this.$router.push({name: 'login'});
        }

        if (returns) {
            return false;
        }
        $this.$router.push({name: 'login'});
    }

    refreshUser() {
        return axios
            .post(API_URL + 'token/refresh', {
                refresh_token: this.getTokens().refresh_token,
            })
            .then(response => {
                const tokensSaved = this.setTokens(response);
                // return response.data;
                return true;
            })
            .catch(error => {
                console.log(error);
                // todo catch error expired refresh token
                return false;
            });
    }

    getAuthHeader() {
        const tokens = this.getTokens();
        if (tokens && tokens[COOKIE_TOKEN]) {
            return {
                headers: authHeader(tokens[COOKIE_TOKEN])
            }
        }

        this.logout();
        return false;
    }

    getApiUrl() {
        return API_URL;
    }

    getTokens() {
        // return JSON.parse(localStorage.getItem('user'));
        const token = cookies.get(COOKIE_TOKEN);
        const refreshToken = cookies.get(COOKIE_REFRESH_TOKEN);

        if(token || refreshToken) {
            return {
                [COOKIE_TOKEN]: token,
                [COOKIE_REFRESH_TOKEN]: refreshToken
            }
        }

        return null;
    }

    setTokens(response) {
        if (response.data.token && response.data.refresh_token) {
            // localStorage.setItem('user', JSON.stringify(response.data));
            // let d = new Date();
            // let dr = new Date();
            // d.setTime(d.getTime() + 60 * 60 * 1000); // 1 hour
            // dr.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

            cookies.set(COOKIE_TOKEN, response.data.token, '59min') // 1 hour
            cookies.set(COOKIE_REFRESH_TOKEN, response.data.refresh_token, '29d') // 30 days

            return true;
        }

        return false;
    }

    // register(user) {
    //     return axios.post(API_URL + 'signup', {
    //         username: user.username,
    //         email: user.email,
    //         password: user.password
    //     });
    // }
}

export default new AuthService();
