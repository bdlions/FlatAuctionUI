import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityLocation} from '../../../app/dto/EntityLocation';
import {Subscription} from 'rxjs';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'app',
    templateUrl: 'admin/app/html/location/managelocation.component.html',
    providers: [WebAPIService]
})
export class ManageLocationComponent implements OnInit, OnDestroy{
    private subscribe:Subscription;
    private webAPIService: WebAPIService;
    private reqEntityLocation: EntityLocation;
    private entityLocation: EntityLocation;
    private locationId: number = 0;
    private errorMessage: string = "";
    private message: string = "";
    @ViewChild('manageLocationSuccessModal') public manageLocationSuccessModal:ModalDirective;
        
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {        
        this.webAPIService = webAPIService;
        setInterval(() => { this.manageLocationSuccessModal.hide(); }, 1000 * 5);
    }
    
    public hideChildModal(): void {
        this.manageLocationSuccessModal.hide();
    }
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => 
        {
            this.locationId = params['locationId'];
            this.entityLocation = new EntityLocation();
            if (this.locationId > 0)
            {
                this.fetchLocationInfo();
            }            
        });
    }
    
    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
    
    fetchLocationInfo()
    {
        this.reqEntityLocation = new EntityLocation();
        this.reqEntityLocation.id = this.locationId;
        let requestBody: string = JSON.stringify(this.reqEntityLocation);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_LOCATION_INFO), requestBody).then(result => {
            if (result != null && result.success)
            {
                this.entityLocation = result.result;
            }
            else if(result != null && !result.success)
            {
                this.errorMessage = result.message;
            }
        });
    }
    
    saveLocation(event: Event)
    {
        let requestBody: string = JSON.stringify(this.entityLocation);
        if (this.locationId > 0)
        {            
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_LOCATION), requestBody).then(result => {
                if (result != null && result.success)
                {
                    //show success message on popup
                    this.message = result.message;
                    this.manageLocationSuccessModal.show();
                }
                else if(result != null && !result.success)
                {
                    this.errorMessage = result.message;
                }
            });
        }
        else
        {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_LOCATION), requestBody).then(result => {
                if (result != null && result.success)
                {
                    //show success message on popup
                    this.message = result.message;
                    this.manageLocationSuccessModal.show();
                }
                else if(result != null && !result.success)
                {
                    this.errorMessage = result.message;
                }
            });
        }
    }
    
    showManageLocation(event: Event, id: number)
    {
        event.preventDefault();
        this.router.navigate(['managelocation', {locationId: id }]);
    }
    
    showLocationList(event: Event)
    {
        event.preventDefault();
        this.router.navigate(['locationlist']);
    }
}




