import {
    mockFetchResources,
    mockFetchServices,
    mockFetchUsers,
} from "../functions/mockFetch";
import { CollectionDataImpl } from "../implementations/CollectionDataImpl";
import { CollectionImpl } from "../implementations/CollectionImpl";
import {
    ResourceCollectionDataType,
    ServiceCollectionDataType,
    UserCollectionDataType,
} from "./CollectionDataType";

const ServiceCollectionData = new CollectionDataImpl(
    ServiceCollectionDataType,
    mockFetchServices()
);
const ResourceCollectionData = new CollectionDataImpl(
    ResourceCollectionDataType,
    mockFetchResources()
);
const UserCollectionData = new CollectionDataImpl(
    UserCollectionDataType,
    mockFetchUsers()
);

export const ServiceCollection = new CollectionImpl(
    "Service",
    "ServiceIcon",
    new CollectionDataImpl(ServiceCollectionDataType)
);

export const ResourceCollection = new CollectionImpl(
    "Resource",
    "ResourceIcon",
    new CollectionDataImpl(ResourceCollectionDataType)
);

export const UserCollection = new CollectionImpl(
    "User",
    "UserIcon",
    new CollectionDataImpl(UserCollectionDataType)
);
