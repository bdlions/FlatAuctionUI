
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//import {Http} from '@angular/http';
import {Subscription} from 'rxjs';
//import {Bid} from '../dto/Bid';
//import {ProductBid} from '../dto/ProductBid';
//import {Product} from '../dto/Product';
import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityBid} from '../dto/EntityBid';
import {DTOBid} from '../dto/DTOBid';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/public/bids.component.html',
    providers: [WebAPIService]
})
export class BidsComponent implements OnInit, OnDestroy {
    private webAPIService: WebAPIService;
    private productBidList: EntityBid[];
    private dtoProduct: DTOProduct;
    private product: EntityProduct;
    private dtoBid: DTOBid;
    
    //private product: Product;
    //private bidList: Bid[];
    //private productBidList: ProductBid[];
    private subscribe:Subscription;
    //private id:number;
    //private productId:number;
    private fetchProductCounter:number = 0;
    private fetchBidCounter:number = 0;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.dtoProduct = new DTOProduct();
        this.dtoProduct.entityProduct = new EntityProduct();
        this.product = new EntityProduct();
        this.productBidList = Array();
        this.dtoBid = new DTOBid();
        this.dtoBid.entityBid = new EntityBid();
    }
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.product = new EntityProduct();
            this.product.id =  params['id'];            
            
            this.fetchProductInfo();
            this.dtoBid.entityBid.productId = this.product.id;
            this.dtoBid.offset = 0;
            this.dtoBid.limit = 10;
            this.fetchBidList();
            
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
        });
    }
    
    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
    
    public fetchProductInfo()
    {
        let requestBody2: string = JSON.stringify(this.product);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_INFO), requestBody2).then(result => {
            if(result.success)
            {
                if(result.result != null)
                {
                    this.dtoProduct = result.result;
                    if (this.dtoProduct.entityProduct != null)
                    {
                        this.product = this.dtoProduct.entityProduct;
                    }                    
                }                
            }
            else
            {
                this.fetchProductCounter++;
                if (this.fetchProductCounter <= 5)
                {
                    this.fetchProductInfo();
                }
            }
        });
    }
    
    public fetchBidList()
    {
        
        let requestBody: string = JSON.stringify(this.dtoBid);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_BID_LIST), requestBody).then(result => {
            if(result.success)
            {
                this.productBidList = result.list;
                this.length = result.counter;
            }
            else
            {
                this.fetchBidCounter++;
                if (this.fetchBidCounter <= 5)
                {
                    this.fetchBidList();
                }
            }            
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.dtoBid.limit = event.pageSize;
        this.dtoBid.offset = (event.pageIndex * event.pageSize) ;
        this.fetchBidList();
    }

    public showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
    }
}
