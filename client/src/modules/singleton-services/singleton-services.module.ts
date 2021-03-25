import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoginService } from '@services/login.service';
import { AuthGuard } from '@guards/auth.guard';
import { WindowRefService } from '@services/window-ref.service';
import { ApiService } from '@services/api.service';
import { SocketIoService } from '@services/socket-io.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookiesService } from '@services/cookies.service';
import { PageDataResolver } from '@resolvers/page-data.resolver';
import { ApiHttpInterceptor } from '@interceptors/api.interceptor';
import { BrowserStateInterceptor } from '@interceptors/browser-state.interceptor';
import { CookiesInterceptor } from '@interceptors/ssr-cookies.interceptor';

@NgModule({})
export class SingletonServicesModule {
    constructor(@Optional() @SkipSelf() parentModule?: SingletonServicesModule) {
        if (parentModule) {
            throw new Error(
                'SingletonServicesModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders<SingletonServicesModule> {
        return {
            ngModule: SingletonServicesModule,
            providers: [
                WindowRefService,
                ApiService,
                SocketIoService,
                CookiesService,
                PageDataResolver,
                LoginService,
                AuthGuard,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: BrowserStateInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ApiHttpInterceptor,
                    deps: [CookiesService],
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CookiesInterceptor,
                    multi: true
                },
            ],
        };
    }
}