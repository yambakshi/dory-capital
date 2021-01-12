import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '@components/landing-page/landing-page.component';
import { AdminComponent } from '@components/admin/admin.component';
import { LoginPageComponent } from '@components/login-page/login-page.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'admin', component: AdminComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
