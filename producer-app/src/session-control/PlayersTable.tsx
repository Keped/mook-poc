import React from 'react';
import {
  Table, TableBody, TableCell, TableFooter, TableHeader, TableRow,
  Text, Grid, Card, CardBody, CardHeader,
} from 'grommet';
import QRCode from "react-qr-code";
import { BASE_URL } from '../consts';
import styled from 'styled-components';

const PlayersTable: React.FC<{participants: [{name:string, id :string}], token?: string}> = ({participants, token})=>{
    
    const cards = participants.map((p: {name:string, id :string})=>{
        return (
        <Card width={"100px"} key={`${p.id}__${p.name}`}>
            <CardHeader><Text>{p.name}</Text></CardHeader>
            <CardBody> <QRCode size={64} value={`${BASE_URL}/?player=${p.id}&token=${token}`}/></CardBody>
        </Card>);
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
    flex-direction: column;
`;
const MooRow = styled.div`
flex-direction: row;
`;
