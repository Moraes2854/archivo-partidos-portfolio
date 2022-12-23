import { Page, ElementHandle  } from 'puppeteer';

export const dragAndDrop = async(page:Page) => {

    const slider = await page.$('#myslider2') as ElementHandle<Element>;
    console.log('slider:');
    // slider.drag()
    console.log(slider.boundingBox())
    
}