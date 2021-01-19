import { Component, ElementRef, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '@services/api.service';
import { SocketIoService } from '@services/socket-io.service';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.common.scss',
    './home-page.component.desktop.scss',
    './home-page.component.mobile.scss']
})
export class LandingPageComponent implements OnInit {
  @ViewChild('pageNavigator') pageNavigator: ElementRef;
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
    process: {
      title: string,
      paragraphs: { text: string, title: string }[]
    }
    faq: {
      title: string,
      paragraphs: { text: string, title: string }[]
    },
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
      process: {
        title: '',
        paragraphs: [
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
    @Inject(PLATFORM_ID) private platformId: any,
    private apiService: ApiService,
    private socketIoService: SocketIoService) {
    this.apiService.getParagraphs([]).subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.socketIoService.connect();
      this.socketIoService.listen('paragraphs-changed').subscribe(() => {
        this.apiService.getParagraphs([]).subscribe(data => {
          this.data = data;
        });
      })
    }
  }

  parseData(data: any): any {
    if (typeof data == 'object') {
      return Object.entries(data).reduce((acc, [key, value]) => {
        return { ...acc, [key]: this.parseData(value) };
      }, {})
    } else if (Array.isArray(data)) {
      return data.map(dataItem => this.parseData(dataItem));
    } else if (typeof data === 'string') {
      return data.replace('\n', '<br>');
    }
  }

  mouseHoverPageNavigation(): void {
    let pageNavigatorElement = this.pageNavigator.nativeElement;
    let innerDivElement = pageNavigatorElement.firstElementChild;
    let innerImgElement = innerDivElement.firstElementChild;

    innerDivElement.classList.add("box-hover");
    innerImgElement.setAttribute('src', 'assets/media/grid.png');
    pageNavigatorElement.style.bottom = '0';
  }

  mouseLeavePageNavigator(): void {
    let pageNavigatorElement = this.pageNavigator.nativeElement;
    let innerDivElement = pageNavigatorElement.firstElementChild;
    let innerImgElement = innerDivElement.firstElementChild;

    innerDivElement.classList.remove("box-hover");
    innerImgElement.setAttribute('src', 'assets/media/ellipse.png');
    pageNavigatorElement.style.bottom = '-50px';
  }
}