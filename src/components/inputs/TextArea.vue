<template>
    <div class="custom-field h-100">
        <label class="font-xs-b" :for="id">{{ label }}</label>
        <textarea
            :class="`font-xs textarea-${size}`"
            :required="required"
            :id="id"
            :name="id"
            :placeholder="placeholder"
            @input="handleInput"
            @change="handleChange"
            :maxlength="maxlength"
            >{{ textDefault }}</textarea
        >
    </div>
</template>

<script>
export default {
    name: 'TextArea',
    emits: ['input', 'change'],
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'md'
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
        },
        maxlength: {
            type: Number,
            default: 2000
        }
    },
    methods: {
        handleInput(e) {
            this.$emit('input', e.target.value)
        },
        handleChange(e) {
            this.$emit('change', e.target.value)
        }
    }
}
</script>

<style scoped lang="scss">
.custom-field textarea {
    &.textarea-xxl {
        min-height: 140px;
    }
    &.textarea-xl {
        min-height: 120px;
    }
    &.textarea-lg {
        min-height: 190px;
    }
    &.textarea-md {
        min-height: 80px;
    }
    &.textarea-sm {
        min-height: 60px;
    }
    &.textarea-xs {
        min-height: 50px;
    }
    &.textarea-xxs {
        min-height: 40px;
    }
}

textarea {
    &::placeholder {
        color: color('light-60');
    }
}
</style>
