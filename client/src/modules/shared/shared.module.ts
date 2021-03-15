import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    declarations: [
        MainHeaderComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        HttpClientModule,
        RouterModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        MatButtonModule,
        MainHeaderComponent,
        MatDialogModule
    ]
})
export class SharedModule { }