import { ListBulletIcon, HashtagIcon, Bars3BottomLeftIcon, EnvelopeIcon, AtSymbolIcon, ClipboardIcon, ArrowsUpDownIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon, ChevronRightIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon, UserIcon, BookOpenIcon, MagnifyingGlassIcon, LinkIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';

export const Icons = {
  EmailInputIcon: EnvelopeIcon,
  HidePasswordIcon: EyeSlashIcon,
  UnhidePasswordIcon: EyeIcon,
  UserIcon: UserIcon,
  ResourceIcon: BookOpenIcon,
  SearchIcon: MagnifyingGlassIcon,
  ServiceIcon: ClipboardIcon,
  CloseRightArrow: ChevronDoubleRightIcon,
  CloseLeftArrow: ChevronDoubleLeftIcon,
  LinkRightArrow:ChevronRightIcon,
  LinkLeftArrow:ChevronLeftIcon,
  SortIcon: ArrowsUpDownIcon,
  EmailTableIcon:AtSymbolIcon,    
  LinkTableIcon: LinkIcon,
  TextTableIcon: Bars3BottomLeftIcon,
  NumberTableIcon: HashtagIcon,
  MultiselectTableIcon: ListBulletIcon,
  RequirementsTableIcon: ClipboardDocumentCheckIcon
};

export enum USER {
    ADMIN,
    EMPLOYEE,
    VOLUNTEER
}

export enum COLLECTION {
    RESOURCE,
    SERVICE,
    USER,
    TRAINING_MANUAL
}

export enum PROGRAM {
    DOMESTIC_VIOLENCE,
    ECONOMIC_STABILITY,
    COMMUNITY_EDUCATION
}

export enum STATUS {
    FULL,
    CLOSED,
    ACCEPTING_CLIENTS
}

export enum DATATYPE {
    INTEGER,
    STRING,
    LINK,
    EMAIL,
    MULTISELECT,
    SELECT
}


