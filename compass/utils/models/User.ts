export enum Program {
    "ECONOMIC",
    "DOMESTIC",
    "COMMUNITY",
}

export enum Role {
    "ADMIN",
    "EMPLOYEE",
    "VOLUNTEER",
}

export default interface User {
    id: number;
    uuid: string;
    username: string;
    email: string;
    group: string;
    experience: number;
    program: Program[];
    role: Role;
    created_at: Date;
}
