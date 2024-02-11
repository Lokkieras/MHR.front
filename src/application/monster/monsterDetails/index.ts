import { MonsterDetail } from "@/domain/monster/monsterDetails/monsterDetails";
import type { MonsterDetailState } from "@/domain/monster/monsterDetails/monsterDetailState";
import { getMonsterById } from "@/infraestructure/monster/monsterDetails/monsterDetails";
import { reactive, toRefs } from "vue";

const state = reactive<MonsterDetailState>({
    monsterDetail: new MonsterDetail(),
})

export default () => {

    const tryGetMonsterById = async (id: number) => {
        try {
            state.monsterDetail = await getMonsterById(id);
        } catch (error) {
            console.error(error);
        }
    }

    const resetState = () => {
        state.monsterDetail = new MonsterDetail();
    }

    return {
        tryGetMonsterById,
        resetState,
        ...toRefs(state)
    }
        
}