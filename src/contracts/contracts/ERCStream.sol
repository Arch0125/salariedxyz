// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Vault {
    IERC20 public immutable token;

    uint public totalSupply;
    uint256 timepass;
    mapping(address => uint) public balanceOf;

    constructor(address _token) {
        token = IERC20(_token);
    }

    uint256 streamid=0;

    struct Stream {
        address sender;
        address recipient;
        address tokenAddress;
        uint256 amount;
        uint256 rate;
        uint256 timeframe;
    }

    mapping(uint256 => Stream) public streams;
    mapping(address => uint256) public orgbalance;

    function addFund(uint _amount)public{
        _amount*=1e18;
        token.transferFrom(msg.sender,address(this),_amount);
        totalSupply+=_amount;
        balanceOf[msg.sender]+=_amount;
        orgbalance[msg.sender]+=_amount;
    }

    function withdrawFund(uint _amount)public{
        _amount*=1e18;
        totalSupply-=_amount;
        balanceOf[msg.sender]-=_amount;
        token.transfer(msg.sender,_amount);
    }

    function createStream(address sender, address recepient, address tokenAddress, uint256 amount, uint256 timeframe) public returns(Stream memory){
        streamid++;
        require(sender != recepient, 'You cant stream to yourself');
        require(balanceOf[msg.sender] != 0, 'Balance cant be zero');
        require(balanceOf[msg.sender] >= amount, 'Vault balance must be reateer than the streaming amount');
        uint256 rate = (amount * 1e18 )/2629743;
        streams[streamid]=Stream(sender,recepient,tokenAddress,amount,rate,timeframe);
        return streams[streamid];
    }

    function getStreamBalance(uint256 _streamid)public view returns(uint256){
        uint256 rate = streams[_streamid].rate;
        uint256 starttime = streams[_streamid].timeframe;
        uint256 currenttime = block.timestamp;
        uint256 timepassed = currenttime - starttime;
        uint256 balance = timepassed * rate;
        return balance;
    }

    function withdrawStream(uint _streamid)public {
        require(msg.sender == streams[_streamid].recipient, 'only recipient can call the function');
        uint rate = streams[_streamid].rate;
        uint256 starttime = streams[_streamid].timeframe;
        uint256 currenttime = block.timestamp;
        uint256 timepassed = currenttime - starttime;
        uint withdraw = rate * timepassed;
        token.transfer(msg.sender, rate * timepassed);
        totalSupply-=withdraw;
        orgbalance[msg.sender]-=withdraw;
        streams[_streamid].timeframe=block.timestamp;
    }

    function withdrawFromStream(uint _streamid)public{
        require(msg.sender == streams[_streamid].recipient, 'only recipient can call the function');
        uint256 rate = streams[_streamid].rate;
        uint256 starttime = streams[_streamid].timeframe;
        uint256 timepass = block.timestamp - starttime;
        token.transfer(msg.sender, rate*timepass);
        totalSupply-=rate*timepass;
        orgbalance[streams[_streamid].sender]-=rate*timepass;
        streams[_streamid].amount -= rate * timepass;
    }

    function sendFromStream(uint _withdraw,uint _streamid)public{
        _withdraw*=1e18;
        require(_withdraw<(streams[_streamid].amount)/2);
        token.transfer(msg.sender,_withdraw);
        uint256 currenttime = block.timestamp;
        streams[_streamid].timeframe=currenttime;
        streams[_streamid].rate = ((streams[_streamid].amount-_withdraw) * 1e18 )/2629743;
        totalSupply-=_withdraw;
        orgbalance[streams[_streamid].sender]-=_withdraw;
    }
    
}
 interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed owner, address indexed spender, uint amount);
}