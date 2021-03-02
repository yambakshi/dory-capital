import { WindowRefService } from '@services/window-ref.service';
import { ApiService } from '@services/api.service';
import { SocketIoService } from '@services/socket-io.service';
import { LoginService } from '@services/login.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from '@services/api-interceptor';
import { CookiesService } from '@services/cookies.service';
import { AuthGuard } from '@guards/auth.guard';
import { PageDataResolver } from '@resolvers/page-data.resolver';
import { BrowserStateInterceptor } from '@services/browser-state-interceptor';

export const APP_PROVIDERS = [
    WindowRefService,
    ApiService,
    LoginService,
    SocketIoService,
    AuthGuard,
    CookiesService,
    PageDataResolver,
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
];