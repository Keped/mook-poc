import axios from "axios";
import { Button, Header, Page, PageContent, Paragraph } from "grommet";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { VintageButton } from "../common";
import { API_URL, BASE_URL } from "../consts";
import { ButtonsRow } from "./ButtonStyles";
import MixControl from "./mixdown-control/MixdownControl";
import PlayersTable from "./PlayersTable";
import RecordingButtons from "./RecordingButtons";

const ControlPanel: React.FC<{}> = ()=>{
    const [sessionId, setSessionId] = useState("init");
    const [token, setToken] = useState("init");
    
    const statusQuery = useQuery("STATUS", ()=>axios.get(`${API_URL}/status/${sessionId}`), {refetchInterval:1666, enabled: sessionId !== 'init'});
    const participants = statusQuery.data ? statusQuery.data.data['participants'] : [];
    const phase = statusQuery.data ? statusQuery.data.data['phase'] : "IDLE";
    const createSession = useCallback( async () => {
        const res = await axios.get(`${API_URL}/create_session`);
        if (res.data && res.data.id){
            setSessionId(res.data.id);
            setToken(res.data.sessionToken);
            // setPhase(phase)
        }
    }, []);

    return (
        <Page kind="narrow">
            <PageContent>
                <Container>
                <Paragraph>
                {
                    sessionId !== "init"?
                    <Header>Session {sessionId}!</Header>
                    :
                    <ButtonsRow>
                        <VintageButton onClick={createSession}>NEW SESSION</VintageButton>
                    </ButtonsRow>     
                }
                </Paragraph>
                { sessionId !== "init" &&
                    <Paragraph>
                        <RecordingButtons token={token} sessionId={sessionId} phase={phase}/>
                        <PlayersTable participants={participants} token={token}/>
                    </Paragraph>     
                }
                <MixControl/>
                </Container>
                
          
            </PageContent>
        </Page>);
}   

export default ControlPanel;
const Container = styled.div`
    width:100%;
    height:336px;
    color:#464646;
    background-color:#EEEEEE;
    background:linear-gradient(135deg, #EEEEEE 75%, #DDDDDD);
    border-radius:9px;
    cursor:default;
`;
