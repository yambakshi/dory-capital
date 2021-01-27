import { Component } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: [
    './main-header.component.common.scss',
    './main-header.component.desktop.scss',
    './main-header.component.mobile.scss'
  ]
})
export class MainHeaderComponent {
    constructor() {}
}