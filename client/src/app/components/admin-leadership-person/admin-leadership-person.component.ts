import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-leadership-person',
  templateUrl: './admin-leadership-person.component.html',
  styleUrls: [
    './admin-leadership-person.component.common.scss',
    './admin-leadership-person.component.desktop.scss',
    './admin-leadership-person.component.mobile.scss'
  ]
})
export class AdminLeadershipPersonComponent {
  @Input() data: any[];
  @Input() dataRetrieved: boolean = false;

  constructor() { }

  ngOnChanges(): void {
    if (this.dataRetrieved) {
    }
  }
}