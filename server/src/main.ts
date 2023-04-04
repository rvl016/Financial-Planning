import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import PrismaService from './db-service/prisma.service';
import { GraphModule } from "nestjs-graph";

declare const module: any;

export const isDevelopment = process.env.NODE_ENV == 'Development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: Logger,
  });

  app.useGlobalPipes(new ValidationPipe());

  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  new GraphModule(app).serve("/graph", app.getHttpAdapter());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(5001);
}

bootstrap();
