import type { Monster } from "../monster";
import type { MonsterType } from "../params/monsterType";

export class MonsterDetail {
    id?: number;
    name: string;
    TypeID: MonsterType;
    ThreatLevel: number;
    Max: number;
    Min: number;
}

