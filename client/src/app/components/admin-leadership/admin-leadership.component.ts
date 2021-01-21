import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-leadership',
  templateUrl: './admin-leadership.component.html',
  styleUrls: [
    './admin-leadership.component.common.scss',
    './admin-leadership.component.desktop.scss',
    './admin-leadership.component.mobile.scss'
  ]
})
export class AdminLeadershipComponent {
  @Input() _id: string;
  @Input() data;
  @Input() dataRetrieved: boolean = false;

  constructor() { }

  ngOnChanges(): void {
    if (this.dataRetrieved) {
    }
  }
}