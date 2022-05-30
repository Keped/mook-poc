import React from 'react';
import logo from './logo.svg';
import './App.css';
import ControlPanel from './session-control/SessionControl';
import { Grommet } from 'grommet';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient()
function App() {
  return (
    <Grommet plain>
      <QueryClientProvider client={queryClient}>
        <ControlPanel/>

      </QueryClientProvider>
    </Grommet>
  );
}

export default App;
