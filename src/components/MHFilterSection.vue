<template>
    <section class="grid flex flex-row  align-items-center">
        <div class="my-2 mx-2" v-for="filter in filters">
            <div class="autocomplete-filter">
            <MHBaseAutocomplete
                v-if="filter.type === 'array'"
                v-model:value="values[filter.key]"
                :label="filter.label"
                :items="filter.items"
                :translation="filter.translation ?? undefined"
                :childFiltersCleared = childFiltersCleared
                @update:value = "(value) => valueChanged(filter.key, value)"
            />
            </div>
            <MHBaseInputNumber
                v-if="filter.type === 'number'"
                v-model:value="values[filter.key]"
                :label="filter.label"
                variant="outlined"
                @update:value="(value) => valueChanged(filter.key, value)"
            />
            <MHBaseTextField 
                class="search-field"
                v-else-if="filter.type === 'text'"
                v-model:value="values[filter.key]"
                :label="filter.label"
                @update:value = "(value) => valueChanged(filter.key, value)"
            />
            <div class="switch-container">
                <InputSwitch 
                    v-if="filter.type === 'switch'"
                    id = "inputSwitch"
                    v-model="values[filter.key]"
                    :label="filter.label"
                    @input="(value) => valueChanged(filter.key, value)"
                    
                />
                <label 
                    v-if="filter.type === 'switch'" 
                    for="inputSwitch" 
                    class="v-label v-label--clickable switch-label"
                >
                    {{filter.label}}
                </label>
            </div>
        </div>
        
        <BgBaseButton icon="pi pi-filter-slash" class="clear_button" @click="clearFilters" />
    </section>
</template>

<script setup lang="ts">

    import type { FilterStructure } from '@/Share/utils/filtersStructure';
    import { onMounted, ref, type Ref } from 'vue';
    import MHBaseTextField from '@/components/baseComponents/MHBaseTextField.vue';
    import MHBaseInputNumber from '@/components/baseComponents/MHBaseInputNumber.vue';
    import MHBaseAutocomplete from '@/components/baseComponents/MHBaseAutocomplete.vue';
    import InputSwitch from 'primevue/inputswitch';
    import BgBaseButton from '@/components/baseComponents/MHBaseButton.vue';

    let values: Ref<Record<string, any>> = ref({});
    let childFiltersCleared = ref(false);

    const props = defineProps<{
        filters: FilterStructure[],
        filtersCleared?: boolean
    }>();

    const emits = defineEmits<{
        (event: 'search'): void,
        (event: 'clearFilters'): void,
        (event: 'valueChanged', values: Record<string, any>): void,
    }>();

    const clearFilters = () =>  {
        setDefaultValues();
        childFiltersCleared.value = true;
        emits('clearFilters');
    }

    const search = () => {
        emits('search');
    }

    const valueChanged = (key: string, value: any) => {

        values.value[key] = value;
        let filter = props.filters.find(x => x.key === key)!;

        if (filter.type === "number" && ( values.value[filter.key] === "" ||  values.value[filter.key] === 0)) {
            delete  values.value[filter.key];
        }else if (filter.type === "switch" &&  values.value[filter.key] === false) {
            delete  values.value[filter.key];
        }
        
        emits("valueChanged",  values.value);
        childFiltersCleared.value = false;
    }

    onMounted(() => {
        setDefaultValues();
    });

    const setDefaultValues = () => {
        props.filters.forEach(f => {
            values.value[f.key] = f.defaultValue;
        });
    }
</script>
<style scoped>
.switch-container {
    display: flex;
    align-items: center;
}

.switch-label {
    margin-left: 0.4em;
}

.search-field{
    min-width: 20rem;
}

.clear_button{
    margin-left: 1em;
}
</style>