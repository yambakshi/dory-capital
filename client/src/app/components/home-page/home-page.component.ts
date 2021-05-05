import { Component, ElementRef, ViewChild, PLATFORM_ID, Inject, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ApiService } from '@services/api.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@services/login.service';
import { PageData } from '@models/page-data';


enum NavigatorIcons {
  Idle = 'navigator_iztduy',
  Active = 'navigator-active_dgqg6y'
}

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.common.scss',
    './home-page.component.mobile.scss']
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('scrollToTopButton') scrollToTopButton: ElementRef;
  @ViewChild('scope') scope: ElementRef;
  @ViewChild('process') process: ElementRef;
  @ViewChild('contactus') contactus: ElementRef;
  sectionsElements: { [key: string]: ElementRef };
  pageData: PageData;
  isLoggedIn: boolean = false;
  navigatorIconId: NavigatorIcons = NavigatorIcons.Idle;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: Document,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private renderer: Renderer2) {
    this.route.data.subscribe(data => {
      if (!data['pageData']) {
        return;
      }
    });

    this.loginService.getLoginStatusObservable().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });

    this.apiService.getPageDataObservable().subscribe((pageData: PageData) => {
      this.pageData = pageData;
    });
  }

  get publicId() {
    return `dory-capital/${this.navigatorIconId}`;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initSectionsElements();
      this.showScrollToTop();
    }
  }

  initSectionsElements(): void {
    this.sectionsElements = {
      'scope': this.scope,
      'process': this.process,
      'contactus': this.contactus
    }
  }

  mouseHoverPageNavigation(): void {
    this.navigatorIconId = NavigatorIcons.Active;
  }

  mouseLeavePageNavigator(): void {
    this.navigatorIconId = NavigatorIcons.Idle;
  }

  scrollToTop(): void {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.showScrollToTop();
  }

  showScrollToTop(): void {
    let display = 'none';
    if (this.document.body.scrollTop > 20 || this.document.documentElement.scrollTop > 20) {
      display = 'flex';
    }

    this.renderer.setStyle(this.scrollToTopButton.nativeElement, 'display', display);
  }

  scrollToSection(name: string): void {
    const sectionElement = this.sectionsElements[name].nativeElement;
    this.scrollTo(sectionElement);
  }

  scrollTo(el: HTMLElement): void {
    el.scrollIntoView();
  }
}