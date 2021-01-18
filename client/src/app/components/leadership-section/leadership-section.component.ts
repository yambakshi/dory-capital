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
    @ViewChild('people') people: ElementRef;
    @ViewChild('skillsTypes') skillsTypes: ElementRef;
    title: string = "Leadership";
    skillsArray: any[] = [];
    media = {
        people: [
            { img: '17-reut-dory', alt: 'Reut Dory', skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal'] },
            { img: '02-asaf-eli', alt: 'Asaf Eli', width: 130, skills: ['life-sciences', 'ip', 'bd', 'pm', 'dealflow'] },
            { img: '03-asher-dory', alt: 'Asher Dory', width: 125, skills: ['life-sciences', 'ip', 'bd', 'pm', 'dealflow'] },
            { img: '04-eli-clark', alt: 'Eli Clark', skills: ['life-sciences', 'ip', 'bd', 'hr', 'dealflow'] },
            { img: '05-gavin-cunningham', alt: 'Gavin Cunningham', skills: ['life-sciences', 'ip', 'bd', 'pm', 'dealflow', 'sales'] },
            { img: '06-henry-chai', alt: 'Henry Chai', width: 120, skills: ['life-sciences', 'dealflow'] },
            { img: '07-jay-oberay', alt: 'Jay Oberay', skills: ['life-sciences', 'ip', 'bd'] },
            { img: '08-dr-naama-kenan', alt: 'Dr. Naama Kenan', skills: ['finance', 'dealflow', 'taxation', 'pm', 'bd', 'legal', 'pm', 'pm'] },
            { img: '09-kelvin-wu', alt: 'Kelvin Wu', skills: ['finance'] },
            { img: '10-leemor-machnai', alt: 'Leemor Nachnai', width: 175, skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal', 'legal'] },
            { img: '11-merav-harel', alt: 'Merav Harel', skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal'] },
            { img: '12-michael-steven', alt: 'Michael Steven', skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal'] },
            { img: '13-monin-ung', alt: 'Monin Ung', skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal'] },
            { img: '14-theekshana-kumara', alt: 'Theekshana Kumara', skills: ['finance', 'dealflow', 'taxation'] },
            { img: '15-or-dadosh', alt: 'Or Dadosh', skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal'] },
            { img: '16-andreas-athinodorou', alt: 'Andreas Athinodorou', skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal'] },
            { img: '17-reut-dory', alt: 'Reut Dory', skills: ['finance', 'dealflow', 'taxation', 'pm', 'technology', 'legal'] }
        ],
        skills: {
            'legal': { img: 'legal', alt: 'Legal', color: 'C2C2C2', width: null },
            'taxation': { img: 'taxation', alt: 'Taxation', color: '7FF88B', width: null },
            'operation': { img: 'operation', alt: 'Operation', color: 'FBB786', width: null },
            'technology': { img: 'technology', alt: 'Technology', color: 'A074FF', width: 48 },
            'life-sciences': { img: 'life-sciences', alt: 'Life Sciences', color: '77CEFF', width: null },
            'ip': { img: 'ip', alt: 'Intellectual Property', color: 'FF6464', width: null },
            'sales': { img: 'sales', alt: 'Sales and Marketing', color: 'FFF27B', width: null },
            'bd': { img: 'bd', alt: 'Business Development', color: 'FF7CC3', width: null },
            'pm': { img: 'pm', alt: 'Product management and lifecycles', color: 'BEED5A', width: null },
            'hr': { img: 'hr', alt: 'Profiling and Human Resources', color: '59F3D8', width: null },
            'dealflow': { img: 'dealflow', alt: 'Network and Dealflow', color: 'C3FFB5', width: null },
            'finance': { img: 'finance', alt: 'Finance and M&A', color: 'BDBDBD', width: null }
        }
    }

    constructor(private renderer: Renderer2) {
        this.skillsArray = Object.values(this.media.skills).map(skill => skill);
    }

    ngAfterViewInit(): void {
        const peopleElements = this.people.nativeElement.children;
        for (let i = 0, length = this.media.people.length; i < length; i++) {
            const { width } = this.media.people[i];
            if (width) {
                this.renderer.setStyle(peopleElements[i].firstChild.children[1], 'width', `${width}px`);
            }
        }

        const skills = this.skillsTypes.nativeElement.children;
        for (let i = 0, length = this.skillsArray.length; i < length; i++) {
            const { width } = this.skillsArray[i];
            if (width) {
                this.renderer.setStyle(skills[i].firstChild, 'width', `${width}px`);
            }
        }
    }
}