/* eslint-disable no-undef */
const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy();
	await waveContract.deployed();
	console.log("Contract address: ", waveContract.address);
	console.log("Contract deployed by: ", owner.address);

	let waveCount = await waveContract.getTotalWaves();
	console.log("We have total % waves", waveCount.to);

	let waveTx = await waveContract.wave();

	await waveTx.wait();

	waveCount = await waveContract.getTotalWaves();
	console.log("We have total % waves", waveCount);

	return "asdasd";
};

const runMain = async () => {
	try {
		await main();
		process.exit(0); //0 == no error
	} catch (error) {
		console.log("Error running main: ", error);
		process.exit(1); // 1 == exit with error
	}
};

runMain();
