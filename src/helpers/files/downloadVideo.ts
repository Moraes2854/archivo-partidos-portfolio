import fs from 'fs';
import { writeFile } from 'fs/promises'
import fetch from 'node-fetch';
import cliProgress from 'cli-progress';
import dotenv from 'dotenv';
//@ts-ignore
import Progress from 'node-fetch-progress';
import { Video } from '../../models/Video';
dotenv.config();

interface Props{
    src:string, 
    counter:number, 
    date:string, 
    camera:1|2,
    multibar: cliProgress.MultiBar;
}
export const downloadVideo  = async({src, date, counter, camera, multibar}:Props):Promise<Video>=>{

    return new Promise(async(resolve, reject) =>{
        try {
            const response = await fetch(src);
            const progress = new Progress(response, { throttle: 100 });
            const videoPath = `${process.env.CLIPS_SUELTOS_PATH}/${date}/${(camera === 1) ? 'camara1' : 'camara2'}`;
            const videoName = `${(counter+1<10)?'0':''}${counter+1}.mp4`;
            const b = multibar.create(100 , 0, {}, {format:`${videoName} [{bar}] {percentage}% | expectedTime: {eta}s | {value}/{total}`});
            progress.on('progress', (p:any) => {
                b.update(Math.round(p.progress*100));
            });
            const buffer = await response.buffer();
            fs.mkdirSync(`${videoPath}`,{recursive:true});
            const fileName = `${videoPath}/${videoName}`;
            await writeFile(fileName, buffer);
            const video:Video = {
                downloaded:true,
                name:`${counter+1}.mp4`,
                numberVideo:`${counter+1}`,
                path:fileName,
                date,
                camera,
            };
            resolve(video);
        } catch (error) {
            console.log(error);
            reject(error);
        }
        
    })

}

//C:\Users\Usuario\Desktop\programacion\Programas\archivo-partidos-nuestros\archivo-partido-nuestros-backend\videos