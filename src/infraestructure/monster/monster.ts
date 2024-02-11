
import { get, post } from "../axios";
import type { SearchMonster } from "@/domain/monster/searchMonster";
import type { MonsterList } from "@/domain/monster/monsterList";

export const getAllMonsters = async (search : SearchMonster) : Promise<MonsterList> => {
    const {data} = await post("Monster/GetByFilters", search);
    return data;  

}