import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';


@Component({
    selector: 'app',
    templateUrl: 'admin/app/html/dashboard.component.html'
})
export class AdminDashBoardComponent 
{   
    constructor(public router: Router, public http: Http) 
    {        
        //if no session id then redirct to landing page
        let sessionId = localStorage.getItem("sessionId");
        if (sessionId == null || sessionId == ""){
            window.location.replace("/");
            window.location.href = "index.html";
        }
    }

    userList(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["userlist"]);
    }

    advertList(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["advertlist"]);
    }
    
    locationList(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["locationlist"]);
    }
    
    
    /*myads(event: Event)
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
    }*/
}

