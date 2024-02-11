<template>
    <BGHeaderMenu class="header" :title='$t("monster.title")'/>
    <main class="mx-4">
        <router-view :key="$route.fullPath" class="mx-4" />
    </main>
    <div class="text-center">
        <Message v-if="show" :severity="severity">
            <p> {{ message }}</p>
        </Message>
    </div>
  <ConfirmDialog/>
  <MHLoader :overlay="loading" />
</template>

<script setup lang="ts">
    import loadingState from "@/application/loadingState"
    import BGHeaderMenu from "@/components/MHHeaderMenu.vue";
    import MHLoader from "@/components/MHLoader.vue";
    import messageState from "@/application/messageState";
    import Message from 'primevue/message';
    import ConfirmDialog from 'primevue/confirmdialog';

    const { loading } = loadingState();
    const { show, message, severity } = messageState();

</script>

