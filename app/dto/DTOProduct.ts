import {EntityProduct} from "./EntityProduct";

export class DTOProduct {
    offset: number;
    limit: number;
    images: string;
    auctionEndTimeLeft: number;
    entityProduct: EntityProduct;
    //not mapped to server object
    timeLeft: string;    
}

