import RecordButton from "../components/RecordButton"
import { useQuery } from "react-query"
import { addParticipant, checkStatus } from "../services/Requests"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
const Recorder: React.FC<{}> = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sessionId, setSessionId] =  useState("init");
    const [playerId, setPlayerId] =  useState("init");
    
    const [clientState, setClientState] =  useState("NOT_CONNECTED_YET");
    const statusQuery = useQuery("STATUS", ()=>checkStatus(sessionId), {refetchInterval:1_000, enabled: sessionId !== 'init'})
    const token = searchParams.get("token")
    useEffect(()=>{
        async function fetch(){
            if(sessionId === 'init' && token){
                
                const {id, session} = await addParticipant(token);
                setSessionId(session);
                setPlayerId(id);
            }
        }
        fetch();
    },[sessionId])
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

export default Recorder