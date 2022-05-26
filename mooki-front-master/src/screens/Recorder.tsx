import RecordButton from "../components/RecordButton"
import { useQuery } from "react-query"
import { addParticipant, checkStatus } from "../services/Requests"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useReactMediaRecorder } from "react-media-recorder";
import { upload } from '../services/Uploader'
const RECORDING = 'REDCORDING'
const IDLE = 'IDLE'


const Recorder:  React.FC<{ sessionId: string, data: object, playerId:string }> = ({ sessionId, data, playerId }) => {
    const [myBlob, setBlob] = useState(null)
    const [startTime, setStartTime] = useState(new Date)

    const { status, startRecording, stopRecording, mediaBlobUrl} =
    useReactMediaRecorder({ 
        audio: true,
        onStop: (blobUrl: string, blob: Blob) =>{
            console.log('url', blobUrl)
            setBlob(blob)}
    });

    const [clientState, setClientState] = useState("NOT_CONNECTED_YET");
    const statusQuery = useQuery("STATUS", () => checkStatus(sessionId), { refetchInterval: 1_000, enabled: sessionId !== 'init' })
    
    console.log('clientState', clientState, "status", status)

    useEffect(() => {
        console.log('blob', myBlob)
        if(myBlob) { 
            upload(myBlob, startTime, playerId, sessionId).then(()=>{}) 
        
        } 
    }, [myBlob]);

    useEffect(() => {
        if (clientState === RECORDING && status !== 'recording') {
            console.log('start!!!')
            setStartTime(new Date(statusQuery.data.recordingStartTime as unknown as string))
            startRecording()
        }
        else if (clientState === IDLE && status === 'recording') {
            console.log('stop!!!')
            stopRecording()
        }
    }, [clientState]);


    if (statusQuery.data) {
        if (statusQuery.data.phase !== clientState) {
            setClientState(statusQuery.data.phase as unknown as string);
        }
    }
    return (
        <>
            <div className="App" style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                <h3>{clientState}</h3>

            </div>
        </>)
}

const Joiner: React.FC<{}> = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const playerId = searchParams.get("player");
    const session = searchParams.get("session");
    const data = {
        playerId: playerId,
        sessionId : session
    }
    return (<>{session ? <Recorder sessionId={session} data={data} playerId={playerId}/> : <h3>OOPS</h3>}</>);
}
export default Joiner