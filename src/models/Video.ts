export class Video{
    public constructor(
        public name: string,
        public date: string,
        public path: string,
        public downloaded:boolean,
        public numberVideo:string,
        public camera:number
    ){}
}