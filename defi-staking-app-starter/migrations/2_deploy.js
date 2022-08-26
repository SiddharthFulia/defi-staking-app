const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const Decentralizedbank = artifacts.require("Decentralizedbank");
module.exports = async function (deployer,network,accounts) {
  await deployer.deploy(Tether);
  const tether=await Tether.deployed();
  await deployer.deploy(RWD);
  const rwd=await RWD.deployed();
  await deployer.deploy(Decentralizedbank,rwd.address,tether.address);
  const decentralizedbank=await Decentralizedbank.deployed();
  //transfer rwd tokens to Decentralizedbank
  await rwd.transfer(decentralizedbank.address,'1000000000000000000000000')
  //100 token to investors as reward
  //accounts[1] as 2ns account in ganache is investors account as there is no backend
  await tether.transfer(accounts[1],'100000000000000000000')
}
