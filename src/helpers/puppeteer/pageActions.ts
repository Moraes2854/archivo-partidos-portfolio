import puppetter, { Page } from "puppeteer";

export const getSrcVideo = async(page:Page, contador:number)=>{
    const src = await page.evaluate(()=>{
        return document.getElementById('myvideo')?.getAttribute('src');
    });
    return (src as string);
}

export const playVideo = async(page:Page)=>{
    const elem = (await page.$('#div_centro_play > a > center > i') as puppetter.ElementHandle<Element>);
    const {x, y} = (await elem.boundingBox() as  puppetter.BoundingBox);
    await page.mouse.click(Math.round(x), Math.round(y), {button:'left', clickCount:1});
}

export const stopVideo = async(page:Page)=>{
    const elem = (await page.$('#div_centro_play > a > center > i') as puppetter.ElementHandle<Element>);
    const {x, y} = (await elem.boundingBox() as  puppetter.BoundingBox);
    await page.mouse.click(Math.round(x), Math.round(y), {button:'left', clickCount:2, delay:1000});
}

export const selectCamera2 = async(page:Page):Promise<void>=>{
    return new Promise(async(resolve, reject)=>{
        try {
            await page.click('button.btn-camara:nth-child(2)')
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}


export const getLinksVideosFromPage = async(page:Page):Promise<string[]>=>{
    let distanciaAgregadaXLineaTemporal = 48;
    let contador = 0;
    const videos:string[] = [];

    return new Promise(async(resolve, reject) =>{
        while(contador<15){
            await delay(0.5);
            getSrcVideo(page, contador)
            .then((src)=>{
                videos.push(src)
            })
            .catch(err=>reject(err));
            const elem = (await page.$('#myslider2') as puppetter.ElementHandle<Element>);
            const {x, y} = (await elem.boundingBox() as  puppetter.BoundingBox);
            await page.mouse.click((x+distanciaAgregadaXLineaTemporal), y, {button:'left'});
            distanciaAgregadaXLineaTemporal = distanciaAgregadaXLineaTemporal+48;
            contador++;
            
        }
        resolve(videos);
    });
    
}

const delay = (n:number) => new Promise( r => setTimeout(r, n*1000));


