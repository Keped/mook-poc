
import '../App.css';
import { useState } from 'react';
import { createSession } from '../api/Requests';
import RecordButton from '../components/RecordButton';
import { Routes, Route, Link } from 'react-router-dom';

const height = window.innerHeight - 20


const LeaderScreen: React.FC<{}> = () => {
const [title, setTitle] = useState<string | number>('start session')
const [token, setToken] = useState<string | number| null>(null)




const handleClick = () => {
    createSession().then((res: any) => {
      console.log('start session res', res)
      setToken(res)
    })
}

    //  setInterval(() => {
      // console.log("type of setInterval");
      // if (title === 'start') {
      //   setTitle(5)
      // }
      // else if (title > 0) {
      //   let tempTitle: any = title
      //   tempTitle = tempTitle - 1
      //   setTitle(tempTitle)
      // }
    // }, 1000)
  return (
    <div className="App" style={{height:height, flexDirection: 'column'}}>
      <h2>Session {token ? token : null} leader</h2>
        {token ? <Link to={{pathname: 'join'}}>join</Link> : <RecordButton title={title} handleClick={handleClick}/>}
        
    </div>
  );
}

export default LeaderScreen;