import axios from "axios";
import { Button, TextInput } from "grommet";
import React, { useCallback } from "react";
import styled from "styled-components";
import { BASE_URL } from "../consts";

const SessionButtons: React.FC<{token?:string, sessionId?: string, phase?: string}> = ({token, sessionId, phase})=>{
        
    const [playerName, setName] = React.useState('');
    

    const addPlayer = useCallback( async () => {
        await axios.post(`${BASE_URL}/add_participant`,{token, name: playerName})
    }, []);

    const toggleRecording = useCallback( async () => {
        await axios.get(`${BASE_URL}/${phase === "IDLE" ? "start" : "stop"}_recording/${sessionId}`);
    }, []);

    const createSession = useCallback( async () => {
        await axios.get(`${BASE_URL}/create`);
    }, []);

    const destroySession = useCallback( async () => {
        await axios.get(`${BASE_URL}/stop`);
    }, []);

    const stopSession = ()=>axios.get(`${BASE_URL}/stop/${sessionId}`);
 return <ButtonsContainer>
            <ButtonsRow>
                { phase && <Button size="large" primary>{phase === "IDLE" ? "REC" : "STOP"}</Button>}
                <Button size="large" primary onClick={()=>stopSession}>END SESSION</Button>
            </ButtonsRow>
            <ButtonsRow>
                <Button disabled={playerName === ""} primary onClick={()=>addPlayer}>ADD Player</Button>
                <InputContainer>
                <TextInput
                        style={{maxWidth:"300px"}}
                        placeholder="type here"
                        value={playerName}
                        onChange={event => setName(event.target.value)}
                        />
                </InputContainer>    
                        </ButtonsRow>
        </ButtonsContainer>
};

export default SessionButtons;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
`;
const InputContainer = styled.div`
`;
const ButtonsRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: center;
    height: 50px;
    align-items: center;
    line-height: 50px;
    && div,button {
        width: 120px;
        text-align :center;
    }
`;

