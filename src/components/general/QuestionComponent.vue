<template>
    <div class="d-flex flex-column">
        <div class="question-mark" :class="`question-mark-${label}`" @click="displayContent()"><IconQuestion color="f0f0f0" /></div>
        <div class="question-mark-content" :class="`question-mark-content-${label}`">
            <button class="question-mark-content-close" @click="closeContent()"> &times; </button>
            {{content}}
        </div>
    </div>
</template>
<script>
import IconQuestion from "../icons/IconQuestion.vue";

export default {
    components: {IconQuestion},
    props: {
        label: String,
        content: String
    },
    methods: {
        displayContent() {
            document.getElementsByClassName(`question-mark-content-${this.label}`)[0].classList.add('d-flex');
        },
        closeContent() {
            document.getElementsByClassName(`question-mark-content-${this.label}`)[0].classList.remove('d-flex');
        }
    }
}
</script>
<style lang="scss">
    .question-mark {
        border-radius: 50%;
        background: color('light-20');
        // padding: spacers("sm");
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &-content {
            border: 1px solid color("primary");
            background: color("dark-40");
            padding: spacers("sm");
            position: absolute;
            backdrop-filter: blur(8px);
            z-index: 15;
            display: none;
            flex-direction: column;
            left: 15px;
            right: 15px;
            top: 15px;

            &-close {
                align-self: flex-end;
                border: none;
                background: none;
                color: color("light");
            }
        }
    }
</style>