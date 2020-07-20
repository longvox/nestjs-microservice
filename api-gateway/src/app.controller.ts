import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping-a')
  pingServiceA() {
    return this.appService.pingServiceA();
  }

  @Get('/ping-b')
  pingServiceB() {
    return this.appService.pingServiceB();
  }

  @Get('/ping-user')
  pingServiceUser() {
    return this.appService.pingServiceUser();
  }

  @Post('/contact-user')
  contactUser() {
    return this.appService.contactServiceUser();
  }
  

  @Get('/ping-all')
  pingAll() {
    return zip(
      this.appService.pingServiceA(),
      this.appService.pingServiceB(),
      this.appService.pingServiceUser(),
    ).pipe(
      map(([pongServiceA, pongServiceB, pongServiceUser]) => ({
        pongServiceA,
        pongServiceB,
        pongServiceUser
      })),
    );
  }
}
