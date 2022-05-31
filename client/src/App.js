import React, { useEffect, useState} from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "../src/utils/Lottery.json";
export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try{
      const { ethereum } = window;

      if(!ethereum){
        console.log("Download Metamask!");
      }else{
        console.log("We have metamask!", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if(accounts.length !== 0){
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      }else{
        console.log("No authorized account found");
      }

    }catch (error){
      console.log("error at getting account", error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const getTicketsSold = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // const provider = new ethers.providers.Web3Provider(ethereum);
        // const signer = provider.getSigner();
        // const lotteryContract = new ethers.Contract(contractAddress, abi, signer);

        // let ticketsSold = await lotteryContract.getSoldTickets();
        // console.log("Got all this tickets", ticketsSold);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      checkIfWalletIsConnected();
  }, [])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
            Connected account: {
              currentAccount
            }
        </div>

        <div className="bio">
          Hey my name is Fede :) try and wave me, you might get a surprise!
        </div>

        <button className="waveButton" onClick={connectWallet}>
          Connect Wallet 
        </button>
        <button className="waveButton" onClick={getTicketsSold}>
          get tickets sold 
        </button>
      </div>
    </div>
  );
}
