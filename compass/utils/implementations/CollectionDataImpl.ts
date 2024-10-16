import { Field } from "../classes/Field";

export class CollectionDataImpl {
    headers: Field[];
    rows: Record<string, any>[];

    constructor(headers: Field[] = [], rows: Record<string, any>[] = []) {
        this.headers = headers;
        this.rows = rows;
    }

    addRow(row: Record<string, any>): void {
        let isValidRow = true;

        for (const header of this.headers) {
            const value = row[header.title];
            if (!header.validateInput(value)) {
                console.error(
                    `Validation failed for ${header.title} with value ${value}`
                );
                isValidRow = false;
                break;
            }
        }

        if (isValidRow) {
            this.rows.push(row);
        } else {
            console.log("Row not added due to validation failure.");
        }
    }

    getRows(): Record<string, any>[] {
        return this.rows;
    }

    getHeaders(): Field[] {
        return this.headers;
    }
}
