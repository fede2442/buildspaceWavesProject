import { deployMockContract } from "@ethereum-waffle/mock-contract";
import { MockProvider } from "@ethereum-waffle/provider";
import { BigNumber, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import {
  abi,
  bytecode,
} from "../artifacts/contracts/ProfitThePonzi.sol/ProfitThePonzi.json";
import { MockContract } from "ethereum-waffle";
import { ProfitThePonzi } from "../typechain";
import { expect } from "chai";

describe("Buying tickets and ownership", async () => {
  async function setup() {
    const [sender, receiver] = new MockProvider().getWallets();
    const mockContract: MockContract = await deployMockContract(sender, abi);
    const contractFactory = new ContractFactory(abi, bytecode, sender);

    const contract: ProfitThePonzi = (await contractFactory.deploy(
      mockContract.address
    )) as ProfitThePonzi;
    return { sender, receiver, contract, mockContract };
  }
  it("prueba", async () => {
    const { sender, receiver, contract, mockContract } = await setup();

    await contract.buyTicket(BigNumber.from(1), {
      value: ethers.utils.parseUnits("100000000000000000", "wei"),
    });

    await mockContract.mock.buyerOfTicket
      .withArgs(BigNumber.from(1))
      .returns(receiver);

    expect(await contract.buyerOfTicket(BigNumber.from(1))).to.equal(receiver);
  });
});
