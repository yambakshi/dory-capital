import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoginService } from '@services/login.service';
import { AuthGuard } from '@guards/auth.guard';
import { WindowRefService } from '@services/window-ref.service';
import { ApiService } from '@services/api.service';
import { SocketIoService } from '@services/socket-io.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from '@services/api-interceptor';
import { CookiesService } from '@services/cookies.service';
import { PageDataResolver } from '@resolvers/page-data.resolver';
import { BrowserStateInterceptor } from '@services/browser-state-interceptor';

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
            ],
        };
    }
}