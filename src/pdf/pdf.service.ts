import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class PdfService {
  async generatePdfFromHtmlFile(filePath: string) {
    console.log('I am here 4');
    const html = fs.readFileSync(filePath, 'utf8');
    console.log(html);
    console.log('I am here 5');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log('I am here 6');
    // const filePath = join(__dirname, filename);
    // console.log(filePath);
    // const fileUrl = `file://${filePath}`;


    // await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    // const pdf = await page.pdf();
        // add header and footer to every page
        const headerTemplate = '<div style="font-size: 12px; font-family: Arial, sans-serif; font-weight: bold; padding: 10px 0;background-color: #2915c0;">My Header</div>';
        const footerTemplate = '<div style="font-size: 10px; font-family: Arial, sans-serif; padding: 10px 0;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>';

    console.log('I am here 7');
    await page.setContent(html, { waitUntil: 'networkidle0' });
    console.log('I am here 8');
    const pdfFilePath = path.join(process.cwd(), `test.pdf`);
    console.log('I am here 9');
    const pdf = await page.pdf({path: pdfFilePath, format: 'A4', printBackground: true,      displayHeaderFooter: true,
    headerTemplate: headerTemplate,
    footerTemplate: footerTemplate,});
    
    console.log('I am here 10');
    await browser.close();
    // return pdf;
  }
}
