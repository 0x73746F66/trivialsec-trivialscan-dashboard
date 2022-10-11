<template>
    <div class="custom-field">
        <label :for="id">{{this.label}}</label>
        <input 
            type="email" 
            :required="required" 
            :id="id" 
            :name="id" 
            :placeholder="placeholder"
            @input="handleInput"
        >
    </div>
</template>

<script>
export default {
    name: 'EmailFormInput',
    props: {
        placeholder:String, 
        id: String, 
        label: String,
        required: Boolean
    },
    methods: {
        handleInput(e) {
            this.$emit('input', e.target.value)
        }
    }
}
</script>

<style scoped lang="scss">
    input {
        &::placeholder {
            color: color('light-60');
        }
    }
</style>