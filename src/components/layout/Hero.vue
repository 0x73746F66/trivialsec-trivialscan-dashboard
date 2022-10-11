<template>
    <div
        class="hero"
    >
        <div class="d-flex flex-column align-items-center hero-icon padding-xl w-100">
            <IconTrivialSecurity
                width="150"
                class="margin-bottom-md margin-top-md"
            />
            <h1 class="font-header-lg-b text-center font-color-primary margin-bottom-sm">Trivial Security</h1>
            <div class="font-color-light text-center margin-bottom-md">
                <h2 class="font-xl-b">Stay informed of your threat surface. We track bad actors so you don't have to.</h2>
                <h3 class="font-lg">Free service to identify the basic threats attackers use, raising the Cybersecurity poverty line.</h3>
            </div>
        </div>
        <img
            src="@/assets/media/hero.png"
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
            filter: brightness(0.5);
            @media (max-width: $breakpoint-lg) {
                height: 100%;
            }
        }
        &-scrolled {
            .hero-img {
                @media (min-width: $breakpoint-lg)  {
                    width: calc(1140px - 30px);
                }
                @media (min-width: $breakpoint-xxl) {
                    width: calc(1320px - 30px);
                }
            }

        }
    }
</style>
