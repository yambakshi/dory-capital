import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WindowRefService } from '@services/window-ref.service';
import { ApiService } from '@services/api.service';
import { SocketIoService } from '@services/socket-io.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: [
    './landing-page.component.common.scss',
    './landing-page.component.desktop.scss',
    './landing-page.component.mobile.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  @ViewChild('carsouelsContainer') carsouelsContainer: ElementRef;
  @ViewChild('pageNavigator') pageNavigator: ElementRef;
  radianSectionDeg = (360 / 5) * Math.PI * 2 / 360;
  currentCarouselIndex = 0;
  carousels = [0, 0, 0, 0, 0];
  radiusLength: number;
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
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRefService: WindowRefService,
    private apiService: ApiService,
    private socketIoService: SocketIoService) {
    this.apiService.getParagraphs([]).subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.calcCarouselRadius();

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

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.calcCarouselRadius();
  }

  calcCarouselRadius(): void {
    this.radiusLength = (this.windowRefService.nativeWindow.innerWidth < 767) ? 115 : 250;
  }

  ngAfterViewInit(): void {
    for (let i = 0; i < this.carousels.length; i++) {
      let currentCarousel = this.carsouelsContainer.nativeElement.querySelector(`#pills-${i + 1} > div > div`);
      for (let j = 0; j < currentCarousel.children.length; j++) {
        currentCarousel.children[j].style.top = this.radiusLength * Math.sin(this.radianSectionDeg * j - 1.5708) + 'px';
        currentCarousel.children[j].style.left = this.radiusLength * Math.cos(this.radianSectionDeg * j - 1.5708) + 'px';
      }
    }
  }

  updateCurrentCarousel(index: number): any {
    this.currentCarouselIndex = index;
  }

  rotateCarousel() {
    let currentCarousel = this.carsouelsContainer.nativeElement.querySelector(`#pills-${this.currentCarouselIndex + 1} > div > div`);
    currentCarousel.children[this.carousels[this.currentCarouselIndex]].classList.remove("active");
    this.carousels[this.currentCarouselIndex] = (this.carousels[this.currentCarouselIndex] > 0) ? this.carousels[this.currentCarouselIndex] - 1 : 4;
    currentCarousel.children[this.carousels[this.currentCarouselIndex]].classList.add("active");
    let selectedItem = this.carousels[this.currentCarouselIndex];
    for (let i = 0; i < 5; i++) {

      // Clockwise
      currentCarousel.children[i].style.top = this.radiusLength * Math.sin((this.radianSectionDeg * (selectedItem - i)) - 1.5708) + 'px';
      currentCarousel.children[i].style.left = this.radiusLength * Math.cos((this.radianSectionDeg * (selectedItem - i)) + 1.5708) + 'px';

      // Counter Clockwise
      // currentCarousel.children[i].style.top = this.radiusLength * Math.sin((this.radianSectionDeg * (selectedItem + i)) - 1.5708) + 'px';
      // currentCarousel.children[i].style.left = this.radiusLength * Math.cos((this.radianSectionDeg * (selectedItem + i)) - 1.5708) + 'px';
    }
  }

  selectCarouselItem(index: number): void {
    let currentCarousel = this.carsouelsContainer.nativeElement.querySelector(`#pills-${this.currentCarouselIndex + 1} > div > div`);
    currentCarousel.children[this.carousels[this.currentCarouselIndex]].classList.remove("active");
    this.carousels[this.currentCarouselIndex] = index;
    currentCarousel.children[this.carousels[this.currentCarouselIndex]].classList.add("active");

    var holder = [], carouselChildren: any = Array.from(currentCarousel.children);
    for (var i = 0; i < index; i++) {
      var getEl = carouselChildren.shift();
      holder.push(getEl);
    }

    carouselChildren = carouselChildren.concat(holder);
    for (let i = 0; i < carouselChildren.length; i++) {
      carouselChildren[i].style.top = this.radiusLength * Math.sin(this.radianSectionDeg * i - 1.5708) + 'px';
      carouselChildren[i].style.left = this.radiusLength * Math.cos(this.radianSectionDeg * i - 1.5708) + 'px';
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