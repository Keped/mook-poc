
import { upload } from '../services/Uploader'

export class MookyRecorder {
    constructor(private mediaRecorder: MediaRecorder){
        console.log("data listener is on")
        this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
          console.log('blobe event', e)
          let chunks = []
          chunks.push(e.data);
          const blob: any = new Blob(chunks, { 'type': 'audio/wav; codecs=opus' });
          // upload(blob).then(()=>{});
         }
    
        mediaRecorder.onstop = function (e: Event) {
          console.log("recorder stopped", e)
    
        }
    }   
}

<<<<<<< HEAD
 const mediaDeviceFactory = async ()=> {
=======
const mediaDeviceFactory = async ()=> {
>>>>>>> b1479357d89d4651b399c3922e8cd8525caae48b
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        return navigator.mediaDevices.getUserMedia(
          {
            audio: true
          })
          .then((stream) => {
            console.log('getUserMedia supported on your browser!!!!!!', stream);
            const mediaRecorder = new MediaRecorder(stream);
            return new MookyRecorder(mediaRecorder);
          })
    }
}

const mookiton = await mediaDeviceFactory();
export default mookiton;
