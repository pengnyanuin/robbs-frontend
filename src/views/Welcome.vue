<template>
    <div>
        <h1>WELCOME</h1>
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