import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './screens/register/register.component';
import { LoginComponent } from './screens/login/login.component';
import { UserHomepageComponent } from './screens/user-homepage/user-homepage.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { CreateInvoiceComponent } from './screens/create-invoice/create-invoice.component';

import { AuthGuard } from './services/auth.guard';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user-homepage',
    component: UserHomepageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'user-dashboard', pathMatch: 'full' },
      { path: 'user-dashboard', component: UserDashboardComponent },
      { path: 'create-invoice', component: CreateInvoiceComponent },

      // Add more child routes as needed
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },

  { path: '', component: HomePageComponent }, // Default route
  { path: '**', redirectTo: '' }, // Redirect to default route for any unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
