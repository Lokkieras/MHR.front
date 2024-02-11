<template>
    <Checkbox 
        inputId = "checkbox"
        binary
        v-model="selectedValue" 
        @update:model-value="updateSelectedValue()"
    />
    <label class="ml-3 text-base" for= "checkbox">{{ label }}</label>
</template>

<script setup lang="ts">
    import { ref, type Ref, watchEffect } from 'vue';
    import Checkbox from 'primevue/checkbox';
    
    let selectedValue: Ref<any> = ref();

    const props = defineProps<{
        value?: boolean,
        label: string,
    }>();

    const emits = defineEmits<{
        (event: 'update:value', value: any): void
    }>();
    
    watchEffect(() => {
        selectedValue.value = props.value ? props.value : false;
    });

    const updateSelectedValue = () => {
        emits('update:value', selectedValue.value);
    }
</script>

<style lang="scss" scoped>

</style>