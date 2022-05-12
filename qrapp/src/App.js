import './App.css';
import Main from './Components/Main/Main';
import React, {useEffect} from 'react';
import axios from 'axios';

function App() {

  useEffect(()=>{
    
    async function fetchData(){
      await axios.get('http://localhost:3001/');
    }
    fetchData();
  },[])

  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
