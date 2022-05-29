import Channel from "./Channel";

// const files: string[] = [
//     'clav', 
//     'bassguitar',
//     'drums',
//     'horns'
// ];

class Mixer {
    public concertHall: ConvolverNode;
    protected splitter?: ChannelSplitterNode;
    protected recorder: MediaRecorder;
    protected recorderDestination: MediaStreamAudioDestinationNode;
    constructor(files:Blob[], 
        protected audioCtx: AudioContext = new AudioContext(), 
        public channels: {file:Blob, channel:Channel}[] = [],
       ) {
        this.recorderDestination = audioCtx.createMediaStreamDestination();
        this.recorder = new MediaRecorder(this.recorderDestination.stream);
        this.concertHall = this.audioCtx.createConvolver();
        this.concertHall.connect(this.audioCtx.destination);
        for (const file of files) {
            let channel = new Channel(this.audioCtx, file, this.concertHall);
            this.channels.push({file, channel});
        }
    }

    async recordAllTracks() {
        await this.playAllTracks(this.recorderDestination);
    }
    async playAllTracks(dest?: MediaStreamAudioDestinationNode) {
        // await this.audioCtx.resume()
        let response     = await fetch("assets/church.wav");
        let arraybuffer  = await response.arrayBuffer();
        this.concertHall.buffer = await this.audioCtx.decodeAudioData(arraybuffer);
        this.channels.forEach(async ({channel, file}) => {
            await channel.playChannel(file, dest);
        });
    }
}

export default Mixer;