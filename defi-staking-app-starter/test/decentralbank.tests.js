const Web3 = require('web3/src');
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const Decentralizedbank = artifacts.require("Decentralizedbank");
require('chai')
.use(require('chai-as-promised'))
.should()
contract('Decentralizedbank',(accounts)=>{
    let tether,rwd,decentralizedbank,owner,customer;
    function tokens(number){
        return Web3.utils.toWei(number,'ether')
    }
    before(async()=>{
        tether=await Tether.new();
        rwd=await RWD.new();
        decentralizedbank=await Decentralizedbank.new(rwd.address,tether.address);
        owner=await accounts[0];
        customer=await accounts[1];
        await rwd.transfer(decentralizedbank.address,tokens('1000000'));
        await tether.transfer(accounts[1],tokens('100'));
    })
    describe('Tehter contract check',async()=>{
        it('Name check',async()=>{
            const name=await tether.name();
            assert.equal(name,'Tether');
        })
    })
    describe('Reward contract check',async()=>{
        it('Name check',async()=>{
            const name=await rwd.name();
            assert.equal(name,'Reward token');
        })
    })
    describe('DecentralizedBank contract check',async()=>{
        it('Name check',async()=>{
            const name=await decentralizedbank.name();
            assert.equal(name,'Decentral Bank');
        })
        it('Token value check',async()=>{
            let balance=await rwd.balanceof(decentralizedbank.address);
            assert.equal(balance,tokens('1000000'));
        })
    })
    describe('Staking check',async()=>{
        it('Reward functionality check',async()=>{
            //customer balance check
            let result;
            result=await tether.balanceof(customer);
            assert.equal(result.toString(),tokens('100'));
            //deposit 100 tokens for staking
            await tether.approve(decentralizedbank.address,tokens('100'),{from:customer});
            await decentralizedbank.deposittokens(tokens('100'),{from:customer});
            //check updated balance of customer
            result=await tether.balanceof(customer);
            assert.equal(result.toString(),tokens('0'));
            //check updated balance of decentralized bank
            result=await tether.balanceof(decentralizedbank.address);
            assert.equal(result.toString(),tokens('100'));
            //check if customer has staked tokens
            result=await decentralizedbank.isstaking(customer);
            assert.equal(result.toString(),'true');
            //issue tokens
            await decentralizedbank.issuetokens({from:owner});
            await decentralizedbank.issuetokens({from:customer}).should.be.rejected;//here there will be 19 times 11111111.... so rejected
        })
        it('unstake tokens',async()=>{
            //unstake tokens
            await decentralizedbank.unstaketokens({from:customer});
            //customer balance check
            let result;
            result=await tether.balanceof(customer);
            assert.equal(result.toString(),tokens('100'));
            //check if customer is no longer staking tokens
            result=await decentralizedbank.isstaking(customer);
            assert.equal(result.toString(),'false');
            //check updated balance of decentralized bank
            result=await tether.balanceof(decentralizedbank.address);
            assert.equal(result.toString(),tokens('0'));
        })
    })
})