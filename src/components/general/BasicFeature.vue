<template>
    <div class="col-6 col-lg-4 padding-sm">
        <div class="basic-feature h-100 w-100 text-center padding-lg">
            <img class="basic-feature-icon" :src="feature.icon"/>
            <h3 class="font-xl-sb font-color-light margin-bottom-sm margin-top-lg">{{feature.header}}</h3>
            <span class="font-base font-color-light">{{feature.description}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        feature: Object
    },
}
</script>
<style lang="scss">
    .basic-feature {
        border-radius: radius("sm");
        background: color("dark-40");
        color: color("light");
        transition: 0.2s linear;

        &:hover {
            background: color("dark-60");
        }
        &-icon {
            width: 100px;
        }
    }
</style>