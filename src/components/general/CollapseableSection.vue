<template>
    <div class="d-flex flex-row flex-wrap collapsable-pill-container">
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
            @click="toggleCollapseable($event, `${label}-${sect}`)"
        >
            {{sect}}
        </button>
    </div>

    <div class="row margin-top-md h-100" :class="specialClasses">
        <div class="col-12">
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
</template>
<script>
export default {
    props: {
        section: Array,
        label: String,
        specialClasses: String
    },
    methods: {
        toggleCollapseable(e, collapseable) {
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
            document.getElementById(`${collapseable}`).classList.add("show");
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
        background: color("primary") !important;
        color: color("dark");
    }

    .collapse.show {
        animation: fadeIn 1s;
    }
    .collapse {
        animation: fadeOut 1s;
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