import {Component} from '@angular/core';
import {Router} from '@angular/router'
import {DTOProduct} from './dto/DTOProduct';
import {EntityLocation} from './dto/EntityLocation';
import {PacketHeaderFactory} from './webservice/PacketHeaderFactory';
import {ACTION} from './webservice/ACTION';
import {NavigationManager} from './services/NavigationManager';
import {WebAPIService} from './webservice/web-api-service';

@Component({
    selector: 'app',
    templateUrl: 'app/html/app.component.html',
    providers: [WebAPIService]
})

export class AppComponent { 
    private webAPIService: WebAPIService;
    private showNavBar: boolean = false;
    private activeMenu: string = "productlist";
    
    private fetchClosingProductCounter:number = 5;
    private featuredProductList: DTOProduct[];  
    
    private fetchLocationCounter: number = 5;
    private locationList: EntityLocation[];
    
    constructor(private router: Router, private navigationManager: NavigationManager, webAPIService: WebAPIService)
    {
        this.navigationManager.showNavBarEmitter.subscribe((mode) => {
            if (mode !== null) {
                this.showNavBar = mode;
            }
        });
        this.navigationManager.menuActivationEmitter.subscribe((menuName) => {
            if (menuName !== null) {
                this.activeMenu = menuName;
            }
        });
        this.webAPIService = webAPIService; 
        
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        
        if (username != null && username != "" && password != null && password != ""){
            this.loginUser(username,password);
        }
        
        this.featuredProductList = Array();
        this.locationList = Array();
        
        setInterval(() => 
            {
                for (let counter = 0; counter < this.featuredProductList.length; counter++)
                {
                    this.featuredProductList[counter].timeLeft = "";
                    let tempTime: number = this.featuredProductList[counter].auctionEndTimeLeft;
                    //if bid end time is over then we are not reducing time
                    if (tempTime > 0)
                    {
                        if (tempTime >= 86400)
                        {
                            this.featuredProductList[counter].timeLeft = this.featuredProductList[counter].timeLeft + Math.floor(tempTime/86400) + " days ";
                            tempTime = tempTime % 86400;
                        }
                        if (tempTime >= 3600)
                        {
                            this.featuredProductList[counter].timeLeft = this.featuredProductList[counter].timeLeft + Math.floor(tempTime/3600) + " hours ";
                            tempTime = tempTime % 3600;
                        } 
                        if (tempTime >= 60)
                        {
                            this.featuredProductList[counter].timeLeft = this.featuredProductList[counter].timeLeft + Math.floor(tempTime/60) + " mins ";
                            tempTime = tempTime % 60;
                        }
                        if (tempTime < 60)
                        {
                            this.featuredProductList[counter].timeLeft = this.featuredProductList[counter].timeLeft + tempTime + " secs ";
                        }                        
                        this.featuredProductList[counter].auctionEndTimeLeft = (this.featuredProductList[counter].auctionEndTimeLeft - 1);
                    }                        
                }                    
            }
        , 1000);
             
        this.fetchClosingProductList();  
        this.fetchLocationList();
    }
    
    loginUser(username:string, password:string){
        let requestBody: string = "{\"userName\": \"" + username + "\", \"password\": \"" + password+"\"}";
        
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SIGN_IN), requestBody).then(result =>{
            if (result != null && result.success){
                if (result.sessionId != null && result.sessionId != ""){
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    localStorage.setItem("sessionId", result.sessionId);

                    window.location.replace("/");
                    window.location.href = "member.html";
                }
                else{
                    localStorage.removeItem("username");
                    localStorage.removeItem("password");
                    localStorage.removeItem("sessionId");
                }
            }
            else if (result != null && !result.success)
            {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("sessionId");
            }
        });       
        
    }
    
    fetchClosingProductList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CLOSING_PRODUCT_LIST), "{}").then(result => {
            if(result.success && result.list != null)
            {
                this.featuredProductList = result.list;
            }
            else
            {
                this.fetchClosingProductCounter++;
                if (this.fetchClosingProductCounter <= 5)
                {
                    this.fetchClosingProductList();
                }
            }                       
        });        
    }
    
    fetchLocationList()
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

    ngOnInit() {


    }
    
    showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
    }
    
    goToSignup(event:Event){
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("signup");
        this.router.navigate(["signup"]);
    }
    
    search(event: Event, id: string) {
        event.preventDefault();
        //clear all search params if necessary
        this.router.navigate(['search', {id: id}]);
    }
}