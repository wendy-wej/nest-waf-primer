import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
  return this.appService.getHello();
  }
  /* end of part 1 */

  @Get()
  @Render('home.html')
  getHome(): {} {
  return this.appService.getHome();
    }
 
  @Get('about-us')
  @Render('about-us.html')
  getAboutUs(): {} {
  return this.appService.getAboutUs();
      }

  /**
   * Here we will create another route relative to the controller's base root /
   */
  @Get('hello2')
  @Render('index.html') //indicate the template to render
  getHello2(): {} {
    return this.appService.getHello2(); //the object returned will be passed to the template to render
  }
}
