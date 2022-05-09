
import '../App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import RecordButton from '../components/RecordButton';
import SimpleFileUpload from 'react-simple-file-upload';
import { checkStatus, uploadRecord } from '../api/Requests';
import uploader from '../api/Uploader';

const height = window.innerHeight - 20

let  mediaRecorder: MediaRecorder | undefined = undefined

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');
  navigator.mediaDevices.getUserMedia(
    {
      audio: true
    })

    // Success callback
    .then((stream) => {
      console.log('getUserMedia  supported on your browser!!!!!!', stream);
      mediaRecorder = new MediaRecorder(stream);
      // setMediaRecorder(myMediaRecorder)
    })

    // Error callback
    .catch((err) => {
      console.log('The following getUserMedia error occurred: ' + err);
    }
    );
} else {
  console.log('getUserMedia not supported on your browser!');
}


const JoinScreen: React.FC<{}> = () => {

  const [title, setTitle] = useState<string | number>('get ready')
  const [urlValue, setUrlValue] = useState<string | undefined>()
  let updatedAt: string
  const fileName = `recording${Math.floor(Math.random() * 1000)}.wav`;


  if (mediaRecorder !== undefined) {
    console.log("data listener is on")
    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      console.log('blobe event', e)
      let chunks = []
      chunks.push(e.data);
      const blob: any = new Blob(chunks, { 'type': 'audio/wav; codecs=opus' });
      uploader.upload(blob).then(()=>{});
     }

    mediaRecorder.onstop = function (e: Event) {
      console.log("recorder stopped", e)

    }

  }

  const doCheckStatus = () => {

    checkStatus(1).then((res: any) => {
      console.log('status res', res)
      if (res.isRecording && mediaRecorder?.state === 'inactive') {
          // mediaRecorder?.start();
          // setTitle('recording')
          console.log('recorder state: ', mediaRecorder?.state);
        } 
      else if (!res.isRecording && mediaRecorder?.state === 'recording') {
          // mediaRecorder?.start();
          // setTitle('get ready')
          console.log('recorder state: ', mediaRecorder?.state);
        }
              
    })
  }
  
  useEffect(() => {

      // setInterval(doCheckStatus, 10000)

  }, []);



  // useEffect(() => {


  // }, []);



  const handleClick = () => {

    if (mediaRecorder?.state === 'recording') {
      mediaRecorder?.stop();
      setTitle('start')
      console.log('recorder state: ', mediaRecorder?.state);
    } else {
      mediaRecorder?.start();
      setTitle('stop')
      console.log('recorder state: ', mediaRecorder?.state);
    }
  }
  const handleUpload = (url: string) => {
    console.log('upload url', url)
    let obj = {
      sessionId:1,
      token:1,
      requestedStartTime: updatedAt
    }
    uploadRecord(obj)
  }


  return (
    <div className="App" style={{ height: height, flexDirection: 'column', justifyContent: 'space-around' }}>
            <h3>{urlValue}</h3>

      <RecordButton title={title} handleClick={handleClick} />
      {/* <form action="submit">
            <input name="avatar_url" id="avatar_url" className="simple-file-upload" />
        </form> */}
        <SimpleFileUpload
              apiKey="74a2801c3f59c6102373f6b55c828dad"
              onSuccess={handleUpload}
              preview="false"
            />
    </div>
  );
}

export default JoinScreen;