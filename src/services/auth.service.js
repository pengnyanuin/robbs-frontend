import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api/';

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
        localStorage.removeItem('user');
    }

    refreshUser() {
        return axios
            .post(API_URL + 'token/refresh', {
                refresh_token: this.getTokens().refresh_token,
            })
            .then(response => {
                const tokensSaved = this.setTokens(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
                // todo catch error expired refresh token
                return false;
            });
    }

    getAuthHeader() {
        return {
            headers: authHeader()
        }
    }

    getApiUrl() {
        return API_URL;
    }

    getTokens() {
        return JSON.parse(localStorage.getItem('user'));
    }

    setTokens(response) {
        if (response.data.token && response.data.refresh_token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            return true;
        }

        return false;
    }

    isLoggedIn() {
        const tokens = this.getTokens();
        return !!(tokens && tokens.token && tokens.refresh_token);
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