import React, { useState } from 'react';
import Mixer from './Mixer';
import styled from 'styled-components';
import ChannelGui from "./ChannelGui";

export default function useMixer(files) {
    const [channels, setChannels] = useState([]);
    let channelStrips = [];
    let mixer;


    async function playAll() {
        mixer = new Mixer(files);

        await mixer.playAllTracks()
        const currentStrips = [];
        mixer.channels.forEach(({channel}) => { currentStrips.push(channel) });
        setChannels(currentStrips)

    }

    channelStrips = channels.map(
        (channel) => (
            <ChannelGui
                channel={channel}
                key={channel.id.toString()}
                id={channel.id}
                name={channel.sourceName}
                onChanged={(v) => {
                    channel.onGainInput(v);
                    setChannels(channels);
                }}
                gain={channel.gain} />)
    );
   
        return (<>
        {files.length > 0 && <a onClick={playAll} href="#">Play {files.length} tracks</a>}
        <ChannelsContainer>{channelStrips}</ChannelsContainer>
        </>);
}


const ChannelsContainer = styled.div`
    display:flex;
    flex-direction:row;
    
`;

