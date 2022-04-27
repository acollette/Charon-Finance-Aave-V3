// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("hardhat");

//const usdc_address_rinkeby = "0x5B8B635c2665791cf62fe429cB149EaB42A3cEd8"
const usdc_address_rinkeby = "0xb18d016cdd2d9439a19f15633005a6b2cd6aa774"
//const aUsdc_address_rinkeby = "0xD624c05a873B9906e5F1afD9c5d6B2dC625d36c3"
const aUsdc_address_rinkeby = "0x50b283C17b0Fc2a36c550A57B1a133459F4391B3"
const poolAddressesProvider_rinkeby = "0xBA6378f1c1D046e9EB0F538560BA7558546edF3C"

const token_abi = ['function transfer(address,uint256) external',
  'function balanceOf(address) external view returns(uint256)',
  'function approve(address,uint256) external'];

const custodian_abi = ['function deposit(uint256 amount, address onBehalfOf) external',
  'function redeem(uint256 lpAmount) external',
  'function getPoolData(address user) external view returns (address, uint256, uint256, uint256, uint256, uint256)',
  'function calculateUsdcToLp(uint256 usdcAmount) external view returns (uint256)',
  'function aavePool() external view returns(address)',
  'function repaymentPool() external view returns(address)',
  'function withdraw(uint256 amount) external',
  'function owner() external returns(address)'];

const repayment_abi = ['function dealList(uint256) external view returns(uint256,uint256,uint256,uint256,uint256,uint16,uint16,string)',
  'function getLastDealId() external view returns(uint256)',
  'function createDeal(uint256,uint256,uint256,uint16,uint16,string memory) external',
  'function repay(uint256 dealId,uint256 amount,uint256 interest) external']


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const signer = await hre.ethers.getSigner();
  console.log("Deployer account:", signer.address);

  // We get the contract to deploy
  const LPToken = await hre.ethers.getContractFactory("LPToken");
  const lpToken = await LPToken.deploy();

  await lpToken.deployed();

  console.log("lpToken deployed to:", lpToken.address);

  const Custodian = await hre.ethers.getContractFactory("Custodian");
  const custodian = await Custodian.deploy(lpToken.address, usdc_address_rinkeby , aUsdc_address_rinkeby, poolAddressesProvider_rinkeby);

  await custodian.deployed();

  console.log("Custodian deployed to:", custodian.address);

  const RepaymentPool = await hre.ethers.getContractFactory("RepaymentPool");
  const repaymentPool = await RepaymentPool.deploy(usdc_address_rinkeby, custodian.address);

  await repaymentPool.deployed();

  console.log("Repayment Pool deployed to:", repaymentPool.address);


  return { lpToken: lpToken.address,
            custodian: custodian.address,
            repaymentPool: repaymentPool.address,        
  }

  //DONT FORGET TO SET CUSTODIAN AS OWNER OF LPTOKEN CONTRACT +++ SET REPAYMENT POOL +++ CREATE A DEAL////

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  