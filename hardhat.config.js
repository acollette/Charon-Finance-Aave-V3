require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  networks: {

    rinkeby: {
      url:"https://eth-rinkeby.alchemyapi.io/v2/L9WE9CuGHFtrY_HTu4kHDzZJK_E9aKS2",
      accounts: [process.env.PRIVATE_KEY_TEST1, process.env.PRIVATE_KEY_ALICE, process.env.PRIVATE_KEY_BOB],
      gas: 50000000,
      
    },

  },

  etherscan: {
    apiKey: "M1K4XJMHV7HU93CZPH725FF5Q5QXJN3SHG",
  }
};

