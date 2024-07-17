import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './screens/register/register.component';
import { LoginComponent } from './screens/login/login.component';
import { UserHomepageComponent } from './screens/user-homepage/user-homepage.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { CreateInvoiceComponent } from './screens/create-invoice/create-invoice.component';

import { AuthGuard } from './services/auth.guard';
import { ViewInvoiceComponent } from './screens/view-invoice/view-invoice.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { ViewBusinessComponent } from './screens/manage-business/view-business/view-business.component';
import path from 'path';

import { AddClientComponent } from './screens/manage-client/add-client/add-client.component';
import { AddBusinessComponent } from './screens/manage-business/add-business/add-business.component';
import { ViewClientComponent } from './screens/manage-client/view-client/view-client.component';
import { AddHsnCodesComponent } from './screens/manage-hsn-codes/add-hsn-codes/add-hsn-codes.component';
import { ViewHsnCodesComponent } from './screens/manage-hsn-codes/view-hsn-codes/view-hsn-codes.component';
import { ViewItemsComponent } from './screens/manage-items/view-items/view-items.component';
import { AddItemsComponent } from './screens/manage-items/add-items/add-items.component';
import { EditInvoiceComponent } from './screens/manage-invoice/edit-invoice/edit-invoice.component';
import { PricingComponent } from './screens/pricing/pricing.component';

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
      { path: 'edit-invoice', component: EditInvoiceComponent },
      { path: 'view-invoice', component: ViewInvoiceComponent },
      { path: 'user-profile', component: ProfileComponent },
      { path: 'view-business', component: ViewBusinessComponent },
      { path: 'add-business', component: AddBusinessComponent },
      { path: 'add-client', component: AddClientComponent },
      { path: 'view-client', component: ViewClientComponent },
      { path: 'add-hsn-code', component: AddHsnCodesComponent },
      { path: 'view-hsn-code', component: ViewHsnCodesComponent },
      { path: 'view-items', component: ViewItemsComponent },
      { path: 'add-items', component: AddItemsComponent },

      // Add more child routes as needed
    ],
  },
  { path: 'pricing', component: PricingComponent },

  { path: '', component: HomePageComponent }, // Default route
  { path: '**', redirectTo: '' }, // Redirect to default route for any unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
