<template>
    <div class="font-color-light font-base">
        <div class="d-flex justify-content-between align-items-center margin-bottom-sm">
            <span class="d-flex">
                <IconCertificate class="cert-icon margin-right-xxs" color="e2c878" />
                <customPill 
                    class="margin-right-xxs margin-left-xxs"
                    :label="type" 
                    :type="type" 
                />
            </span>
            <span v-if="expired" class="font-color-danger">{{ expiry_status }}</span>
            <span v-else class="font-color-primary">{{ expiry_status }}</span>
        </div>
        <div class="row">
            <div class="col-6 d-flex flex-column">
                <span class="font-color-light margin-bottom-xxs" v-if="not_before">
                    <div class="font-base-sb">Not Before</div>
                    <span class="font-base">{{ notBefore }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="not_after">
                    <div class="font-base-sb">Not After</div>
                    <span class="font-base">{{ notAfter }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="issuer">
                    <div class="font-base-sb">Issuer</div>
                    <span class="font-base word-break">{{ issuer }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="authority_key_identifier">
                    <div class="font-base-sb">Authority Key Identifier (AKI)</div>
                    <span class="font-base word-break">{{ authority_key_identifier }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="subject">
                    <div class="font-base-sb">Subject</div>
                    <span class="font-base word-break">{{ subject }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="subject_key_identifier">
                    <div class="font-base-sb">Subject Key Identifier (SKI)</div>
                    <span class="font-base word-break">{{ subject_key_identifier }}</span>
                </span>
                <span v-if="san && san.length > 0"
                    class="font-color-light margin-bottom-xxs d-flex flex-column">
                    <div class="font-base-sb">Subject Alternative Names (SAN)</div>
                    <span class="font-base" v-for="(san_item, sanIndex) in uniqueSAN" :key="sanIndex">
                        <RouterLink :to="`/hostname/${san_item}`" class="font-color-secondary">{{san_item}}</RouterLink>
                    </span>
                </span>
                <span v-if="extensions && extensions.length > 0"
                    class="font-color-light margin-bottom-xxs d-flex flex-column">
                    <div class="font-base-sb">Extensions</div>
                    <span class="font-base" v-for="(ext, sanIndex) in extensions" :key="sanIndex">
                        <span :title="JSON.stringify(ext)">{{ ext.name }}</span>
                    </span>
                </span>
            </div>
            <div class="col-6">
                <div class="bg-light-20 border-radius-sm padding-sm">
                    <span v-if="external_refs" class="font-color-light margin-bottom-xxs d-flex flex-column">
                        <h3 class="font-color-light font-base-b margin-top-sm">
                            References
                        </h3>
                        <span class="font-base" v-for="(external_url, external_name) in external_refs" :key="external_name">
                            <IconLink color="1abb9c" class="link-icon margin-right-xxs" />
                            <a :href="external_url" target="_blank" class="font-color-primary">{{ external_name }}</a>
                        </span>
                    </span>
                    <div class="d-flex flex-column">
                        <span class="font-color-light margin-bottom-xxs" v-if="serial_number">
                            <div class="font-base-sb">Serial Number:</div>
                            <span class="font-base word-break">{{ serial_number }}</span>
                        </span>
                        <span class="font-color-light margin-bottom-xxs" v-if="serial_number_decimal">
                            <div class="font-base-sb">Serial Decimal:</div>
                            <span class="font-base word-break">{{ BigInt(serial_number_decimal).toString() }}</span>
                        </span>
                        <span class="font-color-light margin-bottom-xxs" v-if="serial_number_hex">
                            <div class="font-base-sb">Serial Hex:</div>
                            <span class="font-base word-break">{{ serial_number_hex }}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-6 d-flex flex-column">
                <h3 class="font-color-secondary font-base-b margin-top-sm">
                    Fingerprint
                </h3>
                <span class="font-color-light margin-bottom-xxs" v-if="md5_fingerprint">
                    <div class="font-base-sb">MDS:</div>
                    <span class="font-base word-break">{{ md5_fingerprint }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="sha1_fingerprint">
                    <div class="font-base-sb">SHA1:</div>
                    <span class="font-base word-break">{{ sha1_fingerprint }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="sha256_fingerprint">
                    <div class="font-base-sb">SHA256:</div>
                    <span class="font-base word-break">{{ sha256_fingerprint }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="spki_fingerprint">
                    <div class="font-base-sb">Subject Public Key Information (SPKI):</div>
                    <span class="font-base word-break">{{ spki_fingerprint }}</span>
                </span>
            </div>
            <div class="col-6 d-flex flex-column">
                <h3 class="font-color-secondary font-base-b margin-top-sm">
                    Public Key
                </h3>
                <span v-if="known_compromise" class="font-color-danger margin-bottom-xxs">Private Key Compromised</span>
                <span class="font-color-light margin-bottom-xxs" v-if="public_key_type">
                    <span class="font-base-sb margin-right-xxs">Type:</span>
                    <span class="font-base word-break">{{ public_key_type }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="public_key_size">
                    <span class="font-base-sb margin-right-xxs">BITS:</span>
                    <span class="font-base word-break">{{ public_key_size }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="public_key_exponent">
                    <span class="font-base-sb margin-right-xxs">Exponent:</span>
                    <span class="font-base word-break">{{ public_key_exponent }}</span>
                </span>
                <span class="font-color-light margin-bottom-xxs" v-if="signature_algorithm">
                    <span class="font-base-sb margin-right-xxs">Signature:</span>
                    <span class="font-base word-break">{{ signature_algorithm }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
import IconCertificate from "../icons/IconCertificate.vue";
import IconLink from "../icons/IconLink.vue";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import customPill from "./customPill.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
    components: {
        IconCertificate,
        IconLink,
        Swiper,
        SwiperSlide,
        customPill,
    },
    props: [
        "authority_key_identifier",
        "expired",
        "expiry_status",
        "extensions",
        "external_refs",
        "is_self_signed",
        "issuer",
        "known_compromised",
        "md5_fingerprint",
        "not_after",
        "not_before",
        "public_key_curve",
        "public_key_exponent",
        "public_key_modulus",
        "public_key_size",
        "public_key_type",
        "revocation_crl_urls",
        "san",
        "serial_number",
        "serial_number_decimal",
        "serial_number_hex",
        "sha1_fingerprint",
        "sha256_fingerprint",
        "signature_algorithm",
        "spki_fingerprint",
        "subject",
        "subject_key_identifier",
        "validation_level",
        "validation_oid",
        "version",
        "type",
    ],
    setup() {
        return {
            modules: [Navigation, Pagination, Scrollbar, A11y],
        };
    },
    computed: {
        uniqueSAN() {
            const SAN = new Set()
            this.san.forEach(item => SAN.add(item.replace('*.', '')))
            return [...SAN]
        },
        notBefore() {
            return moment.utc(this.not_before).format('MMMM Do, YYYY')
        },
        notAfter() {
            return moment.utc(this.not_after).format('MMMM Do, YYYY')
        }
    }
}
</script>

<style scoped lang="scss">
.cert-icon {
    height: 25px;
    width: 25px;
}

.link-icon {
    height: 20px;
    width: 20px;
}

.pill {
    color: color("light");
    background: color("primary");
    border: 1px solid color("primary");

    &.collapsed {
        background: none;
        color: color("primary");
        border: 1px solid color("primary");
    }
}

.report-dropdown {
    background: color("dark-20");
    border-bottom: 1px solid color("dark-60");
    align-items: center;
    padding: spacers("xs");

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
        border-bottom: 1px solid color("dark-60");
        padding: spacers("xs");
    }
}

.modal-icon-report-close {
    width: 25px;
    height: 25px;
    // transform: rotate(180deg);
}

.truncate-ellipsis {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cert {
    text-transform: capitalize;
    border-radius: radius('sm');
    color: color('dark');

    &-root {
        @extend .bg-primary;
    }

    &-leaf {
        @extend .bg-secondary;
    }

    &-intermediate {
        @extend .bg-secondary-80;
    }
    &-pill {
        width: 125px;
    }
}
</style>
