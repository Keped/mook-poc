import Slider from "rc-slider";
import React, { useState } from "react";
import styled from "styled-components";
import { LCDLike } from "../ButtonStyles";
import Channel from "./Channel";

const CannelGui: React.FC<{channel:Channel, onChanged: (value:number)=>void}> = ({channel, onChanged})=>{
    const [reverb, setReverb] = useState(false);
    const [gain, setGain] = useState(1);
    const [loCut, setLoCut] = useState(false);

    return (
                    <StripContainer >
                        <br />
                        <ClickablesContainer >
                            <LCDLike style={{width:"100px", textAlign: "center"}}><h3>{(Math.ceil((gain-1) * 100))/10}</h3></LCDLike>
                            <ChannelClickable
                                onToggled={() => {
                                    setReverb(!reverb);
                                    if (reverb) {
                                        channel.onConnectReverb();
                                    } else {
                                        channel.onDisonnectReverb();
                                    }
                                }}
                                isSelected={reverb}
                                title="REVERB" />
                            <ChannelClickable
                                onToggled={() => {
                                    setLoCut(!loCut);
                                    if (loCut) {
                                        channel.onConnectLocut()
                                    } else {
                                        channel.onDisonnectLocut()
                                    }
                                }}
                                isSelected={loCut}
                                title="LO-CUT" />
                        </ClickablesContainer>
        
                        <br />
                        <Slider railStyle={{width:"15px"}} trackStyle={{width:"66px", height:"600px", backgroundColor:"darkgray"}} dotStyle={{backgroundColor:"wheat", height:"60px"}} vertical={true} value={gain} step={0.05} min={0} 
                            max={1.7} 
                                onChange={(value)=>{
                                setGain( value as number );
                                onChanged( value as number)
                            }}/>
                        {/* <RangeInput
                            step={0.05}
                            min={0}
                            max={1.7}
                            value={gain}
                            onChange={({target}) => {
                                setGain( +target.value );
                                onChanged(+target.value )
                            }}                        
                        /> */}
                    </StripContainer>)
}
export default CannelGui;
const StripContainer = styled.div`
    background-color: transparent;
`;

const ChannelClickable = function (p:{ title: string, onToggled: ()=>void, isSelected: boolean }) {

    return (<a onClick={p.onToggled}><BorderSpan>{p.title}</BorderSpan></a>)

}


const BorderSpan = styled.span`
    border: 2px solid green;
    font-size: 0.66em;
    color: green;
    width: 55px;
    text-align: center;
    box-shadow: 3px 3px green;
`;
const ClickablesContainer = styled.div`
    flex-direction:column;
    align-items: center;
    
    & > a {
        display:flex;
        
    }
    & > a + a {
        margin-top:5px;
        display:flex;
        
    }
`;