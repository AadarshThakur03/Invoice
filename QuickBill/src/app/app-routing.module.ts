import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

import { RegisterComponent } from './screens/register/register.component';
import { LoginComponent } from './screens/login/login.component';
import { UserHomepageComponent } from './screens/user-homepage/user-homepage.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';

RegisterComponent;
const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-homepage', component: UserHomepageComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },

  { path: '', component: HomePageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
