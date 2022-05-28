import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  // const checkWalletConnected = () => {
  //   const { ethereum } = window;

  //   if(!ethereum){
  //     console.log("Download Metamask!");
  //   }else{
  //     console.log("We have metamask!", ethereum);
  //   }
  // }

  // useEffect(() => {
  //     checkIfWalletIsConnected();
  // }, [])


  const wave = () => {
    console.log("test");
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
            Wave a Friend and maybe win...
        </div>

        <div className="bio">
          Hey my name is Fede :) try and wave me, you might get a surprise!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave 
        </button>
      </div>
    </div>
  );
}
