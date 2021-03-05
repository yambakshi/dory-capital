import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { PageDataResolver } from '@resolvers/page-data.resolver';


const routes: Routes = [
  { path: '', component: HomePageComponent, resolve: { pageData: PageDataResolver } },
  {
    path: 'admin',
    loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule)
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
