<template>
    <div class="d-flex justify-content-start align-items-center margin-bottom-sm">
        <div :class="`d-flex question-component question-component-${label}`">
            <div class="question-mark" :class="`question-mark-${label}`" @click="displayContent()"><IconQuestion color="f0f0f0" /></div>
            <div class="d-flex flex-column">
                <button class="question-close" @click="closeContent()"> &times; </button>
                <div class="question-component-content font-sm">
                    {{content}}
                </div>
            </div>
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
            document.getElementsByClassName(`question-component-${this.label}`)[0].classList.add('display');
        },
        closeContent() {
            document.getElementsByClassName(`question-component-${this.label}`)[0].classList.remove('display');
        }
    }
}
</script>
<style lang="scss">
.question-component {
    max-width: 20px;
    max-height: 20px;
    position: relative;
    border-radius: radius('md');
    background: color('dark-20');
    display: flex;
    overflow: hidden;
    transition: all 0.2s linear;
    transition-property: width, height, border-radius;

    &-content {
        opacity: 0;
        transition: 0.5s ease-in;
        transition-delay: 1.2s;
    }

    &.display {
        animation: click 0.3s linear, displayComponent 0.8s forwards;
        animation-delay: 0s, 0.3s;

        .question-mark {
            opacity: 0;
            cursor: default;
        }
        .question-component-content {
            opacity: 1;
        }
    }

    @keyframes click {
        0% {
            transform: scale(1);
        }
        25% {
            transform: scale(0.2);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes displayComponent {
        0% {
            width: 20px;
            max-height: 20px;
            border-radius: radius('md');
        }
        100% {
            width: 100%;
            max-width: 100%;
            max-height: 1000px;
            height: auto;
            border-radius: radius("sm");
            padding: spacers('sm');
        }
    }

    .question-close {
        align-self: flex-end;
        border: none;
        background: none;
        color: color("light");
        padding: 0 spacers("xs");
    }

    .question-mark {
        width: 15px;
        height: 15px;
        cursor: pointer;
        position: absolute;
        display: flex;
        top: 2.5px;
        left: 2.5px;

        svg {
            height: 15px;
        }
    }
}
</style>