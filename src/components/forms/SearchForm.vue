<template>
    <div class="d-flex position-relative">
        <select
            name="searchOptions"
            id="search-options"
            class="search-select font-sm"
            :class="{ 'search-select-active' : searchActive, 'search-select-active-cornered' : searchInput.length > 0 }"

        >
            <option value="certificates">Certificates</option>
            <option value="threats">Threats</option>
            <option value="reports">Reports</option>
            <option value="hosts">Hosts</option>
        </select>
        <input
            type="text"
            name="Search"
            class="search-bar"
            :class="{ 'search-bar-active' : searchActive, 'search-bar-active-cornered' : searchInput.length > 0 }"
            id="search-bar"
            v-model="searchInput"
        >
        <div
            class="button-container"
            :class="{'position-absolute' : searchActive }"
        >
            <button class="search-btn search-btn-main" @click="handleClick()">
                <IconArrowPrimary color="F0F0F0" class="search-btn-icon" v-if="searchActive"/>
                <IconSearch color="F0F0F0" class="search-btn-icon" v-else />
            </button>
            <button
                class="search-btn search-btn-close"
                :class="{'search-btn-close-hidden' : !searchActive}"
                @click="closeSearchBtn()"
            >
                <IconClose color="F0F0F0" class="search-btn-icon"/>
            </button>
        </div>
    </div>
    <div class="search-input-results" v-if="searchInput.length > 0">
        <div>
            <div class="d-flex flex-row margin-bottom-sm justify-content-between padding-bottom-sm search-input-results-header border-bottom-light-20">
                <p class="font-base font-color-light mb-0"><IconError color="f45e5e" class="search-result-item-icon" /> Findings</p>
                <p class="font-sm font-color-light-40 mb-0">3 results</p>
            </div>
            <div class="d-flex flex-wrap flex-row">
                <div class="search-result-item">
                    <span>Findings result </span>
                </div>
                <div class="search-result-item">
                    <span>Findings result </span>
                </div>
                <div class="search-result-item">
                    <span>Findings result </span>
                </div>
            </div>
        </div>
        <div>
            <div class="d-flex flex-row margin-bottom-sm justify-content-between padding-bottom-sm search-input-results-header border-bottom-light-20">
                <p class="font-base font-color-light mb-0"><IconError color="f0f0f0" class="search-result-item-icon" /> Certificates</p>
                <p class="font-sm font-color-light-40 mb-0">1 result</p>
            </div>
            <div class="d-flex flex-wrap flex-row">
                <div class="search-result-item">
                    <span>Certificate result </span>
                </div>
            </div>
        </div>
        <div>
            <div class="d-flex flex-row margin-bottom-sm justify-content-between padding-bottom-sm search-input-results-header border-bottom-light-20">
                <p class="font-base font-color-light mb-0"><IconError color="f0f0f0" class="search-result-item-icon" /> Host</p>
                <p class="font-sm font-color-light-40 mb-0">2 results</p>
            </div>
            <div class="d-flex flex-wrap flex-row w-100">
                <div class="search-result-item w-100 margin-bottom-sm">
                    <span class="d-flex justify-content-between align-items-center">
                        <span class="d-flex">
                            Host result
                            <Toggle class="margin-left-xxs" />
                        </span>
                        <div class="d-flex flex-row">
                            <button class="search-result-item-btn search-result-item-btn-scan border-radius-lg margin-right-xxs">Scan now</button>
                            <button class="search-result-item-btn search-result-item-btn-archive border-radius-lg">Archive</button>
                        </div>
                    </span>
                </div>
                <div class="search-result-item w-100 margin-bottom-sm">
                    <span class="d-flex justify-content-between align-items-center">
                        <span class="d-flex">
                            Host result
                            <Toggle class="margin-left-xxs" />
                        </span>
                        <div class="d-flex flex-row">
                            <button class="search-result-item-btn search-result-item-btn-scan border-radius-lg margin-right-xxs">Scan now</button>
                            <button class="search-result-item-btn search-result-item-btn-archive border-radius-lg">Archive</button>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <div>
            <div class="d-flex flex-row margin-bottom-sm justify-content-between padding-bottom-sm search-input-results-header border-bottom-light-20">
                <p class="font-base font-color-light mb-0"><IconError color="f0f0f0" class="search-result-item-icon" /> Reports</p>
                <p class="font-sm font-color-light-40 mb-0">2 results</p>
            </div>
            <div class="d-flex flex-wrap flex-row w-100">
                <div class="search-result-item w-100 margin-bottom-sm">
                    <span class="d-flex justify-content-between align-items-center">
                        <span class="d-flex">
                            Report result
                        </span>
                        <div class="d-flex flex-row">
                            <button class="search-result-item-btn search-result-item-btn-delete border-radius-lg margin-right-xxs">Delete</button>
                            <button class="search-result-item-btn search-result-item-btn-archive border-radius-lg">Archive</button>
                        </div>
                    </span>
                </div>
                <div class="search-result-item w-100 margin-bottom-sm">
                    <span class="d-flex justify-content-between align-items-center">
                        <span class="d-flex">
                            Report result
                        </span>
                        <div class="d-flex flex-row">
                            <button class="search-result-item-btn search-result-item-btn-delete border-radius-lg margin-right-xxs">Delete</button>
                            <button class="search-result-item-btn search-result-item-btn-archive border-radius-lg">Archive</button>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconSearch from "../icons/IconSearch.vue"
import IconArrowPrimary from "../icons/IconArrowPrimary.vue"
import IconClose from "../icons/IconClose.vue"
import IconError from "../icons/IconError.vue"
import Toggle from "../general/Toggle.vue"

export default {
    components: {
        IconSearch,
        IconArrowPrimary,
        IconClose,
        IconError,
        Toggle
    },
    data() {
        return {
            searchActive: false,
            searchInput: ""
        }
    },
    methods: {
        clearSearchInput(){
            this.searchInput = "";
        },
        handleClick() {
            this.searchActive = !this.searchActive;
            this.clearSearchInput();
        },
        closeSearchBtn() {
            this.searchActive = false;
            this.clearSearchInput();
        }
    }
}
</script>
<style lang="scss">
    $searchBarHeight: 50px;

    .search {
        &-bar {
            border: none;
            height: $searchBarHeight;
            width: 0;
            opacity: 0;
            transition: 0.2s linear;

            @extend .bg-dark-40;
            @extend .font-color-light;

            &-active {
                opacity: 1;
                width: 100%;
                padding: 0 spacers("lg");
                border-radius:  0 radius("lg") radius("lg") 0;


                @media (max-width: $breakpoint-lg) {
                    // width: 200px;
                }

                &-cornered {
                    border-radius: 0 30px 0 0 ;
                }
            }
        }
        &-select {
            border-radius: radius("lg") 0 0 radius("lg");
            border: none;
            background: color("dark-40");
            color: color('light');
            width: 0%;

            &-active {
                padding: 0 spacers("md");
                width: 25%;
                &-cornered {
                    border-radius: 30px 0 0 0 ;
                }
            }
        }
    }
    .search-input-results {
        @extend .font-color-light;
        @extend .bg-dark-60;
        border-radius: 0 0 radius("lg") radius("lg");
        width: 100%;
        padding: spacers("lg");
        position: absolute;
        z-index: 99;
        backdrop-filter: blur(8px);

        @media (max-width: $breakpoint-lg) {
            // width: 200px;
        }
    }
    .search-result-item {
        margin-bottom: spacers("sm");
        display: flex;
        flex-direction: column;
        width: 100%;
        transition: 0.2s linear;

        &:hover {
            background: color('light-20');
            color: color('light');
        }

        &-icon {
            width: 25px;
            height: 25px;
        }
        &-btn {
            border: none;
            color: color("dark");

            &-archive {
                background: color("secondary");
            }
            &-scan {
                background: color("primary");
            }
            &-delete {
                background: color("danger");
            }
        }
    }
    .button-container {
        position: relative;
        width: calc($searchBarHeight*2 - 10px) ;
        right: 0;
    }
    .search-btn {
        @extend .border-radius-round;
        height: calc($searchBarHeight - 14px);
        width: calc($searchBarHeight - 14px);
        background: color('primary');
        border: none;
        transition: 0.2s linear;

        &-main {
            z-index: 2;
            display: flex;
            align-items: center;
            position: absolute;
            top: 7px;
        }

        &-close {
            background: color('dark-40');
            position: absolute;
            transition: 0.2s linear;
            top: 7px;
            left: calc($searchBarHeight - 7px);
            z-index: 1;

            &-hidden {
                left: 0;
                z-index: 1;
            }
        }

        &:hover {
            // background: color("dark-40");
        }

        &-icon {
            width: 25px;
            height: 25px;
        }
    }
</style>
