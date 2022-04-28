import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./fireConf";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const db = initializeApp(firebaseConfig);
  await app.listen(3000);
}

bootstrap();
