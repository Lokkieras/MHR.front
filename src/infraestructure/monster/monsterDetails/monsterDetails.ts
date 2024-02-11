import type { MonsterDetail } from "@/domain/monster/monsterDetails/monsterDetails";
import { get} from "@/infraestructure/axios";

export const getMonsterById = async (id:number) : Promise<MonsterDetail> => {
    const {data} = await get(`Monster/${id}`);
    return data;
}