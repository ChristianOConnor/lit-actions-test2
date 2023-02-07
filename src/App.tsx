import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
//@ts-ignore
import LitJsSdk from 'lit-js-sdk/build/index.node.js';

function App() {
  const [resp, setResp] = useState('');

  async function callApi() {
    // you need an AuthSig to auth with the nodes
    // this will get it from metamask or any browser wallet
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "mumbai" });
  
    const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });
    await litNodeClient.connect();
  
    const signatures = await litNodeClient.executeJs({
      ipfsId: process.env.REACT_APP_IPFS_CID,
      authSig,
      // all jsParams can be used anywhere in your Lit Action Code
      jsParams: {
        // this is the string "Hello World" for testing
        toSign: [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100],
        publicKey:
          process.env.REACT_APP_PUBLIC_KEY,
        sigName: process.env.REACT_APP_SIG_NAME,
      },
    })
  };

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
