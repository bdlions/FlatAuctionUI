import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {AgmCoreModule} from '@agm/core';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    styles:[
        `.sebm-google-map-container {
            height: 300px;
        }`
    ],
    selector: 'app',
    templateUrl: 'app/html/public/productmap.component.html',
    providers: [WebAPIService]
})
export class ProductMapComponent implements OnInit, OnDestroy {
    private webAPIService: WebAPIService;
    
    private dtoProduct: DTOProduct;
    
    private entityProduct: EntityProduct;
    
    private subscribe: Subscription;
    private keyword: string = "";
    private id: number;
    private title: string = 'Advertise location';
    private lat: number = 51.541351;
    private lng: number = -0.387066;
    
    //private lat2: number = 52.411834;
    //private lng2: number = -1.585470;
    
    @ViewChild(AgmCoreModule) private sebmGoogMap: AgmCoreModule;

    @ViewChild('searchModal') public searchModal:ModalDirective;
    private message:string;

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];

    constructor(public router: Router, public route: ActivatedRoute, webAPIService: WebAPIService) {

        this.webAPIService = webAPIService;
        setInterval(() => {this.searchModal.hide(); }, 1000 * 5);
    }
    
    ngOnInit() 
    {
        this.subscribe = this.route.params.subscribe(params => {
            let productId: number = params['id']; 
            if (productId != null && productId > 0)
            {
                this.dtoProduct = new DTOProduct();
                this.entityProduct = new EntityProduct();
                this.fetchProductInfo(productId);
            }
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
                this.entityProduct = this.dtoProduct.entityProduct;
                this.lat = this.entityProduct.lat;
                this.lng = this.entityProduct.lon;
            }                
        });
    }
    
    showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
    }
    
    public hideChildModal(): void {
        this.searchModal.hide();
        this.message = "";
    }

    
    doTriggerResize() {
        //this.sebmGoogMap.triggerResize();
    }
}



