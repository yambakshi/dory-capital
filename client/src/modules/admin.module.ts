import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from 'app/imports/material.imports';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from './shared.module';
import { ADMIN_DECLARATIONS } from 'app/declarations/admin.declarations';

@NgModule({
    declarations: [
        ...ADMIN_DECLARATIONS
    ],
    imports: [
        AdminRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        ...MATERIAL_IMPORTS,
    ]
})
export class AdminModule { }