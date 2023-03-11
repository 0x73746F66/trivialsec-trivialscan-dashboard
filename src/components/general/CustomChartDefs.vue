<template>
    <defs>
        <linearGradient :id="defsId" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#1abb9c" stop-opacity="1" />
            <stop offset="100%" stop-color="#e2c878" stop-opacity="1" />
        </linearGradient>
        <linearGradient :id="defsIdArea" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#1abb9c" stop-opacity="1" />
            <stop offset="100%" stop-color="#e2c878" stop-opacity="0" />
        </linearGradient>
        <svg:style type="text/css">
            g.layer-axis-x g.tick text {
                transform: rotate(-45deg);
                transform-origin: 2% 10%;
            }
        </svg:style>
    </defs>
</template>

<script>
export default {
    props: {
        defsId: String,
        defsIdArea: String
    }
}
</script>
