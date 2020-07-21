import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Controller()
export class AppController {
  @MessagePattern({ cmd: 'ping' })
  ping(_: any) {
    return of('[SERVICE_USER] pong');
  }

  @MessagePattern({ cmd: 'contact' })
  contact(data: object) {
    console.log(data)
    return of('sussess create new contact');
  }
}
