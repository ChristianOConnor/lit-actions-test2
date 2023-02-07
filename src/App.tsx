import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [resp, setResp] = useState('');
  function callApi() {
    setResp('this function works');
    return;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="card">
          <button onClick={() => callApi()}>click this to call API</button>
          <p>{resp}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
