import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


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
        RouterModule
    ],
    exports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        MatButtonModule,
        MainHeaderComponent
    ]
})
export class SharedModule { }