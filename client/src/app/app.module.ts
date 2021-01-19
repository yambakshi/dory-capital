import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_PROVIDERS } from './app.providers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './components/home-page/home-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { VideoElementComponent } from './components/video-element/video-element.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ParagraphSectionComponent } from '@components/admin-section/admin-section.component';
import { AdminFormComponent } from '@components/admin-form/admin-form.component';
import { LeadershipSectionComponent } from '@components/leadership-section/leadership-section.component';
import { SkillsContainerComponent } from '@components/skills-container/skills-container.component';
import { CarouselsComponent } from '@components/carousels/carousels.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AdminComponent,
    VideoElementComponent,
    LoginPageComponent,
    ParagraphSectionComponent,
    AdminFormComponent,
    LeadershipSectionComponent,
    SkillsContainerComponent,
    CarouselsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
