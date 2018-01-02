export class EntityProduct {
    id: number;
    referenceId: string;
    userId: number;
    categoryId: number;
    categoryTitle: string;
    sizeId: number;
    sizeTitle: string;
    typeId: number;
    typeTitle: string;
    minStayId: number;
    minStayTitle: string;
    maxStayId: number;
    maxStayTitle: string;
    smokingId: number;
    smokingTitle: string;
    occupationId: number;
    occupationTitle: string;
    petId: number;
    petTitle: string;
    locationId: number;
    locationTitle: string;
    lat: number;
    lon: number;
    amenityIds: string;
    amenityTitles: string;
    unixAvailableFrom: number;
    availableFrom: string;
    unixAvailableTo: number;
    availableTo: string;
    onGoing: boolean;
    availabilityIds: string;
    availabilityTitles: string;
    auctionStartDate: string;
    auctionStartTimeId: number;
    auctionEndDate: string;
    auctionEndTimeId: number;
    unixAuctionStart: number;
    unixAuctionEnd: number;
    img: string;
    images: string;
    dailyEmailAlert: boolean;
    instantEmailAlert: boolean;
    title: string;
    description: string;
    firstName: string;
    lastName: string;
    companyName: string;
    phone: string;
    basePrice: string;
    totalBids: string;
    createdOn: string;
    modifiedOn: string;
    
    //not mapped from server object
    imageArray: string[];
}

