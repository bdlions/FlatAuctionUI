import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {NavigationManager} from "./services/NavigationManager";

@Component({
    selector: "app-footer",
    templateUrl: "app/html/footer.component.html"
})

export class FooterComponent 
{    
    private showNavBar: boolean = false;
    private activeMenu: string = "home";

    constructor(private router:Router, private navigationManager: NavigationManager) {
        this.navigationManager.showNavBarEmitter.subscribe((mode) => {
            // mode will be null the first time it is created, so you need to igonore it when null
            if (mode !== null) {
                this.showNavBar = mode;
            }
        });
        this.navigationManager.menuActivationEmitter.subscribe((menuName) => {
            // mode will be null the first time it is created, so you need to igonore it when null
            if (menuName !== null) {
                this.activeMenu = menuName;
            }
        });

    }
    
    goToTerms(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("terms");
        this.router.navigate(["terms"]);
    }
    
    goToPrivacyPolicy(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("privacypolicy");
        this.router.navigate(["privacypolicy"]);
    }
    
    goToAboutus(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("about");
        this.router.navigate(["about"]);
    }
    
    goToContactus(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("contact");
        this.router.navigate(["contact"]);
    }
    
    goToFaq(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("faq");
        this.router.navigate(["faq"]);
    }
}
