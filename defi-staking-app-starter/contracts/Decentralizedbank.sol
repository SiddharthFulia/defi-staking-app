pragma solidity ^0.8.4;
import './RWD.sol';
import './Tether.sol';
contract Decentralizedbank{
    string public name='Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;
    address[] public stakers;
    mapping(address=>uint) public stakingbalance;
    mapping(address=>bool) public hasstaked;
    mapping(address=>bool) public isstaking;
    constructor(RWD _rwd,Tether _tether) public{
        rwd = _rwd;
        tether = _tether;
        owner=msg.sender;
    }
    //staking function
    function deposittokens(uint amount) public{
        require(amount>0,'amount cannot be 0');
        tether.transferfrom(msg.sender,address(this),amount);
        stakingbalance[msg.sender]=stakingbalance[msg.sender]+amount;
        if(!hasstaked[msg.sender]){
            stakers.push(msg.sender);
        }
        isstaking[msg.sender]=true;
        hasstaked[msg.sender]=true;
    }
    // issue rewards
    function issuetokens() public {
        require(msg.sender==owner,'caller must be owner');
        for(uint i=0;i<stakers.length;i++){
            address recipient=stakers[i];
            uint balance=stakingbalance[recipient]/9;//rewarding 1/9th of total tokens for staking
            if(balance>0){
                rwd.transfer(recipient,balance);
            }
        }
    }
    function unstaketokens() public{
        uint balance=stakingbalance[msg.sender];
        require(balance>0,'staking balance cannot be less than or equal to 0');
        tether.transfer(msg.sender, balance);
        stakingbalance[msg.sender]=0;
        //updating staking balance
        isstaking[msg.sender]=false;
    }
}