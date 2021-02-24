import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
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
    containerCenter: { top: number, left: number } = { top: 0, left: 0 };
    selectedTab: number = 0;
    radianSectionDeg: number = (360 / 5) * Math.PI * 2 / 360;
    carouselsIndices: number[] = [0, 0, 0, 0, 0];
    radiusLength: number;
    carouselsTabs: string[] = ['I', 'II', 'III', 'IV', 'V'];
    labelHeight: number = 24;
    rotateIconId: string = 'dory-capital/scope/rotate_sdc32r';
    carouselsImgs = [
        [
            { name: 'Big Data', id: 'big-data_enwda7' },
            { name: 'Data Sciences', id: 'data-sciences_aqjaja' },
            { name: 'Data Tech', id: 'data-tech_mjqwqu' },
            { name: 'Fintech', id: 'fintech_i9c9yo' },
            { name: 'Smart City Tech', id: 'smart-city-tech_d6thry' }
        ],
        [
            { name: 'Artificial Intelligence', id: 'artificial-intelligence_vorcg6' },
            { name: 'Augmented & Virtual Reality', id: 'ar-vr_cpwall' },
            { name: 'Face Recognition', id: 'face-recognition_nynool' },
            { name: 'NLP', id: 'nlp_zopdqy' },
            { name: 'Profiling', id: 'profiling_wzvl5s' }
        ],
        [
            { name: 'Blockchain Acceleration', id: 'blockchain-acceleration_t8gxtt' },
            { name: 'Blockchain Scalability', id: 'blockchain-scalability_lbtnjp' },
            { name: 'Blockchain Throughput', id: 'blockchain-throughput_igkay1' },
            { name: 'Infrastructure Blockchain', id: 'infrastructure-blockchain_htwhql' },
            { name: 'Quantum Cryptography', id: 'quantum-cryptography_iwwwjo' }
        ],
        [
            { name: 'Energy Harvesting', id: 'energy-harvesting_ghbijj' },
            { name: 'Energy Sourcing', id: 'energy-sourcing_nsuahs' },
            { name: 'Holographic Imaging', id: 'holographic-imaging_qq7ppv' },
            { name: 'Machine Learning', id: 'machine-learning_gis8in' },
            { name: 'Voice Diagnostics Analysis', id: 'voice-diagnostics-analysis_fau9di' },
        ],
        [
            { name: 'Autonomous Mobility Solutions', id: 'autonomous-mobility-solutions_rl91h5' },
            { name: 'Drones Robotics', id: 'drones-robotics_lq0t5n' },
            { name: 'Noninvasive Medical Equipment', id: 'medical-histotripsy-and-synthetic-biology_mpa3zo' },
            { name: 'RF Networks', id: 'rf-networks_f92wcn' },
            { name: 'Ultimate Online Privacy', id: 'ultimate-online-privacy_sbb2dh' },
        ]
    ]

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private windowRefService: WindowRefService,
        private renderer: Renderer2,
        private cloudinary: Cloudinary
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

    carouselImg(i: number, id: string) {
        const imageId = `dory-capital/scope/${i}/${id}`;
        return this.imgSrc(imageId);
    }

    imgSrc(imageId: string, autoFormat: boolean = true) {
        return autoFormat ?
            this.cloudinary.url(imageId, { transformation: [{ fetch_format: "auto" }] }) :
            this.cloudinary.url(imageId);
    }

    ngAfterViewInit(): void {
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
        this.labelHeight = (this.windowRefService.nativeWindow.innerWidth < 901) ? 15 : 24;
    }

    selectTab(i: number) {
        if (i === this.selectedTab) return;
        this.selectedTab = i;
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