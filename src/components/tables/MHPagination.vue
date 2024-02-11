<template>
    <div class="text-center">
        <v-container>
        <v-row justify="center">
            <v-col cols="8 pa-0">
                <v-container class="pagination ma-0 pa-0">
                    <v-pagination
                        v-model="pageValue"
                        :length="paginationLength"
                        :total-visible="5"
                        @update:value="pageChanged"
                    />
                    <div>
                        {{ `${actualFrom} - ${actualTo} ${$t("pagination.count")} ${count}` }}
                    </div>
                </v-container>
            </v-col>
        </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    const props = defineProps<{
        page: number;
        size: number,
        count: number
    }>();
    
    const emits = defineEmits<{
      (event: 'pageChanged', page: number): void
    }>();

    function pageChanged(value: number) {
      emits('pageChanged', value);
    }

    let pageValue = ref(1);
    let paginationLength = computed(() =>  Math.ceil(props.count/props.size));
    let actualFrom = computed(() =>  (props.page-1)*props.size+1);
    let actualTo = computed(() =>  { 
        let value = ((props.page-1)*props.size) + props.size;

        if (value > props.count) value = props.count;
        
        return value;
    });

</script>

<style lang="scss" scoped>

.pagination{
    display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	align-content: center;
}
</style>