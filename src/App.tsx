import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
//@ts-ignore
import * as LitJsSdk from '@lit-protocol/lit-node-client'

function App() {
  const [resp, setResp] = useState('');

  async function callApi() {
    // you need an AuthSig to auth with the nodes
    // this will get it from metamask or any browser wallet
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "mumbai" });
  
    const client = new LitJsSdk.LitNodeClient({
      litNetwork: 'serrano',
      debug: true,
    });
    
    await client.connect();

    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "mumbai",
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "100000000000000000", // 0.1 ETH
        },
      },
    ];
  
    const signatures = await client.executeJs({
      ipfsId: process.env.REACT_APP_IPFS_CID,
      authSig,
      // all jsParams can be used anywhere in your Lit Action Code
      jsParams: {
        // this is the string "Hello World" for testing
        conditions: accessControlConditions,
        authSig,
        chain: 'mumbai',
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
