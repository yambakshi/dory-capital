import { Component, OnInit } from '@angular/core';
import { ApiService } from '@root/app/services/api.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.common.scss',
    './admin.component.desktop.scss',
    './admin.component.mobile.scss'
  ]
})
export class AdminComponent implements OnInit {
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