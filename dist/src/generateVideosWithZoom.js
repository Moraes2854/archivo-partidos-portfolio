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
exports.generateVideoWithZoomPromise = void 0;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const generateVideoWithZoomPromise = ({ video, outputFilePath }) => {
    fs_1.default.mkdirSync(`${outputFilePath}`, { recursive: true });
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const command = `ffmpeg -i ${video.path} -vf "scale=(iw*sar)*max(1280/(iw*sar)\\,720/ih):ih*max(1280/(iw*sar)\\,720/ih), crop=1280:720" ${outputFilePath}/${video.numberVideo}zoom.mp4`;
            resolve(() => {
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
            });
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.generateVideoWithZoomPromise = generateVideoWithZoomPromise;
//-vf "scale=(iw*sar)*max(1280/(iw*sar)\,720/ih):ih*max(1280/(iw*sar)\,720/ih), crop=1280:720"
//ffmpeg -i C:\Users\Usuario\Desktop\programacion\Programas\archivo-partidos-nuestros\archivo-partido-nuestros-backend\videos\clips-sueltos\08-06-2022\camara1\01.mp4 -vf "scale=(iw*sar)*max(1280/(iw*sar)\,720/ih):ih*max(1280/(iw*sar)\,720/ih), crop=1280:720" C:\Users\Usuario\Desktop\programacion\Programas\archivo-partidos-nuestros\archivo-partido-nuestros-backend\videos\clips-sueltos\08-06-2022\camara1\01zoom.mp4
//ffmpeg -i C:\Users\Usuario\Desktop\programacion/Programas/archivo-partidos-nuestros/archivo-partido-nuestros-backend/videos/clips-sueltos/08-06-2022/camara1/05.mp4 -vf "scale=(iw*sar)*max(1280/(iw*sar)\,720/ih):ih*max(1280/(iw*sar)\,720/ih), crop=1280:720" C:/Users/Usuario/Desktop/programacion/Programas/archivo-partidos-nuestros/archivo-partido-nuestros-backend/videos/clips-sueltos/08-06-2022/camara1/01zoom.mp4
