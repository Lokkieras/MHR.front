<template>
<div v-if="showOverlay" class="spinner-container">
    <div class="spinner-overlay"></div>
    <div class="spinner-content">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">

    import { computed } from 'vue';
    import ProgressSpinner from 'primevue/progressspinner';

    let props = defineProps<{
        overlay: boolean
    }>();

    let showOverlay = computed( () => props.overlay )
</script>

<style lang="scss" scoped>
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.spinner-content {
  z-index: 1;
}

</style>