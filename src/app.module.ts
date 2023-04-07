import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Puppeteer } from './puppeteer/puppeteer';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Puppeteer, PdfService],
})
export class AppModule {}
