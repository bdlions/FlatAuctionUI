import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityLocation} from '../../../app/dto/EntityLocation';
import {EntityProductType} from '../../../app/dto/EntityProductType'
import {DTOSearchParam} from '../../../app/dto/DTOSearchParam';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/search/basicsearch.component.html',
    providers: [WebAPIService]
})
export class BasicSearchComponent{
    private webAPIService: WebAPIService;
    private locationList: EntityLocation[];
    
    private selectedProductType: EntityProductType;
    private productTypeList: EntityProductType[];  
    
    private dtoSearchParam: DTOSearchParam;
    private referenceId:string;
    
    private fetchLocationCounter:number = 0;
    private fetchProductTypeCounter:number = 0;
    
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.locationList = Array();
        this.selectedProductType = new EntityProductType();
        this.productTypeList = Array();
        this.dtoSearchParam = new DTOSearchParam();
        this.referenceId = "";
        this.fetchLocationList();
        this.fetchProductTypeList();
    }
    
    public fetchLocationList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_LOCATION_LIST), "{}").then(result => {
            if(result.success)
            {
                this.locationList = result.list;
            }
            else
            {
                this.fetchLocationCounter++;
                if (this.fetchLocationCounter <= 5)
                {
                    this.fetchLocationList();
                }
            }            
        });
    }
    
    public fetchProductTypeList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_TYPE_LIST), "{}").then(result => {
            if(result.success)
            {
                this.productTypeList = result.list;
            }
            else
            {
                this.fetchProductTypeCounter++;
                if (this.fetchProductTypeCounter <= 5)
                {
                    this.fetchProductTypeList();
                }
            }
            
        });
    }
    
    search(event: Event) {
        event.preventDefault();
        //forward search params into search page....
        //set search params into local storage
//        if (this.searchParams.referenceId != null && this.searchParams.referenceId != "")
//        {
//            localStorage.setItem("referenceId", this.searchParams.referenceId);
//        }
//        if (this.searchParams.productType != null && this.searchParams.productType.id  != 0)
//        {
//            localStorage.setItem("productTypeId", this.searchParams.productType.id+"");
//        }
//        if (this.searchParams.location != null && this.searchParams.location.id  != 0)
//        {
//            localStorage.setItem("locationId", this.searchParams.location.id+"");
//        }
        let id:number;
        id = 1;
        this.router.navigate(['search', {id: id}]);
    }
    
    basicsearch(event: Event) {
        event.preventDefault();
        this.router.navigate(['basicsearch']);
    }
    advancedsearch(event: Event) {
        event.preventDefault();
        this.router.navigate(['advancedsearch']);
    }
}

