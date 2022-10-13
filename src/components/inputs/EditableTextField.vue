<template lang="">
    <div class="d-flex">
        <div
            class="static-field" 
            :class="{'hide-static': editMode}"
        >
            <slot name="staticField"></slot>
        </div>
        <div 
            class="input-field"
            :class="{'hide-input': !editMode}"
        >
            <slot name="inputField"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            editMode: Boolean
        }
    }
</script>

<style lang="scss">
    .static-field,
    .input-field {
        transition: 0.2s linear;
        width: 100%;
        .custom-field {
            padding-bottom: 0;
            input {
                padding: spacers('sm');
            }
        }
    }

    .hide-input,
    .hide-static {
        transition: 0.2s linear;
        width: 0px;
        height: 0px;
        overflow: hidden;
    }
</style>