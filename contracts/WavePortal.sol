// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;



    constructor() {
        console.log("5 AM cought with this awesome guide!");
    }

    function wave() public {
        totalWaves += 1;
        console.log("% has waved!", msg.sender);
    }

    function getTotalWaves() public view returns(uint256 _totalWaves){
        _totalWaves = totalWaves;
        console.log("% total waves",_totalWaves);
    }
}
