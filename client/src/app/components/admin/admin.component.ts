import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { PageData } from '@models/page-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.common.scss',
    './admin.component.desktop.scss',
    './admin.component.mobile.scss'
  ]
})
export class AdminComponent implements AfterViewInit {
  @ViewChild('headerTabs') headerTabs: ElementRef;
  @ViewChild('tabsLine') tabsLine: ElementRef;
  @ViewChild('sections') sections: ElementRef;
  sectionsTabs: string[] = [];
  selectedTab: number = 0;
  pageData: PageData;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private renderer: Renderer2) {
    this.route.data.subscribe(data => {
      if (!data['pageData']) {
        return;
      }
    });

    this.apiService.getPageDataObservable().subscribe((pageData: PageData) => {
      this.pageData = pageData;
      this.initSectionsHeader();
    });
  }

  ngAfterViewInit(): void {
    this.setTabsLine(this.selectedTab);
    const selectedElement = this.sections.nativeElement.children[this.selectedTab];
    this.renderer.setStyle(selectedElement, 'display', 'flex');
  }

  setTabsLine(i: number): void {
    const selectedTab = this.headerTabs.nativeElement.children[i];
    const tabWidth = selectedTab.offsetWidth;
    const tabLeft = selectedTab.offsetLeft;
    this.renderer.setStyle(this.tabsLine.nativeElement, 'left', `${tabLeft}px`);
    this.renderer.setStyle(this.tabsLine.nativeElement, 'width', `${tabWidth}px`);
  }

  initSectionsHeader(): void {
    this.pageData.sections.forEach(({ name }) => {
      this.sectionsTabs.push(name);
    });
  }

  selectTab(i: number) {
    if (i === this.selectedTab) return;
    const deselectedElement = this.sections.nativeElement.children[this.selectedTab];
    this.renderer.setStyle(deselectedElement, 'display', 'none');
    this.selectedTab = i;
    this.setTabsLine(i);
    const selectedElement = this.sections.nativeElement.children[this.selectedTab];
    this.renderer.setStyle(selectedElement, 'display', 'flex');
  }
}