import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_A') private readonly clientServiceA: ClientProxy,
    @Inject('SERVICE_B') private readonly clientServiceB: ClientProxy,
    @Inject('SERVICE_USER') private readonly clientServiceUser: ClientProxy,
  ) {}

  pingServiceA() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((message: any) => ({ message, duration: Date.now() - startTs })),
      );
  }

  pingServiceB() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe(
        map((message: any) => ({ message, duration: Date.now() - startTs })),
      );
  }
  
  pingServiceUser() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceUser
      .send<string>(pattern, payload)
      .pipe(
        map((message: any) => ({ message, duration: Date.now() - startTs })),
      );
  }

  contactServiceUser(phone: string, email: string) {
    const startTs = Date.now();
    const pattern = { cmd: 'contact' };
    const payload = {
      email,
      phone
    };
    return this.clientServiceUser
      .send<string>(pattern, payload)
      .pipe(
        map((message: any) => ({ message, duration: Date.now() - startTs })),
      );
  }
}
