import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {EntityUser} from './../dto/EntityUser';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';


@Component({
    selector: 'app',
    templateUrl: 'app/html/public/forgetpassword.component.html',
    providers: [WebAPIService]
})

export class ForgetPasswordComponent {
    private webAPIService: WebAPIService;
    private entityUser: EntityUser;
    private errorMsg:string;
    private msg:string;
    
    constructor(public router: Router, public http: Http, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;   
        this.entityUser = new EntityUser();     
    }
  
    forgetPassword(event:Event){
        let requestBody: string = JSON.stringify(this.entityUser);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FORGET_PASSWORD), requestBody).then(result =>{
            if (result != null && result.success)
            {
                this.msg = result.message;
                this.errorMsg = "";
            }
            else if (result != null && !result.success)
            {
                this.msg = "";
                this.errorMsg = result.message;
            }
        });
    }    
}




