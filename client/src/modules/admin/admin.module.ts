import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '@imports/material.imports';
import { SharedModule } from '@modules/shared/shared.module';
import { ADMIN_DECLARATIONS } from '@declarations/admin.declarations';
import { AdminRoutingModule } from './admin-routing.module';

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