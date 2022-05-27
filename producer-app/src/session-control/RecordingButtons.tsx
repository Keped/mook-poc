import axios from "axios";
import { TextInput } from "grommet";
import React, { useCallback } from "react";
import styled from "styled-components";
import { VintageButton } from "../common";
import { BASE_URL } from "../consts";
import { ButtonsContainer, ButtonsRow, InputContainer } from "./ButtonStyles";

const RecordingButtons: React.FC<{token?:string, sessionId?: string, phase?: string}> = ({token, sessionId, phase})=>{
        
    const [playerName, setName] = React.useState('');
    

    const addPlayer = useCallback( async () => {
        await axios.post(`${BASE_URL}/add_participant`,{token, name: playerName})
    }, [playerName, token]);

    const toggleRecording = useCallback( async () => {
        await axios.get(`${BASE_URL}/${phase === "IDLE" ? "start" : "stop"}_recording/${sessionId}`);
    }, [phase, sessionId]);


    const stopSession = ()=>axios.get(`${BASE_URL}/stop/${sessionId}`);
    return (<ButtonsContainer>
                    <LCDLike>Phase: {phase}</LCDLike>
                <ButtonsRow>
                    <VintageButton size="large" primary onClick={toggleRecording}>{phase === "IDLE" ? "REC START" : "REC STOP"}</VintageButton>
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

const LCDLike = styled.div`
    color: #464646;
    width: 96%;
    height: 69px;
    background: linear-gradient(120deg, #C7C7B0 50%, #BCBC9F);
    filter: progid:DXImageTransform.Micr
    text-align: right;
    vertical-align: middle;
    font-size: 36px;
    font-family: VT323, monospace;
    border-radius: 4px;
`;