import { HomePageComponent } from '@components/home-page/home-page.component';
import { VideoElementComponent } from '@components/video-element/video-element.component';
import { AboutUsSectionComponent } from '@components/sections/about-us-section/about-us-section.component';
import { ContactSectionComponent } from '@components/sections/contact-section/contact-section.component';
import { FaqSectionComponent } from '@components/sections/faq-section/faq-section.component';
import { LeadershipSectionComponent } from '@components/sections/leadership-section/leadership-section.component';
import { ProcessSectionComponent } from '@components/sections/process-section/process-section.component';
import { ScopeSectionComponent } from '@components/sections/scope-section/scope-section.component';
import { WhyUsSectionComponent } from '@components/sections/why-us-section/why-us-section.component';
import { MemberSkillsComponent } from '@components/member-skills/member-skills.component';
import { CarouselsComponent } from '@components/carousels/carousels.component';
import { IntroSectionComponent } from '@components/sections/intro-section/intro-section.component';
import { SafePipe } from '@pipes/safe.pipe';
import { InvestorsComponent } from '@components/sections/investors-section/investors-section.component';
import { InvestorsLoginDialog } from '@components/investors-login-dialog/investors-login.dialog';

export const HOME_PAGE_DECLARATIONS = [
    HomePageComponent,
    VideoElementComponent,
    AboutUsSectionComponent,
    ContactSectionComponent,
    FaqSectionComponent,
    LeadershipSectionComponent,
    ProcessSectionComponent,
    ScopeSectionComponent,
    WhyUsSectionComponent,
    MemberSkillsComponent,
    CarouselsComponent,
    IntroSectionComponent,
    InvestorsComponent,
    SafePipe,
    InvestorsLoginDialog
]