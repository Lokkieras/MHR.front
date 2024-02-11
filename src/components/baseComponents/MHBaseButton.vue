<template>
        <Button 
            :icon="icon"
            @click="click"
            :disabled="disabled"
            :label="label"
        />
</template>

<script lang="ts" setup>

    import 'primeicons/primeicons.css';
    import Button from 'primevue/button';

    const props = defineProps<{
        label?: string;
        icon?: string;
        submit?: boolean;
        disabled?: boolean;
    }>();

    let emits = defineEmits<{
        (event: 'action-click'): void
    }>();

    let click = () => {
        emits('action-click');
    }
</script>