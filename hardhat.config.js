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
        scrollTestnet: {
            url: process.env.SCROLL_TESTNET_URL || "",
            accounts:
                process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
        arbitrumGoerli: {
            url: 'https://sepolia-rollup.arbitrum.io/rpc',
            chainId: 421613,
            accounts: [process.env.ACCOUNT_PRIVATE_KEY],
        },
    },
};