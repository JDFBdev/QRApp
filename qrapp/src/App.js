import './App.css';
import Main from './Components/Main/Main';
import Intro from './Components/Intro/Intro';
import React, {useEffect,useState} from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true)
  const [timer, setTimer] = useState(false);
  const [promise, setPromise] = useState({});

  useEffect(()=>{

    async function fetchData(){
      setTimeout(() => setTimer(true), 3000);
      let response = await axios.get('http://localhost:3001/')
      setPromise(response.data);
    }
    fetchData();

  },[])

  useEffect(()=>{
    if (promise.success && timer) setTimeout(() => setLoading(false), 500);
  },[timer, promise])

  return (
    <div className="App">
      <Intro loading={loading} promise={promise}/>
      <Main loading={loading}/>
    </div>
  );
}

export default App;
