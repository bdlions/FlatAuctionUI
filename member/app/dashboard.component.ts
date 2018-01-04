import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';


@Component({
    selector: 'app',
    templateUrl: 'member/app/html/dashboard.component.html'
})
export class MemberDashBoardComponent {
    
    
    constructor(public router: Router, public http: Http) 
    {
        //if no session id then redirct to landing page
        let sessionId = localStorage.getItem("sessionId");
        if (sessionId == null || sessionId == ""){
            window.location.replace("/");
            window.location.href = "index.html";
        }    
    }

    
    
    myads(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["myads", {id: 0 }]);
    }
    
    inbox(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["inbox", {id: 0 }]);
    }
    
    account(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["account"]);
    }
    
    myprofile(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["myprofile", {id: 0 }]);
    }
    
    basicsearch(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["basicsearch"]);
    }
}

