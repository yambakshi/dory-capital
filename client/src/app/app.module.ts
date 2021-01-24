import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_PROVIDERS } from './app.providers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { VideoElementComponent } from './components/video-element/video-element.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ParagraphSectionComponent } from '@components/admin-section/admin-section.component';
import { AdminFormComponent } from '@components/admin-form/admin-form.component';
import { LeadershipSectionComponent } from '@components/leadership-section/leadership-section.component';
import { SkillsContainerComponent } from '@components/skills-container/skills-container.component';
import { CarouselsComponent } from '@components/carousels/carousels.component';
import { AdminLeadershipComponent } from '@components/admin-leadership/admin-leadership.component';
import { AdminLeadershipPersonComponent } from '@components/admin-leadership-person/admin-leadership-person.component';
import { MemberDialog } from '@components/member-dialog/member.dialog';
import { ApproveDialog } from '@components/approve-dialog/approve.dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { CLODUINARY_CONFIG } from '@services/constants';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminComponent,
    AdminFormComponent,
    AdminLeadershipComponent,
    AdminLeadershipPersonComponent,
    VideoElementComponent,
    LoginPageComponent,
    ParagraphSectionComponent,
    LeadershipSectionComponent,
    SkillsContainerComponent,
    CarouselsComponent,
    ApproveDialog,
    MemberDialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CloudinaryModule.forRoot({ Cloudinary }, CLODUINARY_CONFIG),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
