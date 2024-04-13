import { CollectionDataImpl } from "./CollectionDataImpl";

export class CollectionImpl {
    title: string;
    icon: any;
    data: CollectionDataImpl;

    constructor(title: string, icon: any, data: CollectionDataImpl) {
        this.title = title;
        this.icon = icon;
        this.data = data;
    }
}
