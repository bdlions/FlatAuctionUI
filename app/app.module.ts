import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BsDropdownModule, CarouselModule, TypeaheadModule, DatepickerModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {FileUploadModule } from 'ng2-file-upload';
import {enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import {AppComponent} from './app.component';
import {LoginComponent} from './public/login.component';
import {ForgetPasswordComponent} from './public/forgetpassword.component';
import {SignupComponent} from './public/signup.component';
import {SearchComponent} from './public/search.component';
import {SearchMapComponent} from './public/searchmap.component';

import {ProductComponent} from './public/product.component';
import {ProductMapComponent} from './public/productmap.component';
import {BidsComponent} from './public/bids.component';

import {AboutComponent} from './common/about.component';
import {ContactComponent} from './common/contact.component';
import {FaqComponent} from './common/faq.component';
import {PrivacyPolicyComponent} from './common/privacypolicy.component';
import {TermsComponent} from './common/terms.component';

import {HomeComponent} from './home.component';
import {ProfileComponent} from './profile.component';

import {AppTemplate} from './app.template';
import {TopNavbarComponent} from './topnavbar.component';
import {FooterComponent} from './footer.component';
import {NavigationManager} from './services/NavigationManager';
import {MemberHeaderMenuManager} from './services/MemberHeaderMenuManager';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoaderComponent} from './loader.component';
import {LoaderService} from './webservice/loader.service';
import {WebAPIService} from './webservice/web-api-service';
import { CKEditorModule } from 'ng2-ckeditor';
import {CKEditorSample} from './CKEditorSample';

import { AgmCoreModule } from '@agm/core';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatSpinner,
    MatProgressSpinner,
    MatFormFieldControl,
    MatOptionModule,
    MatFormFieldModule,
} from '@angular/material';

const appRoutes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'landing',
        component: AppComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'searchmap',
        component: SearchMapComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgetpassword',
        component: ForgetPasswordComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'privacypolicy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'terms',
        component: TermsComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'showad',
        component: ProductComponent
    },
    {
        path: 'showadmap',
        component: ProductMapComponent
    },
    {
        path: 'showbids',
        component: BidsComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'ck',
        component: CKEditorSample
    },
    {
        path: '**',
        component: AppComponent
    },

];

enableProdMode();
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        TypeaheadModule.forRoot(),
        DatepickerModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
		MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatMenuModule,
        MatPaginatorModule,
        BrowserAnimationsModule, MatButtonModule, FileUploadModule,
        RouterModule.forRoot(appRoutes),
	CKEditorModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBQwFpi-R6gtguRzwSPzy4D0kyULz4ICd4'
        }),
    ],
	exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatOptionModule,
        MatSelectModule, MatButtonModule,
        MatMenuModule,
        MatProgressSpinner, MatSpinner,
        MatFormFieldModule, MatOptionModule,
        MatSelectModule, MatButtonModule,
        MatMenuModule,MatProgressSpinner, MatSpinner,
        FileUploadModule,
        LoaderComponent
    ],
    declarations: [
        /**
         * This is for templating
         */
        AppTemplate,

        /**
         * All are components of the template
         */
        AppComponent,
        SearchComponent,
        SearchMapComponent,
        LoginComponent,
        ForgetPasswordComponent,
        SignupComponent,
        AboutComponent,
        ContactComponent,
        FaqComponent,
        PrivacyPolicyComponent,
        TermsComponent,
        
        HomeComponent,
        ProductComponent,
        ProductMapComponent,
        BidsComponent,
        
        ProfileComponent,
        TopNavbarComponent,
        FooterComponent,
	LoaderComponent,
        MatProgressSpinner, MatSpinner,
	CKEditorSample,
    ],
    providers: [
        //MarketAPI, 
        NavigationManager,
        MemberHeaderMenuManager,
	WebAPIService,
        LoaderService,
        
//        {provide: APP_BASE_HREF, useValue: '/InventoryUI'}
          {provide: LocationStrategy, useValue: '/InventoryUI/', useClass: HashLocationStrategy}


    ],
    bootstrap: [AppTemplate]
//    bootstrap: [HomeComponent]
})

export class AppModule {}