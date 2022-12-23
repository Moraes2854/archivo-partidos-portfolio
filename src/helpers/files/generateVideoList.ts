import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

interface Props{
    files:string[],
    camera:1|2,
    date:string
}

export const generateVideosList = ({files, camera, date}:Props):Promise<string> => {
    return new Promise((resolve, reject)=>{
        try {
            const videosPath = `${process.env.CLIPS_SUELTOS_PATH}/${date}/${(camera === 1) ? 'camara1' : 'camara2'}`
            fs.mkdirSync(videosPath, {recursive:true});
            const listFilePath = `${videosPath}/camara${camera}list.txt`;
            let list ="";
            files.forEach(file => {
                list += `file ${file}`
                list += "\n" 
            });
            const writeStream = fs.createWriteStream(listFilePath);
            writeStream.write(list);
            writeStream.end();
            resolve(listFilePath)
        } catch (error) {
            reject(error);
        }
    })
}