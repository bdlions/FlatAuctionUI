import {EntityUser} from "./EntityUser";
import {EntityRole} from "./EntityRole";
import {EntityAccountStatus} from "./EntityAccountStatus";
export class DTOUser {
    offset: number;
    limit: number;
    entityUser: EntityUser;
    roles: Array<EntityRole>;
    entityAccountStatus: EntityAccountStatus;
}
