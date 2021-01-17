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
    @ViewChild('skillsTypes') skillsTypes: ElementRef;
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
                alt: 'Asaf Eli',
                skills: ['life-sciences', 'ip', 'bd', 'pm', 'dealflow']
            },
            {
                img: 'assets/media/leadership/people/03-asher-dory.png',
                alt: 'Asher Dory',
                skills: ['life-sciences', 'ip', 'bd', 'pm', 'dealflow']
            },
            {
                img: 'assets/media/leadership/people/04-eli-clark.png',
                alt: 'Eli Clark',
                skills: ['life-sciences', 'ip', 'bd', 'hr', 'dealflow']
            },
            {
                img: 'assets/media/leadership/people/17-reut-dory.png',
                alt: 'Reut Dory',
                skills: ['life-sciences', 'ip', 'bd', 'pm', 'dealflow', 'sales']
            },
            {
                img: 'assets/media/leadership/people/06-henry-chai.png',
                alt: 'Henry Chai',
                skills: ['life-sciences', 'ip', 'bd', 'pm', 'dealflow']
            },
            {
                img: 'assets/media/leadership/people/07-jay-oberay.png',
                alt: 'Jay Oberay',
                skills: ['life-sciences', 'ip', 'bd', 'pm', 'dealflow', 'operation']
            },
            {
                img: 'assets/media/leadership/people/08-dr-naama-kenan.png',
                alt: 'Dr. Naama Kenan',
                skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal']
            },
            {
                img: 'assets/media/leadership/people/09-kelvin-wu.png',
                alt: 'Kelvin Wu',
                skills: ['finance']
            },
            {
                img: 'assets/media/leadership/people/10-leemor-machnai.png',
                alt: 'Leemor Nachnai',
                skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal']
            },
            {
                img: 'assets/media/leadership/people/11-merav-harel.png',
                alt: 'Merav Harel',
                skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal']
            },
            {
                img: 'assets/media/leadership/people/17-reut-dory.png',
                alt: 'Reut Dory',
                skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal']
            },
            {
                img: 'assets/media/leadership/people/13-monin-ung.png',
                alt: 'Monin Ung',
                skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal']
            },
            {
                img: 'assets/media/leadership/people/14-theekshana-kumara.png',
                alt: 'Theekshana Kumara',
                skills: ['finance', 'dealflow', 'taxation']
            },
            {
                img: 'assets/media/leadership/people/15-or-dadosh.png',
                alt: 'Or Dadosh',
                skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal']
            },
            {
                img: 'assets/media/leadership/people/17-reut-dory.png',
                alt: 'Reut Dory',
                skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal']
            },
            {
                img: 'assets/media/leadership/people/17-reut-dory.png',
                alt: 'Reut Dory',
                skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal']
            }
        ],
        skills: {
            'legal': {
                img: 'assets/media/leadership/skills/legal.svg',
                alt: 'Legal',
                color: 'C2C2C2',
                width: null
            },
            'taxation': {
                img: 'assets/media/leadership/skills/taxation.svg',
                alt: 'Taxation',
                color: '7FF88B',
                width: null
            },
            'operation': {
                img: 'assets/media/leadership/skills/operation.svg',
                alt: 'Operation',
                color: 'FBB786',
                width: null
            },
            'technology': {
                img: 'assets/media/leadership/skills/technology.svg',
                alt: 'Technology',
                color: 'A074FF',
                width: 48
            },
            'life-sciences': {
                img: 'assets/media/leadership/skills/life-sciences.svg',
                alt: 'Life Sciences',
                color: '77CEFF',
                width: null
            },
            'ip': {
                img: 'assets/media/leadership/skills/ip.svg',
                alt: 'Intellectual Property',
                color: 'FF6464',
                width: null
            },
            'sales': {
                img: 'assets/media/leadership/skills/sales.svg',
                alt: 'Sales and Marketing',
                color: 'FFF27B',
                width: null
            },
            'bd': {
                img: 'assets/media/leadership/skills/bd.svg',
                alt: 'Business Development',
                color: 'FF7CC3',
                width: null
            },
            'pm': {
                img: 'assets/media/leadership/skills/pm.svg',
                alt: 'Product management and lifecycles',
                color: 'BEED5A',
                width: null
            },
            'hr': {
                img: 'assets/media/leadership/skills/hr.svg',
                alt: 'Profiling and Human Resources',
                color: '59F3D8',
                width: null
            },
            'dealflow': {
                img: 'assets/media/leadership/skills/dealflow.svg',
                alt: 'Network and Dealflow',
                color: 'C3FFB5',
                width: null
            },
            'finance': {
                img: 'assets/media/leadership/skills/finance.svg',
                alt: 'Finance and M&A',
                color: '131313',
                width: null
            }
        }
    }

    constructor(private renderer: Renderer2) {
        this.skillsArray = Object.values(this.media.skills).map(skill => skill);
    }

    ngAfterViewInit(): void {
        const skills = this.skillsTypes.nativeElement.children;
        for (let i = 0, length= this.skillsArray.length; i < length; i++) {
            const { width } = this.skillsArray[i];
            if (width) {
                this.renderer.setStyle(skills[i].firstChild, 'width', `${width}px`);
            }
        }
    }
}