import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Let's make it a NestExpressApplication
import {NestExpressApplication} from '@nestjs/platform-express';

//We need join to synthesize the directory path which will contain templates
import {join} from 'path';

//We need nunjucks as render engine
import* as nunjucks from 'nunjucks';

async function bootstrap(){

  //create a Nest application with Express under the hood.
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  //To associate nunjucks with express, we need to get the underlying express platform from Nest platform
  const express = app.getHttpAdapter().getInstance();

  //We also need to get directory name views (create it in project root directory), which is the root directory for our template files.
  const views = join(__dirname, '..', 'views');

  //Finally conjure nunjucks, setting views and express declared above.
  nunjucks.configure(views, {express});

  //Let's indicate where the static files like CSS are.
  const staticAssets = join(__dirname, '..', 'static');
  //Make the static folder available for app use
  app.useStaticAssets(staticAssets);

 
  //start the application
  await app.listen(3000);
}

/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
*/
bootstrap();
