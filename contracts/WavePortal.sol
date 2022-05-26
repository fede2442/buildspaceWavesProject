// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {

    struct Precision {
      uint256 timesPlayed;
      uint256 timesWon;
      uint256 totalWon;
      uint256 totalBet;
    }

    mapping(address => Precision) public records;

    error InvalidNumber();
    error NotTheOwner();


    event Winner(address indexed winner, uint256 indexed vaultAmount);
    event Guess(address indexed guesser, uint indexed guessed, uint256 indexed toGuess, uint256 vaultAmount);

    // Using basic block data to create pseudo number, this is not safe. Could use Chainlink VRF but for this project it's an overkill
    function waveAndGuess(uint256 _guess) public payable returns(bool guessAtempt){
        require(msg.value == 0.1 ether, "not enough to bet");
        if(_guess < 0 || _guess > 10) revert InvalidNumber();

        // decide if winner or loser
        uint256 toGuess = getRandomToGuess();
        guessAtempt = toGuess == _guess;

        // received correct bet with enough money and valid number
        records[msg.sender].timesPlayed = records[msg.sender].timesPlayed + 1; 
        records[msg.sender].totalBet = records[msg.sender].totalBet + msg.value; 

        if(guessAtempt){
            records[msg.sender].timesWon = records[msg.sender].timesWon + 1;
            records[msg.sender].totalWon = records[msg.sender].totalWon + address(this).balance; 

            payWinner(msg.sender); 
        }

        emit Guess(msg.sender, _guess, toGuess, address(this).balance);
    }

    // Modify later on to get a real random number. Possibly use chainlink VRF. Now it's a pseudorandom.
    function getRandomToGuess() internal view returns (uint256){
        return (block.difficulty / block.number) % 10;
    }
    
    function payWinner(address winner) internal {
        uint256 totalWon = getTotalVault();
        (bool success, ) = payable(winner).call{value: totalWon}("");

        require(success, "Transfer failed.");
        emit Winner(msg.sender, totalWon);
    }

    function getTotalVault() public view returns (uint256){
        return address(this).balance;
    }

}
