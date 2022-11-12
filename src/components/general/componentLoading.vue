<template>
    <div class="margin-sm component-loading"></div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .component-loading {
        height: 100%;
        width: 100%;
        border-radius: radius("sm");
        min-height: 50px;
        animation: lineargradientmove 2s ease infinite; 
        background: radial-gradient(circle, color("dark") 0%, color("light-60") 50%, color("light-60") 100%);
        background-size: 400% 400%;
    }

    @keyframes lineargradientmove {
        0% {
            background-size: 100% 100%;
            background-position: 50% 50%;
        }
        50% {
            background-size: 400% 400%;
            background-position: 50% 50%;
        }
        100% {
            background-size: 100% 100%;
            background-position: 50% 50%;
        }
    }
</style>