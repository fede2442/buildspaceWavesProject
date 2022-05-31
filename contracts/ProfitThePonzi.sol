// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


//https://consensys.github.io/smart-contract-best-practices/
contract ProfitThePonzi {
    // https://docs.openzeppelin.com/contracts/3.x/api/utils#Counters
    using Counters for Counters.Counter;
    
    uint256 public constant amountOfTickets = 10;
    address[amountOfTickets] public ticketOwners; 
    Counters.Counter public soldTicketsCounter;  
    Counters.Counter public lotteryId;  

    uint256 public jackpot;
    uint256 public superJackpot;
    mapping(address => uint256) public pendingWinners; 


    modifier onlyWinners()
    {
        // if 0, means that the address is not in the winners map
        // https://ethereum.stackexchange.com/questions/13021/how-can-you-figure-out-if-a-certain-key-exists-in-a-mapping-struct-defined-insi
        if (pendingWinners[msg.sender] <= 0)
            revert AccountIsNotAWinner();
        _;
    }
    
    error LotteryNumberAlreadySold();
    error InvalidTicketNumber();
    error NotTheOwner();
    error AccountIsNotAWinner();
    error AmountUnderMinBet();
    error MaxAmountOfTickets();

    event Winner(uint256 indexed _lotteryId, address indexed winner, uint256 indexed vaultAmount);
    event Withdrawal(address indexed winner, uint256 indexed amountWitdrawed);
    event BoughtTicket(uint256 indexed _lotteryId, address indexed buyer, uint256 indexed ticketNumber);
    event NewLotteryStarted(uint256 indexed newLotteryId);

    function buyTicketOwners(uint256 _ticketNumber) public payable{
        if(_ticketNumber <= 0 || _ticketNumber > amountOfTickets) revert InvalidTicketNumber();
        console.log("pass first");
        if(ticketOwners[_ticketNumber - 1] != address(0)) revert LotteryNumberAlreadySold();
        if(!canBuyMore(msg.sender)) revert MaxAmountOfTickets();
        console.log("pass third");
        if(msg.value != 1 ether) revert AmountUnderMinBet();
        console.log("pass fourth");

        console.log(ticketOwners[7]);

        jackpot += msg.value;       
        ticketOwners[_ticketNumber - 1] = msg.sender;
        soldTicketsCounter.increment();

        if(soldTicketsCounter.current() == amountOfTickets){
            endLottery();
        }

        emit BoughtTicket(lotteryId.current(), msg.sender, _ticketNumber);
    }

    function canBuyMore(address _buyer) internal view returns(bool result){
        uint8 count = 0;
        for(uint i=0; i < ticketOwners.length; i++){
            if(ticketOwners[i] == _buyer){
                count++;
                if(count == 5) return false;
            }
        }
        return true;
    }

    function endLottery() internal {
        uint256 winnerTicketOne = getRandomToGuess();
        uint256 winnerTicketTwo = winnerTicketOne + 1;
        uint256 winnerTicketThree = winnerTicketTwo + 1;

        pendingWinners[ticketOwners[winnerTicketOne]] += (jackpot * 24 / 50); // 48%
        pendingWinners[ticketOwners[winnerTicketTwo]] += (jackpot * 13 / 50); // 26%
        pendingWinners[ticketOwners[winnerTicketThree]] += (jackpot * 4 / 25); // 16%

        superJackpot = jackpot / 10;

        emit Winner(lotteryId.current(), ticketOwners[winnerTicketOne], pendingWinners[ticketOwners[winnerTicketOne]]);
        emit Winner(lotteryId.current(), ticketOwners[winnerTicketTwo], pendingWinners[ticketOwners[winnerTicketTwo]]);
        emit Winner(lotteryId.current(), ticketOwners[winnerTicketThree], pendingWinners[ticketOwners[winnerTicketThree]]);
        
        resetLottery();
    }

    function resetLottery() internal {
        jackpot = 0;
        delete ticketOwners;
        soldTicketsCounter.reset();
        lotteryId.increment();

        emit NewLotteryStarted(lotteryId.current());
    }
    
    // Using withdrawal pattern to avoid exploits.
    // https://docs.soliditylang.org/en/v0.8.14/common-patterns.html
    // Use checks - effects - interactions to avoid reentrancy
    // https://blog.openzeppelin.com/reentrancy-after-istanbul/
    function retrieveLoot() public onlyWinners payable{

        //need to retrieve only what they won.
        uint256 totalWon = pendingWinners[msg.sender];

        // restart their claiming price (effect)
        pendingWinners[msg.sender] = 0;
        // interaction
        (bool success, ) = payable(msg.sender).call{value: totalWon}("");
        
        //IMPORTANT: always have a require after ".call" 
        //https://medium.com/coinmonks/solidity-transfer-vs-send-vs-call-function-64c92cfc878a
        require(success, "Withdrawal failed.");

        emit Withdrawal(msg.sender, totalWon);
    }

    function buyerOfTicket(uint256 _ticketNumber) public view returns(address){
        return ticketOwners[_ticketNumber];
    }

    function getTicketsSold() public view returns(uint256[amountOfTickets] memory _tickets){
        for(uint i=0; i < ticketOwners.length; i++){
            if(ticketOwners[i] != address(0)){
                _tickets[i] = i+1;
            }
        }
    }

    function getTicketsBoughtBy(address _owner) public view returns(uint256[amountOfTickets] memory _tickets){
        for(uint i=0; i < ticketOwners.length; i++){
            if(ticketOwners[i] == _owner){
                _tickets[i] = i+1;
            }
        }
    }

    function getJackpot() public view returns(uint256){
        return jackpot;
    }

    // TODO: Modify later on to get a real random number. Possibly use chainlink VRF. Now it's a pseudorandom.
    function getRandomToGuess() internal pure returns (uint256){
        //return (block.difficulty / block.number) % 10;
        return 5;
    }

    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
}
