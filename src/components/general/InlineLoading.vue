<template>
    <div class="section-loader" :class="{ inactive: !loading }">
        <template v-for="(_, key) in Array.from({ length: 100 })" :key="key">
            <div class="inline-loading"></div>
        </template>
    </div>
</template>
<script>
export default {
    emits: ['update:loading'],
    props: {
        loading: Boolean
    }
}
</script>
<style scoped lang="scss">
.section-loader {
    position: relative;
    width: 100%;
    height: 100%;

    &.inactive {
        display: none;
    }
}

.inline-loading {
    display: inline-block;
    min-height: 30px;
    width: 1%;
    animation-name: fadeOutIn;
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    @for $i from 1 to 100 {
        &:nth-child(#{$i}) {
            animation-delay: #{$i}0ms;
        }
    }
}

@keyframes fadeOutIn {
    0% {
        background-color: color('primary');
    }

    100% {
        background-color: rgba(0, 146, 255, 0);
    }
}
</style>
