import type { MonsterType } from "../params/monsterType";

export class MonsterCreation {
	id?: number;
    name: string;
    TypeID: MonsterType;
    ThreatLevel: number;
    Max: number;
    Min: number;
}