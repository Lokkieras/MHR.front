
import type { MonsterCreationRequest } from "@/application/monster/monsterCreation/request/monsterCreationRequest";
import type { UpdateMonsterRequest } from "@/application/monster/monsterCreation/request/UpdateMonsterRequest";
import { get, post, put } from "../../axios";
import type { GenericResponse } from "@/Share/utils/GenericResponse";

/* EXAMPLE PARAMS GETTER Monster Type


export const getAllMonsterType = async () : Promise<MonsterType[]> => {
    
    const {data} = await get("MonsterType");
    return data;  

}
*/

export const saveNewMonster = async (newMonster: MonsterCreationRequest) : Promise<GenericResponse> => {
      
  const {data} = await post("Monster/CreateNewMonster", newMonster);
  return data;  

}

export  const updateMonsterDetails = async (monster: UpdateMonsterRequest) : Promise<GenericResponse> => {
  
  const {data} = await put("Monster/UpdateMonster", monster);
  return data;  

}