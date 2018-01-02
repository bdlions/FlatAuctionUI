import {EntityUser} from "./EntityUser";
import {EntityMessageBody} from "./EntityMessageBody";
export class DTOMessageBody{
    offset: number;
    limit: number;
    entityUser: EntityUser;
    entityMessageBody: EntityMessageBody;
    createdTime: string;
}
