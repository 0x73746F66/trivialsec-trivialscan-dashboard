<template>
    <div>
        <span
            :class="`

            custom-pill 
            custom-pill-${type}`"
        >
            {{label}}
        </span>
    </div>
</template>
<script>
export default {
    props: {
        label:String, 
        type:String
    }
}
</script>
<style lang="scss">
.custom-pill {
    @extend .font-xs-b;
    @extend .padding-left-xs;
    @extend .padding-right-xs;
    padding-top: 0;
    padding-bottom: 0;
    text-transform: capitalize;
    border-radius: radius('sm');
    color: color('dark');
    min-width: 125px;
    max-width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &-danger {
        @extend .bg-danger;
    }

    &-success {
        @extend .bg-primary;
    }

    &-warning {
        @extend .bg-warning;
    }
}
</style>