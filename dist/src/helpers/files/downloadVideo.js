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
exports.downloadVideo = void 0;
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("fs/promises");
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
//@ts-ignore
const node_fetch_progress_1 = __importDefault(require("node-fetch-progress"));
dotenv_1.default.config();
const downloadVideo = ({ src, date, counter, camera, multibar }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, node_fetch_1.default)(src);
            const progress = new node_fetch_progress_1.default(response, { throttle: 100 });
            const videoPath = `${process.env.CLIPS_SUELTOS_PATH}/${date}/${(camera === 1) ? 'camara1' : 'camara2'}`;
            const videoName = `${(counter + 1 < 10) ? '0' : ''}${counter + 1}.mp4`;
            const b = multibar.create(100, 0, {}, { format: `${videoName} [{bar}] {percentage}% | expectedTime: {eta}s | {value}/{total}` });
            progress.on('progress', (p) => {
                b.update(Math.round(p.progress * 100));
            });
            const buffer = yield response.buffer();
            fs_1.default.mkdirSync(`${videoPath}`, { recursive: true });
            const fileName = `${videoPath}/${videoName}`;
            yield (0, promises_1.writeFile)(fileName, buffer);
            const video = {
                downloaded: true,
                name: `${counter + 1}.mp4`,
                numberVideo: `${counter + 1}`,
                path: fileName,
                date,
                camera,
            };
            resolve(video);
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    }));
});
exports.downloadVideo = downloadVideo;
//C:\Users\Usuario\Desktop\programacion\Programas\archivo-partidos-nuestros\archivo-partido-nuestros-backend\videos
