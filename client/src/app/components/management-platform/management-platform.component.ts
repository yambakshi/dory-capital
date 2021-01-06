import { Component, OnInit } from '@angular/core';
import { ApiService } from '@root/app/services/api.service';

@Component({
  selector: 'app-management-platform',
  templateUrl: './management-platform.component.html',
  styleUrls: [
    './management-platform.component.common.scss',
    './management-platform.component.desktop.scss',
    './management-platform.component.mobile.scss'
  ]
})
export class ManagementPlatformComponent implements OnInit {
  data: {
    about: {
      title: { _id: string, text: string },
      paragraph1: { _id: string, text: string },
      paragraph2: { _id: string, text: string }
    }
  } = {
      about: {
        title: { _id: '', text: '' },
        paragraph1: { _id: '', text: '' },
        paragraph2: { _id: '', text: '' }
      }
    }

  constructor(private apiService: ApiService) {
    this.apiService.getParagraphs([]).subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit(): void {
  }

  submit($event, section: string, name: string): void {
    this.data[section][name].text = $event.target['value'].value;
    this.apiService.updateParagraph(this.data[section][name]).subscribe((data: any) => {
      console.log(data);
    })
  }
}