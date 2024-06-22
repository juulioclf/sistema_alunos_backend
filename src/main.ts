import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerService } from './config/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  new SwaggerService().init(app);

  app.enableShutdownHooks();
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(3000);
}
bootstrap();
