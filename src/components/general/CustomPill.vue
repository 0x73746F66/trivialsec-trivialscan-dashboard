<template>
    <span
        :class="`${classes}
        custom-pill
        custom-pill-${type}
        custom-pill--${size}`"
    >
        {{ label }}
    </span>
</template>
<script>
export default {
    props: {
        classes: {
            type: String,
            default: ''
        },
        label: String,
        type: {
            type: String,
            default: 'default'
        },
        size: {
            type: String,
            default: 'base'
        }
    }
}
</script>
<style lang="scss">
.custom-pill {
    font-size: sizes('xs');
    font-weight: 800;
    font-family: Montserrat-bold, sans-serif;
    padding-top: 0;
    padding-bottom: 0;
    text-transform: capitalize;
    border-radius: radius('sm');
    color: color('dark');
    max-width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;

    &--xs {
        padding-left: 0;
        padding-right: 0;
        min-width: 50px;
    }
    &--xs {
        padding-left: spacers('xxs');
        padding-right: spacers('xxs');
        min-width: 80px;
    }
    &--sm {
        padding-left: spacers('xxs');
        padding-right: spacers('xxs');
        min-width: 100px;
    }
    &--base {
        padding-left: spacers('xs');
        padding-right: spacers('xs');
        min-width: 125px;
    }
    &--lg {
        padding-left: spacers('md');
        padding-right: spacers('md');
        min-width: 130px;
    }
    &--xl {
        padding-left: spacers('lg');
        padding-right: spacers('lg');
        min-width: 140px;
    }
    &--xxl {
        padding-left: spacers('lg');
        padding-right: spacers('lg');
        min-width: 150px;
    }
    &-default {
        background-color: color('light');
    }
    &-danger {
        background-color: color('danger');
    }
    &-leaf,
    &-success {
        background-color: color('primary');
    }
    &-secondary,
    &-warning,
    &-root {
        background-color: color('secondary');
    }
    &-intermediate {
        background-color: color('secondary-80');
    }
}
</style>
