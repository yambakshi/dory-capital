import { Component, Input } from '@angular/core';
import { CloudinaryService } from '@services/cloudinary.service';

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
  @Input() data;
  @Input() dataRetrieved: boolean = false;

  constructor(public cloudinaryService: CloudinaryService) { }

  ngOnChanges(): void {
    if (this.dataRetrieved) {
    }
  }
}