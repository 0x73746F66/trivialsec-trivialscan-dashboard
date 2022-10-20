<script setup>
import ReportSection from "./ReportSection.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
</script>

<script>
export default {
  props: [
    "generator",
    "version",
    "account_name",
    "client_name",
    "project_name",
    "targets",
    "date",
    "execution_duration_seconds",
    "score",
    "results",
    "certificates",
    "results_uri",
    "config",
    "flags",
    "evaluations",
  ],
};
</script>

<template>
  <div v-if="generator">
    <p>generator {{ generator }}</p>
  </div>
  <div v-if="version">
    <p>version {{ version }}</p>
  </div>
  <div v-if="client_name">
    <p>client_name {{ client_name }}</p>
  </div>
  <div v-if="date">
    <p>date {{ date }}</p>
  </div>
  <div v-if="project_name">
    <p>project_name {{ project_name }}</p>
  </div>
  <div v-if="execution_duration_seconds">
    <p>execution_duration_seconds {{ execution_duration_seconds }}</p>
  </div>
  <div v-if="targets" v-for="target in targets">
    <p>
      target
      <a :href="'/hostname/' + target.split(':').join('/')">{{ target }}</a>
    </p>
  </div>
  <div v-if="score">
    <p>score {{ score }}</p>
  </div>
  <div v-if="results">
    <p>fail {{ results.fail }}</p>
    <p>warn {{ results.warn }}</p>
    <p>pass {{ results.pass }}</p>
    <p>info {{ results.info }}</p>
  </div>
  <div v-if="certificates" v-for="cert in certificates">
    <p>
      certificate <a :href="'/certificate/' + cert">{{ cert }}</a>
    </p>
  </div>

  <div v-if="evaluations" v-for="evaluation in evaluations">
    <ReportSection v-bind="evaluation">
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading
        >{{ evaluation.rule_id }} {{ evaluation.name }}</template
      >

      <p>group {{ evaluation.group }} ({{ evaluation.group_id }})</p>
      <p>{{ evaluation.description }}</p>
      <div v-if="evaluation.references">
        <div>References</div>
        <ul>
          <li v-for="reference in evaluation.references">
            <a :href="reference.url">{{ reference.name }}</a>
          </li>
        </ul>
      </div>
      <p>{{ evaluation.result_level }}: {{ evaluation.result_label }}</p>
      <p>evaluation rule result: {{ evaluation.result_value }}</p>
      <p>score modifier: {{ evaluation.score }}</p>
      <p v-if="evaluation.metadata.reason">
        Reason: {{ evaluation.metadata.reason }}
      </p>
      <p v-if="evaluation.cvss2">
        <a
          :href="
            'https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator?vector=(' +
            evaluation.cvss2 +
            ')'
          "
          >CVSSv2</a
        >
      </p>
      <p v-if="evaluation.cvss3">
        <a
          :href="
            'https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?version=3.1&vector=' +
            evaluation.cvss3
          "
          >CVSSv3</a
        >
      </p>
      <div v-if="evaluation.cve">
        <div>CVE</div>
        <ul>
          <li v-for="cve in evaluation.cve">
            <a :href="'https://nvd.nist.gov/vuln/detail/' + cve">{{ cve }}</a>
          </li>
        </ul>
      </div>
      <div v-if="evaluation.metadata">
        <div>Results Metadata</div>
        <ul>
          <template v-for="(metadata, metadata_key) in evaluation.metadata">
            <template v-if="metadata_key === 'reason'"></template>
            <li v-else>
              <strong>{{ metadata_key }}</strong> {{ metadata }}
            </li>
          </template>
        </ul>
      </div>
      <div v-if="evaluation.compliance">
        <div>Compliance</div>
        <ul>
          <li v-for="compliance in evaluation.compliance">
            {{ compliance.compliance }} {{ compliance.version }}
            <p v-if="compliance.requirement">
              <strong>Requirement</strong> {{ compliance.requirement }}
            </p>
            <p v-if="compliance.description">{{ compliance.description }}</p>
          </li>
        </ul>
      </div>
      <div v-if="evaluation.threats">
        <div>threats</div>
        <ul>
          <li v-for="threat in evaluation.threats">
            {{ threat.standard }} {{ threat.version }}
            <p v-if="threat.tactic_url">
              tactic:
              <a :href="threat.tactic_url"
                >{{ threat.tactic_id }} {{ threat.tactic }}</a
              >
            </p>
            <p v-if="threat.description">{{ threat.description }}</p>
            <p v-if="threat.data_source_url">
              data source:
              <a :href="threat.data_source_url"
                >{{ threat.data_source_id }} {{ threat.data_source }}</a
              >
            </p>
            <p v-if="threat.technique_url">
              technique:
              <a :href="threat.technique_url"
                >{{ threat.technique_id }} {{ threat.technique }}</a
              >
            </p>
            <p v-if="threat.technique_description">
              {{ threat.technique_description }}
            </p>
            <p v-if="threat.sub_technique_url">
              sub technique:
              <a :href="threat.sub_technique_url"
                >{{ threat.sub_technique_id }} {{ threat.sub_technique }}</a
              >
            </p>
            <p v-if="threat.sub_technique_description">
              {{ threat.sub_technique_description }}
            </p>
          </li>
        </ul>
      </div>
    </ReportSection>
  </div>
</template>
