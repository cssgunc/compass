import { Icons } from "@/utils/constants";
import { Field } from "@/utils/classes/Field";


export class StringFieldImpl extends Field {

    constructor(iconKey: keyof typeof Icons, title: string) {
        super(iconKey, title);
    }

    validateInput(value: any) : boolean {
        return typeof value === 'string';
    }

}