import axios from "axios";
import { Button, TextInput } from "grommet";
import React, { useCallback } from "react";
import styled from "styled-components";
import { BASE_URL } from "../consts";
import { ButtonsContainer, ButtonsRow, InputContainer } from "./ButtonStyles";

const RecordingButtons: React.FC<{token?:string, sessionId?: string, phase?: string}> = ({token, sessionId, phase})=>{
        
    const [playerName, setName] = React.useState('');
    

    const addPlayer = useCallback( async () => {
        await axios.post(`${BASE_URL}/add_participant`,{token, name: playerName})
    }, []);

    const toggleRecording = useCallback( async () => {
        await axios.get(`${BASE_URL}/${phase === "IDLE" ? "start" : "stop"}_recording/${sessionId}`);
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

export default RecordingButtons;

