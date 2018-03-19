import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityLocation} from '../../../app/dto/EntityLocation';
import {DTOLocation} from '../../../app/dto/DTOLocation';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'admin/app/html/location/locationlist.component.html',
    providers: [WebAPIService]
})
export class LocationListComponent{
    private webAPIService: WebAPIService;
    private locationList: EntityLocation[];
    private reqDTOLocation: DTOLocation;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
        
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {        
        this.webAPIService = webAPIService;
        this.reqDTOLocation = new DTOLocation();
        this.reqDTOLocation.offset = 0;
        this.reqDTOLocation.limit = 10;
        this.fetchLocationList();
    }
    
    fetchLocationList()
    {
        let requestBody: string = JSON.stringify(this.reqDTOLocation);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_LOCATIONS), requestBody).then(result => {
            this.locationList = result.list;
            this.length = result.counter;
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOLocation.limit = event.pageSize;
        this.reqDTOLocation.offset = (event.pageIndex * event.pageSize) ;
        this.fetchLocationList();
    }
    
    manageLocation(event: Event, id: number)
    {
        event.preventDefault();
        this.router.navigate(['managelocation', {locationId: id }]);
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



