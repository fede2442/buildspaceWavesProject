// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {

    //winner address => amountWon , save winners until they withdraw to follow withdrawal pattern.
    mapping(address => uint256) public pendingWinners; 
    mapping(address => HistoricPlays) public records;
    uint256 public jackpot;

    struct HistoricPlays {
      uint256 timesPlayed;
      uint256 timesWon;
      uint256 totalWon;
      uint256 totalBet;
    }

    modifier onlyWinners()
    {
        // if 0 the address is not in the winners map
        // https://ethereum.stackexchange.com/questions/13021/how-can-you-figure-out-if-a-certain-key-exists-in-a-mapping-struct-defined-insi
        if (pendingWinners[msg.sender] <= 0)
            revert AccountIsNotAWinner();
        _;
    }

    error InvalidNumber();
    error NotTheOwner();
    error AccountIsNotAWinner();
    error AmountUnderMinBet();

    event Guess(address indexed guesser, uint indexed guessed, uint256 indexed toGuess, uint256 vaultAmount);
    event Winner(address indexed winner, uint256 indexed vaultAmount);
    event Withdrawal(address indexed winner, uint256 indexed amountWitdrawed);

    // checks - effects - interactions
    function waveAndGuess(uint256 _guess) public payable returns(bool isWinner){
        if(msg.value < 0.1 ether) revert AmountUnderMinBet();
        if(_guess <= 0 || _guess > 10) revert InvalidNumber();

        // decide if winner or loser
        uint256 numberToGuess = getRandomToGuess();
        isWinner = numberToGuess == _guess;
        jackpot = jackpot + msg.value;

        // TODO: Investigate and use Open Zepellins counters ?
        // received correct bet with enough money and valid number
        
        records[msg.sender].timesPlayed = records[msg.sender].timesPlayed + 1; 
        records[msg.sender].totalBet = records[msg.sender].totalBet + msg.value; 

        if(isWinner){
            records[msg.sender].timesWon = records[msg.sender].timesWon + 1;
            records[msg.sender].totalWon = records[msg.sender].totalWon + jackpot; 

            setWinner(); 
        }

        emit Guess(msg.sender, _guess, numberToGuess, jackpot);
    }

    // Modify later on to get a real random number. Possibly use chainlink VRF. Now it's a pseudorandom.
    function getRandomToGuess() internal pure returns (uint256){
        //return (block.difficulty / block.number) % 10;
        return 5;
    }

    // Reset jackpot after new winner to start again
    function setWinner() internal {
        pendingWinners[msg.sender] = pendingWinners[msg.sender] + jackpot; //in case someone wins more than once
        jackpot = 0;
        emit Winner(msg.sender, pendingWinners[msg.sender]);
    }

    // Using withdrawal pattern to avoid exploits.
    // https://docs.soliditylang.org/en/v0.8.14/common-patterns.html
    // Use checks - effects - interactions to avoid reentrancy
    // https://blog.openzeppelin.com/reentrancy-after-istanbul/
    function retrieveLoot() public onlyWinners payable{

        //need to retrieve only what they won.
        uint256 totalWon = pendingWinners[msg.sender];

        // restart their claiming price
        pendingWinners[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: totalWon}("");
        
        //IMPORTANT: always have a require after ".call" 
        //https://medium.com/coinmonks/solidity-transfer-vs-send-vs-call-function-64c92cfc878a
        require(success, "Withdrawal failed.");
        emit Withdrawal(msg.sender, totalWon);
    }

    function getTotalVault() public view returns (uint256){
        return address(this).balance;
    }

    function getJackpot() public view returns(uint256){
        return jackpot;
    }
}
