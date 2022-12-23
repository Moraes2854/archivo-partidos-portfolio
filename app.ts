import cliProgress from 'cli-progress';
import colors from 'ansi-colors';

import { inquirerMainMenu, askCamera, pause, askAboutCookies } from './src/helpers/inquirer/inquirerMenu';
import { getExistingVideos } from './src/helpers/files/getExistingVideos';
import { getDownloadVideoPromises } from './src/helpers/puppeteer/getDownloadVideoPromises';
import { generateVideosList } from './src/helpers/files/generateVideoList';
import { generateCompleteVideo } from './src/helpers/ffmpeg/generateCompleteVideo';
import { generateVideoWithZoom } from './src/helpers/ffmpeg/generateCompleteVideoWithZoom';
import { Video } from './src/models/Video';

if (process.argv.length < 4) {
    console.info(`Se utiliza de la siguiente manera: 'node dist/app "fecha" "link"'`);
    console.error(`Falto ingresar la fecha, el link o ambos`);
    console.error(`El formato de la fecha tiene que ser '01-01-2000'`);
    process.exit(0)
}

const date = process.argv[2];
const link = process.argv[3];


const run = async() => {
    const multibar = new cliProgress.MultiBar({
        clearOnComplete:false,
        hideCursor:true,
    }, cliProgress.Presets.shades_grey);


    do{
        console.clear();
        const { option } = await inquirerMainMenu();
        
        if ( option === '0' ) break;

        if ( option === '1' ){
            const camera = await askCamera();
            const acceptCookies = await askAboutCookies();
            const videos = await getExistingVideos(date, camera);
            
            const promiseFiles = await getDownloadVideoPromises({link, 
                camera, 
                multibar, 
                videosToDownload:videos.map((video)=>(!video.downloaded) ? video.numberVideo: '0'), 
                date,
                acceptCookies
            });

            await Promise.all(promiseFiles);
        }

        if ( option === '2' ){
            const camera = await askCamera();
            const videos = await getExistingVideos(date, camera);
            if ( videos.length === 15 ){
                const listVideosPath = await generateVideosList({files:videos.map((video)=>video.path), camera, date});
                await generateCompleteVideo({camera, listVideosPath, date});
                console.log(colors.green('=================================================='));
                console.log(colors.cyan(`Partido completo ha sido creado existosamente`));
                console.log(colors.green('==================================================\n'));
            }
            else console.log('faltan videos para generar el partido completo');
        }

        if ( option === '3' ){
            const camera = await askCamera();
            const videoName = `${(camera === 1) ? 'camara1.mp4' : 'camara2.mp4'}`
            const videoPath=`${process.env.PARTIDOS_ENTEROS_PATH}/${date}`;
            const video:Video={
                camera,
                date,
                downloaded:true,
                name:videoName,
                numberVideo:`${camera}`,
                path:`${videoPath}/${videoName}`
    
            };
            generateVideoWithZoom({video, outputFilePath:videoPath});
        }

        await pause();

    }while (true)

}

run();