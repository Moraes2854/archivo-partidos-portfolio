import fs from 'fs';
import { Video } from '../../models/Video';

export const getExistingVideos = async(date:string, camera:1|2):Promise<Video[]>=>{
    const videosPath = `${process.env.CLIPS_SUELTOS_PATH}/${date}/${(camera === 1) ? 'camara1' : 'camara2'}`;
    return new Promise(async(resolve)=>{
        const videos:Video[] =[];

        for(let i=1; i<=15; i++){
            let downloaded = false;
            if (await checkFileExist(`${videosPath}/${(i<10)?'0':''}${i}.mp4`)) downloaded = true;
            videos.push({
                name:`${(i<10)?'0':''}${i}.mp4`,
                path:`${videosPath}/${(i<10)?'0':''}${i}.mp4`,
                date,
                downloaded,
                numberVideo:`${i}`,
                camera,
            });
        }
        resolve(videos);
    })
}

const checkFileExist = async(path:string, timeout = 2000):Promise<boolean>=>{
    let totalTime = 0; 
    let checkTime = timeout / 10;

    return await new Promise((resolve, reject) => {
        const timer = setInterval(function() {

            totalTime += checkTime;
    
            const fileExists = fs.existsSync(path);
    
            if (fileExists || totalTime >= timeout) {
                clearInterval(timer);
                resolve(fileExists);
            }
        }, checkTime);
    });

}