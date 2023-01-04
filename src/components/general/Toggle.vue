<template>
    <div>
        <label class="switch">
            <input
                type="checkbox"
                :name="fieldName"
                :checked="defaultChecked"
            />
            <span class="slider round"></span>
        </label>
    </div>
</template>
<script>
export default {
    props: {
        defaultChecked: {
            type: Boolean,
            default: false
        },
        fieldName: {
            type: String,
            default: 'default'
        }
    }
}
</script>
<style lang="scss">
/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: color('light-20');
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: color('light');
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: color('light-20');
    &:before {
        background-color: color('secondary');
    }
}

input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
}

.slider.round {
    border-radius: radius('sm');
}

.slider.round:before {
    border-radius: 50%;
}
</style>
