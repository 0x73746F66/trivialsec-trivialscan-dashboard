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
            >Insights ({{ results.info }})</label
          >
        </div>
      </div>
    </div>
    <div v-for="(evaluation, evalIndex) in evaluations" :key="`${evalIndex}`">
      <input type="hidden" :value="evaluation.result_level" />
      <Dropdown
        :id="`headingEvaluate${evalIndex}`"
        :target="`collapseEvaluate${evalIndex}`"
        parent="accordion"
        :defaultShow="false"
        :defaultCollapsed="true"
        buttonClasses="font-lg text-left report-dropdown font-color-light w-100 d-flex justify-content-left border-none padding-xxs"
        contentClasses=" bg-dark-20 report-dropdown-content tpadding-md font-color-light font-base"
        v-if="
          evaluation.result_level === (resultsFilter.pass ? 'pass' : '') ||
          evaluation.result_level === (resultsFilter.warn ? 'warn' : '') ||
          evaluation.result_level === (resultsFilter.fail ? 'fail' : '') ||
          evaluation.result_level === (resultsFilter.info ? 'info' : '')
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
                  <span class="margin-right-xxs font-sm-b font-color-secondary">
                    {{ evaluation?.group_id }}.{{ evaluation?.rule_id }}
                  </span>
                  <span class="font-color-lighter font-xs-sb">
                    {{ evaluation?.name }}
                  </span>
                </div>
                <span
                  class="font-xs"
                  :class="{
                    'font-color-warning': evaluation?.result_level === 'warn',
                    'font-color-danger': evaluation?.result_level === 'fail',
                    'font-color-primary': evaluation?.result_level === 'pass',
                    'font-color-light-60': evaluation?.result_level === 'info',
                  }"
                >
                  {{ evaluation?.result_label }}
                </span>
                <span class="font-sm" v-if="evaluation.transport">
                  <a
                    target="_blank"
                    :href="`/hostname/${evaluation.transport.hostname}/${evaluation.transport.port}`"
                    class="font-color-lighter-60 text-decoration-none"
                  >
                    <IconTarget
                      class="link-icon margin-right-xxs"
                      color="e2c878"
                    />
                    <span class="font-color-lighter-60">
                      {{ evaluation.transport.hostname }}:{{
                        evaluation.transport.port
                      }}
                    </span>
                  </a>
                </span>
                <span
                  class="font-sm"
                  v-if="
                    evaluation?.metadata?.certificate_subject &&
                    evaluation?.metadata?.sha1_fingerprint
                  "
                >
                  <a
                    target="_blank"
                    :href="`/certificate/${evaluation.metadata.sha1_fingerprint}`"
                    class="font-color-lighter-60 text-decoration-none"
                  >
                    <IconCertificate
                      class="link-icon margin-right-xxs"
                      color="e2c878"
                    />
                    <span class="font-color-lighter-60">
                      {{ evaluation.metadata.certificate_subject }}
                    </span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:content>
          <div class="row">
            <div class="col-12 col-lg-6 padding-top-sm">
              <span
                class="font-xs pre-line"
                v-html="evaluation?.description"
              ></span>
            </div>
            <div class="col-12 col-lg-6 d-flex flex-column">
              <template v-if="evaluation?.references.length > 0">
                <span class="font-sm-sb font-color-light margin-top-sm"
                  >References</span
                >
                <span
                  class="margin-top-xxs"
                  v-for="(ev, index) in evaluation?.references"
                  :key="index"
                >
                  <IconLink color="1abb9c" class="link-icon margin-right-xxs" />
                  <a
                    target="_blank"
                    :href="ev.url"
                    class="font-xs-sb font-color-primary"
                    >{{ ev.name }}</a
                  >
                </span>
              </template>
              <template v-if="evaluation?.metadata">
                <div
                  class="col-12 col-lg-6 font-sm font-color-light d-flex flex-column margin-top-sm"
                >
                  <div class="d-flex" v-if="evaluation.metadata['abuse.sh']">
                    <span class="font-sm-sb margin-right-xxs nowrap"
                      >abuse.sh </span
                    ><span>{{ evaluation.metadata["abuse.sh"] }}</span>
                  </div>
                  <div class="d-flex" v-if="evaluation.metadata.reason">
                    <span class="font-sm-sb margin-right-xxs nowrap"
                      >Reason:</span
                    ><span>{{ evaluation.metadata.reason }}</span>
                  </div>
                  <div class="d-flex" v-if="evaluation.metadata.crime_cbc">
                    <span class="font-sm-sb margin-right-xxs nowrap"
                      >Results:</span
                    ><span>{{ evaluation.metadata.crime_cbc }}</span>
                  </div>
                  <div class="d-flex" v-if="evaluation.metadata.tls_robot">
                    <span class="font-sm-sb margin-right-xxs nowrap"
                      >Results:</span
                    ><span>{{ evaluation.metadata.tls_robot }}</span>
                  </div>
                  <div
                    class="d-flex"
                    v-if="evaluation.metadata.chain_validation_result"
                  >
                    <span class="font-sm-sb margin-right-xxs nowrap"
                      >Results:</span
                    ><span>{{
                      evaluation.metadata.chain_validation_result
                    }}</span>
                  </div>
                  <div class="d-flex" v-if="evaluation.metadata.key_usage">
                    <span class="font-sm-sb margin-right-xxs nowrap"
                      >Key Usage:</span
                    ><span>{{ evaluation.metadata.key_usage.join(", ") }}</span>
                  </div>
                  <div
                    class="d-flex"
                    v-if="evaluation.metadata.extended_key_usage"
                  >
                    <span class="font-sm-sb margin-right-xxs nowrap"
                      >Extended Key Usage:</span
                    ><span>{{
                      evaluation.metadata.extended_key_usage.join(", ")
                    }}</span>
                  </div>
                  <div v-if="evaluation.metadata.offered_strong_ciphers">
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Offered Not known 'weak' Ciphers:
                    </div>
                    <ul>
                      <li
                        v-for="(
                          cipher, cipherIndex
                        ) in evaluation.metadata.offered_strong_ciphers.split(
                          ' '
                        )"
                        :key="cipherIndex"
                      >
                        <span class="font-color-light">{{ cipher }}</span>
                      </li>
                    </ul>
                  </div>
                  <div v-if="evaluation.metadata.offered_weak_ciphers">
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Offered 'Weak' Ciphers:
                    </div>
                    <ul>
                      <li
                        v-for="(
                          cipher, cipherIndex
                        ) in evaluation.metadata.offered_weak_ciphers.split(
                          ' '
                        )"
                        :key="cipherIndex"
                      >
                        <span class="font-color-light">{{ cipher }}</span>
                      </li>
                    </ul>
                  </div>
                  <div v-if="evaluation.metadata.offered_cbc_ciphers">
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Offered CBC Ciphers:
                    </div>
                    <ul>
                      <li
                        v-for="(
                          cipher, cipherIndex
                        ) in evaluation.metadata.offered_cbc_ciphers.split(' ')"
                        :key="cipherIndex"
                      >
                        <span class="font-color-light">{{ cipher }}</span>
                      </li>
                    </ul>
                  </div>
                  <div v-if="evaluation.metadata.offered_rc4_ciphers">
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Offered RC4 Ciphers:
                    </div>
                    <ul>
                      <li
                        v-for="(
                          cipher, cipherIndex
                        ) in evaluation.metadata.offered_rc4_ciphers.split(' ')"
                        :key="cipherIndex"
                      >
                        <span class="font-color-light">{{ cipher }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="margin-top-sm"
                    v-if="evaluation.metadata.negotiated_cipher"
                  >
                    <div class="font-sm-b margin-right-xxs">TLS Negotiated</div>
                    <div
                      class="margin-right-xxs nowrap"
                      v-if="evaluation.metadata.negotiated_cipher"
                    >
                      <span class="font-sm-sb margin-right-xxs">Cipher:</span
                      ><span>{{ evaluation.metadata.negotiated_cipher }}</span>
                    </div>
                    <div
                      class="margin-right-xxs nowrap"
                      v-if="evaluation.metadata.negotiated_cipher_bits"
                    >
                      <span class="font-sm-sb margin-right-xxs"
                        >Cipher bits:</span
                      ><span>{{
                        evaluation.metadata.negotiated_cipher_bits
                      }}</span>
                    </div>
                  </div>
                  <div v-if="evaluation.metadata.missing_paths">
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      HTTP paths missing the header:
                    </div>
                    <ul>
                      <li
                        v-for="(http_path, pathIndex) in evaluation.metadata
                          .missing_paths"
                        :key="pathIndex"
                      >
                        <a
                          class="font-color-primary font-sm word-break text-decoration-none"
                          :href="`https://${evaluation.transport.hostname}:${evaluation.transport.port}${http_path}`"
                          target="_blank"
                        >
                          {{ http_path }} </a
                        ><span class="margin-left-sm" v-if="http_path === '/'">
                          (root path)</span
                        >
                      </li>
                    </ul>
                  </div>
                  <div
                    class="d-flex margin-top-sm"
                    v-if="
                      evaluation.metadata.certificate_version ||
                      evaluation.metadata.certificate_subject ||
                      evaluation.metadata.sha1_fingerprint
                    "
                  >
                    <span class="font-sm-b margin-right-xxs">Certificate</span>
                    <div
                      class="d-flex margin-right-xxs nowrap"
                      v-if="evaluation.metadata.certificate_version"
                    >
                      <span
                        >version
                        {{ evaluation.metadata.certificate_version }}</span
                      >
                    </div>
                  </div>
                  <div
                    class="d-flex"
                    v-if="evaluation.metadata.public_key_size"
                  >
                    <span class="font-sm-sb margin-right-xxs nowrap"
                      >Public Key:</span
                    >{{ evaluation.metadata.public_key_type
                    }}{{ evaluation.metadata.public_key_size }}
                  </div>
                  <div class="d-flex" v-if="evaluation.metadata.expiry_status">
                    <span>{{ evaluation.metadata.expiry_status }}</span>
                  </div>
                  <a
                    v-if="
                      evaluation.metadata.certificate_subject &&
                      evaluation.metadata.sha1_fingerprint
                    "
                    class="font-color-secondary font-sm word-break"
                    :href="`/certificate/${evaluation.metadata.sha1_fingerprint}`"
                  >
                    <IconCertificate
                      color="e2c878"
                      class="cert-icon margin-right-xxs"
                    />
                    <span title="See Certificate details">
                      {{ evaluation.metadata.certificate_subject }}
                    </span>
                  </a>
                  <a
                    v-else-if="evaluation.metadata.sha1_fingerprint"
                    class="font-color-secondary font-sm word-break"
                    :href="`/certificate/${evaluation.metadata.sha1_fingerprint}`"
                    target="_blank"
                  >
                    <IconCertificate
                      color="e2c878"
                      class="cert-icon margin-right-xxs"
                    />
                    <span title="See Certificate details">
                      {{ evaluation.metadata.sha1_fingerprint }}
                    </span>
                  </a>
                  <div
                    class="margin-top-sm"
                    v-if="evaluation.metadata.revocation_ocsp_status"
                  >
                    <div class="font-sm-b margin-right-xxs">Revocation</div>
                    <div
                      class="margin-right-xxs nowrap"
                      v-if="evaluation.metadata.revocation_ocsp_status"
                    >
                      <span class="font-sm-sb margin-right-xxs"
                        >OCSP Status:</span
                      ><span>{{
                        evaluation.metadata.revocation_ocsp_status
                      }}</span>
                    </div>
                    <div
                      class="margin-right-xxs nowrap"
                      v-if="evaluation.metadata.revocation_ocsp_response"
                    >
                      <span class="font-sm-sb margin-right-xxs"
                        >OCSP Response:</span
                      ><span>{{
                        evaluation.metadata.revocation_ocsp_response
                      }}</span>
                    </div>
                    <div
                      class="margin-right-xxs nowrap"
                      v-if="evaluation.metadata.revocation_ocsp_reason"
                    >
                      <span class="font-sm-sb margin-right-xxs"
                        >OCSP Reason:</span
                      ><span>{{
                        evaluation.metadata.revocation_ocsp_reason
                      }}</span>
                    </div>
                    <div
                      class="margin-right-xxs nowrap"
                      v-if="evaluation.metadata.revocation_ocsp_time"
                    >
                      <span class="font-sm-sb margin-right-xxs">OCSP Time:</span
                      ><span>{{
                        evaluation.metadata.revocation_ocsp_time
                      }}</span>
                    </div>
                  </div>
                  <div
                    class="margin-top-sm"
                    v-if="evaluation.metadata.certificate_transparency_status"
                  >
                    <div class="font-sm-b margin-right-xxs">
                      Certificate Transparency
                    </div>
                    <div
                      class="margin-right-xxs nowrap"
                      v-if="evaluation.metadata.certificate_transparency_status"
                    >
                      <span class="font-sm-sb margin-right-xxs">Status:</span
                      ><span>{{
                        evaluation.metadata.certificate_transparency_status
                      }}</span>
                    </div>
                    <div
                      class="margin-right-xxs nowrap"
                      v-if="
                        evaluation.metadata.certificate_transparency_description
                      "
                    >
                      <span class="font-sm-sb margin-right-xxs"
                        >Description:</span
                      ><span>{{
                        evaluation.metadata.certificate_transparency_description
                      }}</span>
                    </div>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata.long_handshake_intolerance_versions
                        ?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Long handshake intolerance:
                    </div>
                    <ul>
                      <li
                        v-for="(version, versionIndex) in evaluation.metadata
                          .long_handshake_intolerance_versions"
                        :key="versionIndex"
                      >
                        <span class="font-color-light">{{ version }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata.tls_version_interference_versions
                        ?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      TLS Interference:
                    </div>
                    <ul>
                      <li
                        v-for="(version, versionIndex) in evaluation.metadata
                          .tls_version_interference_versions"
                        :key="versionIndex"
                      >
                        <span class="font-color-light">{{ version }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata.tls_version_intolerance_versions
                        ?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      TLS Version Intolerance:
                    </div>
                    <ul>
                      <li
                        v-for="(version, versionIndex) in evaluation.metadata
                          .tls_version_intolerance_versions"
                        :key="versionIndex"
                      >
                        <span class="font-color-light">{{ version }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata['FIPS 140-2 Annex A violations']
                        ?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Compliance violations:
                    </div>
                    <ul>
                      <li
                        v-for="(violation, violationIndex) in evaluation
                          .metadata['FIPS 140-2 Annex A violations']"
                        :key="violationIndex"
                      >
                        <span class="font-color-light">{{ violation }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata[
                        'FIPS 140-2 Annex A non-compliance ciphers'
                      ]?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Non-compliance ciphers:
                    </div>
                    <ul>
                      <li
                        v-for="(cipher, cipherIndex) in evaluation.metadata[
                          'FIPS 140-2 Annex A non-compliance ciphers'
                        ]"
                        :key="cipherIndex"
                      >
                        <span class="font-color-light">{{ cipher }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata[
                        'NIST SP800-131A (strict mode) violations'
                      ]?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Compliance violations:
                    </div>
                    <ul>
                      <li
                        v-for="(violation, violationIndex) in evaluation
                          .metadata['NIST SP800-131A (strict mode) violations']"
                        :key="violationIndex"
                      >
                        <span class="font-color-light">{{ violation }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata[
                        'NIST SP800-131A (strict mode) non-compliant ciphers'
                      ]?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Non-compliance ciphers:
                    </div>
                    <ul>
                      <li
                        v-for="(cipher, cipherIndex) in evaluation.metadata[
                          'NIST SP800-131A (strict mode) non-compliant ciphers'
                        ]"
                        :key="cipherIndex"
                      >
                        <span class="font-color-light">{{ cipher }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata[
                        'FIPS 140-2 (NIST SP800-131A transition mode) violations'
                      ]?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Compliance violations:
                    </div>
                    <ul>
                      <li
                        v-for="(violation, violationIndex) in evaluation
                          .metadata[
                          'FIPS 140-2 (NIST SP800-131A transition mode) violations'
                        ]"
                        :key="violationIndex"
                      >
                        <span class="font-color-light">{{ violation }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata[
                        'FIPS 140-2 (NIST SP800-131A transition mode) non-compliant ciphers'
                      ]?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Non-compliance ciphers:
                    </div>
                    <ul>
                      <li
                        v-for="(cipher, cipherIndex) in evaluation.metadata[
                          'FIPS 140-2 (NIST SP800-131A transition mode) non-compliant ciphers'
                        ]"
                        :key="cipherIndex"
                      >
                        <span class="font-color-light">{{ cipher }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata['PCI DSS 3.2.1 violations']?.length >
                      0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Impacted requirements:
                    </div>
                    <ul>
                      <li
                        v-for="(violation, violationIndex) in evaluation
                          .metadata['PCI DSS 3.2.1 violations']"
                        :key="violationIndex"
                      >
                        <span class="font-color-light">{{ violation }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="
                      evaluation.metadata['PCI DSS 4.0 violations']?.length > 0
                    "
                  >
                    <div class="font-sm-sb margin-bottom-xxs nowrap">
                      Impacted requirements:
                    </div>
                    <ul>
                      <li
                        v-for="(violation, violationIndex) in evaluation
                          .metadata['PCI DSS 4.0 violations']"
                        :key="violationIndex"
                      >
                        <span class="font-color-light">{{ violation }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
            </div>
            <div
              class="col-12 d-flex flex-column padding-top-sm"
              v-if="evaluation?.compliance?.length > 0"
            >
              <h3
                class="font-base-sb font-color-light"
                v-if="evaluation?.compliance?.items"
              >
                Compliance
              </h3>
              <div :id="`complianceSection${evaluation?.key}`">
                <div
                  v-for="(compliance, index) in evaluation.compliance"
                  :key="index"
                >
                  <div>
                    {{ compliance.compliance }} {{ compliance.version }}
                    <div class="d-flex flex-wrap">
                      <div
                        class="w-100 font-sm-sb margin-bottom-xs"
                        v-if="compliance?.items?.length > 0"
                      >
                        Requiements
                      </div>
                      <template
                        v-for="(comp, compIndex) in compliance.items"
                        :key="compIndex"
                      >
                        <button
                          class="pill w-auto margin-right-xxs font-xs-sb"
                          data-bs-toggle="collapse"
                          type="button"
                          aria-expanded="false"
                          :data-bs-target="`#multiCollapseCompliance${
                            evaluation?.key
                          }-${comp?.requirement?.replace(/\./g, '-')}`"
                          :data-bs-parent="`#complianceSection${evaluation?.key}`"
                          :aria-controls="`multiCollapseCompliance${
                            evaluation?.key
                          }-${comp?.requirement?.replace(/\./g, '-')}`"
                          v-if="comp.requirement"
                        >
                          {{ comp.requirement }}
                        </button>
                      </template>
                    </div>

                    <div class="row margin-bottom-sm">
                      <div class="col">
                        <div
                          v-for="(comp, compIndex) in compliance.items"
                          :key="compIndex"
                          class="collapse multi-collapse"
                          :id="`multiCollapseCompliance${
                            evaluation?.key
                          }-${comp?.requirement?.replace(/\./g, '-')}`"
                          :data-bs-parent="`#complianceSection${evaluation?.key}`"
                        >
                          <div
                            v-if="comp.description"
                            class="card card-body bg-dark-40 font-xs"
                            v-html="comp.description"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 d-flex flex-column padding-top-sm">
              <div
                v-for="(group, groupIndex) in slicedThreats(evaluation)"
                :key="groupIndex"
              >
                <h3 class="font-base font-color-light margin-bottom-lg">
                  {{ group.standard }} {{ group.version }}
                </h3>
                <div class="d-flex flex-row flex-wrap hexagon-main">
                  <div class="hexagon-container">
                    <ThreatItem
                      v-for="(threatItem, threatIndex) in group.items"
                      :key="threatIndex"
                      :threat="threatItem"
                      :evalIndex="evalIndex"
                      :threatIndex="threatIndex"
                    />
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
import IconLink from "@/components/icons/IconLink.vue";
import IconTarget from "@/components/icons/IconTarget.vue";
import Dropdown from "@/components/general/Dropdown.vue";
import ThreatItem from "@/components/mitre/ThreatItem.vue";
import ThreatIcon from "@/components/icons/ThreatIcon.vue";
import IconCertificate from "@/components/icons/IconCertificate.vue";
</script>

<script>
export default {
  components: {
    IconLink,
    IconTarget,
    Dropdown,
    ThreatItem,
    ThreatIcon,
    IconCertificate,
  },
  props: ["evaluations", "results", "resultsFilter"],
  methods: {
    getMetadataKeyValues(evaluation) {
      console.log("evaluation.metadata", typeof evaluation.metadata);
      if (!evaluation.metadata) {
        return;
      }
      return evaluation.metadata.filter((key, value) => {
        if (key === "missing_paths") {
        }
      });
    },
    slicedThreats(evaluation) {
      if (!evaluation.threats || evaluation.threats.length === 0) {
        return [];
      }
      let groups = new Set();
      for (const threat of evaluation.threats) {
        groups.add([threat.standard, threat.version].toString());
      }
      let threatGroups = [];
      for (const group of [...groups]) {
        const threatGroup = {
          standard: group.split(",")[0],
          version: group.split(",")[1],
          items: [],
        };
        for (const threat of evaluation.threats) {
          if (group == [threat.standard, threat.version]) {
            threatGroup.items.push(threat);
          }
        }
        if (threatGroup.items.length > 0) {
          threatGroups.push(threatGroup);
        }
      }
      return [...threatGroups];
    },
  },
};
</script>

<style lang="scss">
.report-item {
  cursor: pointer;
  z-index: 10;
  height: 20px;
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

.filter-results {
  background: color("dark-60");
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
  @media (max-width: $breakpoint-lg) {
    top: 65px;
  }
}

.custom-checkbox {
  appearance: unset;
  width: 15px;
  height: 15px;
  background: color("light-20");
  transition: 0.2s linear;
  border-radius: 5px;
  cursor: pointer;

  &:checked {
    background: rgb(26, 187, 156);
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
      content: "\2713";
      color: color("dark");
      line-height: 15px;
      font-size: 10px;
    }
  }
}

.pre-line p {
  margin-bottom: 0;
}
</style>
