// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

//https://consensys.github.io/smart-contract-best-practices/
//https://docs.chain.link/docs/chainlink-vrf/example-contracts/
contract ProfitThePonzi is VRFConsumerBaseV2{
    // https://docs.openzeppelin.com/contracts/3.x/api/utils#Counters
    using Counters for Counters.Counter;
    VRFCoordinatorV2Interface COORDINATOR;

    uint64 s_subscriptionId;

    // Rinkeby coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;
    
    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    // will ahve to be high enough to end a lottery and start a new one ?
    uint32 callbackGasLimit = 2000000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    uint256 public constant amountOfTickets = 4;
    uint256 public constant ticketPrice = 0.01 ether;
    address[amountOfTickets] public ticketOwners; 
    Counters.Counter public soldTicketsCounter;  
    Counters.Counter public lotteryId;  

    uint256 public jackpot;
    uint256 public superJackpot;
    mapping(address => uint256) public pendingWinners; 

    constructor(uint64 subscriptionId ) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
    }

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
    error AccountIsNotAWinner();
    error AmountUnderMinBet();
    error MaxAmountOfTickets();

    event Winner(uint256 indexed _lotteryId, address indexed winner, uint256 indexed vaultAmount);
    event Withdrawal(address indexed winner, uint256 indexed amountWitdrawed);
    event BoughtTicket(uint256 indexed _lotteryId, address indexed buyer, uint256 indexed ticketNumber);
    event NewLotteryStarted(uint256 indexed newLotteryId);
    event SuperJackpot(uint256 indexed _lotteryId, uint256 _superJackpot);

    function buyTicket(uint256 _ticketNumber) public payable{
        if(_ticketNumber <= 0 || _ticketNumber > amountOfTickets) revert InvalidTicketNumber();
        if(ticketOwners[_ticketNumber - 1] != address(0)) revert LotteryNumberAlreadySold();
        if(!canBuyMore(msg.sender)) revert MaxAmountOfTickets();
        if(msg.value != ticketPrice) revert AmountUnderMinBet();

        jackpot += msg.value;       
        ticketOwners[_ticketNumber - 1] = msg.sender;
        soldTicketsCounter.increment();

        emit BoughtTicket(lotteryId.current(), msg.sender, _ticketNumber);

        // request the random number from ChainLink once all tickets are sold.
        if(soldTicketsCounter.current() == amountOfTickets){
            requestRandomWords();
        }
    }

    function endLottery(uint256[] memory randomNumber) internal {
        uint256 winnerTicketOne = (randomNumber[0] % amountOfTickets) + 1;
        uint256 winnerTicketTwo = (randomNumber[1] % amountOfTickets) + 1;
        uint256 winnerTicketThree = (randomNumber[2] % amountOfTickets) + 1;

        // every 5 lotteries we play for the superJackpot
        if(lotteryId.current() % 5 == 0){
            jackpot += superJackpot;
            superJackpot = 0;
            emit SuperJackpot(lotteryId.current(), jackpot);
        }

        pendingWinners[ticketOwners[winnerTicketOne]] += (jackpot * 24 / 50); // 48%
        pendingWinners[ticketOwners[winnerTicketTwo]] += (jackpot * 13 / 50); // 26%
        pendingWinners[ticketOwners[winnerTicketThree]] += (jackpot * 4 / 25); // 16%

        superJackpot = jackpot / 10; // 10%

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

    function buyerOfTicket(uint256 _ticketNumber) public view returns(address){
        return ticketOwners[_ticketNumber - 1];
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

    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }

    //- ChainlinkVRF -
    function requestRandomWords() internal {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
        keyHash,
        s_subscriptionId,
        requestConfirmations,
        callbackGasLimit,
        1
        );
    }
  
    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        endLottery(randomWords);
    }
}