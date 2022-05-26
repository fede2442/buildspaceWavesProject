// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WavePortal is Ownable{


    struct Precision {
      uint256 timesPlayed;
      uint256 timesWon;
    }

    mapping(address => Precision) public records;

    error InvalidNumber();
    error NotTheOwner();


    event Guess(uint indexed guessed, address indexed guesser,uint256 indexed toGuess, bool success);

    constructor() {
        
    }    

    // Using basic block data to create pseudo number, this is not safe. Could use Chainlink VRF but for this project it's an overkill
    function waveAndGuess(uint256 _guess) public returns(bool guessAtempt){
        if(_guess < 0 || _guess > 10) revert InvalidNumber();

        uint256 toGuess = (block.difficulty / block.number) % 10;
        guessAtempt = toGuess == _guess;
        records[msg.sender].timesPlayed = records[msg.sender].timesPlayed + 1; 

        if(guessAtempt){
            records[msg.sender].timesWon = records[msg.sender].timesWon + 1; 
        }
        emit Guess(_guess, msg.sender, toGuess, guessAtempt);
    }

    function waveAndWin() public returns (bool){
        if(msg.sender != owner()) revert NotTheOwner();
        records[msg.sender].timesPlayed = records[msg.sender].timesPlayed + 1; 
        records[msg.sender].timesWon = records[msg.sender].timesWon + 1; 
        return true;
    }

    function getHighScore(address _player) public view returns(Precision memory){
        return records[_player];
    }

}
