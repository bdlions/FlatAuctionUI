import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: '<div class="wrapper">'+
        '<navbar></navbar><router-outlet></router-outlet>'+
        '</div>'+
        '<footer class="footer">'+
        '<app-footer></app-footer>'+
        '</footer>',
})
export class AppTemplate {
    constructor() {}
}
