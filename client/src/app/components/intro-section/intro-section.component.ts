import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'intro-section',
    templateUrl: './intro-section.component.html',
    styleUrls: [
        './intro-section.component.common.scss',
        './intro-section.component.desktop.scss',
        './intro-section.component.mobile.scss'
    ]
})
export class IntroSectionComponent {
    @ViewChild('backgroundVideo') backgroundVideo: ElementRef;
    isLoggedIn: boolean = false;
    videoUrl: string = 'https://res.cloudinary.com/dory-capital/video/upload/v1612139147/dory-capital/bg-video_fvwmqy.mov';

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.calcPlayerSize();
        }
    }

    get videoSrc(): string {
        return this.videoUrl;
    }

    calcPlayerSize(): void {
        const ratio = 1280 / 720;
        const documentHeight = this.document.body.clientHeight;
        const documentWidth = this.document.body.clientWidth;
        let width = documentWidth, height = width / ratio;
        if (height < documentHeight) {
            height = documentHeight;
            width = height * ratio;
        }

        this.renderer.setStyle(this.backgroundVideo.nativeElement, 'width', `${width}px`);
        this.renderer.setStyle(this.backgroundVideo.nativeElement, 'height', `${height}px`);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.calcPlayerSize();
    }
}