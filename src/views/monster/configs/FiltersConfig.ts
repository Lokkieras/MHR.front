import type { FilterStructure } from "@/Share/utils/filtersStructure";


export const MONSTER_FILTERS: FilterStructure[] = [
        {
            label: "monsters.id",
            key: "id",
            type: "number",
        },    
        {
            label: "monsters.name",
            key: "name",
            defaultValue: "",
            type: "text",
        },
    ]