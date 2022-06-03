import { expect } from "chai";
import { BigNumber, Signer } from "ethers";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { BoughtTicketEvent } from "../typechain/ProfitThePonzi";
import { ProfitThePonzi } from "../typechain/ProfitThePonzi";

// https://dev.to/open-wc/shared-behaviors-best-practices-with-mocha-519d#mocha-way
// Awesome testing article: https://stermi.medium.com/how-to-create-tests-for-your-solidity-smart-contract-9fbbc4f0a319
describe("Buying a ticket", () => {
  let lottery: ProfitThePonzi;
  let owner: Signer;
  // eslint-disable-next-line no-unused-vars
  let buyerOne: Signer;
  let ticketPriceInWei: string;
  let totalAmountOfTickets: number;
  let maxTicketsPerAccount: number;

  beforeEach(async () => {
    [owner, buyerOne] = await ethers.getSigners();
    ticketPriceInWei = "100000000000000000";
    totalAmountOfTickets = 10;
    maxTicketsPerAccount = 5;

    const profitThePonziFactory = await ethers.getContractFactory(
      "ProfitThePonzi"
    );
    lottery = await profitThePonziFactory.deploy();
    await lottery.deployed();
  });

  // UTILS FOR THIS SUITE
  const buyTicketFor = async (ticketNumber: number, signer: Signer = owner) => {
    await lottery.connect(signer).buyTicket(BigNumber.from(ticketNumber), {
      value: ethers.utils.parseUnits(ticketPriceInWei, "wei"),
    });
  };

  // validations
  it("Player should be able to purchase one ticket of choice", async () => {
    await buyTicketFor(1, owner);

    expect(await lottery.getJackpot()).to.equal(
      BigNumber.from(ticketPriceInWei)
    );
    expect(await lottery.buyerOfTicket(1)).to.equal(await owner.getAddress());
  });

  it("ticket number below or equal to 0 should revert InvalidTicketNumber", async () => {
    // eslint-disable-next-line no-unused-expressions
    await expect(buyTicketFor(0, owner)).to.be.revertedWith(
      "InvalidTicketNumber()"
    );
  });

  it("ticket number over amountOfTickets should revert InvalidTicketNumber", async () => {
    await expect(
      buyTicketFor(totalAmountOfTickets + 1, owner)
    ).to.be.revertedWith("InvalidTicketNumber()");
  });

  it("buying a ticket already aquired should revert LotteryNumberAlreadySold", async () => {
    buyTicketFor(1, owner);

    await expect(buyTicketFor(1, buyerOne)).to.be.revertedWith(
      "LotteryNumberAlreadySold()"
    );
  });

  it("trying to buy more than 1 over the max tickets per account should revert with MaxAmountOfTickets", async () => {
    for (let i: number = 1; i <= maxTicketsPerAccount; i++) {
      buyTicketFor(i, owner);
    }

    await expect(
      buyTicketFor(maxTicketsPerAccount + 1, owner)
    ).to.be.revertedWith("MaxAmountOfTickets()");
  });

  it("not sending ticketPrice to buy a ticket should revert with AmountUnderMinBet()", async () => {
    await expect(
      lottery.buyTicket(BigNumber.from(1), {
        value: ethers.utils.parseUnits("1", "wei"),
      })
    ).to.be.revertedWith("AmountUnderMinBet()");
  });

  // positive cases
  it("Jackpot should be equal to (ticketsSold * ticketPrice)", async () => {
    for (let i: number = 1; i <= maxTicketsPerAccount; i++) {
      await buyTicketFor(i, owner);
    }
    const invesment: BigNumber = BigNumber.from(ticketPriceInWei).mul(
      BigNumber.from(maxTicketsPerAccount)
    );

    await expect(await lottery.getJackpot()).to.eq(invesment);
  });

  it(".getTicketsBoughtBy(_owner) returns the tickets bought by _owner", async () => {
    await buyTicketFor(1, owner);
    await buyTicketFor(5, owner);
    await buyTicketFor(8, owner);

    const result: Array<BigNumber> = new Array(totalAmountOfTickets).fill(
      BigNumber.from(0)
    );

    result[0] = BigNumber.from(1);
    result[4] = BigNumber.from(5);
    result[7] = BigNumber.from(8);

    expect(result).to.deep.eq(
      await lottery.getTicketsBoughtBy(await owner.getAddress())
    );
  });

  it(".getTicketsSold() returns all sold tickets", async () => {
    await buyTicketFor(1, owner);
    await buyTicketFor(5, owner);
    await buyTicketFor(9, buyerOne);
    await buyTicketFor(4, owner);
    await buyTicketFor(7, buyerOne);

    const result: Array<BigNumber> = new Array(totalAmountOfTickets).fill(
      BigNumber.from(0)
    );

    result[0] = BigNumber.from(1);
    result[4] = BigNumber.from(5);
    result[8] = BigNumber.from(9);
    result[3] = BigNumber.from(4);
    result[6] = BigNumber.from(7);

    expect(result).to.deep.eq(await lottery.getTicketsSold());
  });

  it(".buyerOfTicket(_ticketNumber) returns owner of _ticketNumber", async () => {
    await buyTicketFor(1, owner);
    await buyTicketFor(2, buyerOne);

    expect(await lottery.buyerOfTicket(1)).to.eq(await owner.getAddress());
    expect(await lottery.buyerOfTicket(1)).to.not.eq(
      await buyerOne.getAddress()
    );
  });

  describe("After all tickets sold", () => {
    it("lottery ends picking 3 winners", async () => { });

    it("lottery resets and new lottery start", async () => { });

    it("SuperJackpot is 10% of total", async () => { });
  });

  // it("Transfer adds amount to destination account", async () => {
  // 	await lottery.transfer buyerOne.address, 7);
  // 	expect(await lottery.balanceOf buyerOne.address)).to.equal(7);
  // });

  // it("Transfer emits event", async () => {
  // 	await expect(lottery.transfer buyerOne.address, 7))
  // 		.to.emit(lottery, "Transfer")
  // 		.withArgs(wallet.address, buyerOne.address, 7);
  // });

  // it("Can not transfer above the amount", async () => {
  // 	await expect(lottery.transfer buyerOne.address, 1007)).to.be.reverted;
  // });

  // it("Can not transfer from empty account", async () => {
  // 	const lotteryFromOtherWallet = lottery.connect buyerOne);
  // 	await expect(lotteryFromOtherWallet.transfer(wallet.address, 1))
  // 		.to.be.reverted;
  // });

  // it("Calls totalSupply on ProfitThePonzi contract", async () => {
  // 	await lottery.totalSupply();
  // 	expect("totalSupply").to.be.calledOnContract(lottery);
  // });

  // it("Calls balanceOf with sender address on ProfitThePonzi contract", async () => {
  // 	await lottery.balanceOf(wallet.address);
  // 	expect("balanceOf").to.be.calledOnContractWith(lottery, [wallet.address]);
  // });
});

describe(".retrieveLoot() should allow winners to withdraw funds", () => {
  it("should only allow winners, otherwise revert", async () => { });

  it("winner claims prize should get sent the eth and winning balance updated to 0", async () => { });

  it("2 times winner claims prize should get sent both prices and winning balance updated to 0", async () => { });
});

describe("Events Emitted", () => {
  it("After buying a ticket BoughtTicket event should be emitted", async () => { });

  it("After finishing lottery there should be 3 Winner events with all 3 winners", async () => { });

  it("After withdrawing there should be a Withdrawal event emitted", async () => { });

  it("After finishing a lottery and a new one startd a NewLotteryStarted event should be emitted", async () => { });

  it("After finishing a lottery multiple of 15 SuperJackpot event should be emitted", async () => { });
});
