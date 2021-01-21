import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { AdminComponent } from '@components/admin/admin.component';
import { LoginPageComponent } from '@components/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { PageContentResolver } from '@resolvers/page-content.resolver';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], resolve: { pageContent: PageContentResolver }  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
