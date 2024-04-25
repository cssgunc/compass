import { Program } from "./User";

export default interface Resource {
    id: number;
    created_at: Date;
    name: string;
    summary: string;
    link: string;
    program: Program;
    visible: boolean;
}
