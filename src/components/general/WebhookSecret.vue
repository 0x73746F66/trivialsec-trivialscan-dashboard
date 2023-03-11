<template>
    <div class="">
        <div class="container">
            <div class="d-flex flex-column align-items-center">
                <div class="font-color-light font-base-sb">
                    Keep the following webhook signing secret stored securely,
                    it will only be shown this once.
                </div>
                <div class="margin-top-sm margin-bottom-sm">
                    <span
                        class="bg-dark border-radius-sm padding-sm font-sm-b font-color-primary"
                    >
                        {{ signingSecret }}
                    </span>
                </div>
                <div class="font-color-light font-base-sb">
                    We have sent an email with this signing secret included if
                    you wish to keep a record elsewhere.
                </div>
                <Button
                    type="submit"
                    class="btn border-radius-sm"
                    text="I Understand"
                    @click="confirm"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '@/components/general/Button.vue'
</script>

<script>
export default {
    emits: ['update:showNotice'],
    props: {
        signingSecret: String
    },
    components: [Button],
    methods: {
        confirm() {
            this.$emit('update:showNotice', false)
        }
    }
}
</script>

<style scoped lang="scss">
.webhook-notice {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: color('dark-60');
    z-index: 1000000;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &.inactive {
        display: none;
    }
}
.container {
    width: 50%;
    padding: spacers('xxl');
    background: black;
    @media (min-width: breakpoints('lg')) {
        width: 90%;
        padding: spacers('sm');
    }
}
.btn {
    padding: spacers('xxs') spacers('xl');
    border: 0;
    background-color: color('primary');

    &:hover {
        color: color('secondary');
        background-color: color('primary-80');
    }
}
</style>
