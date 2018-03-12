import {Component, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
//import {Http} from '@angular/http';
import {Subscription} from 'rxjs';
import {EntityProductCategory} from '../../../app/dto/EntityProductCategory'
import {EntityProductSize} from '../../../app/dto/EntityProductSize'
import {EntityProductType} from '../../../app/dto/EntityProductType'
import {EntityStay} from '../../../app/dto/EntityStay'
import {EntitySmoking} from '../../../app/dto/EntitySmoking'
import {EntityOccupation} from '../../../app/dto/EntityOccupation'
import {EntityPet} from '../../../app/dto/EntityPet'
import {EntityLocation} from '../../../app/dto/EntityLocation'
import {EntityAmenity} from '../../../app/dto/EntityAmenity'
import {EntityAvailability} from '../../../app/dto/EntityAvailability'
import {EntityTime} from '../../../app/dto/EntityTime'
import {EntityProduct} from '../../../app/dto/EntityProduct'
import {EntityUser} from '../../../app/dto/EntityUser'
import {DTOProduct} from '../../../app/dto/DTOProduct'
//import {User} from '../dto/User'
//import {Product} from '../dto/Product'
//import {Image} from '../dto/Image'
//import {General} from '../dto/General'
//import {ProductType} from '../dto/ProductType'
//import {ProductSize} from '../dto/ProductSize'
//import {ProductCategory} from '../dto/ProductCategory'
//import {Amenity} from '../dto/Amenity'
//import {Location} from '../dto/Location'
//import {Availability} from '../dto/Availability'
//import {Stay} from '../dto/Stay'
//import {Smoking} from '../dto/Smoking'
//import {Occupation} from '../dto/Occupation'
//import {Pet} from '../dto/Pet'
//import {BidTime} from '../dto/BidTime'
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import { FileUploader } from 'ng2-file-upload';
import { ModalDirective } from 'ngx-bootstrap';

const URL = window.SITE_URL + 'file/upload';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/advert/managead.component.html',
    providers: [WebAPIService, DatePipe]
})
export class ManageAdComponent {
    private datePipe: DatePipe;
    private subscribe:Subscription;
    private productId:number;
    private product: EntityProduct;
    private dtoProduct: DTOProduct;
    private fetchProductInfoCounter:number = 0;
    
    //private requestProduct: Product;
    //private responseProduct: Product;
    public uploader:FileUploader = new FileUploader({url: URL});
    private webAPIService: WebAPIService;
    //private product: Product;
    //private images: Image[];
    //private productTypeList: ProductType[];
    //private productSizeList: ProductSize[];    
    private selectedProductCategory: EntityProductCategory;
    private fetchProductCategoryCounter:number = 0;
    private productCategoryList: EntityProductCategory[];
    
    private selectedProductSize: EntityProductSize;
    private fetchProductSizeCounter:number = 0;
    private productSizeList: EntityProductSize[];
    
    private selectedProductType: EntityProductType;
    private fetchProductTypeCounter:number = 0;
    private productTypeList: EntityProductType[];
    
    private selectedLocation: EntityLocation;
    private fetchLocationCounter:number = 0;
    private locationList: EntityLocation[];
    
    private fetchAmenityCounter:number = 0;
    private amenityList: EntityAmenity[];
    
    private selectedMinStay: EntityStay;
    private selectedMaxStay: EntityStay;
    private fetchStayCounter:number = 0;
    private stayList: EntityStay[];
    
    private fetchAvailabilityCounter: number = 0;
    private availabilityList: EntityAvailability[];
    
    private selectedSmoking: EntitySmoking;
    private fetchSmokingCounter:number = 0;
    private smokingList: EntitySmoking[];
    
    private selectedOccupation: EntityOccupation;
    private fetchOccupationCounter:number = 0;
    private occupationList: EntityOccupation[];
    
    private selectedPet: EntityPet;
    private fetchPetCounter:number = 0;
    private petList: EntityPet[];
    
    private selectedBidStartTime: EntityTime;
    private selectedBidEndTime: EntityTime;
    private fetchTimeCounter: number = 0;
    private bidTimeList: EntityTime[];
    
    private uploadedImageNames: string;
    
    //private amenityList: Amenity[];
    //private amenities: Amenity[];
    //private tempAmenities: Amenity[];
    //private selectedProductType: ProductType;
    //private selectedProductSize: ProductSize;
    //private selectedProductCategory: ProductCategory; 
    //private locationList: Location[]; 
    //private availabilityList: Availability[];  
    //private availabilities:Availability[];  
    //private tempAvailabilities:Availability[];  
    //private minStayList: Stay[];
    //private maxStayList: Stay[];
    //private smokingList: Smoking[];
    //private occupationList: Occupation[];    
    //private petList: Pet[];
    
    //private availableTimeList: General[];
    //private bidTimeList: BidTime[];
    
    //private selectedBidStartTime: BidTime;
    //private selectedBidEndTime: BidTime;
    
    //private durationList: General[];    
    private showAvailableFromDatePicker: boolean = false;
    private showAvailableToDatePicker: boolean = false;
    private showBidStartDateDatePicker: boolean = false;
    private showBidEndDateDatePicker: boolean = false;
    
    public availableFrom: Date = new Date();
    public availableTo: Date = new Date();
    public bidStartDate: Date = new Date();
    public bidEndDate: Date = new Date();
    
    public minDate: Date = void 0;
    public minDate2: Date = void 0;
    
    public successMessage:string;
    public errorMessage:string;
    @ViewChild('manageProductModal') public manageProductModal:ModalDirective;
   
    
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService, public datepipe: DatePipe) {
        this.webAPIService = webAPIService;
        this.datePipe = datepipe;
        
        this.product = new EntityProduct();
        this.dtoProduct = new DTOProduct;
        this.dtoProduct.entityProduct = new EntityProduct();
        
        this.selectedProductCategory = new EntityProductCategory();
        this.productCategoryList = Array();
        
        this.selectedProductSize = new EntityProductSize();
        this.productSizeList = Array();
        
        this.selectedProductType = new EntityProductType();
        this.productTypeList = Array();
        
        this.selectedLocation = new EntityLocation();
        this.locationList = Array();
        
        this.amenityList = Array();
        
        this.selectedMinStay = new EntityStay();
        this.selectedMaxStay = new EntityStay();
        this.stayList = Array();
        
        this.availabilityList = Array();
        
        this.selectedSmoking = new EntitySmoking();
        this.smokingList = Array();
        
        this.selectedOccupation = new EntityOccupation();
        this.occupationList = Array();
        
        this.selectedPet = new EntityPet();
        this.petList = Array();
        
        this.selectedBidStartTime = new EntityTime();
        this.selectedBidEndTime = new EntityTime();
        this.bidTimeList = Array();
        
        this.uploadedImageNames = "";
        
        /*this.product = new Product();
        this.productTypeList = new Array<ProductType>();
        this.product.productType = new ProductType();
        this.productSizeList = new Array<ProductSize>();
        this.product.productSize = new ProductSize();
        
        this.product.productCategory = new ProductCategory();
        this.amenities = new Array<Amenity>();
        this.availabilityList = new Array<Availability>();
        this.availabilities = new Array<Availability>();
        this.bidTimeList = new Array<BidTime>();
        //this.selectedProductType = new ProductType();
        //this.selectedProductSize = new ProductSize();
        //this.selectedProductCategory = new ProductCategory();
        this.availableTimeList = JSON.parse("[{\"id\":\"12 AM\",\"title\":\"12 AM\"}, {\"id\":\"1 AM\",\"title\":\"1 AM\"}, {\"id\":\"2 AM\",\"title\":\"2 AM\"}, {\"id\":\"3 AM\",\"title\":\"3 AM\"}, {\"id\":\"4 AM\",\"title\":\"4 AM\"}, {\"id\":\"5 AM\",\"title\":\"5 AM\"}, {\"id\":\"6 AM\",\"title\":\"6 AM\"}, {\"id\":\"7 AM\",\"title\":\"7 AM\"}, {\"id\":\"8 AM\",\"title\":\"8 AM\"}, {\"id\":\"9 AM\",\"title\":\"9 AM\"}, {\"id\":\"10 AM\",\"title\":\"10 AM\"}, {\"id\":\"11 AM\",\"title\":\"11 AM\"}, {\"id\":\"12 PM\",\"title\":\"12 PM\"}, {\"id\":\"1 PM\",\"title\":\"1 PM\"}, {\"id\":\"2 PM\",\"title\":\"2 PM\"}, {\"id\":\"3 PM\",\"title\":\"3 PM\"}, {\"id\":\"4 PM\",\"title\":\"4 PM\"}, {\"id\":\"5 PM\",\"title\":\"5 PM\"}, {\"id\":\"6 PM\",\"title\":\"6 PM\"}, {\"id\":\"7 PM\",\"title\":\"7 PM\"}, {\"id\":\"8 PM\",\"title\":\"8 PM\"}, {\"id\":\"9 PM\",\"title\":\"9 PM\"}, {\"id\":\"10 PM\",\"title\":\"10 PM\"}, {\"id\":\"11 PM\",\"title\":\"11 PM\"}]");
        */
        //this.productCategoryList = JSON.parse("[{\"id\":\"1\",\"title\":\"1 Room\"}, {\"id\":\"2\",\"title\":\"2 Room\"}, {\"id\":\"3\",\"title\":\"3 Room\"}, {\"id\":\"4\",\"title\":\"4 Room\"}, {\"id\":\"5\",\"title\":\"5 Room\"}]");
        //this.productSizeList = JSON.parse("[{\"id\":\"1\",\"title\":\"1 Bed\"}, {\"id\":\"2\",\"title\":\"2 Bed\"}, {\"id\":\"3\",\"title\":\"3 Bed\"}, {\"id\":\"4\",\"title\":\"4 Bed\"}, {\"id\":\"5\",\"title\":\"5 Bed\"}]");
        //this.selectedProductSize = this.productSizeList[2];
        //this.productTypeList = JSON.parse("[{\"id\":\"1\",\"title\":\"Flat/Apartment\"}, {\"id\":\"2\",\"title\":\"House\"}, {\"id\":\"3\",\"title\":\"Property\"}]");
        //this.durationList = JSON.parse("[{\"id\":\"1\",\"title\":\"Daily\"}, {\"id\":\"2\",\"title\":\"Weekly\"}, {\"id\":\"3\",\"title\":\"Monthly\"}]");
        //this.areaList = JSON.parse("[{\"id\":\"1\", \"locationType\":\"area\",\"searchString\":\"London\"}, {\"id\":\"2\", \"locationType\":\"area\",\"searchString\":\"London 123\"}, {\"id\":\"3\", \"locationType\":\"area\",\"searchString\":\"London 456\"}]");
        //this.amenityList = JSON.parse("[{\"id\":\"1\",\"title\":\"Parking\"}, {\"id\":\"2\",\"title\":\"Balcony/patio\"}, {\"id\":\"3\",\"title\":\"Garden/roof terrace\"}, {\"id\":\"4\",\"title\":\"Disabled access\"}, {\"id\":\"5\",\"title\":\"Garage\"}]");
        //this.occupationList = JSON.parse("[{\"id\":\"1\",\"title\":\"No Preference\"}, {\"id\":\"2\",\"title\":\"Student\"}, {\"id\":\"3\",\"title\":\"Professional\"}]");
        //this.smokingList = JSON.parse("[{\"id\":\"1\",\"title\":\"No Preference\"}, {\"id\":\"2\",\"title\":\"No\"}]");
        //this.petList = JSON.parse("[{\"id\":\"1\",\"title\":\"No Preference\"}, {\"id\":\"2\",\"title\":\"No\"}]");
        //this.minStayList = JSON.parse("[{\"id\":\"1\",\"title\":\"No Minimum\"}, {\"id\":\"2\",\"title\":\"1 Day\"}, {\"id\":\"2\",\"title\":\"1 Day\"}, {\"id\":\"3\",\"title\":\"2 Day\"}, {\"id\":\"4\",\"title\":\"3 Day\"}, {\"id\":\"5\",\"title\":\"1 Week\"}, {\"id\":\"6\",\"title\":\"2 Week\"}, {\"id\":\"7\",\"title\":\"1 Month\"}, {\"id\":\"8\",\"title\":\"2 Month\"}]");
        //this.maxStayList = JSON.parse("[{\"id\":\"1\",\"title\":\"No Maximum\"}, {\"id\":\"2\",\"title\":\"1 Day\"}, {\"id\":\"2\",\"title\":\"1 Day\"}, {\"id\":\"3\",\"title\":\"2 Day\"}, {\"id\":\"4\",\"title\":\"3 Day\"}, {\"id\":\"5\",\"title\":\"1 Week\"}, {\"id\":\"6\",\"title\":\"2 Week\"}, {\"id\":\"7\",\"title\":\"1 Month\"}, {\"id\":\"8\",\"title\":\"2 Month\"}]");
        
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers:any)=>  {
            if (this.product.img == null || this.product.img == "")
            {
                this.product.img = response;
            }
            if (this.product.images == null || this.product.images == "")
            {
                this.product.images = response;
            }
            else
            {
                let imageArray: string[];
                if(this.product.images != null)
                {
                    imageArray = this.product.images.split(",");
                }
                imageArray[imageArray.length] = response;
                let imageString: string = "";
                for (let counter = 0; counter < imageArray.length; counter++)
                {
                    if (counter > 0)
                    {
                        imageString = imageString + "," + imageArray[counter];
                    }
                    else
                    {
                        imageString = imageArray[counter];
                    }
                }
                this.product.images = imageString;
            }
            //keep tracking uploaded image names
            if (this.uploadedImageNames == null || this.uploadedImageNames == "")
            {
                this.uploadedImageNames = response;
            }
            else
            {
                let imageArray: string[];
                if(this.uploadedImageNames != null)
                {
                    imageArray = this.uploadedImageNames.split(",");
                }
                imageArray[imageArray.length] = response;
                let imageString: string = "";
                for (let counter = 0; counter < imageArray.length; counter++)
                {
                    if (counter > 0)
                    {
                        imageString = imageString + "," + imageArray[counter];
                    }
                    else
                    {
                        imageString = imageArray[counter];
                    }
                }
                this.uploadedImageNames = imageString;
            }
        }
        
        setInterval(() => { this.manageProductModal.hide(); }, 1000 * 5);
        
    }
    
    public hideChildModal(): void {
        this.manageProductModal.hide();
    }
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.product = new EntityProduct();
            this.productId = params['id'];
            //if we have valid id then get product info from the server
            if (this.productId > 0)
            {
                this.fetchProductInfoCounter = 0;
                this.fetchProductInfo();
            }
            else
            {
                this.fetchUserProfileInfo();
                this.fetchProductCategoryList();
                this.fetchProductTypeList();
                this.fetchProductSizeList();
                this.fetchLocationList();
                this.fetchAmenityList();
                this.fetchStayList();
                this.fetchAvailabilityList();
                this.fetchSmokingList();
                this.fetchOccupationList();
                this.fetchPetList();
                this.fetchTimeList();
            }
        });
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
    
    navigateToTopOfPage(event: Event)
    {
        window.scrollTo(0, 0);
    }
    
    fetchUserProfileInfo()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_PROFILE_INFO), "{}").then(result => {
            if (result != null && result.success)
            {
                let entityUser: EntityUser = result.result;
                this.product.firstName = entityUser.firstName;
                this.product.lastName = entityUser.lastName;
                this.product.phone = entityUser.cell;
                this.product.companyName = entityUser.businessName;
            }            
        });
    }
    
    public fetchProductInfo()
    {
        let requestEntityProduct: EntityProduct = new EntityProduct();
        requestEntityProduct.id = this.productId;
        let requestBody: string = JSON.stringify(requestEntityProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_INFO), requestBody).then(result => {
            if(result.success)
            {
                this.dtoProduct = result.result;
                this.product = this.dtoProduct.entityProduct;
                if (this.product.availableFrom != null && this.product.availableFrom != "")
                {
                    this.availableFrom = new Date(this.product.availableFrom);
                }
                
                if (this.product.onGoing)
                {
                    this.availableTo = void 0;
                }
                else
                {
                    if (this.product.availableTo != null && this.product.availableTo != "")
                    {
                        this.availableTo = new Date(this.product.availableTo);
                    }                    
                }
                if (this.product.auctionStartDate != null && this.product.auctionStartDate != "")
                {
                    this.bidStartDate = new Date(this.product.auctionStartDate);
                }
                if (this.product.auctionEndDate != null && this.product.auctionEndDate != "")
                {
                    this.bidEndDate = new Date(this.product.auctionEndDate);
                }
                
                
                this.fetchProductCategoryList();
                this.fetchProductTypeList();
                this.fetchProductSizeList();
                this.fetchLocationList();
                this.fetchAmenityList();
                this.fetchStayList();
                this.fetchAvailabilityList();
                this.fetchSmokingList();
                this.fetchOccupationList();
                this.fetchPetList();
                this.fetchTimeList()
                /*this.product = result;
                this.amenities = this.product.amenities;
                this.availableFrom = new Date(this.product.availableFrom);
                if (this.product.ongoing)
                {
                    this.availableTo = void 0;
                }
                else
                {
                    this.availableTo = new Date(this.product.availableTo);
                }
                
                this.bidStartDate = new Date(this.product.bidStartDate);
                this.bidEndDate = new Date(this.product.bidEndDate);
                this.availabilities = this.product.availabilities;
                //set or update product fields into interface
                
                
                
                
                
                
                ;*/
            }
            else
            {
                this.fetchProductInfoCounter++;
                if (this.fetchProductInfoCounter <= 5)
                {
                    this.fetchProductInfo();
                }
            }
        });
    }
    
    public fetchProductCategoryList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_CATEGORY_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.productCategoryList = result.list;
                if (this.productCategoryList.length > 0)
                {
                    if (this.productId > 0)
                    {
                        for (let counter = 0; counter < this.productCategoryList.length; counter++)
                        {
                            if (this.productCategoryList[counter].id == this.product.categoryId)
                            {
                                this.selectedProductCategory = this.productCategoryList[counter];
                            }
                        }
                    }
                    else
                    {
                        this.selectedProductCategory = this.productCategoryList[0];
                    }                    
                }
            }
            else
            {
                this.fetchProductCategoryCounter++;
                if (this.fetchProductCategoryCounter <= 5)
                {
                    this.fetchProductCategoryList();
                }
            }
        });
    }
    
    public fetchProductSizeList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_SIZE_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.productSizeList = result.list;
                if (this.productSizeList.length > 0)
                {
                    if (this.productId > 0)
                    {
                        for (let counter = 0; counter < this.productSizeList.length; counter++)
                        {
                            if (this.productSizeList[counter].id == this.product.sizeId)
                            {
                                this.selectedProductSize = this.productSizeList[counter];
                            }
                        }
                    }
                    else
                    {
                        this.selectedProductSize = this.productSizeList[0];
                    }
                }
                else
                {
                    this.fetchProductSizeCounter++;
                    if (this.fetchProductSizeCounter <= 5)
                    {
                        this.fetchProductSizeList();
                    }
                }
            }            
        });
    }
    
    public fetchProductTypeList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_TYPE_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.productTypeList = result.list;
                //set product type matching id
                if (this.productTypeList.length > 0)
                {
                    if (this.productId > 0 )
                    {
                        for (let counter = 0; counter < this.productTypeList.length; counter++)
                        {
                            if (this.productTypeList[counter].id == this.product.typeId)
                            {
                                this.selectedProductType = this.productTypeList[counter];
                            }
                        }
                    }
                    else
                    {
                        this.selectedProductType = this.productTypeList[0];
                    }                    
                }
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
    
    public fetchLocationList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_LOCATION_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.locationList = result.list;
                if (this.locationList.length > 0)
                {
                    if (this.productId > 0 )
                    {
                        for (let counter = 0; counter < this.locationList.length; counter++)
                        {
                            if (this.locationList[counter].id == this.product.locationId)
                            {
                                this.selectedLocation = this.locationList[counter];
                            }
                        }
                    }
                    else
                    {
                        this.selectedLocation = this.locationList[0];
                    }   
                }
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
    
    public fetchAmenityList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_AMENITY_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.amenityList = result.list;
            }
            else
            {
                this.fetchAmenityCounter++;
                if (this.fetchAmenityCounter <= 5)
                {
                    this.fetchAmenityList();
                }
            }
        });
    }
    
    public fetchStayList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_STAY_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.stayList = result.list;
                if (this.stayList.length > 0)
                {
                    if (this.productId > 0)
                    {
                        for (let counter = 0; counter < this.stayList.length; counter++)
                        {
                            if (this.stayList[counter].id == this.product.minStayId)
                            {
                                this.selectedMinStay = this.stayList[counter];
                            }
                        }
                    }
                    else
                    {
                        this.selectedMinStay = this.stayList[0];
                    }
                }
                if (this.stayList.length > 0)
                {
                    if (this.productId > 0)
                    {
                        for (let counter = 0; counter < this.stayList.length; counter++)
                        {
                            if (this.stayList[counter].id == this.product.maxStayId)
                            {
                                this.selectedMaxStay = this.stayList[counter];
                            }
                        }
                    }
                    else
                    {
                        this.selectedMaxStay = this.stayList[0];
                    }
                }
            }
            else
            {
                this.fetchStayCounter++;
                if (this.fetchStayCounter <= 5)
                {
                    this.fetchStayList();
                }
            }
        });
    }
    
    public fetchAvailabilityList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_AVAILABILITY_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.availabilityList = result.list;
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
    
    public fetchSmokingList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SMOKING_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.smokingList = result.list;
                if (this.smokingList.length > 0)
                {
                    if (this.productId > 0)
                    {
                        for (let counter = 0; counter < this.smokingList.length; counter++)
                        {
                            if (this.smokingList[counter].id == this.product.smokingId)
                            {
                                this.selectedSmoking = this.smokingList[counter];
                            }
                        }
                    }
                    else
                    {
                        this.selectedSmoking = this.smokingList[0];
                    }                    
                }
            }
            else
            {
                this.fetchSmokingCounter++;
                if (this.fetchSmokingCounter <= 5)
                {
                    this.fetchSmokingList();
                }
            }
        });
    }
    
    public fetchOccupationList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_OCCUPATION_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.occupationList = result.list;
                if (this.occupationList.length > 0)
                {
                    if (this.productId > 0)
                    {
                        for (let counter = 0; counter < this.occupationList.length; counter++)
                        {
                            if (this.occupationList[counter].id == this.product.occupationId)
                            {
                                this.selectedOccupation = this.occupationList[counter];
                            }
                        }
                    }
                    else
                    {
                        this.selectedOccupation = this.occupationList[0];
                    }                    
                }
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
            if(result.success && result.list != null)
            {
                this.petList = result.list;
                if (this.petList.length > 0)
                {
                    if (this.productId > 0)
                    {
                        for (let counter = 0; counter < this.petList.length; counter++)
                        {
                            if (this.petList[counter].id == this.product.petId)
                            {
                                this.selectedPet = this.petList[counter];
                            }
                        }
                    }
                    else
                    {
                        this.selectedPet = this.petList[0];
                    }                    
                }
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
    
    public fetchTimeList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_TIME_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.bidTimeList = result.list;
                if (this.product.id > 0)
                {
                    let counter: number = 0;
                    for (counter = 0; counter < this.bidTimeList.length; counter++)
                    {
                        if (this.product.auctionStartTimeId == this.bidTimeList[counter].id)
                        {
                            this.selectedBidStartTime = this.bidTimeList[counter];
                        }
                        if (this.product.auctionEndTimeId == this.bidTimeList[counter].id)
                        {
                            this.selectedBidEndTime = this.bidTimeList[counter];
                        }
                    }
                }
                else
                {
                    if (this.bidTimeList.length > 0)
                    {
                        this.selectedBidStartTime = this.bidTimeList[0];
                        this.selectedBidEndTime = this.bidTimeList[0]; 
                    }
                }
            } 
            else
            {
                this.fetchTimeCounter++;
                if (this.fetchTimeCounter <= 5)
                {
                    this.fetchTimeList();
                }
            }           
        });
    }
    
    
    /*
    public fetchAmenityList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_AMENITY_LIST)).then(result => {
            if(result.success && result.amenities != null)
            {
                this.amenityList = result.amenities;
            }
            else
            {
                this.fetchAmenityCounter++;
                if (this.fetchAmenityCounter <= 5)
                {
                    this.fetchAmenityList();
                }
            }
        });
    }
    
    

    
    
    */
        
    
    
    //onDropdownProductTypeChange(event: any) 
    //{
        //this.product.productType = new ProductType();
        //this.product.productType = event;  
        //this.selectedProductType = event;    
        //console.log(this.product.productType);
    //}
//    onDropdownProductSizeChange(event: any) 
//    {
//        this.product.productSize = new ProductSize();
//        this.product.productSize.id = event;    
//    }
//    onDropdownProductCategoryChange(event: any) 
//    {
//        this.product.productCategory = new ProductCategory();
//        this.product.productCategory.id = event;      
//    }
    
    setCurrentAmenities(id: number)
    {
        let amenityArray: string[];
        if(this.product.amenityIds != null)
        {
            amenityArray = this.product.amenityIds.split(",");
        }
        if (amenityArray != null && amenityArray.length > 0)
        {
            for (let counter = 0; counter < amenityArray.length; counter++)
            {
                if (+amenityArray[counter] == id)
                {
                    return true;
                }
            }
        }
        return false;
    }
    
    updateCheckedAmenities(amenity: EntityAmenity, event: Event)
    {
        let tempAmenityIdArray: string[] = Array();
        let tempAmenityTitleArray: string[] = Array();
        
        let amenityIdArray: string[];
        if(this.product.amenityIds != null)
        {
            amenityIdArray = this.product.amenityIds.split(",");
        }
        
        let amenityTitleArray: string[];
        if(this.product.amenityTitles != null)
        {
            amenityTitleArray = this.product.amenityTitles.split(",");
        }
        let exist: Boolean = false;
        if (amenityIdArray != null && amenityIdArray.length > 0)
        {
            for (let counter = 0; counter < amenityIdArray.length; counter++)
            {
                if (+amenityIdArray[counter] == amenity.id)
                {
                    exist = true;
                }
                else
                {
                    tempAmenityIdArray[tempAmenityIdArray.length] = amenityIdArray[counter];
                    tempAmenityTitleArray[tempAmenityTitleArray.length] = amenityTitleArray[counter];
                }
            }
        }
        if (!exist)
        {
            tempAmenityIdArray[tempAmenityIdArray.length] = amenity.id+"";
            tempAmenityTitleArray[tempAmenityTitleArray.length] = amenity.title;
        }
        let amenityIdString: string = "";
        let amenityTitleString: string = "";
        if (tempAmenityIdArray != null && tempAmenityIdArray.length > 0)
        {
            for (let counter = 0; counter < tempAmenityIdArray.length; counter++)
            {
                if (counter > 0)
                {
                    amenityIdString = amenityIdString + "," + tempAmenityIdArray[counter];
                    amenityTitleString = amenityTitleString + "," + tempAmenityTitleArray[counter];
                }
                else
                {
                    amenityIdString = tempAmenityIdArray[counter];
                    amenityTitleString = tempAmenityTitleArray[counter];
                }
            }
        }
        this.product.amenityIds = amenityIdString;
        this.product.amenityTitles = amenityTitleString;        
    }
    
    setCurrentAvailabilities(id: number)
    {
        let availabilityArray: string[];
        if(this.product.availabilityIds != null)
        {
            availabilityArray = this.product.availabilityIds.split(",");
        }
        if (availabilityArray != null && availabilityArray.length > 0)
        {
            for (let counter = 0; counter < availabilityArray.length; counter++)
            {
                if (+availabilityArray[counter] == id)
                {
                    return true;
                }
            }
        }
        return false;
    }
    
    updateCheckedAvailabilities(availability: EntityAvailability, event: Event)
    {
        let tempAvailabilityIdArray: string[] = Array();
        let tempAvailabilityTitleArray: string[] = Array();
        
        let availabilityIdArray: string[];
        if(this.product.availabilityIds != null)
        {
            availabilityIdArray = this.product.availabilityIds.split(",");
        }
        
        let availabilityTitleArray: string[];
        if(this.product.availabilityTitles != null)
        {
            availabilityTitleArray = this.product.availabilityTitles.split(",");
        }
        let exist: Boolean = false;
        if (availabilityIdArray != null && availabilityIdArray.length > 0)
        {
            for (let counter = 0; counter < availabilityIdArray.length; counter++)
            {
                if (+availabilityIdArray[counter] == availability.id)
                {
                    exist = true;
                }
                else
                {
                    tempAvailabilityIdArray[tempAvailabilityIdArray.length] = availabilityIdArray[counter];
                    tempAvailabilityTitleArray[tempAvailabilityTitleArray.length] = availabilityTitleArray[counter];
                }
            }
        }
        if (!exist)
        {
            tempAvailabilityIdArray[tempAvailabilityIdArray.length] = availability.id+"";
            tempAvailabilityTitleArray[tempAvailabilityTitleArray.length] = availability.title;
        }
        let availabilityIdString: string = "";
        let availabilityTitleString: string = "";
        if (tempAvailabilityIdArray != null && tempAvailabilityIdArray.length > 0)
        {
            for (let counter = 0; counter < tempAvailabilityIdArray.length; counter++)
            {
                if (counter > 0)
                {
                    availabilityIdString = availabilityIdString + "," + tempAvailabilityIdArray[counter];
                    availabilityTitleString = availabilityTitleString + "," + tempAvailabilityTitleArray[counter];
                }
                else
                {
                    availabilityIdString = tempAvailabilityIdArray[counter];
                    availabilityTitleString = tempAvailabilityTitleArray[counter];
                }
            }
        }
        this.product.availabilityIds = availabilityIdString;
        this.product.availabilityTitles = availabilityTitleString; 
    }
    
    updateChangeOnGoing(event: Event)
    {
        if (this.product.onGoing)
        {
            this.product.availableTo = "";
            this.availableTo = void 0;
        }
        else
        {
            this.availableTo = new Date();
        }
    }
    
    saveProduct(event: Event) 
    {
        if (this.selectedProductCategory != null && this.selectedProductCategory.id > 0)
        {
            this.product.categoryId = this.selectedProductCategory.id;
            this.product.categoryTitle = this.selectedProductCategory.title;
        }
        if (this.selectedProductSize != null && this.selectedProductSize.id > 0)
        {
            this.product.sizeId = this.selectedProductSize.id;
            this.product.sizeTitle = this.selectedProductSize.title;
        }
        if (this.selectedProductType != null && this.selectedProductType.id > 0)
        {
            this.product.typeId = this.selectedProductType.id;
            this.product.typeTitle = this.selectedProductType.title;
        }
        if (this.selectedLocation != null && this.selectedLocation.id > 0)
        {
            this.product.locationId = this.selectedLocation.id;
            this.product.locationTitle = this.selectedLocation.searchString;
            this.product.lat = this.selectedLocation.lat;
            this.product.lon = this.selectedLocation.lon;
        }
        if (this.selectedMinStay != null && this.selectedMinStay.id > 0)
        {
            this.product.minStayId = this.selectedMinStay.id;
            this.product.minStayTitle = this.selectedMinStay.title;
        }
        if (this.selectedMaxStay != null && this.selectedMaxStay.id > 0)
        {
            this.product.maxStayId = this.selectedMaxStay.id;
            this.product.maxStayTitle = this.selectedMaxStay.title;
        }
        if (this.selectedSmoking != null && this.selectedSmoking.id > 0)
        {
            this.product.smokingId = this.selectedSmoking.id;
            this.product.smokingTitle = this.selectedSmoking.title;
        }
        if (this.selectedOccupation != null && this.selectedOccupation.id > 0)
        {
            this.product.occupationId = this.selectedOccupation.id;
            this.product.occupationTitle = this.selectedOccupation.title;
        }
        if (this.selectedPet != null && this.selectedPet.id > 0)
        {
            this.product.petId = this.selectedPet.id;
            this.product.petTitle = this.selectedPet.title;
        }
        if (this.selectedBidStartTime != null && this.selectedBidStartTime.id > 0)
        {
            this.product.auctionStartTimeId = this.selectedBidStartTime.id;
        }
        if (this.selectedBidEndTime != null && this.selectedBidEndTime.id > 0)
        {
            this.product.auctionEndTimeId = this.selectedBidEndTime.id;
        }
        
        this.product.availableFrom = this.datepipe.transform(this.availableFrom, 'yyyy-MM-dd');
        if (!this.product.onGoing)
        {
            this.product.availableTo = this.datepipe.transform(this.availableTo, 'yyyy-MM-dd');
        }
        else
        {
            this.product.availableTo = "";
        }
        this.product.auctionStartDate = this.datepipe.transform(this.bidStartDate, 'yyyy-MM-dd');
        this.product.auctionEndDate = this.datepipe.transform(this.bidEndDate, 'yyyy-MM-dd');
        
        /*this.product.availableFrom = this.datepipe.transform(this.availableFrom, 'yyyy-MM-dd');
        if (!this.product.ongoing)
        {
            this.product.availableTo = this.datepipe.transform(this.availableTo, 'yyyy-MM-dd');
        }
        else
        {
            this.product.availableTo = "";
        }
        
        this.product.bidStartDate = this.datepipe.transform(this.bidStartDate, 'yyyy-MM-dd');
        this.product.bidEndDate = this.datepipe.transform(this.bidEndDate, 'yyyy-MM-dd');
        
        this.product.amenities = this.amenities;
        this.product.availabilities = this.availabilities;
        this.product.bidStartTime = this.selectedBidStartTime.title;
        this.product.bidEndTime = this.selectedBidEndTime.title;*/
        
        let dtoProduct: DTOProduct = new DTOProduct();
        dtoProduct.images = this.uploadedImageNames;
        dtoProduct.entityProduct = this.product;
        
        let requestBody: string = JSON.stringify(dtoProduct);
        if (this.productId == 0)
        {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PRODUCT_INFO), requestBody).then(result =>{
                if (result.success)
                {
                    //modal pop up will not work after navigation, so it is commented.
                    //this.successMessage = "Your ad is created successfully.";
                    //this.manageProductModal.show();
                    this.router.navigate(['myads']);
                }
                else
                {
                    this.errorMessage = "Unable to create your ad. Please try again.";
                    this.manageProductModal.show();
                }
            });
        }
        else
        {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_PRODUCT_INFO), requestBody).then(result =>{
                if (result.success)
                {
                    //modal pop up will not work after navigation, so it is commented.
                    //this.successMessage = "Your ad is updated successfully.";
                    //this.manageProductModal.show();
                    this.router.navigate(['myads']);
                }
                else
                {
                    this.errorMessage = "Unable to update your ad. Please try again.";
                    this.manageProductModal.show();
                }
            });
        }
    }
    
    /*
    
    
    
    updateChangeOngoing(event: Event)
    {
        if (this.product.ongoing)
        {
            this.product.availableTo = "";
            this.availableTo = void 0;
        }
        else
        {
            this.availableTo = new Date();
        }
    }*/
}

