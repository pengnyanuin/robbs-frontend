<template>
    <div class="robb" :class="['rot-' + position.rot, {'current': currentPlayer}]"
         :style="{position: 'absolute', top: position.top + 'px', left: position.left + 'px'}" ref="thisRob">
        <div v-if="robbBubbles.length > 0" class="robb__bubble">{{ robbBubbles }}</div>
        {{ currentPlayer ? 'me' : id }}
    </div>
</template>
<script>

export default {
    name: "robb",
    props: {
        id: Number,
        playerPosition: Array,
        currentPlayer: Boolean,
        robbBubbles: Array,
    },
    watch: {
        playerPosition: {
            deep: true,
            handler: function (newPosition) {
                this.position.left = 5 + (newPosition[1] - 1) * 50;
                this.position.top = 20 + (newPosition[0] - 1) * 50;
                this.position.rot = newPosition[2] + 1;
            }
        }
    },
    data() {
        return {
            position: {
                top: 20,
                left: 5,
                rot: 0,
            }
        }
    },
    methods: {
        rotationClass() {
            return 'rot-' + this.position.rot;
        }
    },
    mounted() {
        this.position.left += (this.playerPosition[1] - 1) * 50;
        this.position.top += (this.playerPosition[0] - 1) * 50;
        this.position.rot = this.playerPosition[2] + 1;
    }
}
</script>
