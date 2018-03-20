
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//import {Http} from '@angular/http';
//import {Subscription} from 'rxjs';
//import {Product} from '../dto/Product';
import {Common} from '../../../app/dto/Common';
import {DTOSearchParam} from '../../../app/dto/DTOSearchParam';
import {EntityProduct} from '../../../app/dto/EntityProduct';
import {EntitySavedProduct} from '../../../app/dto/EntitySavedProduct';
import {EntityLocation} from '../../../app/dto/EntityLocation';
import {EntityProductSize} from '../../../app/dto/EntityProductSize';
import {EntityProductType} from '../../../app/dto/EntityProductType';
import {EntityOccupation} from '../../../app/dto/EntityOccupation';
import {EntityPet} from '../../../app/dto/EntityPet';
import {EntityAvailability} from '../../../app/dto/EntityAvailability';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/search/advancedsearch.component.html',
    providers: [WebAPIService]
})
export class AdvancedSearchComponent{
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
   
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
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
    search(event: Event, id: string) {
        event.preventDefault();
        if (this.selectedProductSize != null && this.selectedProductSize.id  > 0)
        {
            localStorage.setItem("productSizeId", this.selectedProductSize.id+"");
        }
        if (this.selectedProductType != null && this.selectedProductType.id  > 0)
        {
            localStorage.setItem("productTypeId", this.selectedProductType.id+"");
        }
        if (this.selectedOccuption != null && this.selectedOccuption.id  > 0)
        {
            localStorage.setItem("occupationId", this.selectedOccuption.id+"");
        }
        if (this.selectedPet != null && this.selectedPet.id  > 0)
        {
            localStorage.setItem("petId", this.selectedPet.id+"");
        }
        if (this.selectedAvailability != null && this.selectedAvailability.id  > 0)
        {
            localStorage.setItem("availabilityId", this.selectedAvailability.id+"");
        }
        if (this.dtoSearchParam.minPrice != null && this.dtoSearchParam.minPrice > 0)
        {
            localStorage.setItem("minPrice", this.dtoSearchParam.minPrice+"");
        }
        if (this.dtoSearchParam.maxPrice != null && this.dtoSearchParam.maxPrice > 0)
        {
            localStorage.setItem("maxPrice", this.dtoSearchParam.maxPrice+"");
        }
        //forward search params into search page....
        /*if (this.searchParams.productType != null && this.searchParams.productType.id  != 0)
        {
            localStorage.setItem("productTypeId", this.searchParams.productType.id+"");
        }
        if (this.searchParams.productSize != null && this.searchParams.productSize.id  != 0)
        {
            localStorage.setItem("productSizeId", this.searchParams.productSize.id+"");
        }
        if (this.searchParams.occupation != null && this.searchParams.occupation.id  != 0)
        {
            localStorage.setItem("occupationId", this.searchParams.occupation.id+"");
        }
        if (this.searchParams.pet != null && this.searchParams.pet.id  != 0)
        {
            localStorage.setItem("petId", this.searchParams.pet.id+"");
        }
        if (this.searchParams.minPrice != null)
        {
            localStorage.setItem("minPrice", this.searchParams.minPrice+"");
        }
        if (this.searchParams.maxPrice != null)
        {
            localStorage.setItem("maxPrice", this.searchParams.maxPrice+"");
        }*/
        //let id:number;
        //id = 1;
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
