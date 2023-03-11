<template>
    <div class="custom-field">
        <label class="font-xs" :for="id">{{ label }}</label>
        <input
            :class="`font-xs input-${size}`"
            :type="type"
            :required="required"
            :id="id"
            :name="id"
            :placeholder="placeholder"
            @change="updateValue"
            @input="handleInput"
            :value="textDefault"
        />
    </div>
</template>

<script>
export default {
    emits: ['input', 'update:modelValue'],
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        size: {
            type: String,
            default: 'sm'
        },
        label: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: true
        },
        textDefault: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value)
        },
        handleInput(event) {
            this.$emit('input', event.target.value)
        }
    }
}
</script>

<style scoped lang="scss">
.custom-field input {
    &.input-xxl {
        min-height: 140px;
    }
    &.input-xl {
        min-height: 120px;
    }
    &.input-lg {
        min-height: 190px;
    }
    &.input-md {
        min-height: 80px;
    }
    &.input-sm {
        min-height: 60px;
    }
    &.input-xs {
        min-height: 50px;
    }
    &.input-xxs {
        min-height: 40px;
    }
}

input {
    &::placeholder {
        color: color('light-60');
    }
}
</style>
