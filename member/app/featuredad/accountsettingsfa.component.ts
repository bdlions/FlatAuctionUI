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
    templateUrl: 'member/app/html/featuredad/accountsettingsfa.component.html',
    providers: [WebAPIService]
})
export class AccountSettingsFA implements OnInit, OnDestroy {
    private webAPIService: WebAPIService;
    private entityAccountSettingsFA: EntityAccountSettingsFA;
    private message: string;
    
    private isAdmin: boolean = false;
    private subscribe:Subscription;
    private userId:number = 0;
    @ViewChild('accountSettingsSuccessModal') public accountSettingsSuccessModal:ModalDirective;
    
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.fetchUserRoles();
        setInterval(() => { this.accountSettingsSuccessModal.hide(); }, 1000 * 5);
    }
    
    public hideChildModal(): void {
        this.accountSettingsSuccessModal.hide();
    }
    
    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.entityAccountSettingsFA = new EntityAccountSettingsFA();
            this.userId = params['userId'];
            this.fetchAccountSettingsFA();
        }); 
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
    
    fetchUserRoles()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_ROLES), "{}").then(result => {
            if (result != null && result.success)
            {
                let roles: EntityRole[] = result.list;
                if (roles != null && roles.length > 0)
                {
                    for (let counter = 0; counter < roles.length; counter++)
                    {
                        if (roles[counter].id == 1)
                        {
                            //admin has role id 1
                            this.isAdmin = true;
                        }
                    }
                }         
            }            
        });
    }
    
    
    fetchAccountSettingsFA()
    {
        let reqEntityAccountSettingsFA: EntityAccountSettingsFA = new EntityAccountSettingsFA();
        reqEntityAccountSettingsFA.userId = this.userId;
        let requestBody: string = JSON.stringify(reqEntityAccountSettingsFA);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_ACCOUNT_SETTINGS_FA), requestBody).then(result => {
            if(result.success)
            {
                this.entityAccountSettingsFA = result.result;
                //converting pound into p
                this.entityAccountSettingsFA.chargePerClick = this.entityAccountSettingsFA.chargePerClick * 100;
            }
        }); 
    }
    
    saveAccountSettingsFA(event: Event) {
        this.entityAccountSettingsFA.chargePerClick = this.entityAccountSettingsFA.chargePerClick/100;
        let requestBody: string = JSON.stringify(this.entityAccountSettingsFA);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_USER_ACCOUNT_SETTINGS_FA), requestBody).then(result => {
            if(result.success)
            {
                this.message = result.message;
                this.accountSettingsSuccessModal.show();
            }
            //converting pound into p
            this.entityAccountSettingsFA.chargePerClick = this.entityAccountSettingsFA.chargePerClick * 100;
        });
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
}

