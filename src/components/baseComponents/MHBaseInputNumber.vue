<template>
    <span class="p-float-label">
        <InputNumber 
            id="number-input" 
            v-model="modelValue" 
            @input="$emit('update:value', $event.value)"
            inputId="withoutgrouping" 
            :useGrouping="false"
            showButtons
            :style="{ width: '100%' }"
            allowEmpty
            :min="0"
        />
        <label class="text-base" for="number-input">{{ label }}</label>
    </span>
</template>

<script setup lang="ts">

import InputNumber from 'primevue/inputnumber';
import { onMounted, ref, type Ref } from 'vue';
import { computed } from 'vue';

    const rules: Ref<any> = ref([]);

    const props = defineProps<{
        value: any | undefined,
        label: string,
        type?: string,
        required?: boolean;
    }>();

    let modelValue = computed(() => props.value);

    onMounted(async () => {
        if (props.required)
            rules.value.push((value: any) => !!value || 'Required.');
    })
</script>