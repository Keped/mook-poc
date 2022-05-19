import React from 'react';
import {
  Table, TableBody, TableCell, TableFooter, TableHeader, TableRow,
  Text, Page, Button, TextInput
} from 'grommet';
import {useQuery} from "react-query";
import axios from "axios";
import QRCode from "react-qr-code";

const PlayersTable: React.FC<{}> = ()=>{
    const [sessionId, setSessionId] = React.useState("2");
    const [name, setName] = React.useState('');
    const statusQuery = useQuery("STATUS", ()=>axios.get(`https://mooki.herokuapp.com/status/${sessionId}`), {refetchInterval:1_000, enabled: sessionId !== 'init'})
    const rows = statusQuery.data ? statusQuery.data.data['participants'].map((p: {name:string, id :string})=>{
        return <TableRow>
            <TableCell><Text>{p.id}</Text></TableCell>
            <TableCell><Text>{p.name}</Text></TableCell>
            <TableCell> <QRCode value={`https://mooki.herokuapp.com/player_app/${p.id}/${p.name}/${statusQuery.data.data.tokrn}`}/></TableCell>

        </TableRow>
    }): null;
    return (
    <Page> 
          
        <Button disabled={name === ""} primary>Add Player</Button>
        <TextInput
            placeholder="type here"
            value={name}
            onChange={event => setName(event.target.value)}
            />
        <Table >
            <TableHeader>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>LINKS</TableCell>
            </TableHeader>
            <TableBody>{rows}</TableBody>
        </Table>
    </Page>
   );
};

export default PlayersTable;