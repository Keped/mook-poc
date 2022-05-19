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
    const [sessionId, setSessionId] =  useState("init");
    const [searchParams, setSearchParams] = useSearchParams();
    const [playerId, setPlayerId] =  useState("0");
    const token = searchParams.get("token");
    const fetchData = useCallback(async()=>{
            if(sessionId === 'init' && token){
                
                const data = await addParticipant(token);
                setSessionId(data.session);
                setPlayerId(data.id);
            }
    },[sessionId, token]);
    fetchData();
    return(<><Recorder sessionId={sessionId}/></>);
}
export default Joiner