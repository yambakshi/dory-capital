import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageData } from '@models/page-data';
import { ApiService } from '@services/api.service';

@Injectable()
export class PageDataResolver implements Resolve<PageData> {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PageData> {
    return this.apiService.getPageData().pipe(catchError(err => {
      this.router.navigateByUrl('/404');
      return of(null);
    }));
  }
}