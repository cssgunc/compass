import { Field } from "@/utils/classes/Field";


export class EmailFieldImpl extends Field {

    constructor() {
        super('EmailTableIcon', "Email");
    }

    validateInput(value: any) : boolean {
        if (typeof value !== 'string') {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

}