import React from 'react';
import {
  Card, CardBody, CardHeader,
} from 'grommet';
import QRCode from "react-qr-code";
import { BASE_URL } from '../consts';
import styled from 'styled-components';
import { LCDLike } from './ButtonStyles';

const PlayersTable: React.FC<{participants: [{name:string, id :string}], token?: string, sessionId: string}> = ({participants, token, sessionId})=>{
    
    const cards = participants.map((p: {name:string, id :string})=>{
        return (
        <MooCard width={"150px"}  key={`${p.id}__${p.name}`}>
            <CardHeader><LCDLike>{p.name}</LCDLike></CardHeader>
            <CardBody> <QRCode size={120} value={`${BASE_URL}/?player=${p.id}&token=${token}&session=${sessionId}`}/></CardBody>
        </MooCard>);
    });
    const rows = (cardsToChunk: JSX.Element[])=>{
        const result = []
        let left = cardsToChunk.length
        while (left > 0) {
            const chunk = cardsToChunk.slice(0,3);
            result.push(...chunk)
            left = left - 3;
        }
        return result;
    }
    return (
          
        <MooGrid>
            {rows(cards)}
        </MooGrid>
   );
};

export default PlayersTable;

const MooGrid = styled.div`
    display: flex;
    flex-direction: row;
    padding: 21px 7px;
`;
const MooCard = styled(Card)`
    & > header { 
        padding: 5px 10px;
        & > div {
            width: 100%
            text-align: center;
        }   
    }

    & > div {
        padding: 15px;
    }

`;
