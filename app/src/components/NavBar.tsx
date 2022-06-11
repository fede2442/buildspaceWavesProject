import { Navbar, Button, Typography } from "@material-tailwind/react";
import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";


export default function NavBar() {
  const [connectedAccount, setConnectedAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log('Connected', accounts[0]);
      setConnectedAccount(accounts[0]);
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
          setConnectedAccount(account);
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
    <Navbar className="max-w-screen-xl mx-auto bg-indigo-200 my-3">
      <div className="container flex justify-between items-center text-blue-grey-900">
        <ul className="flex items-center gap-6">
          <Typography as="li" variant="small" className="p-3 font-normal cursor-pointer">
              <Link to="/"> Home&nbsp;</Link>
          </Typography>
          <Typography as="li" variant="small" className="p-3 font-normal cursor-pointer">
              <Link to="/about"> About&nbsp;</Link>
          </Typography>
        </ul>
       {connectedAccount === "" ?
         <Button variant="outlined" size="md" color="indigo" onClick={connectWallet}>
          Connect Wallet
        </Button> :         
        <Typography
          as="a"
          variant="small"
          className="py-1.5 mr-4 font-bold border border-1 border-indigo-300 p-5 rounded-md"
        >
          {connectedAccount}
        </Typography>}
      </div>
      
    </Navbar>
  );
}