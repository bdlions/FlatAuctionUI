import {EntityUser} from "./EntityUser";
import {EntityMessageHeader} from "./EntityMessageHeader";
import {EntityMessageBody} from "./EntityMessageBody";
export class DTOMessageHeader{
    offset: number;
    limit: number;
    sender: EntityUser;
    receiver: EntityUser;
    entityMessageHeader: EntityMessageHeader;
    entityMessageBody: EntityMessageBody;
}
