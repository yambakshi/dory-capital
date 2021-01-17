import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'leadership-section',
    templateUrl: './leadership-section.component.html',
    styleUrls: [
        './leadership-section.component.common.scss',
        './leadership-section.component.desktop.scss',
        './leadership-section.component.mobile.scss'
    ]
})
export class LeadershipSectionComponent implements AfterViewInit {
    @ViewChild('skillsContainer') skillsContainer: ElementRef;
    title: string = "BoD & Leadership";
    skillsArray: any[] = [];
    media = {
        people: [
            {
                img: 'assets/media/leadership/people/17-reut-dory.png',
                alt: 'Reut Dory',
                skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal']
            },
            {
                img: 'assets/media/leadership/people/02-asaf-eli.png',
                alt: 'Asaf Eli'
            },
            {
                img: 'assets/media/leadership/people/03-asher-dory.png',
                alt: 'Asher Dory'
            },
            {
                img: 'assets/media/leadership/people/04-eli-clark.png',
                alt: 'Eli Clark'
            },
            {
                img: 'assets/media/leadership/people/17-reut-dory.png',
                alt: 'Reut Dory'
            },
            {
                img: 'assets/media/leadership/people/06-henry-chai.png',
                alt: 'Henry Chai'
            },
            {
                img: 'assets/media/leadership/people/07-jay-oberay.png',
                alt: 'Jay Oberay'
            },
            {
                img: 'assets/media/leadership/people/08-dr-naama-kenan.png',
                alt: 'Dr. Naama Kenan'
            },
            {
                img: 'assets/media/leadership/people/09-kelvin-wu.png',
                alt: 'Kelvin Wu'
            },
            {
                img: 'assets/media/leadership/people/10-leemor-machnai.png',
                alt: 'Leemor Nachnai'
            },
            {
                img: 'assets/media/leadership/people/11-merav-harel.png',
                alt: 'Merav Harel'
            },
            {
                img: 'assets/media/leadership/people/17-reut-dory.png',
                alt: 'Reut Dory'
            },
            {
                img: 'assets/media/leadership/people/13-monin-ung.png',
                alt: 'Monin Ung'
            },
            {
                img: 'assets/media/leadership/people/14-theekshana-kumara.png',
                alt: 'Theekshana Kumara'
            },
            {
                img: 'assets/media/leadership/people/15-or-dadosh.png',
                alt: 'Or Dadosh'
            },
            {
                img: 'assets/media/leadership/people/17-reut-dory.png',
                alt: 'Reut Dory'
            },
            {
                img: 'assets/media/leadership/people/17-reut-dory.png',
                alt: 'Reut Dory'
            }
        ],
        skills: {
            'legal': {
                img: 'assets/media/leadership/skills/legal.svg',
                alt: 'Legal',
                color: 'C2C2C2'
            },
            'taxation': {
                img: 'assets/media/leadership/skills/taxation.svg',
                alt: 'Taxation',
                color: '7FF88B'
            },
            'operation': {
                img: 'assets/media/leadership/skills/operation.svg',
                alt: 'Operation',
                color: 'FBB786'
            },
            'technology': {
                img: 'assets/media/leadership/skills/technology.svg',
                alt: 'Technology',
                color: 'A074FF'
            },
            'life-sciences': {
                img: 'assets/media/leadership/skills/life-sciences.svg',
                alt: 'Life Sciences',
                color: '77CEFF'
            },
            'ip': {
                img: 'assets/media/leadership/skills/ip.svg',
                alt: 'Intellectual Property',
                color: 'FF6464'
            },
            'sales': {
                img: 'assets/media/leadership/skills/sales.svg',
                alt: 'Sales and Marketing',
                color: 'FFF27B'
            },
            'bd': {
                img: 'assets/media/leadership/skills/bd.svg',
                alt: 'Business Development',
                color: 'FF7CC3'
            },
            'pm': {
                img: 'assets/media/leadership/skills/pm.svg',
                alt: 'Product management and lifecycles',
                color: 'BEED5A'
            },
            'skills': {
                img: 'assets/media/leadership/skills/hr.svg',
                alt: 'Profiling and Human Resources',
                color: '59F3D8'
            },
            'dealflow': {
                img: 'assets/media/leadership/skills/dealflow.svg',
                alt: 'Network and Dealflow',
                color: 'C3FFB5'
            },
            'finance': {
                img: 'assets/media/leadership/skills/finance.svg',
                alt: 'Finance and M&A',
                color: '131313'
            }
        }
    }

    constructor(
        private renderer: Renderer2) {
        this.skillsArray = Object.values(this.media.skills).map(skill => skill);
    }

    ngAfterViewInit(): void {
        const skillsIcons = this.skillsContainer.nativeElement.children;
        const maxSkillsPerRow = 4;
        for (let i = 0, length = skillsIcons.length; i < length; i++) {
            const element = skillsIcons[i];
            const left = ((i % maxSkillsPerRow) * 45), top = (Math.floor(i / maxSkillsPerRow) * 45);
            this.renderer.setStyle(element, 'top', `${top}px`);
            this.renderer.setStyle(element, 'left', `${left}px`);
        }
    }
}