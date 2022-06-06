import React, { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import abi from './utils/ProfitThePonzi.json';
import {ProfitThePonzi} from "./utils/typechain/ProfitThePonzi";
import { Button } from '@material-tailwind/react';
import NavBar from './NavBar';
import ConfirmDialog from './ConfirmDialog';

function App() {
  const [soldTickets, setSoldTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(0);
  const [totalAmountOfTickets, setTotalAmountOfTickets] = useState(0);
  const [open, setOpen] = useState(false);


  const getTicketsSold = async () => {
    try {
      const { ethereum } = window as any;

      if (ethereum) {
        // https://docs.ethers.io/v5/api/signer/#signers
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const lotteryContract: ProfitThePonzi = (new ethers.Contract('0x0856aec2139533B25B19F7DC08130A46f650C82e', abi.abi, signer)) as ProfitThePonzi;

        const totalTickets = await lotteryContract.amountOfTickets();
        setTotalAmountOfTickets(totalTickets.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTicketsSold();
  },[open]);

  const buyTicket = async (ticketNumber: number) => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const lotteryContract: Contract = new ethers.Contract('0x0856aec2139533B25B19F7DC08130A46f650C82e', abi.abi, signer);

    const ticketsSold = await lotteryContract.buyTicket(selectedTicket, {
      value: ethers.utils.parseEther("0.1")
    });
    await ticketsSold.wait();
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
    <ConfirmDialog state={open} controlOpen={handleOpen} ticketSelected={selectedTicket} confirmAction={buyTicket}/>
    <div className="flex justify-center w-full mt-1">
      <div className="flex flex-col">
        <div className="text-center text-3xl font-semibold self-center mt-6">
          Pick a ticket number to buy:
        </div>
        <div className="">
          <div className="grid grid-cols-5 grid-rows-10 gap-5 gap-x-20 mb-4 p-5 text-black">
            {Array.from(Array(totalAmountOfTickets)).map((_, index) => (<Button variant="text"
            className='border border-2 border-solid border-deep-purple-800' color='purple'
            onClick={() => selectTicket(index + 1)}>{index + 1}</Button>))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}


export default App;