import { Icons } from "../constants";

export class Field {
  iconKey: keyof typeof Icons;
  title: string;

  constructor(iconKey: keyof typeof Icons, title: string) {
    this.iconKey = iconKey;
    this.title = title;
}

  validateInput(value: any): boolean {
    return value !== null;
  }
}
