import { NgModule, } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { IntroSectionComponent } from './home-page/intro-section/intro-section.component';
// import { FeatureSectionComponent } from './home-page/feature-section/feature-section.component';
import { RegisterComponent } from './screens/register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { IntroSectionComponent } from './home-page/intro-section/intro-section.component';
import { FeatureSectionComponent } from './home-page/feature-section/feature-section.component';
import { LoginComponent } from './screens/login/login.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { UserHomepageComponent } from './screens/user-homepage/user-homepage.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';

import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreateInvoiceComponent } from './screens/create-invoice/create-invoice.component';
import { ViewInvoiceComponent } from './screens/view-invoice/view-invoice.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { UserDetailsComponent } from './screens/profile/user-details/user-details.component';

import { UserClientsComponent } from './screens/profile/user-clients/user-clients.component';
import { UserProductComponent } from './screens/profile/user-product/user-product.component';
import { UserBusinessComponent } from './screens/profile/user-business/user-business.component';
import { UserDataCardComponent } from './component/user-data-card/user-data-card.component';
import { ViewBusinessComponent } from './screens/manage-business/view-business/view-business.component';

import { CustomInputBoxComponent } from './component/custom-input-box/custom-input-box.component';
import { CustomTypeheadDropdownComponent } from './component/custom-typehead-dropdown/custom-typehead-dropdown.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogBoxComponent } from './component/dialog-box/dialog-box.component';
import { ResponseInterceptor } from './core/toast-notification.interceptor';
import { CustomSnackbarComponent } from './component/custom-snackbar/custom-snackbar.component';
import { ViewClientComponent } from './screens/manage-client/view-client/view-client.component';
import { AddClientComponent } from './screens/manage-client/add-client/add-client.component';
import { AddBusinessComponent } from './screens/manage-business/add-business/add-business.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IntroSectionComponent,
    FeatureSectionComponent,
    RegisterComponent,
    HomePageComponent,
    LoginComponent,
    UserHomepageComponent,
    SidebarComponent,
    UserDashboardComponent,
    CreateInvoiceComponent,
    ViewInvoiceComponent,
    ProfileComponent,
    UserDetailsComponent,
    UserClientsComponent,
    UserProductComponent,
    UserBusinessComponent,
    UserDataCardComponent,
    ViewBusinessComponent,
    
    CustomInputBoxComponent,
    CustomTypeheadDropdownComponent,
    DialogBoxComponent,
    CustomSnackbarComponent,
    ViewClientComponent,
    AddClientComponent,
    AddBusinessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatGridListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
