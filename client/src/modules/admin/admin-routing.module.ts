import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { PageDataResolver } from '@resolvers/page-data.resolver';
import { AdminComponent } from '@components/management-platform/admin/admin.component';
import { LoginPageComponent } from '@components/management-platform/login-page/login-page.component';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        resolve: { pageData: PageDataResolver }
    },
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }