import axios from "axios";
import { Button, Header, Page, PageContent, Paragraph } from "grommet";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../consts";
import { ButtonsRow } from "./ButtonStyles";
import PlayersTable from "./PlayersTable";
import RecordingButtons from "./RecordingButtons";

const ControlPanel: React.FC<{}> = ()=>{
    const [sessionId, setSessionId] = useState("init");
    const [token, setToken] = useState("init");
    const [phase, setPhase] = useState("IDLE");
    const statusQuery = useQuery("STATUS", ()=>axios.get(`${BASE_URL}/status/${sessionId}`), {refetchInterval:7_000, enabled: sessionId !== 'init'});
    const participants = statusQuery.data ? statusQuery.data.data['participants'] : [];

    const createSession = useCallback( async () => {
        const res = await axios.get(`${BASE_URL}/create_session`);
        if (res.data && res.data.id){
            setSessionId(res.data.id);
            setToken(res.data.sessionToken);
            // setPhase(phase)
        }
    }, []);

    // const destroySession = useCallback( async () => {
    //     await axios.get(`${BASE_URL}/stop`);
    // }, []);

    return (
        <Page kind="narrow">
            <PageContent>
                <Paragraph>
                {
                    sessionId !== "init"?
                    <Header>Session {sessionId}!</Header>
                    :
                    <ButtonsRow>
                        <Button primary onClick={createSession}>NEW SESSION</Button>
                    </ButtonsRow>     
                }
                </Paragraph>
                <Paragraph>
                    <RecordingButtons token={token} sessionId={sessionId} phase={phase}/>
                    <PlayersTable participants={participants} token={token}/>
                </Paragraph>               
            </PageContent>
        </Page>);
}   

export default ControlPanel;