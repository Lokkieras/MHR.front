export class SearchMonster {
    id?:number;
    name?: string;
    page: number = 1;
    size?: number;

    constructor(id?:number, name?:string,  page?:number, size?:number) {
        this.id = id;
        this.name = name;
        this.page = page ?? 1;
        this.size = size;
    }
}