import { expect, use } from 'chai';
import { Contract } from 'ethers';
import { deployContract, MockProvider, solidity } from 'ethereum-waffle';
import ProfitThePonzi from '../artifacts/contracts/ProfitThePonzi.sol/ProfitThePonzi.json';

use(solidity);

// https://dev.to/open-wc/shared-behaviors-best-practices-with-mocha-519d#mocha-way
describe('Buying a ticket', () => {
  const [wallet, walletTo] = new MockProvider().getWallets();

  let lottery: Contract;

  beforeEach(async () => {
    lottery = await deployContract(wallet, ProfitThePonzi);
  });

  // validations
  test.only('Player should be able to purchase one ticket of choice', async () => {
    await lottery.buyTicket(1);
    expect(lottery.ticketOwners[0]).to.equal(wallet);
    expect(await lottery.buyerOfTicket(1)).to.equal(wallet);
  });

  it('ticket number below or equal to 0 should revert InvalidTicketNumber', async () => {
  });

  it('ticket number over amountOfTickets should revert InvalidTicketNumber', async () => {
  });

  it('buying a ticket already aquired should revert LotteryNumberAlreadySold', async () => {
  });

  it('buying 6 tickets should revert with MaxAmountOfTickets', async () => {
  });

  it('not sending 1 eth to buy a ticket should revert ', async () => {
  });

  // positive cases
  it('Jackpot should be equal to (ticketsSold * ticketPrice)', async () => {
  });

  it('buying a token makes the address the ticket Owner', async () => {
  });

  it('.getTicketsBoughtBy(_owner) returns the tickets bought by _owner', async () => {
  });

  it('.getTicketsSold() returns all sold tickets', async () => {
  });

  it('.buyerOfTicket(_ticketNumber) returns owner of _ticketNumber', async () => {
  });

  it('.getJackpot() returns jackpot to earn in that lottery', async () => {
  });

  describe('After all tickets sold', () => {
    it('lottery ends picking 3 winners', async () => {
    });

    it('lottery resets and new lottery start', async () => {
    });

    it('SuperJackpot is 10% of total', async () => {
    });
  });

  // it("Transfer adds amount to destination account", async () => {
  // 	await lottery.transfer(walletTo.address, 7);
  // 	expect(await lottery.balanceOf(walletTo.address)).to.equal(7);
  // });

  // it("Transfer emits event", async () => {
  // 	await expect(lottery.transfer(walletTo.address, 7))
  // 		.to.emit(lottery, "Transfer")
  // 		.withArgs(wallet.address, walletTo.address, 7);
  // });

  // it("Can not transfer above the amount", async () => {
  // 	await expect(lottery.transfer(walletTo.address, 1007)).to.be.reverted;
  // });

  // it("Can not transfer from empty account", async () => {
  // 	const lotteryFromOtherWallet = lottery.connect(walletTo);
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

describe('.retrieveLoot() should allow winners to withdraw funds', () => {
  it('should only allow winners, otherwise revert', async () => {
  });

  it('winner claims prize should get sent the eth and winning balance updated to 0', async () => {
  });

  it('2 times winner claims prize should get sent both prices and winning balance updated to 0', async () => {
  });
});

describe('Events Emitted', () => {
  it('After buying a ticket BoughtTicket event should be emitted', async () => {
  });

  it('After finishing lottery there should be 3 Winner events with all 3 winners', async () => {
  });

  it('After withdrawing there should be a Withdrawal event emitted', async () => {
  });

  it('After finishing a lottery and a new one startd a NewLotteryStarted event should be emitted', async () => {
  });

  it('After finishing a lottery multiple of 15 SuperJackpot event should be emitted', async () => {
  });
});
