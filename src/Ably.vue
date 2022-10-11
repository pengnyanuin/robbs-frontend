<template>
    <div class="container">
        <h1>
            aaaaaaaa
        </h1>
        <div style="border: 1px solid black; height: 500px; width: 800px; overflow: auto" class="mb-5" ref="chat">
            <p v-for="(message, i) in chat" :key="i">
                <b>{{ message.name }}: </b>
                <span>{{ message.content }}</span>
            </p>
        </div>
        <div style="width: 500px" class="d-flex flex-column">
            <input type="text" v-model="name" class="mb-2">
            <textarea rows="4" class="mb-4" v-model="message" ref="textarea"></textarea>
            <a href="#" class="btn" @click.prevent="sendMessage()">Send</a>
        </div>
    </div>
</template>
<script>

import { nextTick } from 'vue';
import {AblyService} from "@/services/ably.service";
// import * as Ably from 'ably';

export default {
    name: "AblyApp",
    data() {
        return {
            AblyClass: null,
            name: '',
            message: '',
            chat: [],
            connected: null,
        }
    },
    methods: {
        async sendMessage() {
            this.AblyClass.sendMessage(this.name, this.message);
            this.message = '';
        },
        handleMessageFromAbly(message) {
            this.chat = [
                ...this.chat,
                {
                    name: message.name,
                    content: message.data
                }
            ];

            this.$refs.textarea.focus();
            nextTick(() => {
                this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
            });
        }
    },
    mounted() {
        this.AblyClass = new AblyService(220, this.handleMessageFromAbly);
        this.connected = this.AblyClass.connect();
    }
}
</script>