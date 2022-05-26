/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
//Only adding the import to get intellisense from the IDE
// hre = Hardhat Runtime Environment. No need to import it since it is injected during runtime
const hre = require("hardhat");

const main = async () => {
	const [deployer] = await hre.ethers.getSigners();
	const accountBalance = await deployer.getBalance();

	console.log("Deploying account: ", deployer.address);
	console.log("Account Balance: ", accountBalance.toString());

	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy();

	await waveContract.deployed();

	console.log("WavePortal address: ", waveContract.address);

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