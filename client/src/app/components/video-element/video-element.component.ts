import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { WindowRefService } from '@services/window-ref.service';


@Component({
    selector: 'video-element',
    templateUrl: './video-element.component.html',
    styleUrls: [
        './video-element.component.common.scss',
        './video-element.component.mobile.scss'
    ]
})
export class VideoElementComponent implements AfterViewInit {
    @ViewChild('videoIframe') videoIframe: ElementRef;
    @Input() fullSize: boolean = true;
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
        private renderer: Renderer2,
        private windowRefService: WindowRefService) {
        const { url, params } = this.cloudinaryPlayer;
        const encodedParams = Object.entries(params)
            .map(([param, value]) =>
                Array.isArray(value) ? encodeURIComponent(`${param}[0]`) + `=${value}` : `${param}=${value}`
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
        let width = 0, height = 0;
        if (this.windowRefService.nativeWindow.innerWidth < 901) {
            // height = documentHeight;
            width = height * ratio;
            height = 250;
            width = 1000;
        } else {
            // width = documentWidth - 30;
            width = 2500;
            height = width / ratio;

            // this.renderer.setStyle(this.videoIframe.nativeElement, 'width', `${width}px`);
            // this.renderer.setStyle(this.videoIframe.nativeElement, 'height', `${height}px`);
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.calcPlayerSize();
    }
}