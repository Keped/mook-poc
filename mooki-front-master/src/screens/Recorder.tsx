import RecordButton from "../components/RecordButton"
import { useQuery } from "react-query"
import { addParticipant, checkStatus } from "../services/Requests"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
const Recorder: React.FC<{sessionId: string}> = ({sessionId}) => {

    
    const [clientState, setClientState] =  useState("NOT_CONNECTED_YET");
    const statusQuery = useQuery("STATUS", ()=>checkStatus(sessionId), {refetchInterval:1_000, enabled: sessionId !== 'init'})
    
    
    if (statusQuery.data){
        if(statusQuery.data.phase !== clientState){
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

const Joiner: React.FC<{}>=()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const playerId = searchParams.get("player");
    const session = searchParams.get("session");
   
    return(<>{session ? <Recorder sessionId={session}/>:<h3>OOPS</h3>}</>);
}
export default Joiner