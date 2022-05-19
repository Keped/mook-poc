import Channel from "./Channel";

const files: string[] = [
    'clav', 
    'bassguitar',
    'drums',
    'horns'
];

class Mixer {
    public audioCtx: AudioContext;
    public channels: Map<string, Channel> = new Map();
    public concertHall: ConvolverNode;
    constructor() {
        this.audioCtx = new AudioContext();
        this.concertHall = this.audioCtx.createConvolver();
        this.concertHall.connect(this.audioCtx.destination);
        for (const fileName of files) {
            let channel = new Channel(this.audioCtx, fileName, this.concertHall);
            this.channels.set(fileName, channel);
        }
    }
    async initAllTracks() {
        // await this.audioCtx.resume()
        let response     = await fetch("assets/church.wav");
        let arraybuffer  = await response.arrayBuffer();
        this.concertHall.buffer = await this.audioCtx.decodeAudioData(arraybuffer);
        this.channels.forEach(async (channel, fileName) => {
            await channel.playChannel(fileName);
        })

    }
}

export default Mixer;