const { ethers } = require("hardhat");
async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const Lock = await ethers.getContractFactory("FanaTick");
  const address =  ethers.getAddress("0x4120551E663cf2595e97c6063D90df6E4679fc1F");
  const lock = await Lock.deploy(initialOwner, { value : address});

  await lock.deployed();

  console.log(`Lock with 0.00000001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
  console.log(`Block explorer URL: https://blockscout.scroll.io/address/${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});