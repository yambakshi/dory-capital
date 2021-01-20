import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '@services/api.service';
import { LoginService } from '@services/login.service';
import { SocketIoService } from '@services/socket-io.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.common.scss',
    './admin.component.desktop.scss',
    './admin.component.mobile.scss'
  ]
})
export class AdminComponent implements AfterViewInit {
  @ViewChild('headerTabs') headerTabs: ElementRef;
  @ViewChild('tabsLine') tabsLine: ElementRef;
  @ViewChild('sections') sections: ElementRef;
  dataRetrieved: boolean = false;
  sectionsTabs: string[] = [];
  selectedTab: number = 3;
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
    leadership: {
      people: any[]
    },
    process: {
      title: string,
      paragraphs: { text: string, title: string }[]
    }
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
      leadership: {
        people: []
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
    private loginService: LoginService,
    private socketIoService: SocketIoService,
    private renderer: Renderer2) {
    this.initSectionsHeader();

    this.apiService.getPageContent().subscribe(data => {
      this.data = data;
      this.dataRetrieved = true;
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.socketIoService.connect();
      this.socketIoService.listen('page-content-changed').subscribe(() => {
        this.apiService.getPageContent().subscribe(data => {
          this.data = data;
        });
      })
    }
  }

  ngAfterViewInit() {
    this.setTabsLine(this.selectedTab);
    const selectedElement = this.sections.nativeElement.children[this.selectedTab];
    this.renderer.setStyle(selectedElement, 'display', 'flex');
  }

  setTabsLine(i: number): void {
    const selectedTab = this.headerTabs.nativeElement.children[i];
    const tabWidth = selectedTab.offsetWidth;
    const tabLeft = selectedTab.offsetLeft;
    this.renderer.setStyle(this.tabsLine.nativeElement, 'left', `${tabLeft}px`);
    this.renderer.setStyle(this.tabsLine.nativeElement, 'width', `${tabWidth}px`);
  }

  initSectionsHeader(): void {
    const sectionsKeys = Object.keys(this.data);
    for (let i = 0, length = sectionsKeys.length; i < length; i++) {
      if (sectionsKeys[i].charAt(0) == '_') {
        continue;
      }

      if (sectionsKeys[i] === 'faq') {
        this.sectionsTabs.push('FAQ');
        continue;
      }

      this.sectionsTabs.push(this.toName(sectionsKeys[i]));
    }
  }

  selectTab(i: number) {
    if (i === this.selectedTab) return;
    const deselectedElement = this.sections.nativeElement.children[this.selectedTab];
    this.renderer.setStyle(deselectedElement, 'display', 'none');
    this.selectedTab = i;
    this.setTabsLine(i);
    const selectedElement = this.sections.nativeElement.children[this.selectedTab];
    this.renderer.setStyle(selectedElement, 'display', 'flex');
  }

  toName(camelCase: string): string {
    const name = [camelCase.charAt(0).toUpperCase()];
    for (let i = 1, length = camelCase.length; i < length; i++) {
      const char = camelCase[i]
      if (char == char.toUpperCase()) {
        name.push(` ${char}`)
      } else {
        name.push(char);
      }
    }

    return name.join('');
  }

  logout(): void {
    this.loginService.logout();
  }
}