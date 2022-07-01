/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// Only adding the import to get intellisense from the IDE
// hre = Hardhat Runtime Environment. No need to import it since it is injected during runtime
const hre = require("hardhat");

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying account: ", deployer.address);

  const lotteryContractFactory = await hre.ethers.getContractFactory(
    "ProfitThePonzi"
  );
  const lotteryContract = await lotteryContractFactory.deploy(1);

  await lotteryContract.deployed();

  console.log("Lottery contract address: ", lotteryContract.address);

  // Without callStatic we get a transaction as result of the contract call on-chain. This is a simulation of on-chain call.
  const initialJackpot = await lotteryContract.callStatic.getJackpot();

  console.log("Initial Jackpot: ", initialJackpot.toString());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
