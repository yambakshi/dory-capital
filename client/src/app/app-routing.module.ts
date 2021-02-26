import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { PageDataResolver } from '@resolvers/page-data.resolver';


const routes: Routes = [
  { path: '', component: HomePageComponent, resolve: { pageData: PageDataResolver } },
  {
    path: 'login',
    loadChildren: () => import('@components/login-page/login-page.component').then(m => m.LoginPageComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('@components/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard], resolve: { pageData: PageDataResolver }
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    useHash: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
