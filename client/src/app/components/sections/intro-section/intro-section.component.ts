import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Output, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'intro-section',
    templateUrl: './intro-section.component.html',
    styleUrls: [
        './intro-section.component.common.scss',
        './intro-section.component.mobile.scss'
    ]
})
export class IntroSectionComponent implements AfterViewInit {
    @ViewChild('videoElement') videoElement: ElementRef;
    @Output() navigationEmitter = new EventEmitter<string>();
    videoSrc: string = '';

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.calcPlayerSize();
        }
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

        const videoElement = this.videoElement.nativeElement;
        this.renderer.setStyle(videoElement, 'width', `${width}px`);
        this.renderer.setStyle(videoElement, 'height', `${height}px`);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.calcPlayerSize();
    }

    scrollToSection(name: string): void {
        this.navigationEmitter.emit(name);
    }
}