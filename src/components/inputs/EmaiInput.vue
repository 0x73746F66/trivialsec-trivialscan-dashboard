<template>
    <div class="custom-field">
        <label :for="id">{{this.label}}</label>
        <input type="email" :required="required" :id="id" :name="id" :placeholder="placeholder">
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