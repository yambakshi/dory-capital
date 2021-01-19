import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { WindowRefService } from '@services/window-ref.service';

@Component({
    selector: 'carousels',
    templateUrl: './carousels.component.html',
    styleUrls: [
        './carousels.component.common.scss',
        './carousels.component.desktop.scss',
        './carousels.component.mobile.scss'
    ]
})
export class CarouselsComponent implements OnInit, AfterViewInit {
    @ViewChild('carsouels') carsouels: ElementRef;
    @ViewChild('tabs') tabs: ElementRef;
    @ViewChild('tabsLine') tabsLine: ElementRef;
    containerCenter: { top: number, left: number } = { top: 0, left: 0 };
    selectedTab: number = 0;
    radianSectionDeg: number = (360 / 5) * Math.PI * 2 / 360;
    carouselsIndices: number[] = [0, 0, 0, 0, 0];
    radiusLength: number;
    carouselsTabs: string[] = ['I', 'II', 'III', 'IV', 'V'];
    labelHeight: number = 24;
    carouselsImgs = [
        ['Big Data', 'Data Sciences', 'Data Tech', 'Fintech', 'Smart City Tech'],
        ['AI', 'AR VR', 'Face Recognition', 'NLP', 'Profiling'],
        ['Blockchain Acceleration', 'Blockchain Scalability', 'Blockchain Throughput', 'Infrastructure Blockchain', 'Quantum Cryptography'],
        ['Energy Harvesting', 'Energy Sourcing', 'Holographic Imaging', 'Machine Learning', 'Voice Diagnostics Analysis'],
        ['Autonomous Mobility Solutions', 'Drones Robotics', 'Medical Histotripsy and Synthetic Biology', 'RF Networks', 'Ultimate Online Privacy']
    ]

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private windowRefService: WindowRefService,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.calcCarouselRadius();
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.calcCarouselRadius();
    }

    imgKey(name): string {
        return name.toLowerCase().replace(/ /g, '-');
    }

    ngAfterViewInit(): void {
        this.setTabsLine(this.selectedTab);
        const selectedElement = this.carsouels.nativeElement.children[this.selectedTab + 1];
        this.renderer.setStyle(selectedElement, 'display', 'flex');

        this.containerCenter.top = this.carsouels.nativeElement.offsetHeight / 2;
        this.containerCenter.left = this.carsouels.nativeElement.offsetWidth / 2;

        for (let i = 1; i <= this.carouselsImgs.length; i++) {
            const currentCarousel = this.carsouels.nativeElement.children[i];
            for (let j = 0; j < currentCarousel.children.length; j++) {
                const carouselItem = currentCarousel.children[j]
                const top = this.radiusLength * Math.sin((this.radianSectionDeg * j) - 1.5708);
                const left = this.radiusLength * Math.cos((this.radianSectionDeg * j) - 1.5708)
                this.renderer.setStyle(carouselItem, 'top', `${this.containerCenter.top + top + this.labelHeight}px`);
                this.renderer.setStyle(carouselItem, 'left', `${this.containerCenter.left + left}px`);
            }
        }
    }

    calcCarouselRadius(): void {
        this.radiusLength = (this.windowRefService.nativeWindow.innerWidth < 901) ? 120 : 280;
        this.labelHeight = (this.windowRefService.nativeWindow.innerWidth < 901) ? 12 : 24;
    }

    selectTab(i: number) {
        if (i === this.selectedTab) return;
        const deselectedElement = this.carsouels.nativeElement.children[this.selectedTab + 1];
        this.renderer.setStyle(deselectedElement, 'display', 'none');
        this.selectedTab = i;
        this.setTabsLine(i);
        const selectedElement = this.carsouels.nativeElement.children[this.selectedTab + 1];
        this.renderer.setStyle(selectedElement, 'display', 'flex');
    }

    setTabsLine(i: number): void {
        const selectedTab = this.tabs.nativeElement.children[i];
        const tabWidth = selectedTab.offsetWidth;
        const tabLeft = selectedTab.offsetLeft;
        this.renderer.setStyle(this.tabsLine.nativeElement, 'left', `${tabLeft}px`);
        this.renderer.setStyle(this.tabsLine.nativeElement, 'width', `${tabWidth}px`);
    }

    rotateCarousel() {
        const currentCarousel = this.carsouels.nativeElement.children[this.selectedTab + 1];
        this.carouselsIndices[this.selectedTab] = (this.carouselsIndices[this.selectedTab] > 0)
            ? this.carouselsIndices[this.selectedTab] - 1 : 4;
        const selectedItem = this.carouselsIndices[this.selectedTab];

        for (let i = 0; i < currentCarousel.children.length; i++) {
            const carouselItem = currentCarousel.children[i]

            // Clockwise
            const top = this.radiusLength * Math.sin((this.radianSectionDeg * (selectedItem - i)) - 1.5708);
            const left = this.radiusLength * Math.cos((this.radianSectionDeg * (selectedItem - i)) + 1.5708);

            // Counter Clockwise
            // const top = this.radiusLength * Math.sin((this.radianSectionDeg * (selectedItem + i)) - 1.5708);
            // const left = this.radiusLength * Math.cos((this.radianSectionDeg * (selectedItem + i)) - 1.5708);

            this.renderer.setStyle(carouselItem, 'top', `${this.containerCenter.top + top + this.labelHeight}px`);
            this.renderer.setStyle(carouselItem, 'left', `${this.containerCenter.left + left}px`);
        }
    }

    selectCarouselItem(index: number): void {
        const currentCarousel = this.carsouels.nativeElement.children[this.selectedTab + 1];
        this.carouselsIndices[this.selectedTab] = index;
        var holder = [], carouselChildren: any = Array.from(currentCarousel.children);
        for (var i = 0; i < index; i++) {
            var getEl = carouselChildren.shift();
            holder.push(getEl);
        }

        carouselChildren = carouselChildren.concat(holder);
        for (let i = 0; i < carouselChildren.length; i++) {
            const carouselItem = carouselChildren[i];
            const top = this.radiusLength * Math.sin(this.radianSectionDeg * i - 1.5708);
            const left = this.radiusLength * Math.cos(this.radianSectionDeg * i - 1.5708);

            this.renderer.setStyle(carouselItem, 'top', `${this.containerCenter.top + top + this.labelHeight}px`);
            this.renderer.setStyle(carouselItem, 'left', `${this.containerCenter.left + left}px`);
        }
    }
}