import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {Subscription} from 'rxjs';
import {EntityProduct} from '../dto/EntityProduct';
import {DTOProduct} from '../dto/DTOProduct';
import {EntitySavedProduct} from '../dto/EntitySavedProduct';
import {EntityAmenity} from '../dto/EntityAmenity';
import {DTOAmenity} from '../dto/DTOAmenity';
import {EntityBid} from '../dto/EntityBid';
import {DTOMessageHeader} from '../dto/DTOMessageHeader';
import {EntityMessageHeader} from '../dto/EntityMessageHeader';
import {EntityMessageBody} from '../dto/EntityMessageBody';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';

import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'app',
    templateUrl: 'app/html/public/product.component.html',
    providers: [WebAPIService]
})
export class ProductComponent implements OnInit, OnDestroy {
    private webAPIService: WebAPIService;
    private productInfo: EntityProduct;
    private dtoProduct: DTOProduct;
    private entityBid: EntityBid;
    private subscribe:Subscription;
    private newMessageBody:string;
    private availabilityString:string;
    
    private imageArray: string[];
    
    private availabilityArray: string[];
    
    private amenityArray: string[];
    private fetchAmenityCounter:number = 0;
    private amenityList: EntityAmenity[];
    private amenityStatusList: DTOAmenity[];
    
    private dtoMessageHeader: DTOMessageHeader;
    
    @ViewChild('productInfoModal') public productInfoModal:ModalDirective;
    private message:string;
    
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        window.scrollTo(0, 0)
        this.webAPIService = webAPIService;
        this.dtoProduct = new DTOProduct;
        this.dtoProduct.entityProduct = new EntityProduct();
        this.productInfo = new EntityProduct();
        this.entityBid = new EntityBid();
        this.newMessageBody = "";
        setInterval(() => { this.productInfoModal.hide(); }, 1000 * 5);
    }
    
    public hideChildModal(): void {
        this.productInfoModal.hide();
        this.message = "";
    }
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            let id: number = params['id']; 
            
            this.dtoMessageHeader = new DTOMessageHeader();
            this.dtoMessageHeader.entityMessageHeader = new EntityMessageHeader();
            this.dtoMessageHeader.entityMessageBody = new EntityMessageBody();
            
            this.imageArray = Array();
            
            this.availabilityArray = Array();
            
            this.amenityArray = Array();
            this.amenityList = Array();
            this.amenityStatusList = Array();
            
            this.fetchProductInfo(id);
            
            setInterval(() => 
                {
                    this.dtoProduct.timeLeft = "";
                    let tempTime: number = this.dtoProduct.auctionEndTimeLeft;
                    if (tempTime > 0)
                    {
                        if (tempTime >= 86400)
                        {
                            this.dtoProduct.timeLeft = this.dtoProduct.timeLeft + Math.floor(tempTime/86400) + " days ";
                            tempTime = tempTime % 86400;
                        }
                        if (tempTime >= 3600)
                        {
                            this.dtoProduct.timeLeft = this.dtoProduct.timeLeft + Math.floor(tempTime/3600) + " hours ";
                            tempTime = tempTime % 3600;
                        } 
                        if (tempTime >= 60)
                        {
                            this.dtoProduct.timeLeft = this.dtoProduct.timeLeft + Math.floor(tempTime/60) + " mins ";
                            tempTime = tempTime % 60;
                        }
                        if (tempTime < 60)
                        {
                            this.dtoProduct.timeLeft = this.dtoProduct.timeLeft + tempTime + " secs ";
                        }                        
                        this.dtoProduct.auctionEndTimeLeft = (this.dtoProduct.auctionEndTimeLeft - 1); 
                    }
                }
            , 1000);
            
            /*this.productInfo = new Product();
            this.requetProduct = new Product();
            this.requetProduct.id = this.id;
            let requestBody: string = JSON.stringify(this.requetProduct);
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_INFO), requestBody).then(result => {
                this.productInfo = result;
                this.productInfo.timeLeft = "";
                //this.productInfo.time = 95500;
                
                this.availabilityString = "";
                if (this.productInfo.availabilities.length > 0)
                {
                    for (let counter = 0; counter < this.productInfo.availabilities.length; counter++)
                    {
                        if (counter == 0)
                        {
                            this.availabilityString = this.productInfo.availabilities[counter].title;

                        }
                        else
                        {
                            this.availabilityString = this.availabilityString + ", " + this.productInfo.availabilities[counter].title;
                        }
                    }
                }
                this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_AMENITY_LIST)).then(result => {
                    if(result.amenities != null)
                    {
                        this.amenityList = result.amenities;
                        if (this.amenityList.length > 0)
                        {
                            for (let counter = 0; counter < this.amenityList.length; counter++)
                            {
                                this.amenityList[counter].status = "No";
                                if (this.productInfo.amenities.length > 0)
                                {
                                    for (let counter2 = 0; counter2 < this.productInfo.amenities.length; counter2++)
                                    {
                                        if (this.amenityList[counter].id == this.productInfo.amenities[counter2].id)
                                        {
                                            this.amenityList[counter].status = "Yes";
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            });*/
        });
    }
    
    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
    
    fetchProductInfo(productId: number)
    {
        let reqEntityProduct: EntityProduct = new EntityProduct();
        reqEntityProduct.id = productId;
        let requestBody: string = JSON.stringify(reqEntityProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_INFO), requestBody).then(result => {
            this.dtoProduct = result.result;
            if (this.dtoProduct.entityProduct != null)
            {
                this.productInfo = this.dtoProduct.entityProduct;
                
                this.dtoMessageHeader.entityMessageHeader.subject = "Re: " + this.productInfo.title;
                this.dtoMessageHeader.entityMessageHeader.receiverUserId = this.productInfo.userId;
                this.dtoMessageHeader.entityMessageHeader.productId = this.productInfo.id;
                
                if (this.productInfo.images != null && this.productInfo.images != "")
                {
                    this.imageArray = this.productInfo.images.split(",");
                }
                if (this.productInfo.availabilityTitles != null && this.productInfo.availabilityTitles != "")
                {
                    this.availabilityArray = this.productInfo.availabilityTitles.split(",");
                }
                if (this.productInfo.amenityTitles != null && this.productInfo.amenityTitles != "")
                {
                    this.amenityArray = this.productInfo.amenityTitles.split(",");
                }     
                this.fetchAmenityList();  
            }                
        });
    }
    
    public fetchAmenityList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_AMENITY_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.amenityList = result.list;
                if (this.amenityList != null)
                {
                    for (let counter:number = 0; counter < this.amenityList.length; counter++)
                    {
                        let status: string = "No";
                        for (let arrayCounter: number = 0; arrayCounter < this.amenityArray.length; arrayCounter++)
                        {
                            if (this.amenityList[counter].title == this.amenityArray[arrayCounter])
                            {
                                status = "Yes";
                            }
                        }
                        let dtoAmenity: DTOAmenity = new DTOAmenity();
                        dtoAmenity.status = status;
                        dtoAmenity.entityAmenity = this.amenityList[counter];
                        this.amenityStatusList[this.amenityStatusList.length] = dtoAmenity;
                    }
                }
            }
            else
            {
                this.fetchAmenityCounter++;
                if (this.fetchAmenityCounter <= 5)
                {
                    this.fetchAmenityList();
                }
            }
        });
    }
    
    public showBids(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showbids', {id: id }]);
    }
    
    saveProduct(event: Event, productId: number) 
    {
        //check whether user id logged in or not, if not then show an error message
        let username = localStorage.getItem("username");
        if (username != null && username != "")
        {
            let entitySavedProduct: EntitySavedProduct = new EntitySavedProduct();
            entitySavedProduct.productId = productId;
            let requestBody: string = JSON.stringify(entitySavedProduct);
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_SAVED_PRODUCT), requestBody).then(result => {
                let response  = result;                
                this.message = response.message;
                this.productInfoModal.show();
            });
        }
        else
        {
            //show error messaage
            this.message = "Please login to save it.";
            this.productInfoModal.show();
        }
    }
    
    postBid(event: Event) 
    {
        let username = localStorage.getItem("username");
        if (username != null && username != "")
        {
            if (this.entityBid.price == null || this.entityBid.price <= 0 )
            {
                this.message = "Please assign value for the bid.";
                this.productInfoModal.show();
                return;
            }
            
            this.entityBid.productId = this.productInfo.id;
            this.entityBid.productTitle = this.productInfo.title;
            //ser user id from session at server
            let requestBody: string = JSON.stringify(this.entityBid);
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PRODUCT_BID), requestBody).then(result =>{
                if(result.success)
                {
                    this.productInfo.totalBids = this.productInfo.totalBids + 1;
                    this.entityBid = new EntityBid();
                }
                this.message = result.message;
                this.productInfoModal.show();
            });
        }
        else
        {
            //show error messaage
            this.message = "Please login to post a bid.";
            this.productInfoModal.show();
        }
        
    }
    
    sendProductMessage(event: Event) 
    {
        //check whether user id logged in or not, if not then show an error message
        let username = localStorage.getItem("username");
        if (username != null && username != "")
        {
            //check whether message text is empty or not. if empty then show an error message.
            if (this.dtoMessageHeader.entityMessageBody.message == null || this.dtoMessageHeader.entityMessageBody.message.length == 0)
            {
                this.message = "Please add message text.";
                this.productInfoModal.show();
                return;
            }
            this.dtoMessageHeader.entityMessageHeader.subject = "Re : " + this.productInfo.title;            
            let requestBody: string = JSON.stringify(this.dtoMessageHeader);
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PRODUCT_MESSAGE), requestBody).then(result => {
                this.dtoMessageHeader.entityMessageBody.message = "";
                this.message = result.message;
                this.productInfoModal.show();
            });
        }
        else
        {
            //show error messaage
            this.message = "Please login to send message.";
            this.productInfoModal.show();
        }
        
    }
    
    /*

    
    postBid(event: Event) 
    {
        let username = localStorage.getItem("username");
        if (username != null && username != "")
        {
            this.productBid.product = new Product();
            this.productBid.product.id = this.id;
            //ser user id from session at server
            //set currency and currency unit at server.
            let requestBody: string = JSON.stringify(this.productBid);
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PRODUCT_BID), requestBody).then(result =>{
                let response  = result;                
                if (response.success){
                    this.productBid = new ProductBid();                    
                }
                this.message = response.message;
                this.productInfoModal.show();
            });
        }
        else
        {
            //show error messaage
            this.message = "Please login to post a bid.";
            this.productInfoModal.show();
        }
        
    }
    
    addmessage(event: Event) 
    {
        //check whether user id logged in or not, if not then show an error message
        let username = localStorage.getItem("username");
        if (username != null && username != "")
        {
            //check whether message text is empty or not. if empty then show an error message.
            if (this.newMessageBody == null || this.newMessageBody.length == 0)
            {
                this.message = "Please add message text.";
                this.productInfoModal.show();
                return;
            }
            this.newMessageText = new MessageText();
            this.newMessageText.body = this.newMessageBody;

            this.newMessage.subject = "Re : " + this.productInfo.title;
            this.newMessage.product = this.productInfo;

            this.newMessage.messageTextList = new Array<MessageText>();
            this.newMessage.messageTextList[0] = this.newMessageText;
            let requestBody: string = JSON.stringify(this.newMessage);
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_MESSAGE_INFO), requestBody).then(result => {
                this.newMessage = new Message();
                this.newMessageText = new MessageText();
                this.newMessageBody = "";
                let response  = result;                
                this.message = response.message;
                this.productInfoModal.show();
            });
        }
        else
        {
            //show error messaage
            this.message = "Please login to send message.";
            this.productInfoModal.show();
        }
        
    }*/
}

