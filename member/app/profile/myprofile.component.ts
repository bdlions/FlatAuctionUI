import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {DTOUser} from '../../../app/dto/DTOUser';
import {EntityRole} from '../../../app/dto/EntityRole';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/profile/myprofile.component.html',
    providers: [WebAPIService]
})
export class MyProfileComponent {
    private webAPIService: WebAPIService;
    private dtoUser: DTOUser;
    private roleList: EntityRole[];
    //private roleList: Role[];
    private rolesString: string;
    constructor(public router: Router, public http: Http, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.dtoUser = new DTOUser();
        this.roleList = Array();
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_INFO), "{}").then(result => {
            if (result != null && result.success)
            {
                this.dtoUser = <DTOUser>result.result;
                if (this.dtoUser.roles == undefined)
                {
                    this.dtoUser.roles = Array();
                }
                else
                {
                    this.roleList = this.dtoUser.roles;
                }                
                this.rolesString = "";
                if (this.roleList.length > 0)
                {
                    for (let counter = 0; counter < this.roleList.length; counter++)
                    {
                        if (counter == 0)
                        {
                            this.rolesString = this.roleList[counter].description;

                        }
                        else
                        {
                            this.rolesString = this.rolesString + ", " + this.roleList[counter].description;
                        }
                    }
                }
            }            
        });
    }
    
    myprofile(event: Event) {
        event.preventDefault();
        this.router.navigate(['myprofile']);
    }
    
    editprofile(event: Event) {
        event.preventDefault();
        this.router.navigate(['editprofile']);
    }
    
    uploadimg(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploadimg']);
    }
    
    uploadlogo(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploadlogo']);
    }
    
    uploaddocument(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploaddocument']);
    }
    
    /*profile(event: Event) {
        event.preventDefault();
        this.router.navigate(['myprofile']);
    }
    
    
    
    
    
    
    editprofile(event: Event) {
        event.preventDefault();
        this.router.navigate(['editprofile']);
    }
    
    uploadimg(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploadimg']);
    }
    
    uploaddocument(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploaddocument']);
    }
    
    uploadlogo(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploadlogo']);
    }*/
}
