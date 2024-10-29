import { Program } from "./User";
import DataPoint from "./DataPoint";

export default interface Resource extends DataPoint {
    id: number;
    created_at: Date;
    name: string;
    summary: string;
    link: string;
    program: Program;
    visible: boolean;
}
