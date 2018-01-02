import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {DTOUser} from '../dto/DTOUser'
import {EntityUser} from '../dto/EntityUser'
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';

@Component({
    selector: 'app',
    templateUrl: 'app/html/public/signup.component.html',
    providers: [WebAPIService]
})

export class SignupComponent {
    private dtoUser: DTOUser;
    private webAPIService: WebAPIService;
    private confirmPassword: string;
    private errorMessage: string;
    
    constructor(public router: Router, public http: Http, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.dtoUser = new DTOUser();
        this.dtoUser.entityUser = new EntityUser();
        this.dtoUser.roles = Array();
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
        let requestBody: string = JSON.stringify(this.dtoUser);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SIGN_UP), requestBody).then(result =>{
            if (result != null && result.success){
                localStorage.setItem("msg", "Account created successfully. Please login.");
                this.router.navigate(["login"]);
            }
            else if (result != null && result.false)
            {
                this.errorMessage = result.message;
            }
            else
            {
                this.errorMessage = "Unable to create account. Please try again later.";
            }
        });
    }
}


