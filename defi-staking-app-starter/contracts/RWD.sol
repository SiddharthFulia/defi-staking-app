pragma solidity ^0.8.4;
contract RWD{
    string public name='Reward token';
    string public symbol='RWD';
    uint public totalsupply=1000000000000000000000000;//10^18*10^6 1 million tokens
    uint public decimals=18;
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint value
    );
    event Approval(
        address indexed owner,
        address indexed spender,
        uint value
    );
    mapping(address=>uint) public balanceof;
    mapping(address=>mapping(address=>uint)) public allowance;
    constructor() public{
        balanceof[msg.sender]=totalsupply;
    }
    function transfer(address _to,uint value) public returns(bool success){
        require(balanceof[msg.sender]>=value);
        balanceof[msg.sender]-=value;
        balanceof[_to]+=value;
        emit Transfer(msg.sender, _to, value);
        return true;
    }
    function approve(address sender,uint value) public returns(bool success){
        allowance[msg.sender][sender]=value;
        emit Approval(msg.sender, sender, value);
        return true;
    }
    function transferfrom(address _from,address _to,uint value) public returns(bool success){
        require(balanceof[msg.sender]>=value);
        require(allowance[_from][msg.sender]>=value);
        balanceof[_from]-=value;
        balanceof[_to]+=value;
        allowance[_from][msg.sender]-=value;
        emit Transfer(_from, _to, value);
        return true;
    }
}