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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinksVideosFromPage = exports.selectCamera2 = exports.stopVideo = exports.playVideo = exports.getSrcVideo = void 0;
const getSrcVideo = (page, contador) => __awaiter(void 0, void 0, void 0, function* () {
    const src = yield page.evaluate(() => {
        var _a;
        return (_a = document.getElementById('myvideo')) === null || _a === void 0 ? void 0 : _a.getAttribute('src');
    });
    return src;
});
exports.getSrcVideo = getSrcVideo;
const playVideo = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const elem = yield page.$('#div_centro_play > a > center > i');
    const { x, y } = yield elem.boundingBox();
    yield page.mouse.click(Math.round(x), Math.round(y), { button: 'left', clickCount: 1 });
});
exports.playVideo = playVideo;
const stopVideo = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const elem = yield page.$('#div_centro_play > a > center > i');
    const { x, y } = yield elem.boundingBox();
    yield page.mouse.click(Math.round(x), Math.round(y), { button: 'left', clickCount: 2, delay: 1000 });
});
exports.stopVideo = stopVideo;
const selectCamera2 = (page) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield page.click('button.btn-camara:nth-child(2)');
            resolve();
        }
        catch (error) {
            reject(error);
        }
    }));
});
exports.selectCamera2 = selectCamera2;
const getLinksVideosFromPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    let distanciaAgregadaXLineaTemporal = 48;
    let contador = 0;
    const videos = [];
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        while (contador < 15) {
            yield delay(0.5);
            (0, exports.getSrcVideo)(page, contador)
                .then((src) => {
                videos.push(src);
            })
                .catch(err => reject(err));
            const elem = yield page.$('#myslider2');
            const { x, y } = yield elem.boundingBox();
            yield page.mouse.click((x + distanciaAgregadaXLineaTemporal), y, { button: 'left' });
            distanciaAgregadaXLineaTemporal = distanciaAgregadaXLineaTemporal + 48;
            contador++;
        }
        resolve(videos);
    }));
});
exports.getLinksVideosFromPage = getLinksVideosFromPage;
const delay = (n) => new Promise(r => setTimeout(r, n * 1000));
