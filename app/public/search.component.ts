import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//import {Http} from '@angular/http';
import {Subscription} from 'rxjs';
import {Common} from '../dto/Common';
import {DTOSearchParam} from '../dto/DTOSearchParam';
import {EntityProduct} from '../dto/EntityProduct';
import {EntitySavedProduct} from '../dto/EntitySavedProduct';
import {EntityLocation} from '../dto/EntityLocation';
import {EntityProductSize} from '../dto/EntityProductSize';
import {EntityProductType} from '../dto/EntityProductType';
import {EntityOccupation} from '../dto/EntityOccupation';
import {EntityPet} from '../dto/EntityPet';
import {EntityAvailability} from '../dto/EntityAvailability';
//import {Product} from '../dto/Product';
//import {Location} from '../dto/Location';
//import {ProductSize} from '../dto/ProductSize';
//import {ProductType} from '../dto/ProductType';
//import {SearchParams} from '../dto/SearchParams';
//import {Occupation} from '../dto/Occupation';
//import {Pet} from '../dto/Pet';
//import {Availability} from '../dto/Availability';
//import {Currency} from '../dto/Currency';
//import {General} from '../dto/General';
//import {SavedProduct} from '../dto/SavedProduct';
import {AgmCoreModule} from '@agm/core';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import { ModalDirective } from 'ngx-bootstrap';
import {PageEvent} from '@angular/material';

@Component({
    styles:[
        `.sebm-google-map-container {
            height: 300px;
        }`
    ],
    selector: 'app',
    templateUrl: 'app/html/public/search.component.html',
    providers: [WebAPIService]
})
export class SearchComponent implements OnInit, OnDestroy {
    private webAPIService: WebAPIService;
    
//    private searchParams: SearchParams;
    private dtoSearchParam: DTOSearchParam;
    
    private entitySavedProduct: EntitySavedProduct;
    
    private priceList: Common[];
    private selectedMinPrice: Common;
    private selectedMaxPrice: Common;
    
    private fetchProductCounter:number = 0;
    private fetchLocationCounter:number = 0;
    
    private minPrice: string = "";
    private maxPrice: string = "";
    
    private productList: EntityProduct[];
    
    //private selectedLocation: EntityLocation;
    private locationList: EntityLocation[];
    
    private selectedProductSize: EntityProductSize;
    private fetchProductSizeCounter:number = 0;
    private productSizeList: EntityProductSize[];
    
    private selectedProductType: EntityProductType;
    private fetchProductTypeCounter:number = 0;    
    private productTypeList: EntityProductType[];
    
    private selectedOccuption: EntityOccupation;
    private fetchOccupationCounter:number = 0;
    private occupationList: EntityOccupation[];
    
    private selectedPet: EntityPet;
    private fetchPetCounter: number = 0;
    private petList: EntityPet[];
    
    private selectedAvailability: EntityAvailability;
    private fetchAvailabilityCounter:number = 0;
    private availabilityList: EntityAvailability[];

    private subscribe: Subscription;
    private keyword: string = "";
    private id: number;
    private title: string = 'Property locations';
    private lat: number = 55.014566;
    private lng: number = -3.751245;
    
    @ViewChild(AgmCoreModule) private sebmGoogMap: AgmCoreModule;

    @ViewChild('searchModal') public searchModal:ModalDirective;
    private message:string;

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];

    constructor(public router: Router, public route: ActivatedRoute, webAPIService: WebAPIService) {

        this.webAPIService = webAPIService;
        this.entitySavedProduct = new EntitySavedProduct();
        
        this.priceList = Array();
        this.priceList = JSON.parse("[{\"id\":\"100\",\"title\":\"100\"}, {\"id\":\"200\",\"title\":\"200\"}, {\"id\":\"300\",\"title\":\"300\"}, {\"id\":\"400\",\"title\":\"400\"}, {\"id\":\"500\",\"title\":\"500\"}]");
        this.selectedMinPrice = new Common();
        this.selectedMaxPrice = new Common();
        
        //this.selectedLocation = new EntityLocation();
        this.locationList = Array();
        
        this.selectedProductSize = new EntityProductSize();
        this.productSizeList = Array();
        
        this.selectedProductType = new EntityProductType();
        this.productTypeList = Array();
        
        this.selectedOccuption = new EntityOccupation();
        this.occupationList = Array();
        
        this.selectedPet = new EntityPet();
        this.petList = Array();
        
        this.selectedAvailability = new EntityAvailability();
        this.availabilityList = Array();
        
        this.fetchLocationList();
        this.fetchProductSizeList();
        this.fetchProductTypeList();
        this.fetchOccupationList();
        this.fetchPetList();
        this.fetchAvailabilityList();        
        
        setInterval(() => {this.searchModal.hide(); }, 1000 * 5);
    }
    
    ngOnInit() {
//        this.sebmGoogMap.triggerResize();
        this.productList = Array();
        this.dtoSearchParam = new DTOSearchParam();
        let referenceId = localStorage.getItem("referenceId");
        if (referenceId != null && referenceId != ""){
            this.dtoSearchParam.referenceId = referenceId;
            localStorage.removeItem("referenceId");
        }
        let productTypeId = localStorage.getItem("productTypeId");
        if (productTypeId != null && productTypeId != ""){
            this.dtoSearchParam.typeId = +productTypeId;
            localStorage.removeItem("productTypeId");
        }
        let productSizeId = localStorage.getItem("productSizeId");
        if (productSizeId != null && productSizeId != ""){
            this.dtoSearchParam.sizeId = +productSizeId;
            localStorage.removeItem("productSizeId");
        }
        let occupationId = localStorage.getItem("occupationId");
        if (occupationId != null && occupationId != ""){
            this.dtoSearchParam.occupationId = +occupationId;
            localStorage.removeItem("occupationId");
        }
        let petId = localStorage.getItem("petId");
        if (petId != null && petId != ""){
            this.dtoSearchParam.petId = +petId;
            localStorage.removeItem("petId");
        }
        let availabilityId = localStorage.getItem("availabilityId");
        if (availabilityId != null && availabilityId != ""){
            this.dtoSearchParam.availabilityId = +availabilityId;
            localStorage.removeItem("availabilityId");
        }
        let minPrice = localStorage.getItem("minPrice");
        if (minPrice != null && minPrice != ""){
            this.dtoSearchParam.minPrice = +minPrice;
            localStorage.removeItem("minPrice");
        }
        let maxPrice = localStorage.getItem("maxPrice");
        if (maxPrice != null && maxPrice != ""){
            this.dtoSearchParam.maxPrice = +maxPrice;
            localStorage.removeItem("maxPrice");
        }
        this.subscribe = this.route.params.subscribe(params => {
            this.keyword = params['id']; 
            if (this.keyword != null && this.keyword != "")
            {
                this.dtoSearchParam.locationTitle = this.keyword;
                this.dtoSearchParam.postcode = this.keyword;
            }
        });
        this.dtoSearchParam.offset = 0;
        this.dtoSearchParam.limit = 10;         
        this.fetchProductList();
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
    
    public fetchProductList()
    {        
        let requestBody: string = JSON.stringify(this.dtoSearchParam);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SEARCH_PRODUCT_LIST), requestBody).then(result => {
            if(result.success)
            {
                let tempProductList: EntityProduct[] = result.list;
                for (let counter: number = 0; counter < tempProductList.length; counter++)
                {
                    if (tempProductList[counter].images != null)
                    {
                        let tempImageArray: string[] = tempProductList[counter].images.split(",");                        
                        if (tempImageArray != null && tempImageArray.length > 0)
                        {
                            //displaying maximum two images at right column of list view
                            let displayImageArray: string[] = Array();
                            let limit: number = 1;
                            if(tempImageArray.length > 1)
                            {
                                limit = 2;
                            }
                            for (let tempCounter: number = 0; tempCounter < limit; tempCounter++)
                            {
                                displayImageArray[displayImageArray.length] = tempImageArray[tempCounter];
                            }
                            tempProductList[counter].imageArray = displayImageArray;
                        }
                        else
                        {
                            tempProductList[counter].imageArray = Array();
                        }
                        //tempProductList[counter].imageArray = tempProductList[counter].images.split(",");
                    }                    
                }
                this.productList = tempProductList;                
                this.length = result.counter;
            }
            else
            {
                this.fetchProductCounter++;
                if (this.fetchProductCounter <= 5)
                {
                    this.fetchProductList();
                }
            }
        });
    }
    
    onPaginateChange(event:PageEvent)
    {
        this.dtoSearchParam.limit = event.pageSize;
        this.dtoSearchParam.offset = (event.pageIndex * event.pageSize) ;
        this.fetchProductList();
    }
    
    showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
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
    
    public fetchProductSizeList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_SIZE_LIST), "{}").then(result => {
            if(result.success)
            {
                this.productSizeList = result.list;
                //this.selectedProductSize = this.productSizeList[0];
            }
            else
            {
                this.fetchProductSizeCounter++;
                if (this.fetchProductSizeCounter <= 5)
                {
                    this.fetchProductSizeList();
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
                //this.selectedProductType = this.productTypeList[0];
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
    
    public fetchOccupationList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_OCCUPATION_LIST), "{}").then(result => {
            if(result.success)
            {
                this.occupationList = result.list;
                //this.selectedOccuption = this.occupationList[0];
            }
            else
            {
                this.fetchOccupationCounter++;
                if (this.fetchOccupationCounter <= 5)
                {
                    this.fetchOccupationList();
                }
            }
        });
    }
    
    public fetchPetList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PET_LIST), "{}").then(result => {
            if(result.success)
            {
                this.petList = result.list;
                //this.selectedPet = this.petList[0];
            }
            else
            {
                this.fetchPetCounter++;
                if (this.fetchPetCounter <= 5)
                {
                    this.fetchPetList();
                }
            }            
        });
    }
    
    public fetchAvailabilityList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_AVAILABILITY_LIST), "{}").then(result => {
            if(result.success)
            {
                this.availabilityList = result.list;
                //this.selectedAvailability = this.availabilityList[0];
            }
            else
            {
                this.fetchAvailabilityCounter++;
                if (this.fetchAvailabilityCounter <= 5)
                {
                    this.fetchAvailabilityList();
                }
            }            
        });
    }
    
    //retrieve product list based on search params change
    public onSearchParamChange(event: Event) {
        if (this.selectedProductSize != null && this.selectedProductSize.id  > 0)
        {
            this.dtoSearchParam.sizeId = this.selectedProductSize.id;
        }
        if (this.selectedProductType != null && this.selectedProductType.id  > 0)
        {
            this.dtoSearchParam.typeId = this.selectedProductType.id;
        }
        if (this.selectedOccuption != null && this.selectedOccuption.id  > 0)
        {
            this.dtoSearchParam.occupationId = this.selectedOccuption.id;
        }
        if (this.selectedPet != null && this.selectedPet.id  > 0)
        {
            this.dtoSearchParam.petId = this.selectedPet.id;
        }
        if (this.selectedAvailability != null && this.selectedAvailability.id  > 0)
        {
            this.dtoSearchParam.availabilityId = this.selectedAvailability.id;
        }
        if (this.minPrice == null || this.minPrice == "")
        {
            this.dtoSearchParam.minPrice = 0;
        }
        else
        {
            this.dtoSearchParam.minPrice = +this.minPrice;
        }
        if (this.maxPrice == null || this.maxPrice == "")
        {
            this.dtoSearchParam.maxPrice = 0;
        }
        else
        {
            this.dtoSearchParam.maxPrice = +this.maxPrice;
        }
        this.dtoSearchParam.offset = 0;
        this.dtoSearchParam.limit = 10;         
        this.fetchProductList(); 
    }
    
    public hideChildModal(): void {
        this.searchModal.hide();
        this.message = "";
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
                this.searchModal.show();
            });
        }
        else
        {
            //show error messaage
            this.message = "Please login to save it.";
            this.searchModal.show();
        }
    }

    /*public saveProduct(event: Event, id: number) {
        let username = localStorage.getItem("username");
        if (username != null && username != ""){
            let product: Product = new Product();
            product.id = id;
            this.savedProduct.product = product;
            let requestBody: string = JSON.stringify(this.savedProduct);
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_SAVED_PRODUCT), requestBody).then(result => {
                let response  = result;                
                this.message = response.message;
                this.searchModal.show();
            });
        }
        else
        {
            //show error messaage
            this.message = "Please login to save it.";
            this.searchModal.show();
        }        
    }*/


    /*public selectProduct(event: Event, id: number) {
        this.router.navigate(['productinfo', {id: id}]);
    }*/

    doTriggerResize() {
        //this.sebmGoogMap.triggerResize();
    }

    goSearchMap(event: Event)
    {
        if (this.dtoSearchParam.referenceId != null && this.dtoSearchParam.referenceId != "")
        {
            localStorage.setItem("referenceId", this.dtoSearchParam.referenceId+"");
        }
        if (this.dtoSearchParam.sizeId != null && this.dtoSearchParam.sizeId > 0)
        {
            localStorage.setItem("productSizeId", this.dtoSearchParam.sizeId+"");
        }
        if (this.dtoSearchParam.typeId != null && this.dtoSearchParam.typeId > 0)
        {
            localStorage.setItem("productTypeId", this.dtoSearchParam.typeId+"");
        }
        if (this.dtoSearchParam.occupationId != null && this.dtoSearchParam.occupationId > 0)
        {
            localStorage.setItem("occupationId", this.dtoSearchParam.occupationId+"");
        }
        if (this.dtoSearchParam.petId != null && this.dtoSearchParam.petId > 0)
        {
            localStorage.setItem("petId", this.dtoSearchParam.petId+"");
        }
        if (this.dtoSearchParam.availabilityId != null && this.dtoSearchParam.availabilityId > 0)
        {
            localStorage.setItem("availabilityId", this.dtoSearchParam.availabilityId+"");
        }
        if (this.dtoSearchParam.minPrice != null && this.dtoSearchParam.minPrice > 0)
        {
            localStorage.setItem("minPrice", this.dtoSearchParam.minPrice+"");
        }
        if (this.dtoSearchParam.maxPrice != null && this.dtoSearchParam.maxPrice > 0)
        {
            localStorage.setItem("maxPrice", this.dtoSearchParam.maxPrice+"");
        }
        event.preventDefault();
        this.router.navigate(['searchmap', {id: this.keyword}]);
    }
    
}

