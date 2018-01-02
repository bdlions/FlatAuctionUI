import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {DTOProduct} from '../../app/dto/DTOProduct';
import {EntityLocation} from '../../app/dto/EntityLocation';
//import {Product} from '../dto/Product';
//import {Location} from '../dto/Location';
//import 'rxjs/Rx';
import {WebAPIService} from './../../app/webservice/web-api-service';
import {PacketHeaderFactory} from './../../app/webservice/PacketHeaderFactory';
import {ACTION} from './../../app/webservice/ACTION';

@Component({
    selector: "app",
    templateUrl: "member/app/html/home.component.html",
    providers: [WebAPIService]
})
export class HomeComponent {
    private webAPIService: WebAPIService;
   
    private fetchLocationCounter: number = 5;
    private locationList: EntityLocation[];
      
    private fetchClosingProductCounter:number = 5;
    private featuredProductList: DTOProduct[];
    
    constructor(public router: Router, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
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

    
    showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
    }
    
    search(event: Event, id: number) {
        event.preventDefault();
        this.router.navigate(['search', {id: id}]);
    }
    
    
}
