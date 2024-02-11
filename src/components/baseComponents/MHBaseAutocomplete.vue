<template>
  <div>
    <span class="p-float-label w-full">
      <AutoComplete 
        class="w-full"
        v-model="selectedOptionDisplay" 
        inputId="ac"
        dropdown 
        @update:model-value="handleSelect"
        :multiple="multiple"    
        :disabled="disabled"
        :optionLabel="filterKey"  
        :suggestions="filteredOptions"
        :readonly="readonly"
        :virtualScrollerOptions="{ itemSize: itemsSize }"
        @complete="filterOptions"
        :inputClass="{ 'p-error': errorMessages }"
      />
      <label for="ac">{{ label }}</label>
    </span>
    <label class="p-error">{{ errorMessages }}</label>
  </div>
</template>

<script setup lang="ts">
  import { type Ref, ref, onMounted, watch, toRefs, computed, nextTick } from 'vue';
  import AutoComplete from 'primevue/autocomplete';
  import { useI18n } from 'vue-i18n';

  const props = withDefaults(defineProps<{
      value: any,
      items: any[],
      label: string,
      filterKey?: string,
      disabled?: boolean,
      multiple?: boolean,
      readonly?: boolean,
      errorMessages?: string,
      translation?: string,
      childFiltersCleared?: boolean
  }>(), {
    filterKey: "name"
  });

  const itemsSize = 50;
  let { items } = toRefs(props);
  let selectedOption: Ref<any> = ref(null);
  let selectedOptionDisplay: Ref<any> = ref(null);
  let searchQuery = ref('');
  let forceSearch = ref(0);

  const emits = defineEmits<{
    (event: 'update:value', value: any): void
  }>();

  let optionsDisplay = computed(() => {

    if (!props.translation) return items.value;
    
    return items.value.map(item => ({
      ...item,
      name: useI18n().t(`${props.translation}.${item.name}`)
    }));
  });

  let filteredOptions = computed(() => {
    forceSearch.value++;

    if (searchQuery.value) {
      return optionsDisplay.value.filter((option: any) => 
        option.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    } else {
      return optionsDisplay.value.filter((option: any) => true);
    }
  });
  
  let isPropsValueReady = ref(false);
  let isItemsReady = ref(false);

  watch(
    () => props.value,
    async (newValue: any) => {
      await nextTick(); 
        isPropsValueReady.value = true;
        selectedOption.value = newValue;
        update();
    },
    {immediate: true}
  );

  watch(
    () => props.items,
    async () => {
      await nextTick(); 
      if (props.items && props.items.length > 0) {
        isItemsReady.value = true;
        update();
      }
    }
  );

  watch(
    () => props.childFiltersCleared,
    (newValue) => {
      if (newValue) {
        selectedOption.value = undefined;
        selectedOptionDisplay.value = undefined;
      }
    }
  );

  const update = () => {
    if (isPropsValueReady.value && isItemsReady.value && props.value) {
      
      let translatedOption = props.multiple ? 
        optionsDisplay.value.filter(option => selectedOption.value.find((s: any) => s.id === option.id)) :
        optionsDisplay.value.find(option => option.id === selectedOption.value.id);


      if (translatedOption) {   
        selectedOptionDisplay.value = translatedOption;
      }

    } else {
      selectedOptionDisplay.value = undefined;
    }
  }

  function filterOptions(event: any) {
    searchQuery.value = event.query;
    forceSearch.value++;
  }

  function handleSelect(event: any) {
    if (event && (event.id || props.multiple)) {
      
      selectedOption.value = props.multiple ? 
        items.value.filter(item => event.find((e:any) => e.id === item.id)) :
        items.value.find(item => item.id === event.id);
      
      emits('update:value', event);
    }
  }

</script>
<style scoped>
</style>