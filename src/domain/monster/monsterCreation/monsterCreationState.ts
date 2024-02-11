import type { MonsterType } from "../params/monsterType";
import type { MonsterCreation } from "./monsterCreation";

export class MonsterCreationState {
    newMonster: MonsterCreation;
    types: MonsterType[];
}