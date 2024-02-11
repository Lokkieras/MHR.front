<template>
    <div>
        <span class="p-float-label">
            <InputText
                id = "inputText"
                v-model="modelValue" 
                @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
                @update:value="valueChanged"
                @update="valueChanged"
            />
            <label class="labelSize" for = "inputText">{{ label }}</label>
        </span>
    </div>
</template>

<style lang="scss" scoped>

.labelSize{
  font-size: 12px;
}

</style>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { onMounted, ref, type Ref } from 'vue';
import { computed } from 'vue';

    const rules: Ref<any> = ref([]);

    const props = defineProps<{
        value: any,
        label: string,
        type?: string,
        required?: boolean;
    }>();

    const emits = defineEmits<{
        (event: 'update:value', value: any): void
    }>();

    const valueChanged = (value : any) => {
        emits('update:value', value);
    }

    let modelValue = computed(() => props.value);

    onMounted(async () => {
        if (props.required)
            rules.value.push((value: any) => !!value || 'Required.');
    })
</script>