import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'ping' })
  ping(_: any) {
    return of('[SERVICE_B] pong').pipe(delay(2000));
  }
}
