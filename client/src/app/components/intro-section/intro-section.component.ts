import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'intro-section',
    templateUrl: './intro-section.component.html',
    styleUrls: [
        './intro-section.component.common.scss',
        './intro-section.component.mobile.scss'
    ]
})
export class IntroSectionComponent implements AfterViewInit {
    @ViewChild('videoIframeContainer') videoIframeContainer: ElementRef;
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
            const iframe = this.renderer.createElement('iframe');
            this.renderer.setAttribute(iframe, 'src', this.iframeSrc)
            this.renderer.setAttribute(iframe, 'scrolling', 'no');
            this.renderer.setAttribute(iframe, 'frameborder', '0');
            this.renderer.setAttribute(iframe, 'title', 'intro-section-background-video');
            this.renderer.setAttribute(iframe, 'loading', 'lazy');
            this.renderer.setAttribute(iframe, 'hidden', 'true');
            this.renderer.listen(iframe, 'load', this.iframeLoaded.bind(this));
            this.renderer.appendChild(this.videoIframeContainer.nativeElement, iframe);

            this.calcPlayerSize();
        }
    }

    iframeLoaded(): void {
        this.renderer.removeAttribute(this.videoIframeContainer.nativeElement.firstChild, 'hidden');
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

        const iframeElement = this.videoIframeContainer.nativeElement.firstChild;
        this.renderer.setStyle(iframeElement, 'width', `${width}px`);
        this.renderer.setStyle(iframeElement, 'height', `${height}px`);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.calcPlayerSize();
    }
}