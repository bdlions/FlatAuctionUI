import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';


@Component({
    selector: 'app',
    templateUrl: 'member/app/html/dashboard.component.html'
})
export class MemberDashBoardComponent {
    
    
    constructor(public router: Router, public http: Http) {
        

    }

    
    
    myads(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["myads"]);
    }
    
    inbox(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["inbox"]);
    }
    
    account(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["account"]);
    }
    
    myprofile(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["myprofile"]);
    }
    
    basicsearch(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["basicsearch"]);
    }
}

