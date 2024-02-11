import type { MonsterCreationState } from '@/domain/monster/monsterCreation/monsterCreationState';
import { saveNewMonster, updateMonsterDetails } from '@/infraestructure/monster/monsterCreation/monsterCreation';
import { reactive, toRefs } from 'vue';
import type {  MonsterDetail } from '../../../domain/monster/monsterDetails/monsterDetails';
import type { UpdateMonsterRequest } from './request/UpdateMonsterRequest';
import { MonsterCreation } from '@/domain/monster/monsterCreation/monsterCreation';
import type { MonsterCreationRequest } from './request/monsterCreationRequest';

const state = reactive<MonsterCreationState>({
      newMonster: new MonsterCreation()
})

export default () => {

      const trySaveNewMonster = async (newMonster: MonsterCreationRequest) => {
            try {
                  let response = await saveNewMonster(newMonster);
                  state.newMonster.id = response.data;
                  if(response.errorCode){
                        return response;
                  }
            } catch (error: any) {
                  console.error(error);
            }
      }

      const setState = (monster: MonsterDetail) => {
           state.newMonster = { ...monster };
      }

      const tryUpdateMonster = async (monster: UpdateMonsterRequest) => {
            try {
                 let response = await updateMonsterDetails(monster);
                 if(response.errorCode){
                  return response;
                  }
            } catch (error: any) {
                  console.error(error);
            }
      }

      const resetState = () => {
            state.newMonster = new MonsterCreation();
      }

      return {
            trySaveNewMonster,
            tryUpdateMonster,
            resetState,
            setState,
            ...toRefs(state)
      }

}