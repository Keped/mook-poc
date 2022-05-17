import RecordButton from "../components/RecordButton"
import { useQuery } from "react-query"
import { checkStatus } from "../api/Requests"
import { query } from "express"

const Recorder: React.FC<{}> = () => {
    const statusQuery = useQuery("STATUS", ()=>checkStatus(1), {refetchInterval:1_000})
    return (
        <>
            <div className="App" style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                    <h3>{statusQuery.data!.recordingStartTime}</h3>
                    <h3>{statusQuery.data!.recordingStartTime}</h3>
                    <h3>{statusQuery.data!.recordingStartTime}</h3>

            <RecordButton title="OMG" />
            </div>
        </>)
}

export default Recorder