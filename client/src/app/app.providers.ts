import { WindowRefService } from '@services/window-ref.service';
import { ApiService } from '@services/api.service';
import { SocketIoService } from '@services/socket-io.service';

export const APP_PROVIDERS = [
    WindowRefService,
    ApiService,
    SocketIoService
];