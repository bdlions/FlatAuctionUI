import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityAutoBid} from '../dto/EntityAutoBid';
import {DTOAutoBid} from '../dto/DTOAutoBid';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/public/autobids.component.html',
    providers: [WebAPIService]
})
export class AutoBidsComponent implements OnInit, OnDestroy {
    private webAPIService: WebAPIService;
    private productAutoBidList: EntityAutoBid[];
    private dtoProduct: DTOProduct;
    private product: EntityProduct;
    private dtoAutoBid: DTOAutoBid;
    private subscribe:Subscription;
    private fetchProductCounter:number = 0;
    private fetchAutoBidCounter:number = 0;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.dtoProduct = new DTOProduct();
        this.dtoProduct.entityProduct = new EntityProduct();
        this.product = new EntityProduct();
        this.productAutoBidList = Array();
        this.dtoAutoBid = new DTOAutoBid();
        this.dtoAutoBid.entityAutoBid = new EntityAutoBid();
    }
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.product = new EntityProduct();
            this.product.id =  params['id'];            
            
            this.fetchProductInfo();
            this.dtoAutoBid.entityAutoBid.productId = this.product.id;
            this.dtoAutoBid.offset = 0;
            this.dtoAutoBid.limit = 10;
            this.fetchAutoBidList();
            
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
    
    public fetchAutoBidList()
    {
        
        let requestBody: string = JSON.stringify(this.dtoAutoBid);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_AUTO_BID_LIST), requestBody).then(result => {
            if(result.success)
            {
                this.productAutoBidList = result.list;
                this.length = result.counter;
            }
            else
            {
                this.fetchAutoBidCounter++;
                if (this.fetchAutoBidCounter <= 5)
                {
                    this.fetchAutoBidList();
                }
            }            
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.dtoAutoBid.limit = event.pageSize;
        this.dtoAutoBid.offset = (event.pageIndex * event.pageSize) ;
        this.fetchAutoBidList();
    }

    public showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
    }
}

