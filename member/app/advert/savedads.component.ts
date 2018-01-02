import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityProduct} from '../../../app/dto/EntityProduct';
import {DTOProduct} from '../../../app/dto/DTOProduct';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/advert/savedads.component.html',
    providers: [WebAPIService]
})
export class SavedAdsComponent{
    private webAPIService: WebAPIService;
    private productList: EntityProduct[];
    private reqDTOProduct: DTOProduct;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {        
        this.webAPIService = webAPIService;
        
        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.offset = 0;
        this.reqDTOProduct.limit = 10; 
        
        this.fetchSavedProductList()       
    }

    fetchSavedProductList()
    {
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SAVED_PRODUCT_LIST), requestBody).then(result => {
            this.productList = result.list;
            this.length = result.counter;
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOProduct.limit = event.pageSize;
        this.reqDTOProduct.offset = (event.pageIndex * event.pageSize) ;
        this.fetchSavedProductList();
    }
    
    showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
    }
    
    manageAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['managead', {id: id }]);
    }    
    
    myAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['myads']);
    }
    
    savedAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['savedads']);
    }
}
