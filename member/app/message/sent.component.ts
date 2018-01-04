import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {EntityUser} from '../../../app/dto/EntityUser';
import {DTOMessageHeader} from '../../../app/dto/DTOMessageHeader';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'member/app/html/message/sent.component.html',
    providers: [WebAPIService]
})
export class SentComponent {
    private webAPIService: WebAPIService;
    private subscribe:Subscription;
    private userId: number = 0;
    private dtoMessageHeader: DTOMessageHeader;
    private dtoMessageHeaderList: DTOMessageHeader[];
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {       
        this.webAPIService = webAPIService;
        this.dtoMessageHeaderList = Array();        
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => 
        {
            this.userId = params['id'];
            this.dtoMessageHeader = new DTOMessageHeader();
            this.dtoMessageHeader.sender = new EntityUser();
            this.dtoMessageHeader.offset = 0;
            this.dtoMessageHeader.limit = 10;
            this.dtoMessageHeader.sender.id = this.userId;
            this.fetchMessageSentList();
        });
    }

    fetchMessageSentList()
    {
        let requestBody: string = JSON.stringify(this.dtoMessageHeader);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_MESSAGE_SENT_LIST), requestBody).then(result => {
            this.dtoMessageHeaderList = result.list;
            this.length = result.counter;
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.dtoMessageHeader.limit = event.pageSize;
        this.dtoMessageHeader.offset = (event.pageIndex * event.pageSize) ;
        this.fetchMessageSentList();
    }
    
    public showMessageBodyList(event: Event, id: number)
    {
        this.router.navigate(['showmessages', {id: id , userId: this.userId}]);
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
