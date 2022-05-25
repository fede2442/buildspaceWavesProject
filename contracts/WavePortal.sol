// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address lastWaved;

    constructor() {
        console.log("5 AM cought with this awesome guide!");
    }

    function wave() public {
        totalWaves += 1;
        lastWaved = msg.sender;
    }

    function getTotalWaves() public view returns(uint256 _totalWaves){
        _totalWaves = totalWaves;
    }

    function getLastWaved() public view returns(address){
        console.log("last waved: ", lastWaved);
        return lastWaved;
    }
}
