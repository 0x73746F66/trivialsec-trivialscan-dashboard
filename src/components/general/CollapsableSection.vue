<template>
    <div
        class="d-flex flex-wrap collapsable-pill-container"
        :class="{'flex-column-btns' : columnStyle}"
        v-if="section.length > 1"
    >
        <button 
            class="pill bg-none font-color-light collapsible-pill margin-right-sm" 
            type="button" 
            data-toggle="collapse"
            v-for="(sect, index) in section"
            :class="[{'active' : index === 0}, `collapsible-${label}-pill`]"
            :data-target="`#${label}-${sect}`" 
            aria-expanded="false" 
            :aria-controls="sect"
            :key="index"
            @click="toggleCollapsable($event, `${label}-${sect}`)"
        >
            {{sect}}
        </button>
    </div>

    <div 
        class="margin-top-md h-100" 
        :class="specialClasses"
        v-if="section.length > 0"
    >
        <div class="">
            <div 
                class="collapse multi-collapse h-100" 
                v-for="(sect, index) in section" 
                :key="index" 
                :id="`${label}-${sect}`"
                :class="[{'show' : index === 0}, `${label}-collapse`]"
            >
                <slot :name="sect"></slot>
            </div>
        </div>
    </div>
    <div v-else>
        <span class="font-xl font-color-light-80 text-center w-100 d-block">No data to display</span>
    </div>
    
</template>
<script>
export default {
    emits: ["section-change"],
    props: {
        section: Array,
        label: String,
        specialClasses: String,
        columnStyle: Boolean
    },
    methods: {
        toggleCollapsable(e, collapsable) {
            this.$emit('section-change', e.target.textContent);
            Array.from(document.getElementsByClassName(`collapsible-${this.label}-pill`)).forEach(
                function(el) {
                    el.classList.remove("active");
                }
            )
            
            e.target.classList.add('active')
            
            Array.from(document.getElementsByClassName(`${this.label}-collapse`)).forEach(
                function(el) {
                    el.classList.remove("show");
                }
            )
            document.getElementById(`${collapsable}`).classList.add("show");
        }
    }
}
</script>
<style lang="scss">
    .collapsable-pill-container {
        @extend .font-xs;
    }
    
    .pill {
        border: 1px solid color("primary");
    }

    .pill.active {
        background: color("primary");
        color: color("light");
    }

    .collapse.show {
        animation: fadeIn 1s;
    }
    .collapse {
        animation: fadeOut 1s;
    }
    .flex-column-btns {
        flex-direction: column!important;
        align-items: center;
        justify-content: center;
        padding-right: spacers("sm");
        width: 25%;
        @media (max-width: $breakpoint-lg) {
            width: 100%;
        }
        .pill {
            width: 100%;
        }
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        99% {
            opacity: 1;
        }
        100% {
            display: block;
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 0;
            display: block;
        }
        100% {
            opacity: 1;
        }
    }
</style>