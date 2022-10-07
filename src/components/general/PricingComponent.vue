<template>
    <div class="border-radius-sm bg-dark padding-sm pricing">
        <table class="font-color-light w-100 pricing-table">
            <tr>
                <td></td>
                <td></td>
                <td class="pricing-recommended font-color-primary justify-content-center d-flex align-items-center">
                    <img 
                        class="pricing-icon margin-right-xs" 
                        src="../../assets/icons/star-light.svg" 
                        alt="Star"
                    >
                    Recommended
                </td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th class="text-left">Services</th>
                <th>Package 1</th>
                <th>Package 2</th>
                <th>Package 3</th>
            </tr>
        
            <tr>
                <td>Task 1</td>
                <td><checkIcon class="pricing-checkmark"/></td>
                <td><checkIcon class="pricing-checkmark"/></td>
                <td><checkIcon class="pricing-checkmark"/></td>
            </tr>
            <tr>
                <td>Task 2</td>
                <td><checkIcon class="pricing-checkmark"/></td>
                <td><checkIcon class="pricing-checkmark"/></td>
                <td><checkIcon class="pricing-checkmark"/></td>
            </tr>
            <tr>
                <td>Task 3</td>
                <td><checkIcon class="pricing-checkmark"/></td>
                <td><checkIcon class="pricing-checkmark"/></td>
                <td><checkIcon class="pricing-checkmark"/></td>
            </tr>
            <tr>
                <td>Task 4</td>
                <td></td>
                <td><checkIcon class="pricing-checkmark"/></td>
                <td><checkIcon class="pricing-checkmark"/></td>
            </tr>
            <tr>
                <td>Task 5</td>
                <td></td>
                <td></td>
                <td><checkIcon class="pricing-checkmark"/></td>
            </tr>
            <tr>
                <td>Task 6</td>
                <td></td>
                <td></td>
                <td><checkIcon class="pricing-checkmark"/></td>
            </tr>
            <tr>
                <td>Task 7</td>
                <td></td>
                <td></td>
                <td><checkIcon class="pricing-checkmark"/></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <span class="font-xl">Starting At <span class="font-xl-sb font-color-primary"> $99.99</span></span>
                </td>
                <td>
                    <span class="font-xl">Starting At <span class="font-xl-sb font-color-primary"> $999.99</span></span>
                </td>
                <td>
                    <span class="font-xl">Starting At <span class="font-xl-sb font-color-primary"> $9999.99</span></span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import checkIcon from "../icons/checkIcon.vue"
    export default {
        components: {checkIcon}
    }
</script>
<style lang="scss">
    .pricing {
        &-recommended {
            border-radius: radius(sm) radius(sm) 0 0;
            line-height: 35px;
            @extend .bg-primary;
            color: color(light);
        }
        &-icon {
            max-width: 25px;
        }
        &-table {
            border-spacing: spacers(sm);
            border-collapse:separate;
        }
        &-checkmark {
            border-radius: 50%;
            @extend .bg-primary;
            height: 40px;
            width: 40px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 30px;
            }
        }
        tr {
            th {
                @extend .font-lg-b;
            }
            td {
                @extend .font-base
            }
            th, td {

                &:first-of-type {
                    text-align: left;
                }
                text-align: center;
            }
        }
    }
</style>