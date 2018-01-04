import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DTOMessageBody} from '../../../app/dto/DTOMessageBody';
import {DTOMessageHeader} from '../../../app/dto/DTOMessageHeader';
import {EntityUser} from '../../../app/dto/EntityUser';
import {EntityMessageHeader} from '../../../app/dto/EntityMessageHeader';
import {EntityMessageBody} from '../../../app/dto/EntityMessageBody';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import { ModalDirective } from 'ngx-bootstrap';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/message/body.component.html',
    providers: [WebAPIService]
})
export class BodyComponent {
    private webAPIService: WebAPIService;
    private subscribe:Subscription;
    private dtoMessageBody: DTOMessageBody;
    private dtoMessageBodyList: DTOMessageBody[];
    private messageHeaderId: number;
    private userId: number = 0;
    private dtoMessageHeader: DTOMessageHeader;
    private entityMessageHeader: EntityMessageHeader;
    private entityMessageBody: EntityMessageBody;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {       
        this.webAPIService = webAPIService;
        
        this.entityMessageBody = new EntityMessageBody();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.messageHeaderId = params['id'];
            this.userId = params['userId'];
            if(this.messageHeaderId > 0)
            {
                this.dtoMessageBodyList = Array();
                this.dtoMessageBody = new DTOMessageBody();
                this.dtoMessageBody.entityMessageBody = new EntityMessageBody();
                this.dtoMessageBody.entityMessageBody.messageHeaderId = this.messageHeaderId;
                this.dtoMessageBody.offset = 0;
                this.dtoMessageBody.limit = 10;
                
                this.dtoMessageHeader = new DTOMessageHeader();
                this.dtoMessageHeader.sender = new EntityUser();
                this.dtoMessageHeader.entityMessageHeader = new EntityMessageHeader();
                this.entityMessageHeader = new EntityMessageHeader();
                this.entityMessageHeader.id = this.messageHeaderId;
                this.fetchMessageHeader();
                
                this.fetchMessageBodyList();
            }            
        });
    }
    
    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

    fetchMessageHeader()
    {
        let requestBody: string = JSON.stringify(this.entityMessageHeader);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_MESSAGE_HEADER), requestBody).then(result => {
            this.dtoMessageHeader = result.result;
        });
    }

    fetchMessageBodyList()
    {
        let requestBody: string = JSON.stringify(this.dtoMessageBody);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_MESSAGE_BODY_LIST), requestBody).then(result => {
            this.dtoMessageBodyList = result.list;
            this.length = result.counter;
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.dtoMessageBody.limit = event.pageSize;
        this.dtoMessageBody.offset = (event.pageIndex * event.pageSize) ;
        this.fetchMessageBodyList();
    }
    
    sendMessage(event:PageEvent)
    {
        this.entityMessageBody.messageHeaderId = this.messageHeaderId;
        this.entityMessageBody.userId = this.userId;
        let requestBody: string = JSON.stringify(this.entityMessageBody);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_MESSAGE_BODY), requestBody).then(result => {
            this.entityMessageBody = new EntityMessageBody();
            
            this.dtoMessageBody = new DTOMessageBody();
            this.dtoMessageBody.entityMessageBody = new EntityMessageBody();
            this.dtoMessageBody.entityMessageBody.messageHeaderId = this.messageHeaderId;
            this.dtoMessageBody.offset = 0;
            this.dtoMessageBody.limit = 10;
            this.fetchMessageBodyList();
        });
    }
    
    inbox(event: Event) {
        event.preventDefault();
        this.router.navigate(['inbox', {id: this.userId }]);
    }
    
    sent(event: Event) {
        event.preventDefault();
        this.router.navigate(['sent', {id: this.userId }]);
    }
}

