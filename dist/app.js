"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_progress_1 = __importDefault(require("cli-progress"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const inquirerMenu_1 = require("./src/helpers/inquirer/inquirerMenu");
const getExistingVideos_1 = require("./src/helpers/files/getExistingVideos");
const getDownloadVideoPromises_1 = require("./src/helpers/puppeteer/getDownloadVideoPromises");
const generateVideoList_1 = require("./src/helpers/files/generateVideoList");
const generateCompleteVideo_1 = require("./src/helpers/ffmpeg/generateCompleteVideo");
const generateCompleteVideoWithZoom_1 = require("./src/helpers/ffmpeg/generateCompleteVideoWithZoom");
if (process.argv.length < 4) {
    console.info(`Se utiliza de la siguiente manera: 'node dist/app "fecha" "link"'`);
    console.error(`Falto ingresar la fecha, el link o ambos`);
    console.error(`El formato de la fecha tiene que ser '01-01-2000'`);
    process.exit(0);
}
const date = process.argv[2];
const link = process.argv[3];
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const multibar = new cli_progress_1.default.MultiBar({
        clearOnComplete: false,
        hideCursor: true,
    }, cli_progress_1.default.Presets.shades_grey);
    do {
        console.clear();
        const { option } = yield (0, inquirerMenu_1.inquirerMainMenu)();
        if (option === '0')
            break;
        if (option === '1') {
            const camera = yield (0, inquirerMenu_1.askCamera)();
            const acceptCookies = yield (0, inquirerMenu_1.askAboutCookies)();
            const videos = yield (0, getExistingVideos_1.getExistingVideos)(date, camera);
            const promiseFiles = yield (0, getDownloadVideoPromises_1.getDownloadVideoPromises)({ link,
                camera,
                multibar,
                videosToDownload: videos.map((video) => (!video.downloaded) ? video.numberVideo : '0'),
                date,
                acceptCookies
            });
            yield Promise.all(promiseFiles);
        }
        if (option === '2') {
            const camera = yield (0, inquirerMenu_1.askCamera)();
            const videos = yield (0, getExistingVideos_1.getExistingVideos)(date, camera);
            if (videos.length === 15) {
                const listVideosPath = yield (0, generateVideoList_1.generateVideosList)({ files: videos.map((video) => video.path), camera, date });
                yield (0, generateCompleteVideo_1.generateCompleteVideo)({ camera, listVideosPath, date });
                console.log(ansi_colors_1.default.green('=================================================='));
                console.log(ansi_colors_1.default.cyan(`Partido completo ha sido creado existosamente`));
                console.log(ansi_colors_1.default.green('==================================================\n'));
            }
            else
                console.log('faltan videos para generar el partido completo');
        }
        if (option === '3') {
            const camera = yield (0, inquirerMenu_1.askCamera)();
            const videoName = `${(camera === 1) ? 'camara1.mp4' : 'camara2.mp4'}`;
            const videoPath = `${process.env.PARTIDOS_ENTEROS_PATH}/${date}`;
            const video = {
                camera,
                date,
                downloaded: true,
                name: videoName,
                numberVideo: `${camera}`,
                path: `${videoPath}/${videoName}`
            };
            (0, generateCompleteVideoWithZoom_1.generateVideoWithZoom)({ video, outputFilePath: videoPath });
        }
        yield (0, inquirerMenu_1.pause)();
    } while (true);
});
run();
