import puppetter from 'puppeteer';
// import { getVideos, seleccionarCamara2 } from '../helpersPagina';
// import { downloadVideo } from './downloadVideo';
import moment from 'moment';
import cliProgress from 'cli-progress';
import { Video } from '../../models/Video';
import { selectCamera2, getLinksVideosFromPage } from './pageActions';
import { downloadVideo } from '../files/downloadVideo';

moment.suppressDeprecationWarnings = true;

interface Props{
    link: string;
    camera: 1 | 2;
    multibar: cliProgress.MultiBar;
    videosToDownload:string[];
    date:string;
    acceptCookies:boolean;
}

export const getDownloadVideoPromises = async ({link, camera, multibar, videosToDownload, date, acceptCookies}:Props):Promise<Promise<Video>[]> => {
    return new Promise(async(resolve, reject) =>{
        try {

            const browser = await puppetter.launch({
                headless:false,
                executablePath:process.env.CLIPS_SUELTOS_PATH,
                ignoreDefaultArgs: ["--mute-audio"] 
            });

            const page = await browser.newPage();

            await page.goto(link);

            console.log('Se abrió el navegador')

            if (acceptCookies){                
                //Accept cookies
                await page.click('button.btn:nth-child(3)', {
                    button:'left',
                    clickCount:1,
                    delay:1000
                });
    
                console.log('Se aceptaron las cookies')
            }

            if (camera === 2) {
                await delay(5);
                await selectCamera2(page); 
                console.log('Se seleccionó la segunda camara')
            }
            // await delay(15)

            const links = await getLinksVideosFromPage(page);
            
            await browser.close();

            console.log(`Se cerró el navegador`)

            const videosPromises:Promise<Video>[] =[];

            links.forEach(async(src, i)=>{
                if(videosToDownload.includes(`${i+1}`))
                videosPromises.push(
                    downloadVideo({src, counter:i, date, camera, multibar})
                );
            });

            resolve(videosPromises!);
        } catch (error) {
            console.log(error);
            reject(error);
        }
        
    })
};

const delay = (n:number) => new Promise( r => setTimeout(r, n*1000));
