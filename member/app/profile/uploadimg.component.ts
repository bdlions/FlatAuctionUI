import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Http} from '@angular/http';
import {EntityUser} from '../../../app/dto/EntityUser';
import { FileUploader } from 'ng2-file-upload';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';

const URL = window.SITE_URL + 'file/upload';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/profile/uploadimg.component.html',
    providers: [WebAPIService]
})
export class UploadImgComponent {
    public uploader:FileUploader = new FileUploader({url: URL});
    private webAPIService: WebAPIService;
    private subscribe:Subscription;
    private entityUser: EntityUser;
    private errorMessage: string = "";
    private userId: number = 0;
    
    constructor(public router:Router, public route: ActivatedRoute, public http: Http, webAPIService: WebAPIService) 
    {
        this.webAPIService = webAPIService;
        this.entityUser = new EntityUser();
        
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers:any)=>  {
            this.entityUser.id = this.userId;
            this.entityUser.img = response;            
            let requestBody: string = JSON.stringify(this.entityUser);
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_USER_PROFILE_PICTURE), requestBody).then(result =>{
                if (result != null && result.success){
                    //show success message
                    this.router.navigate(['myprofile', {id: this.userId }]);
                }
                else{
                    //show error message at this page
                    this.errorMessage = "Unable to upload image. Please try again later.";
                }
            });
        };
    }
    
    ngOnInit() 
    {
        this.subscribe = this.route.params.subscribe(params => 
        {
            this.userId = params['id'];
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
    
    /*uploaddocument(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploaddocument']);
    }
    
    uploadlogo(event: Event) {
        event.preventDefault();
        this.router.navigate(['uploadlogo']);
    }*/
}
