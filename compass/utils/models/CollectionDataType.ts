import { Field } from "../classes/Field";
import { PROGRAM, STATUS, USER } from "../constants";
import { EmailFieldImpl } from "../implementations/FieldImpl/EmailFieldImpl";
import { IntegerFieldImpl } from "../implementations/FieldImpl/IntegerFieldImpl";
import { LinkFieldImpl } from "../implementations/FieldImpl/LinkFieldImpl";
import { MultiselectFieldImpl } from "../implementations/FieldImpl/MultiselectFieldImpl";
import { StringFieldImpl } from "../implementations/FieldImpl/StringFieldImpl";

const programSet: Set<PROGRAM> = new Set([
    PROGRAM.COMMUNITY_EDUCATION,
    PROGRAM.DOMESTIC_VIOLENCE,
    PROGRAM.ECONOMIC_STABILITY,
]);
const program = new MultiselectFieldImpl("program", programSet);
const requirements = new StringFieldImpl(
    "requirements",
    "RequirementsTableIcon"
);
const name = new StringFieldImpl("name");
const summary = new StringFieldImpl("summary");
const statusSet: Set<STATUS> = new Set([
    STATUS.ACCEPTING_CLIENTS,
    STATUS.CLOSED,
    STATUS.FULL,
]);
const status = new MultiselectFieldImpl("status", statusSet);
const link = new LinkFieldImpl();
const tags = new MultiselectFieldImpl("tags");
const roleSet: Set<USER> = new Set([USER.ADMIN, USER.EMPLOYEE, USER.VOLUNTEER]);
const role = new MultiselectFieldImpl("role", roleSet);
const experience = new IntegerFieldImpl("yoe");
const email = new EmailFieldImpl();
const group = new StringFieldImpl("group");

export const ServiceCollectionDataType: Field[] = [
    name,
    status,
    summary,
    requirements,
    program,
    tags,
];
export const ResourceCollectionDataType: Field[] = [
    name,
    summary,
    link,
    program,
    tags,
];
export const UserCollectionDataType: Field[] = [
    name,
    role,
    email,
    program,
    experience,
    group,
];
