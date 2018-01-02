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
        
        this.dtoSearchParam = new DTOSearchParam();
        
        this.entitySavedProduct = new EntitySavedProduct();
        
        this.priceList = Array();
        this.priceList = JSON.parse("[{\"id\":\"100\",\"title\":\"100\"}, {\"id\":\"200\",\"title\":\"200\"}, {\"id\":\"300\",\"title\":\"300\"}, {\"id\":\"400\",\"title\":\"400\"}, {\"id\":\"500\",\"title\":\"500\"}]");
        this.selectedMinPrice = new Common();
        this.selectedMaxPrice = new Common();
        
        this.productList = Array();
        
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
        
        
//        this.searchParams = new SearchParams();
//        this.savedProduct = new SavedProduct();
//        
        //get search params from local storage
//        let referenceId = localStorage.getItem("referenceId");
//        if (referenceId != null && referenceId != ""){
//            this.searchParams.referenceId = referenceId;
//            localStorage.removeItem("referenceId");
//        }
//        
//        let productTypeId = localStorage.getItem("productTypeId");
//        if (productTypeId != null && productTypeId != ""){
//            this.searchParams.productType = new ProductType();
//            this.searchParams.productType.id = +productTypeId;
//            localStorage.removeItem("productTypeId");
//        }
        
//        let locationId = localStorage.getItem("locationId");
//        if (locationId != null && locationId != ""){
//            this.searchParams.location = new Location();
//            this.searchParams.location.id = +locationId;
//            localStorage.removeItem("locationId");
//        }
        
//        let productSizeId = localStorage.getItem("productSizeId");
//        if (productSizeId != null && productSizeId != ""){
//            this.searchParams.productSize = new ProductSize();
//            this.searchParams.productSize.id = +productSizeId;
//            localStorage.removeItem("productSizeId");
//        }
//        
//        let occupationId = localStorage.getItem("occupationId");
//        if (occupationId != null && occupationId != ""){
//            this.searchParams.occupation = new Occupation();
//            this.searchParams.occupation.id = +occupationId;
//            localStorage.removeItem("occupationId");
//        }
//        
//        let petId = localStorage.getItem("petId");
//        if (petId != null && petId != ""){
//            this.searchParams.pet = new Pet();
//            this.searchParams.pet.id = +petId;
//            localStorage.removeItem("petId");
//        }
//        
//        let minPrice = localStorage.getItem("minPrice");
//        if (minPrice != null && minPrice != ""){
//            this.searchParams.minPrice = +minPrice;
//            localStorage.removeItem("minPrice");
//        }
//        
//        let maxPrice = localStorage.getItem("maxPrice");
//        if (maxPrice != null && maxPrice != ""){
//            this.searchParams.maxPrice = +maxPrice;
//            localStorage.removeItem("maxPrice");
//        }
        
        //this.locationList = JSON.parse("[{\"id\":\"1\",\"locationType\":\"area\",\"searchString\":\"London\"}, {\"id\":\"2\",\"locationType\":\"area\",\"searchString\":\"London 123\"}]");
        
        //this.radiusList = JSON.parse("[{\"id\":\"1\",\"title\":\"+0 miles\"}, {\"id\":\"2\",\"title\":\"+1/4 miles\"}, {\"id\":\"3\",\"title\":\"+1/2 miles\"}]");
        //this.minPriceList = JSON.parse("[{\"id\":\"1\",\"symbol\":\"\",\"amount\":\"Min Price\"}, {\"id\":\"2\",\"symbol\":\"£\",\"amount\":\"500\"}, {\"id\":\"3\",\"symbol\":\"£\",\"amount\":\"600\"}]");
        //this.maxPriceList = JSON.parse("[{\"id\":\"1\",\"symbol\":\"\",\"amount\":\"Max Price\"}, {\"id\":\"2\",\"symbol\":\"£\",\"amount\":\"500\"}, {\"id\":\"3\",\"symbol\":\"£\",\"amount\":\"600\"}]");
        //this.productTypeList = JSON.parse("[{\"id\":\"1\",\"title\":\"Property\"}, {\"id\":\"2\",\"title\":\"Room\"}]");
        //this.occupationList = JSON.parse("[{\"id\":\"1\",\"title\":\"Any Occupation\"}, {\"id\":\"2\",\"title\":\"Professional\"}, {\"id\":\"3\",\"title\":\"Student\"}]");
        //this.genderList = JSON.parse("[{\"id\":\"1\",\"title\":\"Any Gender\"}, {\"id\":\"2\",\"title\":\"Males\"}, {\"id\":\"3\",\"title\":\"Females\"}]");
        //this.roomSizeList = JSON.parse("[{\"id\":\"1\",\"title\":\"Any room size\"}, {\"id\":\"2\",\"title\":\"Double room\"}, {\"id\":\"3\",\"title\":\"Single room\"}]");
        
        //this.productList = JSON.parse("[{\"id\":\"1\",\"title\":\"Fun at the Bowling Alley1\", \"img\":\"a.jpg\", \"price\":\"£100\", \"price_type\":\"pw\", \"size\":\"single\", \"images\":[{\"id\":\"1\", \"url\":\"a.jpg\"}, {\"id\":\"2\", \"url\":\"b.jpg\"}], \"available\":\"2017-04-18\", \"description\":\"Double room in E16 available from 17/04/2017, short walk away from Prince Regent Lane DLR1.\"}, {\"id\":\"3\",\"title\":\"Fun at the Bowling Alley2\", \"img\":\"a.jpg\", \"price\":\"£100\", \"price_type\":\"pw\", \"size\":\"single\", \"images\":[{\"id\":\"1\", \"url\":\"a.jpg\"}, {\"id\":\"2\", \"url\":\"b.jpg\"}], \"available\":\"2017-04-18\", \"description\":\"Double room in E16 available from 17/04/2017, short walk away from Prince Regent Lane DLR2.\"}, {\"id\":\"3\",\"title\":\"Fun at the Bowling Alley3\", \"img\":\"a.jpg\", \"price\":\"£100\", \"price_type\":\"pw\", \"size\":\"single\", \"images\":[{\"id\":\"1\", \"url\":\"a.jpg\"}, {\"id\":\"2\", \"url\":\"b.jpg\"}], \"available\":\"2017-04-18\", \"description\":\"Double room in E16 available from 17/04/2017, short walk away from Prince Regent Lane DLR3.\"}, {\"id\":\"4\",\"title\":\"Fun at the Bowling Alley4\", \"img\":\"a.jpg\", \"price\":\"£100\", \"price_type\":\"pw\", \"size\":\"single\", \"images\":[{\"id\":\"1\", \"url\":\"a.jpg\"}, {\"id\":\"2\", \"url\":\"b.jpg\"}], \"available\":\"2017-04-18\", \"description\":\"Double room in E16 available from 17/04/2017, short walk away from Prince Regent Lane DLR4.\"} ]");
//        let requestBody: string = JSON.stringify(this.searchParams);
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_LIST), requestBody).then(result => {
//            this.productList = result.products;
//        });
//        this.fetchProductList();
//        this.fetchLocationList();
//        this.fetchProductTypeList();
//        this.fetchProductSizeList();
//        this.fetchAvailabilityList();
//        this.fetchOccupationList();
//        this.fetchPetList();
//        
//        this.minPriceList = JSON.parse("[{\"id\":\"1\",\"title\":\"100\"}, {\"id\":\"2\",\"title\":\"200\"}, {\"id\":\"3\",\"title\":\"300\"}, {\"id\":\"4\",\"title\":\"400\"}, {\"id\":\"5\",\"title\":\"500\"}]");
//        this.maxPriceList = JSON.parse("[{\"id\":\"1\",\"title\":\"100\"}, {\"id\":\"2\",\"title\":\"200\"}, {\"id\":\"3\",\"title\":\"300\"}, {\"id\":\"4\",\"title\":\"400\"}, {\"id\":\"5\",\"title\":\"500\"}]");
//        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_LOCATION_LIST)).then(result => {
//            this.locationList = result.locations;
//        });
        
        //this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_RADIUS_LIST)).then(result => {
        //    this.radiusList = result.radiuses;
        //});
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_MIN_PRICE_LIST)).then(result => {
//            this.minPriceList = result.prices;
//        });
//        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_MAX_PRICE_LIST)).then(result => {
//            this.maxPriceList = result.prices;
//        });
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_TYPE_LIST)).then(result => {
//            this.productTypeList = result.productTypes;
//        });
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_SIZE_LIST)).then(result => {
//            this.productSizeList = result.productSizes;
//        });
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_OCCUPATION_LIST)).then(result => {
//            this.occupationList = result.occupations;
//        });
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PET_LIST)).then(result => {
//            this.petList = result.pets;
//        });
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_GENDER_LIST)).then(result => {
//            this.genderList = result.genders;
//        });
        
        
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ROOM_SIZE_LIST)).then(result => {
//            this.roomSizeList = result.roomSizes;
//        });
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_AVAILABILITY_LIST)).then(result => {
//            this.availabilityList = result.availabilities;
//        });
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_DURATION_LIST)).then(result => {
//            this.durationList = result.durations;
//        });
        
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_LIST)).then(result => {
//            //this.productList = result.products;
//        });
        
        //console.log(this.productList);
        setInterval(() => {this.searchModal.hide(); }, 1000 * 5);

    }
    
    ngOnInit() {
//        this.sebmGoogMap.triggerResize();
        this.subscribe = this.route.params.subscribe(params => {
            this.id = params['id']; 
            this.dtoSearchParam.offset = 0;
            this.dtoSearchParam.limit = 10;         
            this.fetchProductList();         
        });
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
                        tempProductList[counter].imageArray = tempProductList[counter].images.split(",");
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
                this.selectedProductSize = this.productSizeList[0];
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
                this.selectedProductType = this.productTypeList[0];
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
                this.selectedOccuption = this.occupationList[0];
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
                this.selectedPet = this.petList[0];
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
                this.selectedAvailability = this.availabilityList[0];
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

    
}

