import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'socket.io-client';

import { SOCKET } from './socket';

export interface Message {
  accountId: string;
  userName: string;
  module: string;
  message: string;
}

@Injectable()
export class MessagingService {

  public message$: BehaviorSubject<{ event: string; message: any; } | null> = new BehaviorSubject(null);

  public constructor(@Inject(SOCKET) private readonly socket: Socket) {
  }

  public getConnection(): Socket {
    return this.socket;
  }

  public getNewMessage(msg: string): Observable<any> {
    this.socket.on(msg, message => this.message$.next({ event: msg, message }));

    return this.message$.asObservable();
  }

}
