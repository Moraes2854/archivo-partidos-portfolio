"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoWithZoom = void 0;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const generateVideoWithZoom = ({ video, outputFilePath }) => {
    fs_1.default.mkdirSync(`${outputFilePath}`, { recursive: true });
    const command = `ffmpeg -i ${video.path} -vf "scale=(iw*sar)*max(1280/(iw*sar)\\,720/ih):ih*max(1280/(iw*sar)\\,720/ih), crop=1280:720" ${outputFilePath}/camara${video.camara}FINAL.mp4`;
    (0, child_process_1.exec)(`${command}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        else {
            console.log(stdout);
            return;
        }
    });
};
exports.generateVideoWithZoom = generateVideoWithZoom;
//-vf "scale=(iw*sar)*max(1280/(iw*sar)\,720/ih):ih*max(1280/(iw*sar)\,720/ih), crop=1280:720"
//ffmpeg -i C:\Users\Usuario\Desktop\programacion\Programas\archivo-partidos-nuestros\archivo-partido-nuestros-backend\videos\clips-sueltos\08-06-2022\camara1\01.mp4 -vf "scale=(iw*sar)*max(1280/(iw*sar)\,720/ih):ih*max(1280/(iw*sar)\,720/ih), crop=1280:720" C:\Users\Usuario\Desktop\programacion\Programas\archivo-partidos-nuestros\archivo-partido-nuestros-backend\videos\clips-sueltos\08-06-2022\camara1\01zoom.mp4
//ffmpeg -i C:\Users\Usuario\Desktop\programacion/Programas/archivo-partidos-nuestros/archivo-partido-nuestros-backend/videos/clips-sueltos/08-06-2022/camara1/05.mp4 -vf "scale=(iw*sar)*max(1280/(iw*sar)\,720/ih):ih*max(1280/(iw*sar)\,720/ih), crop=1280:720" C:/Users/Usuario/Desktop/programacion/Programas/archivo-partidos-nuestros/archivo-partido-nuestros-backend/videos/clips-sueltos/08-06-2022/camara1/01zoom.mp4
