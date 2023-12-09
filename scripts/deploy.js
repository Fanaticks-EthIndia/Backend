const hre = require("hardhat");

async function main() {
    const deployedContract = await hre.ethers.deployContract("FanaTick",['0x4120551E663cf2595e97c6063D90df6E4679fc1F']);
    await deployedContract.waitForDeployment();
    console.log(
        `Counter contract deployed to https://explorer.public.zkevm-test.net/address/${deployedContract.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});