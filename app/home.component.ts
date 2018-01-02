import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
    selector: 'app',
    templateUrl: 'app/html/home.component.html'
})

export class HomeComponent { 
    public showDatePicker: boolean = false;
    public sampleDate: Date = new Date();
    public minDate: Date = void 0;
    
    constructor(private router: Router) 
    {
        
    }

    ngOnInit() {
        
    }    
}