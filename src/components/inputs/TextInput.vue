<template>
    <div class="custom-field">
        <label :for="id">{{this.label}}</label>
        <input 
            type="text" 
            :required="required" 
            :id="id" 
            :name="id" 
            :placeholder="placeholder"
            @input="updateValue"
        >
    </div>
</template>

<script>
export default {
    props: {
        placeholder:String, 
        id: String, 
        label: String,
        required: Boolean
    }, 
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
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