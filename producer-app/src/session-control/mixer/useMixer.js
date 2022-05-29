import React, { useState } from 'react';
import Mixer from './Mixer';
import styled from 'styled-components';
import { RangeInput } from 'grommet';

export default function useMixer(files) {
    const [channels, setChannels] = useState([]);
    let channelStrips = [];
    let mixer;


    async function playAll() {
        mixer = new Mixer(files);

        await mixer.initAllTracks()
        const currentStrips = [];
        mixer.channels.forEach(({channel}) => { currentStrips.push(channel) });
        setChannels(currentStrips)

    }

    channelStrips = channels.map((channel) => (
        <Strip
            channel={channel}

            id={channel.id}
            name={channel.sourceName}
            onChanged={(v) => {
                channel.onGainInput(v);
                setChannels(channels);
            }}
            gain={channel.gain} />));
    if (channelStrips.length === 0) {
        return (<h3>
            <a onClick={playAll} href="#">Click to play all</a>
        </h3>)
    } else {
        return (<ChannelsContainer>{channelStrips}</ChannelsContainer>)
    }
}

const ChannelClickable = function ({ title, onToggled, isSelected }) {

    return (<a onClick={onToggled}><BorderSpan on={isSelected}>{title}</BorderSpan></a>)

}

class Strip extends React.Component {
    state = { gain: 1, reverb: false, loCut: false }
    render() {
        const { name, onChanged, id, channel } = this.props;
        return (
            <StripContainer key={id.toString()}>
                <br />
                <ClickablesContainer >
                    <ChannelClickable
                        onToggled={() => {
                            const reverb = !this.state.reverb;
                            this.setState({ reverb })
                            if (reverb) {
                                channel.onConnectReverb()
                            } else {
                                channel.onDisonnectReverb()
                            }
                        }}
                        isSelected={this.state.reverb}
                        title="REVERB" />
                    <ChannelClickable
                        onToggled={() => {
                            const loCut = !this.state.loCut;
                            this.setState({ loCut })
                            if (loCut) {
                                channel.onConnectLocut()
                            } else {
                                channel.onDisonnectLocut()
                            }
                        }}
                        isSelected={this.state.loCut}
                        title="LO-CUT" />
                </ClickablesContainer>

                <br />
                <RangeInput
                    step={0.05}
                    min={0}
                    max={1.7}
                    values={[this.state.gain]}
                    onChange={(values) => {
                        this.setState({ gain: values[0] });
                        onChanged(values[0])
                    }}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '600px',
                                width: '60px',
                                backgroundColor: '#ccc'
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '42px',
                                width: '42px',
                                backgroundColor: '#999'
                            }}

                        />
                    )}
                />
            </StripContainer>)
    }
}

const StripContainer = styled.div`
    background-color: transparent;
`;

const ChannelsContainer = styled.div`
    display:flex;
    flex-direction:row;
    
`;

const BorderSpan = styled.span`
    border: 2px solid ${p => p.ion ? 'green' : 'gray'};
    font-size: 0.66em;
    color: ${p => p.on ? 'green' : 'gray'};
    box-shadow: 3px 3px  ${p => p.on ? 'green' : 'gray'};
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