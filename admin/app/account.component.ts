import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';

@Component({
    selector: "app",
    templateUrl: "admin/app/html/account.component.html"
})

export class AccountComponent 
{    
    private showNavBar: boolean = false;
    private activeMenu: string = "home";

    constructor(private router:Router) {
        

    }
}

