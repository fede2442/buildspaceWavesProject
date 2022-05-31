// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


//https://consensys.github.io/smart-contract-best-practices/
contract ProfitThePonzi {
    // https://docs.openzeppelin.com/contracts/3.x/api/utils#Counters
    using Counters for Counters.Counter;
    
    // Too many variables? think of a struct that could help ?
    mapping(address => uint256[]) public lotteryOwners;
    address[] public lotteryPlayers;
    mapping(uint256 => address) public lotteryTickets;
    mapping(address => uint256) public pendingWinners; 
    uint256 public jackpot;
    uint256 public superJackpot;
    uint256 public constant amountOfTickets = 10;
    Counters.Counter public soldTicketsCounter;  

/*
    struct HistoricPlays {
      Counters.Counter ticketsBought;
      Counters.Counter timesWon;
      uint256 totalWon;
      uint256 totalBet;
    }
*/
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

    event Winner(address indexed winner, uint256 indexed vaultAmount);
    event Withdrawal(address indexed winner, uint256 indexed amountWitdrawed);
    event BoughtTicket(address indexed buyer, uint256 indexed ticketNumber);

    function buyTicket(uint256 _ticketNumber) public payable{
        if(lotteryTickets[_ticketNumber] != address(0)) revert LotteryNumberAlreadySold();
        if(lotteryOwners[msg.sender].length == 5) revert MaxAmountOfTickets();
        if(msg.value != 0.1 ether) revert AmountUnderMinBet();
        if(_ticketNumber <= 0 || _ticketNumber > amountOfTickets) revert InvalidTicketNumber();

        jackpot += msg.value;
        lotteryOwners[msg.sender].push(_ticketNumber);
        lotteryTickets[_ticketNumber] = msg.sender;
        lotteryPlayers.push(msg.sender);
        soldTicketsCounter.increment();

        // received correct bet with enough money and valid number
        //records[msg.sender].ticketsBought.increment(); 
        //records[msg.sender].totalBet += msg.value;

        if(soldTicketsCounter.current() == amountOfTickets){
            endLottery();
        }

        emit BoughtTicket(msg.sender, _ticketNumber);
    }

    function endLottery() internal {
        uint256 winnerOne = getRandomToGuess();
        uint256 winnerTwo = getRandomToGuess() + 1;
        uint256 winnerThree = getRandomToGuess() + 2;

        address[3] memory winners = [lotteryTickets[winnerOne], lotteryTickets[winnerTwo], lotteryTickets[winnerThree]];

        pendingWinners[winners[0]] += (jackpot * 24 / 50); // 48%
        pendingWinners[winners[1]] += (jackpot * 13 / 50); // 26%
        pendingWinners[winners[2]] += (jackpot * 4 / 25); // 16%
        superJackpot = jackpot / 10;

        resetLottery();
        
        emit Winner(winners[0], pendingWinners[winners[0]]);
        emit Winner(winners[1], pendingWinners[winners[1]]);
        emit Winner(winners[2], pendingWinners[winners[2]]);
    }

    function resetLottery() internal {
        jackpot = 0;

        for(uint i = 0; i <  lotteryPlayers.length; i++){
            delete lotteryOwners[lotteryPlayers[i]];
        }

        for(uint i = 1; i <=  amountOfTickets; i++){
            lotteryTickets[i] = address(0);
        }

        soldTicketsCounter.reset();

        delete lotteryPlayers;
    }

    function ticketsBoughtBy(address _buyer) public view returns(uint256[] memory){
        return lotteryOwners[_buyer];
    }

    function buyerOfTicket(uint256 _ticketNumber) public view returns(address){
        return lotteryTickets[_ticketNumber];
    }

    function getSoldTickets() public view returns(uint256[amountOfTickets] memory _soldTickets){
        for(uint i = 0; i <  amountOfTickets; i++){
            if(lotteryTickets[i] != address(0)){
                _soldTickets[i] = i + 1;
            }
        }
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
