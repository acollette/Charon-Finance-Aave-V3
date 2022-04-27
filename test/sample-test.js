const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CharonFinance", function () {

  let Custodian, custodian, LPToken, lpToken, RepaymentPool, repaymentPool, test1, alice, bob;
  provider = ethers.provider;

  beforeEach(async () =>{
    //Deploy a new instance of the contract
    VulcanoContract = await ethers.getContractFactory("VulcanoCoin");
    vulcanoContract = await VulcanoContract.deploy();
    
    await vulcanoContract.deployed();

    //Get accounts and assign to pre-defined variables
    [owner, addr1, addr2, _] = await ethers.getSigners();
  })

  describe("Deployment", ()=>{
    it("Should be deployed with initial parameters", async () =>{
      expect(await vulcanoContract.totalSupply()).to.equal(10000);
      expect(await vulcanoContract.symbol()).to.equal("VCN");
      expect(await vulcanoContract.balanceOf(owner.address)).to.equal(10000)
    }
  )})
