<template>
    <DataTable 
      selectionMode="single" 
      :value="items" 
      lazy
      :totalRecords="count" 
      paginator 
      :rows="size" 
      :rowsPerPageOptions="[5, 10, 20, 50]" 
      tableStyle="min-width: 50rem"
      :loading="loading"
      @rowSelect="rowSelect"
      @page="pageChanged"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
      :currentPageReportTemplate="`{first} - {last} ${$t('pagination.count')} {totalRecords}`"
    >
    <Column 
      v-for="col of structure.datastructure" 
      :key="col.prop" 
      :field="col.prop" 
      :header=$t(col.columnName)>
    </Column>
    </DataTable>
</template>

<script setup lang="ts">

import type { TableStructure } from '@/Share/utils/tableStructure';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
    
const props = defineProps<{
        structure: TableStructure,
        loading?: boolean,
        items: any[],
        size: number,
        count: number
    }>();

    const emit = defineEmits<{
      (event: 'pageChanged', page: number): void
      (event: 'rowSelect', value: any): void
      (event: 'openDeleteModal', value: number): void
      (event: 'openCreationModal', value: any): void
    }>()

    function pageChanged(page: number) {
      emit('pageChanged', page);
    }

    function rowSelect(event: any) {
      emit('rowSelect', event.data);
    }

    function openDeleteModal(id: number) {
      emit('openDeleteModal', id);
    }

    function openCreationModal(value: any) {
      emit('openCreationModal', value);
    }
</script>