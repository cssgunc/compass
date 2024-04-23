import { Icons } from "@/utils/constants";
import { Field } from "@/utils/classes/Field";

export class StringFieldImpl extends Field {
    constructor(title: string, iconKey: keyof typeof Icons = "TextTableIcon") {
        super(iconKey, title);
    }

    validateInput(value: any): boolean {
        return typeof value === "string";
    }
}
