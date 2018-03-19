import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {WebAPIService} from './../../app/webservice/web-api-service';
import {PacketHeaderFactory} from './../../app/webservice/PacketHeaderFactory';
import {ACTION} from './../../app/webservice/ACTION';


@Component({
    selector: "navbar",
    templateUrl: "admin/app/html/topnavbar.html",
    providers: [WebAPIService]
})

export class TopNavbarComponent {
    private webAPIService: WebAPIService;
    
    constructor(private router:Router, webAPIService: WebAPIService) {
        
        this.webAPIService = webAPIService;
    }
    
    dashboard(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["dashboard"]);
    }
    
    goUsers(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["userlist"]);
    }
    
    goAdverts(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["advertlist"]);
    }
    
    goLocations(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["locationlist"]);
    }
    
    
    /*goToMyhome(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["home"]);
    }
    
    goToAboutus(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["about"]);
    }
    
    goToContactus(event: Event)
    {
        event.preventDefault();
        this.router.navigate(["contact"]);
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
    }*/
    
    logout(event: Event) {
        event.preventDefault();
        //call server to logout
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SIGN_OUT)).then(result => {
            
        });
        
        //clear local storate
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("sessionId");
        //redirect to landing file
        window.location.replace("/");
        window.location.href = "index.html";
    }
    
        
}
