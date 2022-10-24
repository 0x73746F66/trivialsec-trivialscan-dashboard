<template>
    <svg :fill="`#` + color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="100" height="100">
        <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"/>
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