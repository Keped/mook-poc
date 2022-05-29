// const INITIAL_EQ

export default class Channel {
    private gainNode: GainNode;
    private panNode: PannerNode;
    private offset: number = 0;
    public gain: number = 1;
    public id:number = Math.random();
    // public sourceName: string;
    private reverb: ConvolverNode;
    private trackSource:AudioBufferSourceNode|null = null;
    private loCut: BiquadFilterNode;
    // private eq: {
    //     Low:BiquadFilterNode,
    //     Mid:BiquadFilterNode,
    //     High: BiquadFilterNode,
    // };
    private audioCtx: AudioContext;

    constructor(audioCtx: AudioContext, file: Blob, reverb: ConvolverNode) {
        this.audioCtx = audioCtx;
        this.gainNode = this.audioCtx.createGain();
        this.panNode = this.audioCtx.createPanner();
        this.reverb = reverb;
        // this.sourceName = fileName;
        this.loCut = this.audioCtx.createBiquadFilter();
        this.loCut.type = "highshelf";
        this.loCut.frequency.value = 40;
        this.loCut.gain.value = -6;
    }
    public getGain(): number {
        return this.gain;
    }
   onGainInput = (gain: number) =>{
        this.gain = gain;
        this.gainNode.gain.value = gain;
        console.log(`should change gain to ${gain}`)
        return this;
    }
    public onPanInput(gain: number) {
        this.panNode.positionX.value = gain;
    }
    onConnectLocut = () =>{
        this.trackSource?.disconnect(this.gainNode);
        this.trackSource?.connect(this.loCut);
        this.loCut.connect(this.gainNode);
    }
    onDisonnectLocut = () =>{
        this.trackSource?.disconnect(this.loCut);
        this.loCut.disconnect(this.gainNode);
        this.trackSource?.connect(this.gainNode);
    }
    onConnectReverb = () =>{
            this.gainNode.connect(this.reverb)
    }
    onDisonnectReverb=()=>{
            this.gainNode.disconnect(this.reverb)
    }
    getFile = async (file: Blob) => {
        try {
            const audioBuffer = await this.audioCtx.decodeAudioData(await file.arrayBuffer());
            return audioBuffer;
        } catch (e: any) { 
            console.error(e.message);
            return null;
         }
    }

    async playChannel(file: Blob, dest?: MediaStreamAudioDestinationNode) {
        
        this.trackSource = this.audioCtx.createBufferSource();
        this.getFile(file).then(audioBuffer=>{
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            this.trackSource!.buffer = audioBuffer!;
            this.trackSource!.connect(this.gainNode);
            this.gainNode.connect(this.panNode);
            this.panNode.connect(this.audioCtx.destination);
            if(dest){
                this.panNode.connect(dest);
            }

            this.offset = this.audioCtx.currentTime;
            // console.log(`Playing '${filePath}', offset is ${this.offset}`)
            if (this.offset === 0) {
                this.trackSource!.start();
    
            } else {
                this.trackSource!.start(0,  this.offset);
            }
        })

    }
}