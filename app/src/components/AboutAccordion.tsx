import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';

export default function AboutAccordion() {
    const [open, setOpen] = useState(0);
 
    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };
    
  return (
        <Fragment >
            <Accordion  open={open === 1} onClick={() => handleOpen(1)}>
                <AccordionHeader className="text-black ">What is Profit The Ponzi?</AccordionHeader>
                <AccordionBody className="text-black">
                    Profit The Ponzi is a basic decentralized lottery game. This was a project made just for learning and fun. Please be careful with which wallet you connect and make sure you are on Rinkeby testnet to play. This is a test application!. This UI is for people to be able to play easily but the contract is designed to be played without a UI.
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 2} onClick={() => handleOpen(2)}>
                <AccordionHeader className="text-black">How is the random number picked?</AccordionHeader>
                <AccordionBody className="text-black">
                    Since the EVM is deterministic (this means the same input gives us the same output every time) it is very hard to generate real randomness on chain. I considered several different paths to pick winners but in the end, for the scope of this project, I ended up using Chainlink VRF. This oracle gives us a truly random number that is verified on-chain. This number is only picked after ALL tickets of the lottery have been sold.
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 3} onClick={() => handleOpen(3)}>
                <AccordionHeader className="text-black">Who wins and how much?</AccordionHeader>
                <AccordionBody className="text-black">
                    After all tickets are bought the contract ends the lotter and picks the winners. The split of funds is the following:
                    <div className='indent-10'>
                        <li>1st place 48%</li>
                        <li>2nd place 26%</li>
                        <li>3rd place 16%</li>
                        <li>SuperJackpot 10% </li>
                    </div>
                    This superJackpot is added to the general lottery pot every 10 lotteries for added rewards.
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 4} onClick={() => handleOpen(4)}>
                <AccordionHeader className="text-black">When does the lottery end?</AccordionHeader>
                <AccordionBody className="text-black">
                    The lottery ends with the last ticket sold. That is the trigger to request for the random number to the Chainlink VRF, picking the winners and restarting the lottery. Because all this costs more gas than the other tickets and in order to end it fast this last ticket will be FREE. It will only cost gas fees. After purchasing it you can withdraw the eth you bet from the contract.
                </AccordionBody>
            </Accordion>
            
        </Fragment>
  );
}