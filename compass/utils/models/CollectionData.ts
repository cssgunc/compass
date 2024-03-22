import { Field } from "../classes/Field";
import { PROGRAM } from "../constants";
import { CollectionDataImpl } from "../implementations/CollectionDataImpl";
import { CollectionImpl } from "../implementations/CollectionImpl";
import { MultiselectFieldImpl } from "../implementations/FieldImpl/MultiselectFieldImpl";
import { StringFieldImpl } from "../implementations/FieldImpl/StringFieldImpl";

const programSet: Set<PROGRAM> = new Set([PROGRAM.COMMUNITY_EDUCATION, PROGRAM.DOMESTIC_VIOLENCE, PROGRAM.ECONOMIC_STABILITY]);

export const ServiceCollectionDataType: Field[] = [new StringFieldImpl("Name"), new MultiselectFieldImpl("Status"), new StringFieldImpl("Summary"), new StringFieldImpl("Requirements"), new MultiselectFieldImpl('Program', programSet)]

export const ServiceCollectionData = new CollectionImpl('Service','ResourceIcon',new CollectionDataImpl(ServiceCollectionDataType))

export const ResourceCollectionDataType: Field[] = [new StringFieldImpl("Name"), new MultiselectFieldImpl("Status"), new StringFieldImpl("Summary"), new StringFieldImpl("Requirements"), new MultiselectFieldImpl('Program', programSet)]

export const ResourceCollectionData = new CollectionImpl('Service','ResourceIcon',new CollectionDataImpl(ServiceCollectionDataType))

