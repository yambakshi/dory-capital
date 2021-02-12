import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';


@Component({
    selector: 'video-element',
    templateUrl: './video-element.component.html',
    styleUrls: [
        './video-element.component.common.scss',
        './video-element.component.mobile.scss'
    ]
})
export class VideoElementComponent {
    @ViewChild('bgVideoCanvas') bgVideoCanvas: ElementRef;
    @Input() fullSize: boolean = true;

    constructor(@Inject(PLATFORM_ID) private platformId: any) { }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.bgVideoCanvas.nativeElement.width = 1280;
            this.bgVideoCanvas.nativeElement.height = 720;
            var ctx = this.bgVideoCanvas.nativeElement.getContext('2d');
            var video = document.getElementById('bg-video');

            video.addEventListener('play', function () {
                var $this: any = this; //cache
                (function loop() {
                    if (!$this.paused && !$this.ended) {
                        ctx.drawImage($this, 0, 0);
                        setTimeout(loop, 1000 / 30); // drawing at 30fps
                    }
                })();
            }, false);
        }
    }
}