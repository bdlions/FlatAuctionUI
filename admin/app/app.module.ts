import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BsDropdownModule, CarouselModule, TypeaheadModule, DatepickerModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {FileUploadModule } from 'ng2-file-upload';
import {enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import {AdminDashBoardComponent} from './dashboard.component';

import {UserListComponent} from './user/userlist.component';
import {MyProfileComponent} from '../../member/app/profile/myprofile.component';
import {EditProfileComponent} from '../../member/app/profile/editprofile.component';
import {UploadImgComponent} from '../../member/app/profile/uploadimg.component';
import {UploadLogoComponent} from '../../member/app/profile/uploadlogo.component';
import {UploadDocumentComponent} from '../../member/app/profile/uploaddocument.component';

import {AdvertListComponent} from './advert/advertlist.component';
import {ProductComponent} from '../../app/public/product.component';
import {ManageAdComponent} from '../../member/app/advert/managead.component';
import {AutoBidsComponent} from '../../app/public/autobids.component';
import {BidsComponent} from '../../app/public/bids.component';
import {MyAdsComponent} from '../../member/app/advert/myads.component';
import {SavedAdsComponent} from '../../member/app/advert/savedads.component';

import {InboxComponent} from '../../member/app/message/inbox.component';
import {SentComponent} from '../../member/app/message/sent.component';
import {BodyComponent} from '../../member/app/message/body.component';

import {AboutComponent} from '../../app/common/about.component';
import {ContactComponent} from '../../app/common/contact.component';
import {FaqComponent} from '../../app/common/faq.component';
import {PrivacyPolicyComponent} from '../../app/common/privacypolicy.component';
import {TermsComponent} from '../../app/common/terms.component';

import {HomeComponent} from './home.component';
import {SearchComponent} from '../../app/public/search.component';

import {AccountComponent} from './account.component';



import {BasicSearchComponent} from './search/basicsearch.component';
import {AdvancedSearchComponent} from './search/advancedsearch.component';

import {AccountSettingsFA} from '../../member/app/featuredad/accountsettingsfa.component';
import {IndividualAdBidsComponent} from '../../member/app/featuredad/individualadbids.component';

import {AppTemplate} from './app.template';
import {TopNavbarComponent} from './topnavbar.component';
import {FooterComponent} from './../../app/footer.component';
import {NavigationManager} from '../../app/services/NavigationManager';
import {MemberHeaderMenuManager} from './services/MemberHeaderMenuManager';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoaderComponent} from '../../app/loader.component';
import {LoaderService} from '../../app/webservice/loader.service';
import {WebAPIService} from '../../app/webservice/web-api-service';
import { CKEditorModule } from 'ng2-ckeditor';

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
        component: AdminDashBoardComponent
    },
    {
        path: 'userlist',
        component: UserListComponent
    },
    {
        path: 'myprofile',
        component: MyProfileComponent
    },
    {
        path: 'editprofile',
        component: EditProfileComponent
    },
    {
        path: 'uploadimg',
        component: UploadImgComponent
    },
    {
        path: 'uploadlogo',
        component: UploadLogoComponent
    },
    {
        path: 'uploaddocument',
        component: UploadDocumentComponent
    },
    {
        path: 'advertlist',
        component: AdvertListComponent
    },
    {
        path: 'showad',
        component: ProductComponent
    },
    {
        path: 'managead',
        component: ManageAdComponent
    },
    {
        path: 'showautobids',
        component: AutoBidsComponent
    },
    {
        path: 'showbids',
        component: BidsComponent
    },
    {
        path: 'myads',
        component: MyAdsComponent
    },
    {
        path: 'savedads',
        component: SavedAdsComponent
    },
    {
        path: 'inbox',
        component: InboxComponent
    },
    {
        path: 'sent',
        component: SentComponent
    },
    {
        path: 'showmessages',
        component: BodyComponent
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
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'dashboard',
        component: AdminDashBoardComponent
    },
    {
        path: 'account',
        component: AccountComponent
    },
    {
        path: 'basicsearch',
        component: BasicSearchComponent
    },
    {
        path: 'advancedsearch',
        component: AdvancedSearchComponent
    },
    {
        path: 'accountsettingsfa',
        component: AccountSettingsFA
    },
    {
        path: 'individualadbids',
        component: IndividualAdBidsComponent
    },
    {
        path: '**',
        component: AdminDashBoardComponent
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
        AdminDashBoardComponent,
        UserListComponent,
        AdvertListComponent,         
         
        AboutComponent,
        ContactComponent,
        FaqComponent,
        PrivacyPolicyComponent,
        TermsComponent,
        
        HomeComponent,
        SearchComponent,        
        
        ManageAdComponent,
        MyAdsComponent,
        SavedAdsComponent,
        ProductComponent,
        AutoBidsComponent,
        BidsComponent,
        
        InboxComponent,
        SentComponent,
        BodyComponent,
        
        AccountComponent,
        
        MyProfileComponent,
        EditProfileComponent,
        UploadImgComponent,
        UploadLogoComponent,
        UploadDocumentComponent,
        
        BasicSearchComponent,
        AdvancedSearchComponent,
        
        AccountSettingsFA,
        IndividualAdBidsComponent,

        TopNavbarComponent,
        FooterComponent,
	LoaderComponent,
        MatProgressSpinner, MatSpinner,
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