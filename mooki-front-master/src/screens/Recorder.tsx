import RecordButton from "../components/RecordButton"
import { useQuery } from "react-query"
import { checkStatus } from "../services/Requests"
import { useState } from "react"

const Recorder: React.FC<{}> = () => {

    const [sessionId, setSessionId] =  useState(2);
    const [clientState, setClientState] =  useState("IDLE");
    const statusQuery = useQuery("STATUS", ()=>checkStatus(sessionId), {refetchInterval:1_000})

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