import {EntityUser} from "./EntityUser";
import {EntityRole} from "./EntityRole";
import {EntityAccountStatus} from "./EntityAccountStatus";
export class DTOUser {
    entityUser: EntityUser;
    roles: Array<EntityRole>;
    entityAccountStatus: EntityAccountStatus;
}
