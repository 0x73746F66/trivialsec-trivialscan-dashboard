<template lang="">
    <div class="d-flex">
        <div
            class="static-field" 
            :class="{'hide': editMode}"
        >
            <slot name="staticField"></slot>
        </div>
        <div 
            class="input-field"
            :class="{'hide': !editMode}"
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
        position: relative;
        transition: 0.2s linear;
        opacity: 1;

        .custom-field {
            padding-bottom: 0;
        
            input {
                padding: spacers('sm');
            }
        }
        &.hide {
            width: 0px;
            height: 0px;    
            position: absolute;
            opacity: 0;
        }
    }
</style>