import { Program } from "./User";
import DataPoint from "./DataPoint";

export default interface Service extends DataPoint {
    id: number;
    created_at: Date;
    name: string;
    status: string;
    summary: string;
    requirements: string[];
    program: Program;
    visible: boolean;
}
