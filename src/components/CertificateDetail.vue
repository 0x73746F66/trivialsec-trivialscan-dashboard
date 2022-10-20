<script>
export default {
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
};
</script>
<template>
  <template v-if="external_refs">
    external references
    <ul>
      <li v-for="(ref_url, ref_name) in external_refs">
        <a :href="ref_url">{{ ref_name }}</a>
      </li>
    </ul>
  </template>
  <div v-if="version">version {{ version }}</div>
  <div v-if="type">type {{ type }}</div>
  <div v-if="validation_level">
    validation_level {{ validation_level }} (OID: {{ validation_oid }})
  </div>
  <div v-if="expiry_status">
    {{ expiry_status }}
  </div>
  <div v-if="not_after">not_after {{ not_after }}</div>
  <div v-if="not_before">not_before {{ not_before }}</div>
  <div v-if="subject">subject {{ subject }}</div>
  <div v-if="authority_key_identifier">AKI: {{ authority_key_identifier }}</div>
  <div v-if="subject_key_identifier">SKI: {{ subject_key_identifier }}</div>
  <div v-if="issuer">issuer {{ issuer }}</div>
  <div v-if="is_self_signed">Self signed</div>
  <div v-if="known_compromised">known to be compromised</div>
  fingerprints:
  <div v-if="md5_fingerprint">md5 {{ md5_fingerprint }}</div>
  <div v-if="sha1_fingerprint">sha1 {{ sha1_fingerprint }}</div>
  <div v-if="sha256_fingerprint">sha256 {{ sha256_fingerprint }}</div>
  <div v-if="spki_fingerprint">SPKI {{ spki_fingerprint }}</div>
  <div v-if="public_key_curve">public_key_curve{{ public_key_curve }}</div>
  <div v-if="public_key_exponent">
    public_key_exponent {{ public_key_exponent }}
  </div>
  <div v-if="public_key_modulus">
    public_key_modulus {{ public_key_modulus }}
  </div>
  <div v-if="public_key_size">public_key_size {{ public_key_size }}</div>
  <div v-if="public_key_type">public_key_type {{ public_key_type }}</div>
  <div v-if="revocation_crl_urls">
    revocation_crl_urls {{ revocation_crl_urls }}
  </div>
  <div v-if="serial_number">serial_number {{ serial_number }}</div>
  <div v-if="serial_number_decimal">
    serial_number_decimal {{ serial_number_decimal }}
  </div>
  <div v-if="serial_number_hex">serial_number_hex {{ serial_number_hex }}</div>
  <div v-if="signature_algorithm">
    signature_algorithm {{ signature_algorithm }}
  </div>

  <div v-if="extensions">extensions: {{ extensions }}</div>
</template>
