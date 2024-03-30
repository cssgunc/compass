import { Field } from "@/utils/classes/Field";


export class MultiselectFieldImpl extends Field {

    tags: Set<any>;
    selectedTags: Set<any>;

    constructor(title: string, tags: Set<any> = new Set()) {
        super('MultiselectTableIcon', title);
        this.tags = tags
        this.selectedTags = new Set();
    }

    getTags() {
        return this.tags
    }

    addTag(tag: any) {
        this.tags.add(tag);
    }

    removeTag(tag: any) {
        if (this.tags.has(tag)){
            this.tags.delete(tag);
        }
    }

    selectTag(tag: any) {
        this.selectedTags.add(tag);
    }

    removeSelectedTag(tag: any) {
        if (this.selectedTags.has(tag)){
            this.selectedTags.delete(tag);
        }
    }

}