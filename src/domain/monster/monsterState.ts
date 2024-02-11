import type { Monster } from "./monster";
import type { SearchMonster } from "./searchMonster";

export class MonsterState {
    monsterList: Monster[];
    totalPagination: number;
    filter: SearchMonster;
    totalCount: number;
}