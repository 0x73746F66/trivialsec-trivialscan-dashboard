<template>
    <div 
        class="font-lg text-left padding-md font-color-light w-100 d-flex justify-content-left border-none custom-accordion-button" 
        :class="{'collapsed' : defaultCollapsed}"
        :id="id"  
        data-bs-toggle="collapse" 
        :data-bs-target="`#` + target" 
        aria-expanded="true" 
        :aria-controls="target"
    >
        <div>
            <slot name="header"></slot>
        </div>    
        <IconExpandPrimary class="expand-icon"/>
    </div>
    <div 
        class="custom-according-content bg-dark-20 padding-md font-color-light font-base collapse" 
        :class="{'show' : defaultShow}" 
        :id="target" 
        :aria-labelledby="id" 
        :data-bs-parent="`#` + parent"
    >
      <div>
        <slot name="content"></slot>
      </div>
    </div>
</template>
<script>
    import IconExpandPrimary from "../icons/IconExpandPrimary.vue"

    export default {
        components: {IconExpandPrimary},
        props: {
            id: String,
            target: String,
            parent: String,
            defaultShow: Boolean,
            defaultCollapsed: Boolean
        }
    }
</script>
<style lang="scss">
    .custom-accordion {
        &-button {
            border-radius: radius("sm") radius("sm") 0 0;
            background: color("dark-40");
            display: flex;
            align-items: center;
            justify-content: space-between;
            .expand-icon {
                transition: 0.2s linear;
                transform: rotate(180deg);
                max-width: 50px;
                max-height: 50px;
            }

            &.collapsed {
                border-radius: radius("sm");
                background: color("dark-20");
                .expand-icon {
                    transform: rotate(0deg);
                }
            }
        }
        &-content {
            border-radius: 0 0 radius("sm") radius("sm");
        }
    }
</style>