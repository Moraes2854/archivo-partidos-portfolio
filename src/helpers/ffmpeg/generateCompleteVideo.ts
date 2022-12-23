import fs from 'fs';
import { exec } from 'child_process';
import dotenv from 'dotenv';
import ffmpegPath from 'ffmpeg-static';

import { Video } from '../../models/Video';
dotenv.config();

interface Props{
    camera:1|2,
    date:string,
    listVideosPath:string,
}


export const generateCompleteVideo = ({camera, date, listVideosPath}:Props):Promise<Video> => {
    return new Promise((resolve, reject)=>{
        fs.mkdirSync(`${process.env.PARTIDOS_ENTEROS_PATH}/${date}`,{recursive:true});
        const outputFilePath = `${process.env.PARTIDOS_ENTEROS_PATH}/${date}/camara${camera}.mp4`;
        exec(`${ffmpegPath} -safe 0 -f concat -i ${listVideosPath} -c copy ${outputFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error);
            }
            else{
                const video:Video ={
                    camera,
                    date,
                    downloaded:true,
                    name:`camara${camera}.mp4`,
                    numberVideo:'1',    
                    path:outputFilePath
                } 
                resolve(video);
            }   
        });
    })
}
