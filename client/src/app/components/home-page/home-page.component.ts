import { Component, ElementRef, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '@services/api.service';
import { SocketIoService } from '@services/socket-io.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@services/login.service';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.common.scss',
    './home-page.component.desktop.scss',
    './home-page.component.mobile.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('pageNavigator') pageNavigator: ElementRef;
  data: any;
  isLoggedIn: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private socketIoService: SocketIoService) {
    this.route.data.subscribe(data => {
      if (!data['pageData']) {
        this.data = [];
        return;
      }

      this.data = data['pageData'].sections;
    });

    this.loginService.getLoginStatusObservable().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.socketIoService.connect();
      this.socketIoService.listen('page-data-changed').subscribe(() => {
        this.apiService.getPageData().subscribe(data => {
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