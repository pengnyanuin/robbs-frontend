<template>
    <div class="obstacle obstacle--box" :style="{position: 'absolute', top: position.top + 'px', left: position.left + 'px'}"></div>
</template>
<script>

export default {
    name: "map_object",
    props: {
        objectPosition: Array,
    },
    watch: {
        objectPosition: {
            deep: true,
            handler: function (newPosition) {
                this.position.left = (newPosition[1] - 1) * 50;
                this.position.top = (newPosition[0] - 1) * 50;
                this.position.rot = newPosition[2] + 1;
            }
        }
    },
    data() {
        return {
            position: {
                top: 0,
                left: 0,
                rot: 0,
            }
        }
    },
    methods: {

    },
    mounted() {
        this.position.left += (this.objectPosition[1] - 1) * 50;
        this.position.top += (this.objectPosition[0] - 1) * 50;
        this.position.rot = this.objectPosition[2] + 1;
    }
}
</script>
