
import '../App.css';
import { useState, useEffect } from 'react';
import RecordButton from '../components/RecordButton';
import { checkStatus, uploadRecord } from '../services/Requests';
import {upload} from '../services/Uploader';

const height = window.innerHeight - 20


const JoinScreen: React.FC<{}> = () => {

  const [title, setTitle] = useState<string | number>('get ready')
  const [urlValue, setUrlValue] = useState<string | undefined>()
  let updatedAt: string
  // const fileName = `recording${Math.floor(Math.random() * 1000)}.wav`;



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
    </div>
  );
}

export default JoinScreen;