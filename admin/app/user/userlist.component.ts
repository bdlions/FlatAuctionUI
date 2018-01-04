import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DTOUser} from '../../../app/dto/DTOUser';
import {EntityUser} from '../../../app/dto/EntityUser';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'admin/app/html/user/userlist.component.html',
    providers: [WebAPIService]
})
export class UserListComponent{
    private webAPIService: WebAPIService;
    private userList: EntityUser[];
    private reqDTOUser: DTOUser;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
        
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {        
        this.webAPIService = webAPIService;
        this.userList = Array();
        this.reqDTOUser = new DTOUser();
        this.reqDTOUser.offset = 0;
        this.reqDTOUser.limit = 10;
        this.fetchUserList();
    }
    
    fetchUserList()
    {
        let requestBody: string = JSON.stringify(this.reqDTOUser);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_LIST), requestBody).then(result => {
            this.userList = result.list;
            this.length = result.counter;
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOUser.limit = event.pageSize;
        this.reqDTOUser.offset = (event.pageIndex * event.pageSize) ;
        this.fetchUserList();
    }
    
    userProfile(event: Event, id: number)
    {
        event.preventDefault();
        this.router.navigate(["myprofile", {id: id }]);
    }
    
    userAds(event: Event, id: number)
    {
        event.preventDefault();
        this.router.navigate(["myads", {id: id }]);
    }
    
    userInbox(event: Event, id: number)
    {
        event.preventDefault();
        this.router.navigate(["inbox", {id: id }]);
    }
    
    /*manageAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['managead', {id: id }]);
    }
    
    myAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['myads']);
    }
    
    showAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['showad', {id: id }]);
    }
    
    savedAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['savedads']);
    }*/
}



