import fs from 'fs';
import { exec } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

import { Video } from '../../models/Video';

interface Props{
    video:Video,
    outputFilePath:string
}

export const generateVideoWithZoom = ({ video, outputFilePath }:Props)=>{
    fs.mkdirSync(`${outputFilePath}`, {recursive:true});
    const command = `${ffmpegPath} -i ${video.path} -vf "scale=(iw*sar)*max(1280/(iw*sar)\\,720/ih):ih*max(1280/(iw*sar)\\,720/ih), crop=1280:720" ${outputFilePath}/camara${video.camera}FINAL.mp4`;
    exec(`${command}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        else{
            console.log(stdout);
            return;
        }  
    }) 
}
