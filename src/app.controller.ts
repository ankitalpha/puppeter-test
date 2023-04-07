import { Controller, Get, Res } from '@nestjs/common';
// import { Puppeteer } from 'puppeteer';
import { AppService } from './app.service';
import { Puppeteer } from './puppeteer/puppeteer';
import { Response } from 'express';
import { PdfService } from './pdf/pdf.service';

@Controller()
export class AppController {
  constructor(private readonly puppeteerProvider: Puppeteer, private pdfService: PdfService) {}

  @Get()
  async getHello(): Promise<string> {
    const browser = await this.puppeteerProvider.getBrowserInstance();
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    const title = await page.pdf();
    await browser.close();
    return `Title: ${title}`;
  }

  @Get('/pdf')
  async generatePdfFromHtmlFile(@Res() res: Response) {

    console.log('I am here');
    const htmlFilePath = './myHtmlFile.html';
    console.log('I am here 1');
    await this.pdfService.generatePdfFromHtmlFile(htmlFilePath);
    console.log('I am here 3');
    return 'PDF generated successfully';
    const pdf = await this.pdfService.generatePdfFromHtmlFile('myHtmlFile.html');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=myPdfFile.pdf');
    res.send(pdf);
  }
}
