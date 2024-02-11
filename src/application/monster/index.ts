import type { MonsterState } from '@/domain/monster/monsterState';
import { SearchMonster } from '@/domain/monster/searchMonster';
import { getAllMonsters } from '@/infraestructure/monster/monster';

import { reactive, toRefs} from 'vue';

const state = reactive<MonsterState>({
	monsterList: [],
      totalCount: 0,
      totalPagination: 0,
      filter: new SearchMonster(),
})

export default () => {
      const tryGetAllMonsters = async (search: SearchMonster) => {
            try {
                  let response = await getAllMonsters(search);
                  console.log(response)
                  state.monsterList = response.monsterList;
                  state.totalCount = response.count;
            } catch (error) {
                  console.error(error);
            }
      }

      const resetState = () => {
            state.monsterList = [];
            state.totalPagination = 0;
            state.filter = new SearchMonster();
      }


      return {
            tryGetAllMonsters,
            resetState,
            ...toRefs(state)
      }
      

}