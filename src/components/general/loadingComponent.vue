<template>
    <div>
        <span class="loading-component font-base-b font-color-light">
            Loading...
        </span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .loading {
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
        justify-content: center;

        &.inactive {
            display: none;
        }

        &-component {
            background: color("primary");
            padding: spacers("md");
            border-radius: 50%;
            height: calc(100vw/10);
            width: calc(100vw/10);
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;

            &:after {
                content: "";
                position: absolute;
                background: color("secondary-40");
                z-index: -1;
                animation-name: pulse;
                animation-duration: 1s;
                animation-iteration-count: infinite;
                border-radius: 50%;
            }
            &:before {
                content: "";
                position: absolute;
                background: color("secondary-20");
                z-index: -1;
                border-radius: 50%;
                animation-name: pulse;
                animation-duration: 2s;
                animation-iteration-count: infinite;

            }
        }
        @keyframes pulse {
            0% {
                width: 0;
                height: 0;                
            }
            50% {
                width: calc(100vw/4);
                height: calc(100vw/4);
            }
            100% {
                width: 0;
                height: 0;                
            }
        }
        // border-radius: 50%;
        // padding: spacers("sm");
        // background: color('primary');
    }
</style>