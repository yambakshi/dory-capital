import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { CLODUINARY_CONFIG } from '@services/constants';

import { HOME_PAGE_DECLARATIONS } from './declarations/home-page.declarations';
import { SingletonServicesModule } from '@modules/singleton-services.module';
import { SharedModule } from '@modules/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ...HOME_PAGE_DECLARATIONS,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CloudinaryModule.forRoot({ Cloudinary }, CLODUINARY_CONFIG),
    SingletonServicesModule.forRoot(),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
