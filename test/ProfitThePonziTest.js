const { expect } = require("chai");

//Not needed due since it's in global scope but added to be explicit
const { ethers } = require("hardhat");

describe("Token contract", function () {
  it("jackpot should be 0 when recently deployed", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("ProfitThePonzi");

    const hardhatToken = await Token.deploy();

    expect(await hardhatToken.getJackpot()).to.equal(0);
  });
});