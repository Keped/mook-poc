import RecordButton from "../components/RecordButton"
import { useQuery } from "react-query"
import { checkStatus } from "../services/Requests"

const Recorder: React.FC<{}> = () => {
    const statusQuery = useQuery("STATUS", ()=>checkStatus(1), {refetchInterval:1_000})

    return (
        <>
            <div className="App" style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                    <h3>{statusQuery.data!.phase}</h3>

            </div>
        </>)
}

export default Recorder