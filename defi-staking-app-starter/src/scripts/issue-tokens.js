const Decentralizedbank = artifacts.require("Decentralizedbank");
module.exports=async function issueReward(callback){
    let decentralizedbank=await Decentralizedbank.deployed();
    await decentralizedbank.issuetokens();
    console.log('Issue tokens js file working successfully');
    callback()//callback is used to call the same function again
}