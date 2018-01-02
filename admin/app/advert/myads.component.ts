import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//import {Http} from '@angular/http';
//import {Subscription} from 'rxjs';
//import {Product} from '../dto/Product';
import {EntityProduct} from '../../../app/dto/EntityProduct';
import {DTOProduct} from '../../../app/dto/DTOProduct';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'admin/app/html/advert/myads.component.html',
    providers: [WebAPIService]
})
export class MyAdsComponent{
    private webAPIService: WebAPIService;
    //private productList: Product[];
    private productList: EntityProduct[];
    private reqDTOProduct: DTOProduct;
    //private subscribe:Subscription;
    //private id:number;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
        
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {        
        this.webAPIService = webAPIService;
        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.offset = 0;
        this.reqDTOProduct.limit = 10;
        this.fetchUserProductList();
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
        this.router.navigate(['myads']);
    }
    
    showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
    }
    
    savedAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['savedads']);
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

