import { ListBulletIcon, HashtagIcon, Bars3BottomLeftIcon, EnvelopeIcon, AtSymbolIcon, ClipboardIcon, ArrowsUpDownIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon, ChevronRightIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon, UserIcon, BookOpenIcon, MagnifyingGlassIcon, LinkIcon } from '@heroicons/react/24/solid';

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
  MultiselectTableIcon: ListBulletIcon
};

export enum User {
    ADMIN,
    EMPLOYEE,
    VOLUNTEER
}

export enum COLLECTION {
    RESOURCE,
    SERVICE,
    USER
}

export enum PROGRAM {
    DOMESTIC_VIOLENCE,
    ECONOMIC_STABILITY,
    COMMUNITY_EDUCATION
}

export enum DATATYPE {
    INTEGER,
    STRING,
    LINK,
    EMAIL,
    MULTISELECT,
    SELECT
}

// export const COLLECTION_MAP: {[key in COLLECTION]: CollectionImpl} = {
//     [COLLECTION.RESOURCE]: new CollectionImpl('Resources', Icons.ResourceIcon),
//     [COLLECTION.SERVICE]: new CollectionImpl('Services', Icons.ServiceIcon),
//     [COLLECTION.USER]: new CollectionImpl('Users', Icons.UserIcon)
// }