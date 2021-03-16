import { Component, ElementRef, ViewChild, PLATFORM_ID, Inject, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ApiService } from '@services/api.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@services/login.service';
import { PageData } from '@models/page-data';
import { Cloudinary } from '@cloudinary/angular-5.x';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.common.scss',
    './home-page.component.mobile.scss']
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('pageNavigator') pageNavigator: ElementRef;
  @ViewChild('scrollToTopButton') scrollToTopButton: ElementRef;
  pageData: PageData;
  isLoggedIn: boolean = false;
  navigatorIcons = { idle: 'navigator_iztduy', active: 'navigator-active_dgqg6y' };

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: Document,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private renderer: Renderer2,
    private cloudinary: Cloudinary) {
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.showScrollToTop();
    }
  }

  mouseHoverPageNavigation(): void {
    let pageNavigatorElement = this.pageNavigator.nativeElement;
    let innerDivElement = pageNavigatorElement.firstElementChild;
    let innerImgElement = innerDivElement.firstElementChild;
    innerImgElement.setAttribute('src', this.imgSrc(this.navigatorIcons.active));
  }

  mouseLeavePageNavigator(): void {
    let pageNavigatorElement = this.pageNavigator.nativeElement;
    let innerDivElement = pageNavigatorElement.firstElementChild;
    let innerImgElement = innerDivElement.firstElementChild;
    innerImgElement.setAttribute('src', this.imgSrc(this.navigatorIcons.idle));
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

  imgSrc(imageId: string) {
    const url = `dory-capital/${imageId}`;
    return this.cloudinary.url(url, { transformation: [{ fetch_format: "auto" }] });
  }
}