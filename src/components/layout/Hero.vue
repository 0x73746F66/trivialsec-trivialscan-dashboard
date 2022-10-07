<template>
    <div class="hero">
        <div class="d-flex flex-column align-items-center hero-icon">
            <IconTrivialSecurity 
                width="150"
                class="margin-bottom-md"
            />
            <h1 class="font-header-xl-b font-color-primary">Trivial Security</h1>
        </div>
        <img 
            src="../../assets/media/hero-pexels.jpg" 
            alt="Code on a black screen"
            class="hero-img"
        >
    </div>
</template>

<script>
    import IconTrivialSecurity from '../icons/IconTrivialSecurity.vue';

    export default {
        components: { IconTrivialSecurity }        
    }
</script>

<style lang="scss">
    .hero {
        height: 100%;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;

        &-icon {
            position: absolute;
            filter: drop-shadow(0px 0px 4px color("dark-40"));
            z-index: 2;
        }

        &-img {
            width: 100%;
            max-height: 100%;
            object-fit: cover;
            transition: 0.2s linear;
            opacity: 0.4;
        }
        &-scrolled {
            .hero-img {
                width: calc(1140px - 30px);
                height: 90%;
            }
    
        }
    }
</style>