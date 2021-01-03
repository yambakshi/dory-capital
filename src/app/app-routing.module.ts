import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '@components/landing-page/landing-page.component';
import { ManagementPlatformComponent } from '@components/management-platform/management-platform.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'admin', component: ManagementPlatformComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
