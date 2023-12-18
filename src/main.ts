import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Callback, Context, Handler } from 'aws-lambda';

import { AppModule } from './app.module';

let server: Handler;
const LOCAL_SERVER_URL = 'http://localhost:4000/dev';

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('CloudX Databases')
    .setDescription('The CloudX databases api documentation')
    .setVersion('1.0')
    .addServer(LOCAL_SERVER_URL)
    .addServer(process.env.DEV_SERVER_URL)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  // app.use(helmet());

  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
event: any,
context: Context,
callback: Callback,
) => {
  server = server ?? (await bootstrap());

  return server(event, context, callback);
};
