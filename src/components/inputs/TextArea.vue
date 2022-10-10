<template>
    <div class="custom-field h-100">
        <label :for="id">{{this.label}}</label>
        <textarea class="p-0" :required="required" :id="id" :name="id" :placeholder="placeholder">
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
    label {
        top: -10px;
    }
    .custom-field {
        textarea {
            min-height: 250px;
        }
    }
    
    input {
        &::placeholder {
            color: color('light-60');
        }
    }
</style>