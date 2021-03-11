import { AdminComponent } from '@components/admin/admin.component';
import { AdminSectionComponent } from '@components/admin-section/admin-section.component';
import { AdminFormComponent } from '@components/admin-form/admin-form.component';
import { AdminLeadershipComponent } from '@components/admin-leadership/admin-leadership.component';
import { SpinningLoaderComponent } from '@components/spinning-loader/spinning-loader.component';
import { MemberDialog } from '@components/member-dialog/member.dialog';
import { ApproveDialog } from '@components/approve-dialog/approve.dialog';
import { LoginPageComponent } from '@components/login-page/login-page.component';


export const ADMIN_DECLARATIONS = [
    AdminComponent,
    AdminSectionComponent,
    AdminFormComponent,
    AdminLeadershipComponent,
    SpinningLoaderComponent,
    LoginPageComponent,
    ApproveDialog,
    MemberDialog,
]