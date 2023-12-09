require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
solidity: "0.8.20",
paths: {
    artifacts: "./artifacts",
},
networks: {
    zkEVM: {
    url: `https://rpc.public.zkevm-test.net`,
    accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
},
};