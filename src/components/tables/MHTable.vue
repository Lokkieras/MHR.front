<template>
  <div class="box-table">
    <v-table class="monster-table pr-4 pl-4" fixed-header density="default">
      <thead class="table-header">
        <tr class="table-header">
          <th class="text-left " v-for="struct in structure.datastructure" 
            :style="`width: ${(struct.width ?? minWidth)}px; max-width: ${(struct.width ?? minWidth)}px; min-width: ${(struct.width ?? minWidth)}px;`">
            {{ $t(struct.columnName) }}
          </th>
          <th :style="`width: ${(btnMinWidth)}px; max-width: ${( btnMinWidth)}px; min-width: ${(btnMinWidth)}px;`"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">

          <td v-for="struct in structure.datastructure"
          :style="`width: ${(struct.width ?? minWidth)}px; max-width: ${(struct.width ?? minWidth)}px; min-width: ${(struct.width ?? minWidth)}px;`">
            {{ item[struct.prop] }} 
          </td>
          <td  :style="`width: ${(btnMinWidth)}px; max-width: ${( btnMinWidth)}px; min-width: ${(btnMinWidth)}px;`">
            <slot :id="item.id" :item="item" ></slot>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import type { TableStructure } from '@/Share/utils/tableStructure';

    const minWidth = 100;
    const btnMinWidth = 2;
    const props = defineProps<{
        structure: TableStructure,
        items: any[],
    }>();


</script>

<style lang="scss" scoped>
  
</style>