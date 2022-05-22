import React from 'react';
import {
  Table, TableBody, TableCell, TableFooter, TableHeader, TableRow,
  Text, Page, Button, TextInput
} from 'grommet';
import QRCode from "react-qr-code";

const PlayersTable: React.FC<{participants: [{name:string, id :string}], token?: string}> = ({participants, token})=>{
    
    const rows = participants.map((p: {name:string, id :string})=>{
        return (
        <TableRow key={`${p.id}__${p.name}`}>
            <TableCell><Text>{p.id}</Text></TableCell>
            <TableCell><Text>{p.name}</Text></TableCell>
            <TableCell> <QRCode value={`https://mooki.herokuapp.com/player_app/?player=${p.id}&token=${token}`}/></TableCell>
        </TableRow>);
    });
    return (
          
        <Table >
            <TableHeader>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>LINKS</TableCell>
            </TableRow>
            </TableHeader>
            <TableBody>{rows}</TableBody>
        </Table>
   );
};

export default PlayersTable;