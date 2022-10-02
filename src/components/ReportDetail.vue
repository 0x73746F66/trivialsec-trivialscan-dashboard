<script setup>
import ReportSection from "./ReportSection.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
</script>

<template>
  <ReportSection>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    summary
  </ReportSection>

  <ReportSection>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    More info
  </ReportSection>

  <ReportSection>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    mammal
  </ReportSection>

  <ReportSection>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Ants
  </ReportSection>

  <ReportSection>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    Bra
  </ReportSection>
</template>
