import { Icons } from "@/utils/constants";
import { Field } from "@/utils/classes/Field";


export class IntegerFieldImpl extends Field {

    constructor(title: string) {
        super('NumberTableIcon', title);
    }

    validateInput(value: any) : boolean {
        return Number.isInteger(value);
    }

}