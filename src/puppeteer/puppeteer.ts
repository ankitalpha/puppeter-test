import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class Puppeteer {
    public async getBrowserInstance(): Promise<puppeteer.Browser> {
        const browser = await puppeteer.launch();
        return browser;
      }
}

