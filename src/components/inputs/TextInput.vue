<template>
    <div class="custom-field">
        <label :for="id">{{this.label}}</label>
        <input type="text" :required="required" :id="id" :name="id">
    </div>
</template>

<script>
export default {
    props: {
        placeholder:String, 
        id: String, 
        label: String,
        required: Boolean
    }
}
</script>