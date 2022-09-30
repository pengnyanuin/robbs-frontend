<template>
    <div>
        <h1>WELCOME</h1>

        <div class="d-flex gap-3">
            <router-link :to="{ name: 'new_map'}" class="btn btn--danger">
                <span>New map</span>
            </router-link>
        </div>
    </div>
</template>
<script>
import AuthService from "@/services/auth.service";

export default {
    created() {
        if (!AuthService.isLoggedIn()) {
            this.$router.push({name: 'login'})
        }
    }
};
</script>