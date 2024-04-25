import { Program } from "./User";

export default interface Service {
    id: number;
    created_at: Date;
    name: string;
    status: string;
    summary: string;
    requirements: string[];
    program: Program;
    visible: boolean;
}
