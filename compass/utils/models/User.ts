export enum Program {
    ECONOMIC = "ECONOMIC",
    DOMESTIC = "DOMESTIC",
    COMMUNITY = "COMMUNITY",
}

export enum Role {
    ADMIN = "ADMIN",
    EMPLOYEE = "EMPLOYEE",
    VOLUNTEER = "VOLUNTEER",
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
    visible: boolean;
}
