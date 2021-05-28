import { ConfigService } from '@products-store-ui/configuration';
import { AuthService } from '@products-store-ui/products-auth';
import io, { Socket } from 'socket.io-client';

export const SocketFactory = (authService: AuthService, config: ConfigService): Socket | null => {

  const socket =  io(config.getEnvironment().socketURL, {
    query: { user: `${authService.user.profile.email}` },
    transports: ['websocket'],
  });

  socket.on('connect_error', err => {
    console.log('connect_error due to', err);
  });

  return socket;

};
