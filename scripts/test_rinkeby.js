const hre = require("hardhat");
const { ethers } = require("hardhat");
const fs = require("fs");

const custodianJSON = JSON.parse(fs.readFileSync("./artifacts/contracts/Custodian.sol/Custodian.json", "utf8"));

//const usdc_address_rinkeby = "0x5B8B635c2665791cf62fe429cB149EaB42A3cEd8";
const usdc_address_rinkeby = "0xb18d016cdd2d9439a19f15633005a6b2cd6aa774"
let deployer, alice, bob;
const provider = ethers.provider;

const custodianAddress = "0x69E1249F42Df316baefd152adFA9D73EBA40A6EB"
const usdc_abi = ['function transfer(address,uint256) external',
  'function balanceOf(address) external view returns(uint256)',
  'function approve(address,uint256) external', 'function mint(uint256 value) public returns (bool)','function allowance(address owner, address spender) external view returns (uint256)'];


async function depositUSDC (){

    [deployer, alice, bob, _] = await ethers.getSigners();

    const custodianContract = new ethers.Contract(custodianAddress, custodianJSON.abi, alice)
    const usdcContract = new ethers.Contract(usdc_address_rinkeby, usdc_abi, alice )

    //const tx1 = await usdcContract.mint(ethers.utils.parseUnits("100", 6));
    //await tx1.wait();

    //console.log("usdc minted");
    
    //const approvedAmount = await ethers.utils.parseUnits("50", 6);

    //console.log(approvedAmount);
    
    const tx2 = await usdcContract.approve(custodianAddress, 50000000);
    await tx2.wait();

    console.log("usdc approved");

    //const tx2 = await custodianContract.deposit(1, alice.address);
    //await tx2.wait();

    const custDefiBal = await custodianContract.defiBalance()

    console.log(custDefiBal);

    const allowanceAlice = await usdcContract.allowance(alice.address, custodianAddress)

    console.log(allowanceAlice);

}


async function main (){
    await depositUSDC();
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



