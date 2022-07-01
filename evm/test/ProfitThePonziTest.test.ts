import { expect } from "chai";
import { BigNumber, Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { ProfitThePonzi } from "../typechain/ProfitThePonzi";

// https://dev.to/open-wc/shared-behaviors-best-practices-with-mocha-519d#mocha-way
// Awesome testing article: https://stermi.medium.com/how-to-create-tests-for-your-solidity-smart-contract-9fbbc4f0a319
describe("Buying tickets and ownership", () => {
  let lottery: ProfitThePonzi;
  let owner: Signer;
  // eslint-disable-next-line no-unused-vars
  let buyerOne: Signer;
  let buyerTwo: Signer;
  let loserSigner: Signer;
  let ticketPriceInWei: string;
  let totalAmountOfTickets: number;
  let maxTicketsPerAccount: number;
  // let profitThePonziContract: ProfitThePonzi, hardhatVrfCoordinatorV2Mock;

  beforeEach(async () => {
    [owner, buyerOne, buyerTwo, loserSigner] = await ethers.getSigners();
    ticketPriceInWei = "100000000000000000";
    totalAmountOfTickets = 10;
    maxTicketsPerAccount = 5;

    const profitThePonziFactory = await ethers.getContractFactory(
      "ProfitThePonzi"
    );
    lottery = await profitThePonziFactory.deploy(1);
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

  describe("Events Emitted", () => {
    it("After buying a ticket BoughtTicket event should be emitted", async () => {
      await expect(
        await lottery.buyTicket(BigNumber.from(1), {
          value: ethers.utils.parseUnits(ticketPriceInWei, "wei"),
        })
      )
        .to.emit(lottery, "BoughtTicket")
        .withArgs(0, await owner.getAddress(), 1);
    });

    it("After finishing lottery there should be 3 Winner events with all 3 winners", async () => {
      buyTicketFor(1, owner);
      buyTicketFor(2, owner);
      buyTicketFor(3, owner);
      buyTicketFor(4, owner);
      buyTicketFor(8, owner);
      buyTicketFor(6, buyerOne);
      buyTicketFor(7, buyerTwo);
      buyTicketFor(5, buyerOne);
      buyTicketFor(9, buyerTwo);

      await expect(
        await lottery.connect(buyerTwo).buyTicket(BigNumber.from(10), {
          value: ethers.utils.parseUnits(ticketPriceInWei, "wei"),
        })
      )
        .to.emit(lottery, "Winner")
        .withArgs(0, await owner.getAddress(), "160000000000000000")
        .and.to.emit(lottery, "Winner")
        .withArgs(0, await buyerOne.getAddress(), "480000000000000000")
        .and.to.emit(lottery, "Winner")
        .withArgs(0, await buyerTwo.getAddress(), "260000000000000000");
    });

    it("After withdrawing there should be a Withdrawal event emitted", async () => {
      buyTicketFor(1, owner);
      buyTicketFor(2, owner);
      buyTicketFor(3, owner);
      buyTicketFor(4, owner);
      buyTicketFor(8, owner);
      buyTicketFor(6, buyerOne);
      buyTicketFor(7, buyerTwo);
      buyTicketFor(5, buyerOne);
      buyTicketFor(9, buyerTwo);
      buyTicketFor(10, buyerTwo);

      await expect(await lottery.connect(owner).retrieveLoot())
        .to.emit(lottery, "Withdrawal")
        .withArgs(await owner.getAddress(), "160000000000000000");

      await expect(await lottery.connect(buyerOne).retrieveLoot())
        .to.emit(lottery, "Withdrawal")
        .withArgs(await buyerOne.getAddress(), "480000000000000000");

      await expect(await lottery.connect(buyerTwo).retrieveLoot())
        .to.emit(lottery, "Withdrawal")
        .withArgs(await buyerTwo.getAddress(), "260000000000000000");
    });

    it("After finishing a lottery and a new one startd a NewLotteryStarted event should be emitted", async () => {
      buyTicketFor(1, owner);
      buyTicketFor(2, owner);
      buyTicketFor(3, owner);
      buyTicketFor(4, owner);
      buyTicketFor(8, owner);
      buyTicketFor(6, buyerOne);
      buyTicketFor(7, buyerTwo);
      buyTicketFor(5, buyerOne);
      buyTicketFor(9, buyerTwo);

      await expect(
        await lottery.connect(buyerTwo).buyTicket(BigNumber.from(10), {
          value: ethers.utils.parseUnits(ticketPriceInWei, "wei"),
        })
      )
        .to.emit(lottery, "NewLotteryStarted")
        .withArgs(1);
    });
  });

  describe(".retrieveLoot() should allow winners to withdraw funds", () => {
    it("should only allow winners, otherwise revert", async () => {
      buyTicketFor(1, owner);
      buyTicketFor(2, owner);
      buyTicketFor(3, owner);
      buyTicketFor(4, owner);
      buyTicketFor(8, owner);
      buyTicketFor(6, buyerOne);
      buyTicketFor(7, buyerTwo);
      buyTicketFor(5, buyerOne);
      buyTicketFor(9, buyerTwo);
      buyTicketFor(10, buyerTwo);

      await expect(
        lottery.connect(loserSigner).retrieveLoot()
      ).to.be.revertedWith("AccountIsNotAWinner()");
    });

    it("Same wallet can have two winning tickets", async () => {
      buyTicketFor(1, owner);
      buyTicketFor(2, owner);
      buyTicketFor(3, owner);
      buyTicketFor(4, owner);
      buyTicketFor(6, owner);

      buyTicketFor(5, buyerOne);
      // two winning tickets for buyerOne
      buyTicketFor(7, buyerOne);
      buyTicketFor(8, buyerOne);
      buyTicketFor(9, buyerOne);
      buyTicketFor(10, buyerOne);

      await expect(await lottery.connect(owner).retrieveLoot())
        .to.emit(lottery, "Withdrawal")
        .withArgs(await owner.getAddress(), "480000000000000000");

      // 42.. wei == 16.. wei + 26... wei (price 2nd & 3rd)
      await expect(await lottery.connect(buyerOne).retrieveLoot())
        .to.emit(lottery, "Withdrawal")
        .withArgs(await buyerOne.getAddress(), "420000000000000000");
    });
  });
});
