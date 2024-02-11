export class SearchMonster {
    id?:number;
    name?: string;
    tag?: number;
    page: number = 1;
    size?: number;

    constructor(id?:number, name?:string, tag?:number, page?:number, size?:number) {
        this.id = id;
        this.name = name;
        this.tag = tag;
        this.page = page ?? 1;
        this.size = size;
    }
}