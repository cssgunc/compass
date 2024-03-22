import { Field } from "@/utils/classes/Field";


export class LinkFieldImpl extends Field {

    constructor() {
        super('LinkTableIcon', "Link");
    }

    validateInput(value: any) : boolean {
        if (typeof value !== 'string') {
            return false;
        }
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return urlRegex.test(value);
    }

}