
import './App.css';
import { Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Recorder from './screens/Recorder';
const queryClient = new QueryClient()
const App: React.FC<{}> = () => {

  return (
    <QueryClientProvider client={queryClient}>
        <Recorder />
    </QueryClientProvider>
  );
}

export default App;
