import { Video } from "./Video";
import dotenv from 'dotenv';
dotenv.config();

export class VideoCollection{
    public constructor(
        public date:string,
        public camera:1|2,
        public videos:Video[],
    ){}
}

//`${process.env.CLIPS_SUELTOS_PATH}/${fechaFinal}/${(camara === 1) ? 'camara1' : 'camara2'}/${(contador+1<10)?'0':''}${contador+1}.mp4`;
