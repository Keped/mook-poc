import axios from "axios";
import { TextInput } from "grommet";
import React, { useCallback } from "react";
import styled from "styled-components";
import { VintageButton } from "../common";
import { API_URL } from "../consts";
import { ButtonsContainer, ButtonsRow, InputContainer, LCDLike } from "./ButtonStyles";

const RecordingButtons: React.FC<{token?:string, sessionId?: string, phase?: string}> = ({token, sessionId, phase})=>{
        
    const [playerName, setName] = React.useState('');
    

    const addPlayer = useCallback( async () => {
        await axios.post(`${API_URL}/add_participant`,{token, name: playerName})
    }, [playerName, token]);

    const toggleRecording = useCallback( async () => {
        await axios.get(`${API_URL}/${phase === "IDLE" ? "start" : "stop"}_recording/${sessionId}`);
    }, [phase, sessionId]);


    const stopSession = ()=>axios.get(`${API_URL}/stop/${sessionId}`);
    return (<ButtonsContainer>
                    <LCDLike>
                        Session ID: {sessionId}<br/>
                        ***************** <br/>
                        Phase: {phase}<br/>
                        </LCDLike>
                <ButtonsRow>
                    <VintageButton onClick={toggleRecording}>{phase === "IDLE" ? "REC START" : "REC STOP"}</VintageButton>
                </ButtonsRow>
                <ButtonsRow>
                    <VintageButton disabled={playerName === ""} primary onClick={addPlayer}>ADD Player</VintageButton>
                    <InputContainer>
                        <TextInput
                            style={{maxWidth:"300px"}}
                            placeholder="type here"
                            onChange={event => setName(event.target.value)}
                                />
                    </InputContainer>    
                            </ButtonsRow>
            </ButtonsContainer>);
};

export default RecordingButtons;
