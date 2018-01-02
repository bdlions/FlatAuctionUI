import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: '<div class="wrapper">'+
        '<navbar></navbar>'+
        '<div class="container">'+
        '<div class="row">'+
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
        '<router-outlet></router-outlet>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="push"></div>'+
        '</div>'+
        '<footer class="footer">'+
        '<app-footer></app-footer>'+
        '</footer>',
})
export class AppTemplate {
    constructor() {}
}
