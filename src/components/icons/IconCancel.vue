<template>
    <svg :fill="`#` + color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="100" height="100">
        <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/>
    </svg>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                default: '1abb9c'
            }
        }
    }
</script>
