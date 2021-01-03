import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management-platform',
  templateUrl: './management-platform.component.html',
  styleUrls: [
    './management-platform.component.common.scss',
    './management-platform.component.desktop.scss',
    './management-platform.component.mobile.scss'
  ]
})
export class ManagementPlatformComponent implements OnInit {
    data: {} = {
      about: {
        title: 'Empowering, enabling and investing in Bit2Atom innovative technologies',
        text1: 'Dory Capital was established in 2020, as a fund-of-funds, designed to enable Bit2Atom innovative technologies. We aim to enable and strengthen the execution of projects and start-ups with frontier breakthrough technologies as well as supporting their scope of their efforts to expand their operation globally through our well-established extensive network and ecosystem.',
        text2: 'We invest in people! The entrepreneurs and promising start-ups we focus on are pioneering new frontier visionary technologies. We enable, motivate, inspire, encourage, support and help them in navigating and leveraging on our extensive international experience in order to help them make a leap into international markets. Using our global network and presence in North America, APAC, EMEA that allow us to successfully help and promote our start-ups and early stage ventures.'
      }
    }
    constructor() { }

    ngOnInit(): void {
    }
}