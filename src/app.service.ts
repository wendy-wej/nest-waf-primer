import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): {} {
    return {title: 'Home Page'};
    }
  getAboutUs(): {} {
    return {title: 'About Us Page'};
    }
  getHello(): string {
    return 'Hello World!';
  }
  getHello2(): {} {
    return {message: 'Hello World!', title: 'My Greeting App'};
    }
  }

