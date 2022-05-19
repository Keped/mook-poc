import { Grommet } from 'grommet';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import PlayersTable from './participants/PlayersTable.tsx'
const queryClient = new QueryClient()

function App() {

  return (
    <Grommet plain>
          <QueryClientProvider client={queryClient}><PlayersTable/></QueryClientProvider>
      
    </Grommet>
  );
}

export default App;
