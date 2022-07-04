<template>
  <div class="custom-layout">
    <div class="container mx-auto">
      Some *custom* layout
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
</script>
