import { Component } from '@angular/core';
import { ApiService } from '@services/api.service';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.common.scss',
    './admin.component.desktop.scss',
    './admin.component.mobile.scss'
  ]
})
export class AdminComponent {
  data: {
    _id: string,
    scope: {
      title: string,
      paragraphs: { text: string }[]
    },
    aboutUs: {
      title: string,
      paragraphs: { text: string }[],
    },
    whyUs: {
      title: string,
      paragraphs: { text: string, title: string }[]
    },
    faq: {
      title: string,
      paragraphs: { text: string, title: string }[]
    }
    contactUs: {
      title: string
    }
  } = {
      _id: '',
      scope: {
        title: '',
        paragraphs: [
          { text: '' },
          { text: '' }
        ],
      },
      aboutUs: {
        title: '',
        paragraphs: [
          { text: '' },
          { text: '' }
        ]
      },
      whyUs: {
        title: '',
        paragraphs: [
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' }
        ]
      },
      faq: {
        title: '',
        paragraphs: [
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' },
          { text: '', title: '' }
        ]
      },
      contactUs: {
        title: '',
      }
    }

  constructor(
    private apiService: ApiService,
    private loginService: LoginService) {
    this.apiService.getParagraphs([]).subscribe(data => {
      this.data = data;
    });
  }

  logout(): void {
    this.loginService.logout();
  }
}