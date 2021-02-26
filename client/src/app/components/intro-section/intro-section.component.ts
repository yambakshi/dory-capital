import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'intro-section',
    templateUrl: './intro-section.component.html',
    styleUrls: [
        './intro-section.component.common.scss',
        './intro-section.component.mobile.scss'
    ]
})
export class IntroSectionComponent {
    @ViewChild('videoIframe') videoIframe: ElementRef;
    isLoggedIn: boolean = false;
    iframeSrc: any = '';
    cloudinaryPlayer = {
        url: 'https://player.cloudinary.com/embed/?',
        params: {
            'cloud_name': 'dory-capital',
            'public_id': 'dory-capital/bg-video_fvwmqy',
            'fluid': true,
            'controls': false,
            'autoplay': true,
            'autoplayMode': 'always',
            'muted': true,
            'loop': true,
            'source_types': ['mp4']
        }
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2) {
        const { url, params } = this.cloudinaryPlayer;
        const encodedParams = Object.entries(params)
            .map(([param, value]) =>
                Array.isArray(value) ?
                    encodeURIComponent(`${param}[0]`) + `=${value}` :
                    `${param}=${value}`
            ).join('&')

        this.iframeSrc = `${url}${encodedParams}`;
    }

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

        this.renderer.setStyle(this.videoIframe.nativeElement, 'width', `${width}px`);
        this.renderer.setStyle(this.videoIframe.nativeElement, 'height', `${height}px`);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.calcPlayerSize();
    }
}