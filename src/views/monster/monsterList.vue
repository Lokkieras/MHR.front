<template>
  <div class="flex justify-content-between mb-2">
      <MHFilterSection
        :filters="filters"
        @valueChanged="updateFilters"
        @clearFilters="clearFilters"
      />
      <BgBaseButton icon="pi pi-users" @click="routerNavigationCreate" :label="$t('monsters.add')"/>
    </div>
      <MHTableWithPagination
        :count="totalCount" 
        :items="monsters" 
        :loading="loading" 
        :structure="MONSTER_STRUCTURE" 
        :size="size" 
        @pageChanged="updatePage"
        @rowSelect="routerNavigationDetails" 
      />
</template>
    
<script setup lang="ts">
    import { onMounted, computed, onBeforeUnmount, ref, type Ref } from 'vue';
    import monsterState  from '../../application/monster';
    import { useI18n } from 'vue-i18n';
    import { SearchMonster } from '@/domain/monster/searchMonster';
    import { useRouter } from 'vue-router';
    import MHFilterSection from '@/components/MHFilterSection.vue';
    import MHTableWithPagination from '@/components/tables/MHTableWithPagination.vue';
    import { MONSTER_STRUCTURE }  from './configs/ColumnsTable';
    import { MONSTER_FILTERS }  from './configs/FiltersConfig';
    import type { FilterStructure } from '@/Share/utils/filtersStructure';
    import BgBaseButton from '@/components/baseComponents/MHBaseButton.vue';
    import type { Monster } from '@/domain/monster/monster';
    import headerState from "@/application/header";
    
    let size = 10;
    let filterstruct: Ref<FilterStructure[]> = ref(MONSTER_FILTERS)
    let searchTimeout: any = null;
    let monsters = computed(() => monsterList.value.map(monster => ({ ...monster })))
    let filters = computed(() =>  filterstruct.value.map(f => ({...f, label: t(`${f.label}`) })));

    const { t } = useI18n();
    const { tryGetAllMonsters, resetState, monsterList, filter, totalCount } = monsterState();
    const loading = ref(false);
    const router = useRouter();
    const { setHeaderMessage, resetHeaderState } = headerState();

    const getMonsterFiltered = async (filter: Ref<SearchMonster>) => {
      try {
        await tryGetAllMonsters(filter.value);
      } catch (error) {
        console.error(error)
      }
    }

    const clearFilters = () => {
      filter.value = new SearchMonster();
      search(null);
    }

    const routerNavigationDetails = (monster: Monster) => {
        router.push({ path: `/monsters/${monster.id}`});
    };

    const updateFilters = (values: Record<string, any>) => {
      filter.value.id = values["id"];
      filter.value.tag = values["tag"]?.id;

      if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        loading.value = true;
        searchTimeout = setTimeout(() => {
            search(null);
            loading.value = false;
        }, 1000);
    }

    const search = (event:any) => {
          loading.value = true;
          setTimeout(() => {
            filter.value.size = event == null ? size : event.rows;
            filter.value.page = event == null ? 1 : event.page + 1;
            getMonsterFiltered(filter);
            loading.value = false;
        });
    }

    const updatePage = (event:any) => {
        size = event.rows;
        search(event);
    };

    onMounted(async () => {
      setHeaderMessage(t("monsters.title"));
      filter.value.size = size;
      filter.value.page = 1;
      search(null);
    });

    onBeforeUnmount(() => {
      resetState();
      resetHeaderState();
      if (searchTimeout) {
          clearTimeout(searchTimeout);
      }
    })

    function routerNavigationCreate(){
      router.push({ name: "newMonsters"});
    };

</script>
    
<style src="./monsterList.scss"/>
    
   