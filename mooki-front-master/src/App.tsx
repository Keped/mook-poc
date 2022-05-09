
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import LeaderScreen from './screens/LeaderScreen';
import JoinScreen from './screens/JoinScreen';

const App: React.FC<{}> = () => {

  return (
    <Routes>
      {/* <Route path="/" element={<LeaderScreen />} /> */}
      <Route path="/" element={<JoinScreen />} />
    </Routes>
  );
}

export default App;
