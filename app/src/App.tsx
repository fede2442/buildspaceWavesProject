import React, { useEffect, useState } from 'react';
import { BigNumber, Contract, ethers } from 'ethers';
import './App.css';
import abi from './utils/ProfitThePonzi.json';

function App() {
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
        const lotteryContract = new ethers.Contract('0x0856aec2139533B25B19F7DC08130A46f650C82e', abi.abi, signer);

        const ticketsSold = await lotteryContract.getTicketsSold();
        setSoldTickets(ticketsSold.filter((x: BigNumber) => x.toNumber() !== 0));
        console.log(ticketsSold);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (ticketNumber: number) => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const lotteryContract: Contract = new ethers.Contract('0x0856aec2139533B25B19F7DC08130A46f650C82e', abi.abi, signer);

    const ticketsSold = await lotteryContract.buyTicket(ticketNumber, {
      value: ethers.utils.parseEther("0.1")
    });
    await ticketsSold.wait();
    alert("Ticket number sold");
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
    <div className="flex justify-center w-full mt-16 ">
      <div className="flex flex-col justify-center ">
        <div className="text-center text-3xl font-semibold">
          Pick a ticket number:
          {' '}
          {
              currentAccount
          }
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
          <div className="grid grid-cols-5 grid-rows-10 gap-4 my-5 p-5">
            {Array.from(Array(50)).map((_, index) => (<div className="text-center border-2 border-solid border-black bg-gradient-to-r from-blue-500 to-cyan-500  rounded-lg hover:bg-slate-100" onClick={() => handleClick(index)}>{index}</div>))}
          </div>
        </div>
        <div className="text-center text-gray-600 mt-4">
          Hey my name is Fede :) try and wave me, you might get a surprise!
        </div>

        <button className="cursor-pointer mt-4 p-2 rounded" onClick={connectWallet}>
          Connect Wallet
        </button>
        <button className="cursor-pointer mt-4 p-2 rounded" onClick={getTicketsSold}>
          get tickets sold
        </button>
      </div>
    </div>
  );
}


export default App;