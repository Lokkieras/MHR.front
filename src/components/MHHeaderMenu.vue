<template>
<header class="menu-header mb-4">
    
  <Menubar :model="items" />

</header> 
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { useI18n } from "vue-i18n";
  import Menubar from 'primevue/menubar';

  const router = useRouter();
  const { t } = useI18n();

  const items = ref([
    {
        label: t('principalNav.monsters'),
        icon: 'pi pi-home',
        command: () => {
          router.push({ name: "monster"})
        }
    }
]);
</script>
