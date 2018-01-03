import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Http} from '@angular/http';
import {DTOUser} from '../../../app/dto/DTOUser';
import {EntityUser} from '../../../app/dto/EntityUser';
import {EntityRole} from '../../../app/dto/EntityRole';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/profile/editprofile.component.html',
    providers: [WebAPIService]
})
export class EditProfileComponent {
    private webAPIService: WebAPIService;
    private subscribe:Subscription;
    private dtoUser: DTOUser;
    private roles: EntityRole[];
    private roleList: EntityRole[];
    private tempRoleList: EntityRole[];
    private confirmPassword: string;
    private errorMessage: string = "";
    private userId: number = 0;
    
    constructor(public router:Router, public route: ActivatedRoute,  public http: Http, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
    }
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => 
        {
            this.dtoUser = new DTOUser();
            this.dtoUser.entityUser = new EntityUser();
            this.dtoUser.roles = Array();
            this.roles = new Array<EntityRole>();
            this.roleList = new Array<EntityRole>();
            this.tempRoleList = new Array<EntityRole>();
            
            this.userId = params['id'];
            this.fetchMemberRoles();
        });
    }
    
    fetchMemberRoles()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_MEMBER_ROLES), "{}").then(result => {
            if(result != null && result.success && result.list != null)
            {
                this.roles = result.list;
                this.fetchUserInfo();
            }
        });
    }
    
    fetchUserInfo()
    {
        let entityUser: EntityUser = new EntityUser();
        entityUser.id = this.userId;
        let requestBody: string = JSON.stringify(entityUser);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_INFO), requestBody).then(result => {
            this.dtoUser = result.result;
            this.roleList = this.dtoUser.roles;
        });
    }
    
    setCurrentRoles(id: number)
    {
        if (this.roleList != null && this.roleList.length > 0)
        {
            for (let counter = 0; counter < this.roleList.length; counter++)
            {
                if (this.roleList[counter].id == id)
                {
                    return true;
                }
            }
        }
        return false;
    }
    
    updateCheckedRole(role: EntityRole, event: Event)
    {
        this.tempRoleList = new Array<EntityRole>();
        let exist: Boolean = false;
        if (this.roleList != null && this.roleList.length > 0)
        {
            for (let counter = 0; counter < this.roleList.length; counter++)
            {
                if (this.roleList[counter].id == role.id)
                {
                    exist = true;
                }
                else
                {
                    this.tempRoleList[this.tempRoleList.length] = this.roleList[counter];
                }
            }
        }
        if (!exist)
        {
            this.tempRoleList[this.tempRoleList.length] = role;
        }
        this.roleList = this.tempRoleList;
    }
    
    updateUserprofile(event: Event) {
        if (this.dtoUser.entityUser.firstName == null || this.dtoUser.entityUser.firstName == "")
        {
            this.errorMessage = "First Name is required.";
            return;
        }
        if (this.dtoUser.entityUser.email == null || this.dtoUser.entityUser.email == "")
        {
            this.errorMessage = "Email is required.";
            return;
        }
        if (this.confirmPassword != null && this.confirmPassword != "" && this.dtoUser.entityUser.password != this.confirmPassword)
        {
            this.errorMessage = "Password and Confirm Password must be same.";
            return;
        }
        
        this.dtoUser.roles = this.roleList;
        let requestBody: string = JSON.stringify(this.dtoUser);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_USER_INFO), requestBody).then(result =>{
            if (result != null && result.success){
                this.router.navigate(['myprofile']);
            }
            else if (result != null && result.false){
                this.errorMessage = result.message;
            }
            else
            {
                this.errorMessage = "Unable to update profile. Please try again later.";
            }
        });
    }
    
    
    
    myprofile(event: Event) {
        event.preventDefault();
        this.router.navigate(['myprofile', {id: this.userId }]);
    }
    
    editprofile(event: Event) {
        event.preventDefault();
        this.router.navigate(['editprofile', {id: this.userId }]);
    }
    
    uploadimg(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploadimg', {id: this.userId }]);
    }
    
    uploadlogo(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploadlogo', {id: this.userId }]);
    }
    
    uploaddocument(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploaddocument', {id: this.userId }]);
    }
    
    /*uploadimg(event: Event) {
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
