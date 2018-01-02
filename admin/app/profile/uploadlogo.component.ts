import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {EntityUser} from '../../../app/dto/EntityUser';
import { FileUploader } from 'ng2-file-upload';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';

const URL = window.SITE_URL + 'file/upload';

@Component({
    selector: 'app',
    templateUrl: 'admin/app/html/profile/uploadlogo.component.html',
    providers: [WebAPIService]
})
export class UploadLogoComponent {
    public uploader:FileUploader = new FileUploader({url: URL});
    private webAPIService: WebAPIService;
    private entityUser: EntityUser;
    private errorMessage: string = "";
    
    constructor(public router: Router, public http: Http, webAPIService: WebAPIService) 
    {
        this.webAPIService = webAPIService;
        this.entityUser = new EntityUser();
        
            this.uploader.onCompleteItem = (item: any, response: any, status: any, headers:any)=>  {
            this.entityUser.agentLogo = response;
            let requestBody: string = JSON.stringify(this.entityUser);
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_USER_LOGO), requestBody).then(result =>{
                let response  = result;
                if (response.success){
                    //show success message
                    this.router.navigate(['myprofile']);
                }
                else{
                    //show error message at this page
                    this.errorMessage = "Unable to upload image. Please try again later.";
                }
            });
        };       
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
    
    /*uploaddocument(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploaddocument']);
    }*/
}

