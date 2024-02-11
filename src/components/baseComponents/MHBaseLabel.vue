<template>
    <div class="label-container">
        <p class="title-text-details">{{ label }}</p>
        <p class="text-subtitle-1">{{value}}</p>
    </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
        value: any,
        label: string,
    }>();
</script>


<style lang="scss" scoped>

    .title-text-details{
        font-weight: 700;
        font-size: medium;
        font-family: sans-serif;
        color: var(--primary-color);
    }
</style>