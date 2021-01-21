import { Injectable } from '@angular/core';
import { PageContent } from '@models/page-content';

@Injectable()
export class PageContentService {
    pageContent: PageContent;

    constructor() { }

    setPageContent(pageContent: PageContent): void {
        this.pageContent = pageContent;
    }
}