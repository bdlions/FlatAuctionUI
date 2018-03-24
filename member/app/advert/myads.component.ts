import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//import {Http} from '@angular/http';
import {Subscription} from 'rxjs';
//import {Product} from '../dto/Product';
import {EntityProduct} from '../../../app/dto/EntityProduct';
import {EntityRole} from '../../../app/dto/EntityRole';
import {DTOProduct} from '../../../app/dto/DTOProduct';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/advert/myads.component.html',
    providers: [WebAPIService]
})
export class MyAdsComponent{
    private webAPIService: WebAPIService;
    //private productList: Product[];
    private isAdmin: boolean = false;
    private productList: EntityProduct[];
    private reqDTOProduct: DTOProduct;
    private subscribe:Subscription;
    private userId: number = 0;
    //private id:number;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
        
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {        
        this.webAPIService = webAPIService;
        this.fetchUserRoles();
    }
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => 
        {
            this.userId = params['id'];
            this.reqDTOProduct = new DTOProduct();
            this.reqDTOProduct.entityProduct = new EntityProduct();
            this.reqDTOProduct.entityProduct.userId = this.userId;
            this.reqDTOProduct.offset = 0;
            this.reqDTOProduct.limit = 10;
            this.fetchUserProductList();
        });
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
    
    fetchUserProductList()
    {
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_PRODUCT_LIST), requestBody).then(result => {
            this.productList = result.list;
            this.length = result.counter;
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOProduct.limit = event.pageSize;
        this.reqDTOProduct.offset = (event.pageIndex * event.pageSize) ;
        this.fetchUserProductList();
    }
    
    manageAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['managead', {id: id }]);
    }
    
    myAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['myads', {id: this.userId }]);
    }
    
    showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
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
    
    stats(event: Event) {
        event.preventDefault();
        this.router.navigate(['stats', {userId: this.userId }]);
    } 
    
    ranking(event: Event) {
        event.preventDefault();
        this.router.navigate(['ranking', {userId: this.userId }]);
    }
    
    faqfa(event: Event) {
        event.preventDefault();
        this.router.navigate(['faqfa', {userId: this.userId }]);
    } 
    
    /*public myproduct(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['myproduct', {id: id }]);
    }    
    
    public selectProduct(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['productinfo', {id: id }]);
    }
    
    dashboard(event: Event) {
        event.preventDefault();
        this.router.navigate(['dashboard']);
    }
    
    messages(event: Event) {
        event.preventDefault();
        this.router.navigate(['messages']);
    }
    
    accountsettings(event: Event) {
        event.preventDefault();
        this.router.navigate(['accountsettings']);
    }
    
    individualadbids(event: Event) {
        event.preventDefault();
        this.router.navigate(['individualadbids']);
    }
    
    stats(event: Event) {
        event.preventDefault();
        this.router.navigate(['stats']);
    }
    
    ranking(event: Event) {
        event.preventDefault();
        this.router.navigate(['ranking']);
    }
    
    fafaq(event: Event) {
        event.preventDefault();
        this.router.navigate(['fafaq']);
    }*/
}

