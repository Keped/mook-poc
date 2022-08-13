import axios, { Axios, AxiosResponse, ResponseType } from "axios";
import { Button, Header, Page, PageContent, Paragraph, TextInput } from "grommet";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { VintageButton } from "../common";
import { API_URL, BASE_URL } from "../consts";
import { ButtonsRow, InputContainer } from "./ButtonStyles";
import MixControl from "./mixdown-control/MixdownControl";
import PlayersTable from "./PlayersTable";
import RecordingButtons from "./RecordingButtons";

const ControlPanel: React.FC<{}> = ()=>{
    const [sessionId, setSessionId] = useState("init");
    const [sessionToLoad, setSessionToLoad] = useState("");
    const [token, setToken] = useState("init");
    
    const statusQuery = useQuery("STATUS", ()=>axios.get(`${API_URL}/status/${sessionId}`), {refetchInterval:1666, enabled: sessionId !== 'init'});
    const participants = statusQuery.data ? statusQuery.data.data['participants'] : [];
    const recordings = statusQuery.data ? statusQuery.data.data['recordings'] : {};
    const phase = statusQuery.data ? statusQuery.data.data['phase'] : "IDLE";

    const setSessionAndToken:(r: AxiosResponse)=>void = ({data})=>{
        if (data && data.id){
            setSessionId(data.id);
            setToken(data.sessionToken);
        }
    }

    const createSession = useCallback( async () => {
        const res = await axios.get(`${API_URL}/create_session`);
        setSessionAndToken(res);
    }, []);

    const tryLoadSession = useCallback( async () => {
        if(sessionToLoad!== ""){
            setSessionToLoad("");
            const res = await axios.get(`${API_URL}/status/${sessionToLoad}`);
            setSessionAndToken(res);

        }
        
        
    }, [sessionToLoad]);

    return (
        <Page kind="narrow">
            <PageContent>
                <Container>
                {
                    sessionId === "init" && 
                    <ButtonsRow>
                        <VintageButton onClick={createSession}>NEW SESSION</VintageButton>
                        <ButtonsRow>
                        <VintageButton disabled={sessionToLoad === ""} primary onClick={tryLoadSession}>LOAD SESSION</VintageButton>
                        <InputContainer>
                            <TextInput
                                style={{maxWidth:"50px"}}
                                onChange={event => setSessionToLoad(event.target.value)}
                                    />
                        </InputContainer>    
                            </ButtonsRow>
                    </ButtonsRow>     
                }
                { sessionId !== "init" &&
                       <><RecordingButtons token={token} sessionId={sessionId} phase={phase}/>
                       <PlayersTable participants={participants} token={token} sessionId={sessionId}/></> 
                }
                {sessionId!== "init" && 
                <MixControl recordingsByTime={recordings} sessionId={sessionId} />
                }
                </Container>
                
          
            </PageContent>
        </Page>);
}   

export default ControlPanel;
const Container = styled.div`
    margin-top: 21px;
    padding: 21px 7px;
    width:100%;
    color:#464646;
    background-color:#EEEEEE;
    background:linear-gradient(135deg, #EEEEEE 75%, #DDDDDD);
    border-radius:9px;
    cursor:default;
`;
