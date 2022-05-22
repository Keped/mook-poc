import axios from "axios";
import { Page, PageContent } from "grommet";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../consts";
import PlayersTable from "./PlayersTable";
import SessionButtons from "./SessionButtons";

const ControlPanel: React.FC<{}> = ()=>{
    const [sessionId, setSessionId] = useState("2");
    const statusQuery = useQuery("STATUS", ()=>axios.get(`${BASE_URL}/status/${sessionId}`), {refetchInterval:1_000, enabled: sessionId !== 'init'});
    const participants = statusQuery.data ? statusQuery.data.data['participants'] : [];
    const token = statusQuery.data ? statusQuery.data.data.token: null;
    const phase = statusQuery.data ? statusQuery.data.data.phase: null;
    return (
        <Page kind="narrow">
            <PageContent>
                <SessionButtons token={token} sessionId={sessionId} phase={phase}/>
                <PlayersTable participants={participants} token={token}/>
            </PageContent>
        </Page>);
}   

export default ControlPanel;