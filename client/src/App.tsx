import React, { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import './App.css';
import { abi } from './utils/ProfitThePonzi.json';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [soldTickets, setSoldTickets] = useState([]);



  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTicketsSold = async () => {
    try {
      const { ethereum } = window as any;

      if (ethereum) {
        // https://docs.ethers.io/v5/api/signer/#signers
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const lotteryContract = new ethers.Contract('0x0856aec2139533B25B19F7DC08130A46f650C82e', abi, signer);

        const ticketsSold = await lotteryContract.getTicketsSold();
        setSoldTickets(ticketsSold.filter((x: BigNumber) => x.toNumber() !== 0));
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { ethereum } = window as any;
  
        if (!ethereum) {
          console.log('Download Metamask!');
        } else {
          console.log('We have metamask!', ethereum);
        }
  
        const accounts = await ethereum.request({ method: 'eth_accounts' });
  
        if (accounts.length !== 0) {
          const account = accounts[0];
          setCurrentAccount(account);
          getTicketsSold();
        } else {
          console.log('No authorized account found');
        }
      } catch (error) {
        console.log('error at getting account', error);
      }
    };

    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          Connected account:
          {' '}
          {
              currentAccount
          }
        </div>
        <div>
        Sold Tickets:
        </div>
        <ul>{soldTickets.map((x: BigNumber) => <li>{x.toString()}</li>)}</ul>

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
