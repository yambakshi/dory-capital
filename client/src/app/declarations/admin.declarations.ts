import { AdminComponent } from '@components/management-platform/admin/admin.component';
import { AdminSectionComponent } from '@components/management-platform/admin-section/admin-section.component';
import { AdminFormComponent } from '@components/management-platform/admin-form/admin-form.component';
import { AdminLeadershipComponent } from '@components/management-platform/admin-leadership/admin-leadership.component';
import { SpinningLoaderComponent } from '@components/management-platform/spinning-loader/spinning-loader.component';
import { MemberDialog } from '@components/management-platform/member-dialog/member.dialog';
import { ApproveDialog } from '@components/management-platform/approve-dialog/approve.dialog';
import { LoginPageComponent } from '@components/management-platform/login-page/login-page.component';
import { ChangePasswordComponent } from '@components/management-platform/change-password/change-password.component';


export const ADMIN_DECLARATIONS = [
    AdminComponent,
    AdminSectionComponent,
    AdminFormComponent,
    AdminLeadershipComponent,
    SpinningLoaderComponent,
    LoginPageComponent,
    ApproveDialog,
    MemberDialog,
    ChangePasswordComponent
]