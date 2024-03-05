import { NgModule } from '@angular/core';
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
import { NavbarComponent } from './components/navbar/navbar.component';
import { IntroSectionComponent } from './home-page/intro-section/intro-section.component';
import { FeatureSectionComponent } from './home-page/feature-section/feature-section.component';
import { LoginComponent } from './screens/login/login.component';
import { HttpClientModule,provideHttpClient ,withFetch} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { UserDashboardComponent } from './screens/user-dashboard/user-dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IntroSectionComponent,
    FeatureSectionComponent,
    RegisterComponent,
    HomePageComponent,
    LoginComponent,
    UserDashboardComponent
  ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,FormsModule,AppRoutingModule],
  providers: [provideClientHydration(),provideHttpClient(withFetch() )],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
