<template>
  <div
    class="col-12 col-lg-6 font-sm font-color-light d-flex flex-column margin-top-sm"
  >
    <div class="d-flex" v-if="metadata['abuse.sh']">
      <span class="font-sm-sb margin-right-xxs nowrap">abuse.sh </span
      ><span>{{ metadata["abuse.sh"] }}</span>
    </div>
    <div class="d-flex" v-if="metadata.reason">
      <span class="font-sm-sb margin-right-xxs nowrap">Reason:</span
      ><span>{{ metadata.reason }}</span>
    </div>
    <div class="d-flex" v-if="metadata.crime_cbc">
      <span class="font-sm-sb margin-right-xxs nowrap">Results:</span
      ><span>{{ metadata.crime_cbc }}</span>
    </div>
    <div class="d-flex" v-if="metadata.tls_robot">
      <span class="font-sm-sb margin-right-xxs nowrap">Results:</span
      ><span>{{ metadata.tls_robot }}</span>
    </div>
    <div class="d-flex" v-if="metadata.chain_validation_result">
      <span class="font-sm-sb margin-right-xxs nowrap">Results:</span
      ><span>{{ metadata.chain_validation_result }}</span>
    </div>
    <div class="d-flex" v-if="metadata.key_usage">
      <span class="font-sm-sb margin-right-xxs nowrap">Key Usage:</span
      ><span>{{ metadata.key_usage.join(", ") }}</span>
    </div>
    <div class="d-flex" v-if="metadata.extended_key_usage">
      <span class="font-sm-sb margin-right-xxs nowrap">Extended Key Usage:</span
      ><span>{{ metadata.extended_key_usage.join(", ") }}</span>
    </div>
    <div v-if="metadata.offered_strong_ciphers">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Offered Not known 'weak' Ciphers:
      </div>
      <ul>
        <li
          v-for="(cipher, cipherIndex) in metadata.offered_strong_ciphers.split(
            ' ',
          )"
          :key="cipherIndex"
        >
          <span class="font-color-light">{{ cipher }}</span>
        </li>
      </ul>
    </div>
    <div v-if="metadata.offered_weak_ciphers">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Offered 'Weak' Ciphers:
      </div>
      <ul>
        <li
          v-for="(cipher, cipherIndex) in metadata.offered_weak_ciphers.split(
            ' ',
          )"
          :key="cipherIndex"
        >
          <span class="font-color-light">{{ cipher }}</span>
        </li>
      </ul>
    </div>
    <div v-if="metadata.offered_cbc_ciphers">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Offered CBC Ciphers:
      </div>
      <ul>
        <li
          v-for="(cipher, cipherIndex) in metadata.offered_cbc_ciphers.split(
            ' ',
          )"
          :key="cipherIndex"
        >
          <span class="font-color-light">{{ cipher }}</span>
        </li>
      </ul>
    </div>
    <div v-if="metadata.offered_rc4_ciphers">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Offered RC4 Ciphers:
      </div>
      <ul>
        <li
          v-for="(cipher, cipherIndex) in metadata.offered_rc4_ciphers.split(
            ' ',
          )"
          :key="cipherIndex"
        >
          <span class="font-color-light">{{ cipher }}</span>
        </li>
      </ul>
    </div>
    <div class="margin-top-sm" v-if="metadata.negotiated_cipher">
      <div class="font-sm-b margin-right-xxs">TLS Negotiated</div>
      <div class="margin-right-xxs nowrap" v-if="metadata.negotiated_cipher">
        <span class="font-sm-sb margin-right-xxs">Cipher:</span
        ><span>{{ metadata.negotiated_cipher }}</span>
      </div>
      <div
        class="margin-right-xxs nowrap"
        v-if="metadata.negotiated_cipher_bits"
      >
        <span class="font-sm-sb margin-right-xxs">Cipher bits:</span
        ><span>{{ metadata.negotiated_cipher_bits }}</span>
      </div>
    </div>
    <div v-if="metadata.missing_paths">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        HTTP paths missing the header:
      </div>
      <ul>
        <li
          v-for="(http_path, pathIndex) in metadata.missing_paths"
          :key="pathIndex"
        >
          <a
            class="font-color-primary font-sm word-break text-decoration-none"
            :href="`https://${transport.hostname}:${transport.port}${http_path}`"
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
        metadata.certificate_version ||
        metadata.certificate_subject ||
        metadata.sha1_fingerprint
      "
    >
      <span class="font-sm-b margin-right-xxs">Certificate</span>
      <div
        class="d-flex margin-right-xxs nowrap"
        v-if="metadata.certificate_version"
      >
        <span>version {{ metadata.certificate_version }}</span>
      </div>
    </div>
    <div class="d-flex" v-if="metadata.public_key_size">
      <span class="font-sm-sb margin-right-xxs nowrap">Public Key:</span
      >{{ metadata.public_key_type }}{{ metadata.public_key_size }}
    </div>
    <div class="d-flex" v-if="metadata.expiry_status">
      <span>{{ metadata.expiry_status }}</span>
    </div>
    <a
      v-if="metadata.certificate_subject && metadata.sha1_fingerprint"
      class="font-color-secondary font-sm word-break"
      :href="`/certificate/${metadata.sha1_fingerprint}`"
    >
      <IconCertificate color="e2c878" class="cert-icon margin-right-xxs" />
      <span title="See Certificate details">
        {{ metadata.certificate_subject }}
      </span>
    </a>
    <a
      v-else-if="metadata.sha1_fingerprint"
      class="font-color-secondary font-sm word-break"
      :href="`/certificate/${metadata.sha1_fingerprint}`"
    >
      <IconCertificate color="e2c878" class="cert-icon margin-right-xxs" />
      <span title="See Certificate details">
        {{ metadata.sha1_fingerprint }}
      </span>
    </a>
    <div class="margin-top-sm" v-if="metadata.revocation_ocsp_status">
      <div class="font-sm-b margin-right-xxs">Revocation</div>
      <div
        class="margin-right-xxs nowrap"
        v-if="metadata.revocation_ocsp_status"
      >
        <span class="font-sm-sb margin-right-xxs">OCSP Status:</span
        ><span>{{ metadata.revocation_ocsp_status }}</span>
      </div>
      <div
        class="margin-right-xxs nowrap"
        v-if="metadata.revocation_ocsp_response"
      >
        <span class="font-sm-sb margin-right-xxs">OCSP Response:</span
        ><span>{{ metadata.revocation_ocsp_response }}</span>
      </div>
      <div
        class="margin-right-xxs nowrap"
        v-if="metadata.revocation_ocsp_reason"
      >
        <span class="font-sm-sb margin-right-xxs">OCSP Reason:</span
        ><span>{{ metadata.revocation_ocsp_reason }}</span>
      </div>
      <div class="margin-right-xxs nowrap" v-if="metadata.revocation_ocsp_time">
        <span class="font-sm-sb margin-right-xxs">OCSP Time:</span
        ><span>{{ metadata.revocation_ocsp_time }}</span>
      </div>
    </div>
    <div class="margin-top-sm" v-if="metadata.certificate_transparency_status">
      <div class="font-sm-b margin-right-xxs">Certificate Transparency</div>
      <div
        class="margin-right-xxs nowrap"
        v-if="metadata.certificate_transparency_status"
      >
        <span class="font-sm-sb margin-right-xxs">Status:</span
        ><span>{{ metadata.certificate_transparency_status }}</span>
      </div>
      <div
        class="margin-right-xxs nowrap"
        v-if="metadata.certificate_transparency_description"
      >
        <span class="font-sm-sb margin-right-xxs">Description:</span
        ><span>{{ metadata.certificate_transparency_description }}</span>
      </div>
    </div>
    <div v-if="metadata.long_handshake_intolerance_versions?.length > 0">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Long handshake intolerance:
      </div>
      <ul>
        <li
          v-for="(
            version, versionIndex
          ) in metadata.long_handshake_intolerance_versions"
          :key="versionIndex"
        >
          <span class="font-color-light">{{ version }}</span>
        </li>
      </ul>
    </div>
    <div v-if="metadata.tls_version_interference_versions?.length > 0">
      <div class="font-sm-sb margin-bottom-xxs nowrap">TLS Interference:</div>
      <ul>
        <li
          v-for="(
            version, versionIndex
          ) in metadata.tls_version_interference_versions"
          :key="versionIndex"
        >
          <span class="font-color-light">{{ version }}</span>
        </li>
      </ul>
    </div>
    <div v-if="metadata.tls_version_intolerance_versions?.length > 0">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        TLS Version Intolerance:
      </div>
      <ul>
        <li
          v-for="(
            version, versionIndex
          ) in metadata.tls_version_intolerance_versions"
          :key="versionIndex"
        >
          <span class="font-color-light">{{ version }}</span>
        </li>
      </ul>
    </div>
    <div v-if="metadata['FIPS 140-2 Annex A violations']?.length > 0">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Compliance violations:
      </div>
      <ul>
        <li
          v-for="(violation, violationIndex) in metadata[
            'FIPS 140-2 Annex A violations'
          ]"
          :key="violationIndex"
        >
          <span class="font-color-light">{{ violation }}</span>
        </li>
      </ul>
    </div>
    <div
      v-if="metadata['FIPS 140-2 Annex A non-compliance ciphers']?.length > 0"
    >
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Non-compliance ciphers:
      </div>
      <ul>
        <li
          v-for="(cipher, cipherIndex) in metadata[
            'FIPS 140-2 Annex A non-compliance ciphers'
          ]"
          :key="cipherIndex"
        >
          <span class="font-color-light">{{ cipher }}</span>
        </li>
      </ul>
    </div>
    <div
      v-if="metadata['NIST SP800-131A (strict mode) violations']?.length > 0"
    >
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Compliance violations:
      </div>
      <ul>
        <li
          v-for="(violation, violationIndex) in metadata[
            'NIST SP800-131A (strict mode) violations'
          ]"
          :key="violationIndex"
        >
          <span class="font-color-light">{{ violation }}</span>
        </li>
      </ul>
    </div>
    <div
      v-if="
        metadata['NIST SP800-131A (strict mode) non-compliant ciphers']
          ?.length > 0
      "
    >
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Non-compliance ciphers:
      </div>
      <ul>
        <li
          v-for="(cipher, cipherIndex) in metadata[
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
        metadata['FIPS 140-2 (NIST SP800-131A transition mode) violations']
          ?.length > 0
      "
    >
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Compliance violations:
      </div>
      <ul>
        <li
          v-for="(violation, violationIndex) in metadata[
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
        metadata[
          'FIPS 140-2 (NIST SP800-131A transition mode) non-compliant ciphers'
        ]?.length > 0
      "
    >
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Non-compliance ciphers:
      </div>
      <ul>
        <li
          v-for="(cipher, cipherIndex) in metadata[
            'FIPS 140-2 (NIST SP800-131A transition mode) non-compliant ciphers'
          ]"
          :key="cipherIndex"
        >
          <span class="font-color-light">{{ cipher }}</span>
        </li>
      </ul>
    </div>
    <div v-if="metadata['PCI DSS 3.2.1 violations']?.length > 0">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Impacted requirements:
      </div>
      <ul>
        <li
          v-for="(violation, violationIndex) in metadata[
            'PCI DSS 3.2.1 violations'
          ]"
          :key="violationIndex"
        >
          <span class="font-color-light">{{ violation }}</span>
        </li>
      </ul>
    </div>
    <div v-if="metadata['PCI DSS 4.0 violations']?.length > 0">
      <div class="font-sm-sb margin-bottom-xxs nowrap">
        Impacted requirements:
      </div>
      <ul>
        <li
          v-for="(violation, violationIndex) in metadata[
            'PCI DSS 4.0 violations'
          ]"
          :key="violationIndex"
        >
          <span class="font-color-light">{{ violation }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import IconCertificate from "@/components/icons/IconCertificate.vue";
</script>

<script>
export default {
  components: {
    IconCertificate,
  },
  props: ["metadata", "transport"],
};
</script>

<style scoped lang="scss"></style>
