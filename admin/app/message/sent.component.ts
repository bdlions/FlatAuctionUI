import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DTOMessageHeader} from '../../../app/dto/DTOMessageHeader';
import {WebAPIService} from '../../../app/webservice/web-api-service';
import {PacketHeaderFactory} from '../../../app/webservice/PacketHeaderFactory';
import {ACTION} from '../../../app/webservice/ACTION';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'admin/app/html/message/sent.component.html',
    providers: [WebAPIService]
})
export class SentComponent {
    private webAPIService: WebAPIService;
    private dtoMessageHeader: DTOMessageHeader;
    private dtoMessageHeaderList: DTOMessageHeader[];
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    constructor(public router:Router, public route: ActivatedRoute, webAPIService: WebAPIService) {       
        this.webAPIService = webAPIService;
        this.dtoMessageHeaderList = Array();
        this.dtoMessageHeader = new DTOMessageHeader();
        this.dtoMessageHeader.offset = 0;
        this.dtoMessageHeader.limit = 10;
        this.fetchMessageSentList();
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
        this.router.navigate(['showmessages', {id: id }]);
    }
    
    inbox(event: Event) {
        event.preventDefault();
        this.router.navigate(['inbox']);
    }
    
    sent(event: Event) {
        event.preventDefault();
        this.router.navigate(['sent']);
    }
}
