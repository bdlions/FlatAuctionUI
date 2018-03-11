import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {DTOUser} from '../dto/DTOUser';
import {EntityUser} from '../dto/EntityUser';
import {EntityRole} from '../dto/EntityRole';
import {EntityGender} from '../dto/EntityGender';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {NavigationManager} from "./../services/NavigationManager";

@Component({
    selector: 'app',
    templateUrl: 'app/html/public/signup.component.html',
    providers: [WebAPIService]
})

export class SignupComponent {
    private dtoUser: DTOUser;
    private roles: EntityRole[];
    private roleList: EntityRole[];
    private tempRoleList: EntityRole[];
    private genders: EntityGender[];
    private webAPIService: WebAPIService;
    private confirmPassword: string;
    private errorMessage: string;
    
    private showNavBar: boolean = false;
    private activeMenu: string = "signup";
    
    constructor(public router: Router, private navigationManager: NavigationManager, public http: Http, webAPIService: WebAPIService) {
        this.navigationManager.showNavBarEmitter.subscribe((mode) => {
            // mode will be null the first time it is created, so you need to igonore it when null
            if (mode !== null) {
                this.showNavBar = mode;
            }
        });
        this.navigationManager.menuActivationEmitter.subscribe((menuName) => {
            // mode will be null the first time it is created, so you need to igonore it when null
            if (menuName !== null) {
                this.activeMenu = menuName;
            }
        });
        
        this.webAPIService = webAPIService;
        this.dtoUser = new DTOUser();
        this.dtoUser.entityUser = new EntityUser();
        this.dtoUser.roles = Array();
        this.roles = new Array<EntityRole>();
        this.roleList = new Array<EntityRole>();
        this.tempRoleList = new Array<EntityRole>();
        this.genders = new Array<EntityGender>();
        this.fetchMemberRoles();
        this.fetchGenders();
    }
    
    fetchMemberRoles()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_MEMBER_ROLES), "{}").then(result => {
            if(result != null && result.success && result.list != null)
            {
                this.roles = result.list;
            }
        });
    }
    
    fetchGenders()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_GENDERS), "{}").then(result => {
            if(result != null && result.success && result.list != null)
            {
                this.genders = result.list;
            }
        });
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
    
    updateCheckedGender(gender: EntityGender, event: Event)
    {
        this.dtoUser.entityUser.genderId = gender.id;
        this.dtoUser.entityUser.genderTitle = gender.title;
    }
    
    registerUser(event:Event){
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
        if (this.dtoUser.entityUser.password == null || this.dtoUser.entityUser.password == "")
        {
            this.errorMessage = "Password is required.";
            return;
        }
        if (this.dtoUser.entityUser.password != this.confirmPassword)
        {
            this.errorMessage = "Password and Confirm Password must be same.";
            return;
        }
        if (this.roleList == null || this.roleList.length == 0)
        {
            this.errorMessage = "Role is required.";
            return;
        }
        if (this.dtoUser.entityUser.genderId == null || this.dtoUser.entityUser.genderId == 0)
        {
            this.errorMessage = "Gender is required.";
            return;
        }
        this.dtoUser.roles = this.roleList;
        let requestBody: string = JSON.stringify(this.dtoUser);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SIGN_UP), requestBody).then(result =>{
            if (result != null && result.success){
                localStorage.setItem("msg", result.message);
                this.router.navigate(["login"]);
            }
            else if (result != null && !result.success)
            {
                this.errorMessage = result.message;
            }
            else
            {
                this.errorMessage = "Unable to create account. Please try again later.";
            }
        });
    }
    
    goToTerms(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("terms");
        this.router.navigate(["terms"]);
    }
    
    goToPrivacyPolicy(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("privacypolicy");
        this.router.navigate(["privacypolicy"]);
    }
}


