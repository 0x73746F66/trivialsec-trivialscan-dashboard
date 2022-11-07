<template>
    <div class="expand-more-content" :style="{'max-height': height}">
        <slot name="content"></slot>
    </div>
    <button 
        class="btn-outline-primary-full font-color-primary margin-top-sm"
        @click="seeAllContent()"
    >
        {{buttonLabel}}
    </button>
</template>
<script>
export default {
    data() {
        return {
            buttonLabel: "See All"
        }
    },
    props: {
        height: {
            type: String,
            default: '200px'
        }
    },
    methods: { 
        seeAllContent() {
            let content= document.getElementsByClassName("expand-more-content")[0];
            if(content.classList.contains("full-height")){
                content.classList.remove("full-height")
                this.buttonLabel = "See More"
            } else {
                content.classList.add("full-height")
                this.buttonLabel = "See less"
            }
        }
    }
}
</script>
<style lang="scss">
    .expand-more-content {
        overflow: hidden;
        transition: 0.5s linear;
        position: relative;
        border-radius: radius("sm");

        &.full-height {
            max-height: 5000px !important;
        }
    }
</style>