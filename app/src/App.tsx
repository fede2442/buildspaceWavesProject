import React, { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import abi from './utils/ProfitThePonzi.json';
import {ProfitThePonzi} from "./utils/typechain/ProfitThePonzi";
import NavBar from './NavBar';
import ConfirmDialog from './ConfirmDialog';
import TicketGrid from './ticketGrid';
import { Button } from '@material-tailwind/react';

export enum TxStatus {
  "STARTED",
  "FINISHED",
  "NOT_STARTED"
}

function App() {
  const [soldTickets, setSoldTickets] = useState(Array<BigNumber>());
  const [selectedTicket, setSelectedTicket] = useState(0);
  const [totalAmountOfTickets, setTotalAmountOfTickets] = useState(BigNumber.from(0));
  const [open, setOpen] = useState(false);
  const [buyTxStatus, setBuyTxApproved] = useState(TxStatus.NOT_STARTED);
  const [isWinner, setIsWinner] = useState(false);

  const loadTicketData = async () => {
    try {
      const { ethereum } = window as any;

      if (ethereum) {
        // https://docs.ethers.io/v5/api/signer/#signers
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const lotteryContract: ProfitThePonzi = (new ethers.Contract('0x0856aec2139533B25B19F7DC08130A46f650C82e', abi.abi, signer)) as ProfitThePonzi;

        const _soldTickets = await lotteryContract.getTicketsSold();
        const _totalTickets = await lotteryContract.amountOfTickets();
        const _isWinner = await lotteryContract.pendingWinners(await signer.getAddress());
        setSoldTickets(_soldTickets);
        setTotalAmountOfTickets(_totalTickets);
        setIsWinner(!_isWinner.eq(0));
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTicketData();
  },[open, isWinner]);

  const buyTicket = async (ticketNumber: number) => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const lotteryContract: ProfitThePonzi = (new ethers.Contract('0x0856aec2139533B25B19F7DC08130A46f650C82e', abi.abi, signer)) as ProfitThePonzi;

    const ticketsSold = await lotteryContract.buyTicket(selectedTicket, {
      value: ethers.utils.parseEther("0.1")
    });
    // Confirm metamask
    setBuyTxApproved(TxStatus.STARTED);
    // wait till transaction goes through
    await ticketsSold.wait();
    // Tx is confirmed
    setBuyTxApproved(TxStatus.FINISHED);
    setOpen(!open)
  };

  const retrieveLoot = async () => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const lotteryContract: ProfitThePonzi = (new ethers.Contract('0x0856aec2139533B25B19F7DC08130A46f650C82e', abi.abi, signer)) as ProfitThePonzi;

    const retievedLoot = await lotteryContract.retrieveLoot();
    
    await retievedLoot.wait();
    setOpen(!open)
  };

  const selectTicket = async (ticketNumber: number) => {
    setSelectedTicket(ticketNumber);
    setOpen(!open);
  }

  const handleOpen = (value) => setOpen(!open);

  return (
    <div>
    <NavBar/>
    <ConfirmDialog state={open} controlOpen={handleOpen} ticketSelected={selectedTicket} confirmAction={buyTicket} waitingTx={buyTxStatus}/>
    <div className="flex justify-center w-full mt-1">
      <div className="flex flex-col">
        {soldTickets.length === 0 ? 
        <div className="text-center text-3xl font-semibold self-center mt-6">
          Please connect your wallet
        </div> 
        : 
        <div className="text-center text-3xl font-semibold self-center mt-6">
          Pick a ticket number to buy:
        </div>}
        <div className="">
          <TicketGrid totalAmount={totalAmountOfTickets.toNumber()} soldTickets={soldTickets} selectTicket={selectTicket}/>
        </div>
        {isWinner && <div>
        Retrieve Loot: <Button variant="gradient" onClick={retrieveLoot}>Take loot</Button>
        </div>}
      </div>
    </div>
    </div>
  );
}

export default App;