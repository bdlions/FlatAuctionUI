import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {WebAPIService} from './../webservice/web-api-service';

@Component({
    selector: 'app',
    templateUrl: 'app/html/common/privacypolicy.component.html',
    providers: [WebAPIService]
})
export class PrivacyPolicyComponent {
    private webAPIService: WebAPIService;
    constructor(public router: Router, public http: Http, webAPIService: WebAPIService) {
        window.scrollTo(0, 0)
        this.webAPIService = webAPIService;
    }    
}