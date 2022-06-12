import React, { useCallback, useEffect, useState  } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';
import { addParticipant, checkStatus } from "../services/Requests";
import { upload } from '../services/Uploader'
import AudioRecord from 'react-native-audio-record';
import { useQuery } from "react-query"
import {request, PERMISSIONS} from 'react-native-permissions';
import { Buffer } from 'buffer';

const RECORDING = 'REDCORDING'
const IDLE = 'IDLE'
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;


const RecorderScreen: React.FC<{ sessionId: string, data: object, playerId:string }> = ({ sessionId, playerId }) => {

  const [myBlob, setBlob] = useState()
  const [startTime, setStartTime] = useState(new Date)
  const [offSet, setOffSet] = useState(Number)

  const options = {
    sampleRate: 16000,  // default 44100
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only (see below)
    wavFile: 'tester.wav' // default 'audio.wav'
  };


  useEffect(() => {
    request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {

      console.log('permission res', result)
      AudioRecord.init(options);
  
  
    });
  
  }, []);

  // const { status, startRecording, stopRecording } =
  // useReactMediaRecorder({ 
  //     audio: true,
  //     onStop: (blobUrl: string, blob: Blob) =>{
  //         console.log('url', blobUrl)
  //         setBlob(blob)}
  // });

  const [clientState, setClientState] = useState("NOT_CONNECTED_YET");
  const statusQuery = useQuery("STATUS", () => checkStatus(sessionId), { refetchInterval: 1_000, enabled: sessionId !== 'init' })

  // useEffect(() => {
  //     console.log('blob', myBlob)
  //     if(myBlob) { 
  //         upload(myBlob, startTime, playerId, sessionId, offSet).then(()=>{}) 
      
  //     } 
  // }, [myBlob]);



  useEffect(() => {
      if (statusQuery?.data?.recordingStartTime) {
          setStartTime(new Date(statusQuery.data.recordingStartTime as unknown as string))
      }

      if (statusQuery.data) {
          if (statusQuery.data.phase !== clientState) {
              setClientState(statusQuery.data.phase as unknown as string);
          }
      }
  }, [statusQuery.data]);

   useEffect(() => {


      if (clientState === RECORDING) {
          let currenTime = new Date
          setOffSet(currenTime.getTime() - startTime.getTime())

          AudioRecord.start();
          AudioRecord.on('data', data => {
            const chunk: any = Buffer.from(data, 'base64');
          });
        }

      else if (clientState === IDLE) {
          console.log('stop!!!')
          AudioRecord.stop().then(file => {
          // upload(file, startTime, playerId, sessionId, offSet )
          });
        }

   }, [clientState]);


  if (statusQuery.data) {
      if (statusQuery.data.phase !== clientState) {
          setClientState(statusQuery.data.phase as unknown as string);
      }
  }

  

  return (
      <>
          <View  style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
              <Text>{clientState}</Text>
          </View>
      </>)

  

};

const Joiner: React.FC<{}> = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const token = "21uhh" //searchParams.get("token");
  const playerId = "9" //searchParams.get("player");
  const session = "5" //searchParams.get("session");
  const data = {
      playerId: playerId,
      sessionId : session
  }
  return (<>{session ? <RecorderScreen sessionId={session} data={data} playerId={playerId}/> : <Text>OOPS</Text>}</>);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
    
  }
});

export default Joiner;
