<template>
    <div class="col-12 margin-top-sm">
        <div class="filter-results">
            <div class="d-flex justify-content-start padding-left-sm">
                <div class="d-flex align-items-center" v-if="results.pass > 0">
                    <input
                        type="checkbox"
                        id="checkPass"
                        class="margin-right-sm custom-checkbox"
                        v-model="resultsFilter.pass"
                    />
                    <label
                        for="checkPass"
                        class="margin-right-md font-xs font-color-light"
                        >Passes ({{ results.pass }})</label
                    >
                </div>
                <div class="d-flex align-items-center" v-if="results.fail">
                    <input
                        type="checkbox"
                        id="checkFail"
                        class="margin-right-sm custom-checkbox"
                        v-model="resultsFilter.fail"
                    />
                    <label
                        for="checkFail"
                        class="margin-right-md font-xs font-color-light"
                        >Failures ({{ results.fail }})</label
                    >
                </div>

                <div class="d-flex align-items-center" v-if="results.warn">
                    <input
                        type="checkbox"
                        id="checkWarn"
                        class="margin-right-sm custom-checkbox"
                        v-model="resultsFilter.warn"
                    />
                    <label
                        for="checkWarn"
                        class="margin-right-md font-xs font-color-light"
                        >Warnings ({{ results.warn }})</label
                    >
                </div>

                <div class="d-flex align-items-center" v-if="results.info > 0">
                    <input
                        type="checkbox"
                        id="checkInfo"
                        class="margin-right-sm custom-checkbox"
                        v-model="resultsFilter.info"
                    />
                    <label
                        for="checkInfo"
                        class="margin-right-md font-xs font-color-light"
                        >Informational ({{ results.info }})</label
                    >
                </div>
            </div>
        </div>
        <div
            v-for="(evaluation, evalIndex) in evaluations"
            :key="`${evalIndex}`"
        >
            <input type="hidden" :value="evaluation.result_level" />
            <Dropdown
                :id="`headingEvaluate${evalIndex}`"
                :target="`collapseEvaluate${evalIndex}`"
                parent="accordion"
                :defaultShow="false"
                :defaultCollapsed="true"
                buttonClasses="font-lg text-left report-dropdown font-color-light w-100 d-flex justify-content-left border-none padding-xxs"
                contentClasses=" bg-dark-20 report-dropdown-content padding-sm font-color-light font-base"
                v-if="
                    evaluation.result_level ===
                        (resultsFilter.pass ? 'pass' : '') ||
                    evaluation.result_level ===
                        (resultsFilter.warn ? 'warn' : '') ||
                    evaluation.result_level ===
                        (resultsFilter.fail ? 'fail' : '') ||
                    evaluation.result_level ===
                        (resultsFilter.info ? 'info' : '')
                "
            >
                <template v-slot:header class="w-100">
                    <div
                        class="font-base d-flex flex-column justify-content-between font-color-primary w-100 align-items-start"
                    >
                        <div class="d-flex w-100">
                            <ThreatIcon />
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center">
                                    <span
                                        class="margin-right-xxs font-sm-b font-color-secondary"
                                    >
                                        {{ evaluation?.group_id }}.{{
                                            evaluation?.rule_id
                                        }}
                                    </span>
                                    <span class="font-color-lighter font-xs-sb">
                                        {{ evaluation?.name }}
                                    </span>
                                </div>
                                <span
                                    class="font-xs"
                                    :class="{
                                        'font-color-warning':
                                            evaluation?.result_level === 'warn',
                                        'font-color-danger':
                                            evaluation?.result_level === 'fail',
                                        'font-color-primary':
                                            evaluation?.result_level === 'pass',
                                        'font-color-light-60':
                                            evaluation?.result_level === 'info'
                                    }"
                                >
                                    {{ evaluation?.result_label }}
                                </span>
                                <span
                                    class="font-sm"
                                    v-if="evaluation.transport"
                                >
                                    <RouterLink
                                        :to="`/hostname/${
                                            evaluation.transport.hostname
                                        }/${evaluation.transport.port}${
                                            reportDate ? '/' + reportDate : ''
                                        }`"
                                        class="font-color-lighter-60 text-decoration-none"
                                    >
                                        <IconTarget
                                            class="link-icon margin-right-xxs"
                                            color="e2c878"
                                        />
                                        <span class="font-color-lighter-60">
                                            {{
                                                evaluation.transport.hostname
                                            }}:{{ evaluation.transport.port }}
                                        </span>
                                    </RouterLink>
                                </span>
                                <span
                                    class="font-sm"
                                    v-if="
                                        evaluation?.metadata
                                            ?.certificate_subject &&
                                        evaluation?.metadata?.sha1_fingerprint
                                    "
                                >
                                    <a
                                        :href="`/certificate/${evaluation.metadata.sha1_fingerprint}`"
                                        class="font-color-lighter-60 text-decoration-none"
                                    >
                                        <IconCertificate
                                            class="link-icon margin-right-xxs"
                                            color="e2c878"
                                        />
                                        <span class="font-color-lighter-60">
                                            {{
                                                evaluation.metadata
                                                    .certificate_subject
                                            }}
                                        </span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="row padding-right-sm">
                        <div class="col-12 col-lg-6 padding-top-sm">
                            <span
                                class="font-xs pre-line"
                                v-html="evaluation?.description"
                            ></span>
                            <div
                                class="margin-top-sm"
                                v-if="evaluation?.recommendation"
                            >
                                <div class="font-base-sb">Recommendation</div>
                                <span
                                    class="font-xs pre-line"
                                    v-html="evaluation?.recommendation"
                                ></span>
                            </div>
                        </div>
                        <div
                            class="col-12 col-lg-6 d-flex flex-column bg-dark-40 border-radius-sm padding-sm evaluation-item-aside"
                        >
                            <EvaluationMetadata
                                :metadata="evaluation?.metadata"
                                :transport="evaluation?.transport"
                            />
                            <template v-if="evaluation?.references.length > 0">
                                <span
                                    class="font-sm-sb font-color-light margin-top-sm"
                                    >References</span
                                >
                                <span
                                    class="margin-top-xxs"
                                    v-for="(
                                        reference, index
                                    ) in evaluation?.references"
                                    :key="index"
                                >
                                    <IconJsonFile
                                        color="e2c878"
                                        class="link-icon margin-right-xxs"
                                        v-if="reference.type === 'json'"
                                    />
                                    <IconLink
                                        color="1abb9c"
                                        class="link-icon margin-right-xxs"
                                        v-else
                                    />
                                    <a
                                        :title="
                                            reference.type === 'json'
                                                ? 'Download data (JSON format)'
                                                : 'Open the link in a new tab'
                                        "
                                        target="_blank"
                                        :href="reference.url"
                                        class="font-xs-sb font-color-primary text-decoration-none hover-help"
                                        >{{ reference.name }}</a
                                    >
                                </span>
                            </template>
                        </div>
                        <div
                            class="col-12 d-flex flex-column padding-top-sm"
                            v-if="evaluation?.compliance?.length > 0"
                        >
                            <h3 class="font-base-sb font-color-light">
                                Compliance
                            </h3>
                            <div :id="`complianceSection${evaluation?.key}`">
                                <div
                                    v-for="(
                                        compliance, index
                                    ) in evaluation.compliance"
                                    :key="index"
                                >
                                    <div>
                                        {{ index + 1 }}.
                                        {{ compliance.compliance
                                        }}<span
                                            class="font-color-secondary margin-left-xxs"
                                        >
                                            {{ compliance.version }}</span
                                        >
                                        <div class="d-flex flex-wrap">
                                            <div
                                                class="w-100 font-sm-sb margin-bottom-xs"
                                                v-if="
                                                    compliance?.items?.length >
                                                    0
                                                "
                                            >
                                                Requirements
                                            </div>
                                            <template
                                                v-for="(
                                                    comp, compIndex
                                                ) in compliance.items"
                                                :key="compIndex"
                                            >
                                                <button
                                                    class="pill w-auto margin-right-xxs font-xs-sb"
                                                    data-bs-toggle="collapse"
                                                    type="button"
                                                    aria-expanded="false"
                                                    :data-bs-target="`#multiCollapseCompliance${
                                                        evaluation?.key
                                                    }-${comp?.requirement?.replace(
                                                        /\./g,
                                                        '-'
                                                    )}`"
                                                    :data-bs-parent="`#complianceSection${evaluation?.key}`"
                                                    :aria-controls="`multiCollapseCompliance${
                                                        evaluation?.key
                                                    }-${comp?.requirement?.replace(
                                                        /\./g,
                                                        '-'
                                                    )}`"
                                                    v-if="comp.requirement"
                                                >
                                                    {{ comp.requirement }}
                                                </button>
                                            </template>
                                        </div>

                                        <div class="row margin-bottom-sm">
                                            <div class="col">
                                                <div
                                                    v-for="(
                                                        comp, compIndex
                                                    ) in compliance.items"
                                                    :key="compIndex"
                                                    class="collapse multi-collapse"
                                                    :id="`multiCollapseCompliance${
                                                        evaluation?.key
                                                    }-${comp?.requirement?.replace(
                                                        /\./g,
                                                        '-'
                                                    )}`"
                                                    :data-bs-parent="`#complianceSection${evaluation?.key}`"
                                                >
                                                    <div
                                                        v-if="comp.description"
                                                        class="card card-body bg-dark-40 font-xs"
                                                        v-html="
                                                            comp.description
                                                        "
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 flex-column padding-top-sm hide-sm">
                            <h3
                                class="font-lg-sb font-color-light margin-bottom-sm"
                                v-if="evaluation.threats.length > 0"
                            >
                                Threat Vectors
                            </h3>
                            <div
                                v-for="(group, groupIndex) in slicedThreats(
                                    evaluation
                                )"
                                :key="groupIndex"
                            >
                                <h3
                                    class="font-base font-color-light margin-bottom-lg"
                                >
                                    {{ group.standard
                                    }}<span
                                        class="font-color-secondary"
                                        v-if="group.standard === 'MITRE ATT&CK'"
                                    >
                                        v{{ group.version }}</span
                                    >
                                </h3>
                                <div
                                    class="d-flex flex-row flex-wrap hexagon-main"
                                >
                                    <div class="hexagon-container">
                                        <template
                                            v-for="(
                                                threatItem, threatIndex
                                            ) in group.items"
                                            :key="threatIndex"
                                        >
                                            <MitreAttackItem
                                                v-if="
                                                    threatItem.standard ===
                                                    'MITRE ATT&CK'
                                                "
                                                :threat="threatItem"
                                                :evalIndex="evalIndex"
                                                :threatIndex="threatIndex"
                                            />
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Dropdown>
        </div>
    </div>
</template>
<script setup>
import IconLink from '@/components/icons/IconLink.vue'
import IconJsonFile from '@/components/icons/IconJsonFile.vue'
import IconTarget from '@/components/icons/IconTarget.vue'
import Dropdown from '@/components/general/Dropdown.vue'
import MitreAttackItem from '@/components/MitreAttackItem.vue'
import EvaluationMetadata from '@/components/EvaluationMetadata.vue'
import ThreatIcon from '@/components/icons/ThreatIcon.vue'
import IconCertificate from '@/components/icons/IconCertificate.vue'
</script>

<script>
export default {
    components: {
        IconLink,
        IconJsonFile,
        IconTarget,
        Dropdown,
        MitreAttackItem,
        ThreatIcon,
        IconCertificate,
        EvaluationMetadata
    },
    props: ['evaluations', 'results', 'resultsFilter', 'reportDate'],
    methods: {
        slicedThreats(evaluation) {
            if (!evaluation.threats || evaluation.threats.length === 0) {
                return []
            }
            let groups = new Set()
            for (const threat of evaluation.threats) {
                groups.add([threat.standard, threat.version].toString())
            }
            let threatGroups = []
            for (const group of [...groups]) {
                const threatGroup = {
                    standard: group.split(',')[0],
                    version: group.split(',')[1],
                    items: []
                }
                for (const threat of evaluation.threats) {
                    if (group == [threat.standard, threat.version]) {
                        threatGroup.items.push(threat)
                    }
                }
                if (threatGroup.items.length > 0) {
                    threatGroups.push(threatGroup)
                }
            }
            return [...threatGroups]
        }
    }
}
</script>
<style scoped lang="scss">
@media (min-width: breakpoints('sm')) {
    .evaluation-item-aside {
        max-height: 30vh;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 0.2em;
        }
        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px color('primary-20');
        }
        &::-webkit-scrollbar-thumb {
            background-color: color('primary');
            outline: 1px solid color('primary');
        }
    }
}
@media (max-width: breakpoints('sm')) {
    .evaluation-item-aside {
        margin-top: 30px;
    }
    .filter-results {
        padding-top: 10px;
    }
    .filter-results > div {
        flex-wrap: wrap;
        flex: 1 1 50%;
        flex-direction: column;
    }
}
</style>
<style lang="scss">
.report-item {
    cursor: pointer;
    z-index: 10;
    height: 20px;
}
.report-dropdown {
    background: color('dark-20');
    border-bottom: 1px solid color('dark-60');
    align-items: center;
    padding: spacers('xs');

    .expand-icon {
        transform: rotate(180deg);
        width: 25px;
        height: 25px;
    }

    &.collapsed {
        .expand-icon {
            transform: rotate(0deg);
        }
    }

    &-content {
        border-bottom: 1px solid color('dark-60');
        padding: spacers('xs');
    }
}

.cert-icon {
    height: 25px;
    width: 25px;
}

.link-icon {
    height: 20px;
    width: 20px;
}

.pill {
    color: color('light');
    background: color('primary');
    border: 1px solid color('primary');

    &.collapsed {
        background: none;
        color: color('primary');
        border: 1px solid color('primary');
    }
}

.filter-results {
    background: color('dark-60');
    backdrop-filter: blur(8px);
    height: 60px;
    position: sticky;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    top: 85px;
    label {
        cursor: pointer;
    }
    @media (max-width: breakpoints('lg')) {
        top: 65px;
    }
}

.custom-checkbox {
    appearance: unset;
    width: 15px;
    height: 15px;
    background: color('light-20');
    transition: 0.2s linear;
    border-radius: 5px;
    cursor: pointer;

    &:checked {
        background: rgb(26, 187, 156);
        display: flex;
        align-items: center;
        justify-content: center;

        &:after {
            content: '\2713';
            color: color('dark');
            line-height: 15px;
            font-size: 10px;
        }
    }
}

.pre-line p {
    margin-bottom: 0;
}
</style>
