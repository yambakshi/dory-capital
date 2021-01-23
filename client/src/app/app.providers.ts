import { WindowRefService } from '@services/window-ref.service';
import { ApiService } from '@services/api.service';
import { SocketIoService } from '@services/socket-io.service';
import { LoginService } from '@services/login.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '@services/http-interceptor';
import { CookiesService } from '@services/cookies.service';
import { AuthGuard } from './guards/auth.guard';
import { CloudinaryService } from '@services/cloudinary.service';
import { PageContentResolver } from '@resolvers/page-content.resolver';

export const APP_PROVIDERS = [
    WindowRefService,
    ApiService,
    SocketIoService,
    LoginService,
    AuthGuard,
    CookiesService,
    CloudinaryService,
    PageContentResolver,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        deps: [CookiesService],
        multi: true
    },
];