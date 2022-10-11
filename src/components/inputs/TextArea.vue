<template>
    <div class="custom-field">
        <label :for="id">{{this.label}}</label>
        <textarea :required="required" :id="id" :name="id" :placeholder="placeholder">
        </textarea>
    </div>
</template>

<script>
export default {
    name: 'TextArea',
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