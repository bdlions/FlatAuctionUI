import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {Subscription} from 'rxjs';
import {EntityRole} from '../../../app/dto/EntityRole';
import {EntityAccountSettingsFA} from '../../../app/dto/EntityAccountSettingsFA';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/featuredad/faqfa.component.html',
    providers: [WebAPIService]
})
export class FaqfaComponent implements OnInit, OnDestroy {
    private webAPIService: WebAPIService;
    private entityAccountSettingsFA: EntityAccountSettingsFA;
    private message: string;
    
    private isAdmin: boolean = false;
    private subscribe:Subscription;
    private userId:number = 0;
    //@ViewChild('accountSettingsSuccessModal') public accountSettingsSuccessModal:ModalDirective;
    
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        //this.fetchUserRoles();
        //setInterval(() => { this.accountSettingsSuccessModal.hide(); }, 1000 * 5);
    }
    
    
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            
        }); 
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
    
    
    manageAd(event: Event, id: number){
        event.preventDefault();
        this.router.navigate(['managead', {id: id }]);
    }
    
    myAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['myads', {id: this.userId }]);
    }
    
    savedAds(event: Event) {
        event.preventDefault();
        this.router.navigate(['savedads', {id: this.userId }]);
    }
    
    //featured ad section
    accountSettingsFA(event: Event) {
        event.preventDefault();
        this.router.navigate(['accountsettingsfa', {userId: this.userId }]);
    }   
    
    individualadbids(event: Event) {
        event.preventDefault();
        this.router.navigate(['individualadbids', {userId: this.userId }]);
    }  
    
    stats(event: Event) {
        event.preventDefault();
        this.router.navigate(['stats', {userId: this.userId }]);
    } 
    
    ranking(event: Event) {
        event.preventDefault();
        this.router.navigate(['ranking', {userId: this.userId }]);
    }
    
    faqfa(event: Event) {
        event.preventDefault();
        this.router.navigate(['faqfa', {userId: this.userId }]);
    } 
}




