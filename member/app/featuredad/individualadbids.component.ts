import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {Subscription} from 'rxjs';
import {EntityProduct} from '../../../app/dto/EntityProduct';
import {EntityRole} from '../../../app/dto/EntityRole';
import {DTOProduct} from '../../../app/dto/DTOProduct';
import {DTOAdBid} from '../../../app/dto/DTOAdBid';
import {EntityAccountSettingsFA} from '../../../app/dto/EntityAccountSettingsFA';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import {PageEvent} from '@angular/material';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/featuredad/individualadbids.component.html',
    providers: [WebAPIService]
})
export class IndividualAdBidsComponent implements OnInit, OnDestroy {
    private webAPIService: WebAPIService;
    private productList: EntityProduct[]; 
    private reqDTOProduct: DTOProduct;   
    private subscribe:Subscription;
    private isAdmin: boolean = false;
    private userId:number = 0;
    private entityAccountSettingsFA: EntityAccountSettingsFA;
    
    private message: string;
    @ViewChild('individualAdbidsModal') public individualAdbidsModal:ModalDirective;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;     
        setInterval(() => { this.individualAdbidsModal.hide(); }, 1000 * 5);
        this.fetchUserRoles();   
    }
    
    public hideChildModal(): void {
        this.individualAdbidsModal.hide();
    }
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.userId = params['userId'];
            this.reqDTOProduct = new DTOProduct();
            this.reqDTOProduct.entityProduct = new EntityProduct();
            this.reqDTOProduct.entityProduct.userId = this.userId;
            this.reqDTOProduct.offset = 0;
            this.reqDTOProduct.limit = 10;            
            this.fetchAccountSettingsFA();
        }); 
    }
    
    fetchAccountSettingsFA()
    {
        let reqEntityAccountSettingsFA: EntityAccountSettingsFA = new EntityAccountSettingsFA();
        reqEntityAccountSettingsFA.userId = this.userId;
        let requestBody: string = JSON.stringify(reqEntityAccountSettingsFA);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_ACCOUNT_SETTINGS_FA), requestBody).then(result => {
            if(result.success)
            {
                this.entityAccountSettingsFA = result.result;    
                this.fetchUserProductList();            
            }
        }); 
    }
    
    fetchUserProductList()
    {
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_PRODUCT_LIST), requestBody).then(result => {
            this.productList = result.list;
            for (let counter: number = 0; counter < this.productList.length; counter++)
            {
                if (this.productList[counter].isDefaultBid)
                {
                    this.productList[counter].featuredAdBid = this.entityAccountSettingsFA.chargePerClick * 100;
                }
                else
                {
                    this.productList[counter].featuredAdBid = this.productList[counter].featuredAdBid * 100;
                }
            }
            this.length = result.counter;
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOProduct.limit = event.pageSize;
        this.reqDTOProduct.offset = (event.pageIndex * event.pageSize) ;
        this.fetchUserProductList();
    }
    
    
    fetchUserRoles()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_ROLES), "{}").then(result => {
            if (result != null && result.success)
            {
                let roles: EntityRole[] = result.list;
                if (roles != null && roles.length > 0)
                {
                    for (let counter = 0; counter < roles.length; counter++)
                    {
                        if (roles[counter].id == 1)
                        {
                            //admin has role id 1
                            this.isAdmin = true;
                        }
                    }
                }         
            }            
        });
    }
    
    setDefaultBid(entityProduct: EntityProduct, event: Event)
    {
        for (let counter: number = 0; counter < this.productList.length; counter++)
        {
            if (this.productList[counter].id == entityProduct.id)
            {
                this.productList[counter].featuredAdBid = this.entityAccountSettingsFA.chargePerClick*100;
            }
        }
    }
    
    updateAdBids(event: Event)
    {
        for (let counter: number = 0; counter < this.productList.length; counter++)
        {
            this.productList[counter].featuredAdBid = this.productList[counter].featuredAdBid / 100;
        }
        //call api to update product list and after success convert featuredAdBid from pound to p
        let dtoAdBid: DTOAdBid = new DTOAdBid();
        dtoAdBid.entityProductList = this.productList;
        let requestBody: string = JSON.stringify(dtoAdBid);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_AD_BIDS), requestBody).then(result => {
            this.message = result.message;
            this.individualAdbidsModal.show();
            for (let counter: number = 0; counter < this.productList.length; counter++)
            {
                this.productList[counter].featuredAdBid = this.productList[counter].featuredAdBid * 100;
            }
        });
    }
    
    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
    
    manageAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['managead', {id: id }]);
    }
    
    myAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['myads', {id: this.userId }]);
    }
    
    savedAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['savedads', {id: this.userId }]);
    }
    
    //featured ad section
    accountSettingsFA(event: Event) {
        event.preventDefault();
        this.router.navigate(['accountsettingsfa', {userId: this.userId }]);
    } 
    
    individualadbids(event: Event) {
        event.preventDefault();
        this.router.navigate(['individualadbids', {userId: this.userId }]);
    }   
    
}

