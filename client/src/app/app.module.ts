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
import { AdminSectionComponent } from '@components/admin-section/admin-section.component';
import { AdminFormComponent } from '@components/admin-form/admin-form.component';
import { AboutUsSectionComponent } from '@components/sections/about-us-section/about-us-section.component';
import { ContactSectionComponent } from '@components/sections/contact-section/contact-section.component';
import { FaqSectionComponent } from '@components/sections/faq-section/faq-section.component';
import { LeadershipSectionComponent } from '@components/sections/leadership-section/leadership-section.component';
import { ProcessSectionComponent } from '@components/sections/process-section/process-section.component';
import { ScopeSectionComponent } from '@components/sections/scope-section/scope-section.component';
import { WhyUsSectionComponent } from '@components/sections/why-us-section/why-us-section.component';
import { SkillsContainerComponent } from '@components/skills-container/skills-container.component';
import { CarouselsComponent } from '@components/carousels/carousels.component';
import { AdminLeadershipComponent } from '@components/admin-leadership/admin-leadership.component';
import { SpinningLoaderComponent } from '@components/spinning-loader/spinning-loader.component';
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
import { DragDropModule } from '@angular/cdk/drag-drop';


import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { CLODUINARY_CONFIG } from '@services/constants';
import { MainHeaderComponent } from '@components/main-header/main-header.component';

// Pipes
import { SafePipe } from './pipes/safe.pipe';
import { IntroSectionComponent } from '@components/intro-section/intro-section.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminComponent,
    AdminFormComponent,
    AdminLeadershipComponent,
    SpinningLoaderComponent,
    VideoElementComponent,
    LoginPageComponent,
    AdminSectionComponent,
    AboutUsSectionComponent,
    ContactSectionComponent,
    FaqSectionComponent,
    LeadershipSectionComponent,
    ProcessSectionComponent,
    ScopeSectionComponent,
    WhyUsSectionComponent,
    SkillsContainerComponent,
    CarouselsComponent,
    ApproveDialog,
    MemberDialog,
    MainHeaderComponent,
    SafePipe,
    IntroSectionComponent
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
    MatSelectModule,
    DragDropModule
  ],
  providers: [APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
