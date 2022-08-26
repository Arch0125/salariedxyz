// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Vault {
    IERC20 public immutable token;

    uint public totalSupply;
    uint256 timepass;
    uint256 poolid;
    mapping(address => uint) public balanceOf;

    constructor(address _token) {
        token = IERC20(_token);
    }

    uint256 streamid=0;
    uint256 outgoingid=0;

    struct Stream {
        address sender;
        address recipient;
        address tokenAddress;
        uint256 amount;
        uint256 rate;
        uint256 timeframe;
    }

    struct OrgDetail{
        string name;
        address admin;
    }

    struct Member{
        address memberaddr;
        address admin;
        string position;
    }

    struct Outgoing{
        uint _streamid;
        uint amount;
        address recipient;
        address sender;
    }

    struct StreamPool{
        uint256 rate;
        uint256 totalBalance;
        address tokenAddress;
    }

    mapping(uint256 => Stream) public streams;
    mapping(address => OrgDetail) public orgdetails;
    mapping(address => uint256) public orgbalance;
    mapping(address => uint256) public orgcount;
    mapping(address => Member) public members;
    mapping(uint256 => uint256) public withdrawamt;
    mapping(uint256 => Outgoing)public outgoings;

    //Mapping for Liquidity Pool
    mapping(uint256 => StreamPool)public streampools;
    mapping(address=>uint256)public poolshare;

    Member[] public memberDetails;

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

    function addMember(string memory _position, address member)public{
        members[msg.sender].memberaddr=member;
        members[msg.sender].position=_position;
        members[msg.sender].admin = msg.sender;
        memberDetails.push(members[msg.sender]);
    }

    function registerDAO(string memory _name)public {
        orgdetails[msg.sender]=OrgDetail(_name,msg.sender);
    }

    function createStream(address sender, address recepient, address tokenAddress, uint256 amount, uint256 timeframe) public returns(Stream memory){
        streamid++;
        require(sender != recepient, 'You cant stream to yourself');
        require(balanceOf[msg.sender] != 0, 'Balance cant be zero');
        require(balanceOf[msg.sender] >= amount, 'Vault balance must be reateer than the streaming amount');
        uint256 rate = (amount * 1e18 )/2629743;
        streams[streamid]=Stream(sender,recepient,tokenAddress,amount,rate,timeframe);
        orgcount[msg.sender]++;
        return streams[streamid];
    }

    function getStreamBalance(uint256 _streamid)public view returns(uint256){
        uint256 rate = streams[_streamid].rate;
        uint256 starttime = streams[_streamid].timeframe;
        uint256 currenttime = block.timestamp;
        uint256 timepassed = currenttime - starttime;
        uint256 withdrawal = withdrawamt[_streamid];
        uint256 balance = (timepassed * rate)-withdrawal;
        return balance;
    }

    function withdrawFromStream(uint _streamid)public{
        require(msg.sender == streams[_streamid].recipient, 'Only recipient can call the withdraw');
        uint256 rate = streams[_streamid].rate;
        uint256 starttime = streams[_streamid].timeframe;
        uint256 timepass = block.timestamp - starttime;
        token.transfer(msg.sender, rate*timepass);
        totalSupply-=(rate*timepass);
        streams[_streamid].timeframe = block.timestamp;
        orgbalance[streams[_streamid].sender]-=rate * timepass;
    }

    function partWithdrawFromStream(uint _streamid,uint _amount)public{
        require(msg.sender == streams[_streamid].recipient, 'Only recipient can call the withdraw');
        token.transfer(msg.sender, _amount);
        totalSupply-=_amount;
        orgbalance[streams[_streamid].sender]-=_amount;
        withdrawamt[_streamid]+=_amount;
    }

     function sendFromStream(uint _streamid,uint _amount, address _recipient)public{
        require(msg.sender == streams[_streamid].recipient, 'Only recipient can call the withdraw');
        ++outgoingid;
        token.transfer(_recipient, _amount);
        totalSupply-=_amount;
        orgbalance[streams[_streamid].sender]-=_amount;
        withdrawamt[_streamid]+=_amount;
        outgoings[outgoingid]=Outgoing(_streamid,_amount,_recipient,msg.sender);
    }

    //Functions for Stream Lending Pool
    //Currently Supporting DAI tokens only

    function addLiquidity(uint256 _id, uint256 _amount) public {
        require(_amount != 0,"Amount cannot be zero");
        require(_id <= poolid,"Pool should Exist");
        //Update Balance 
        updateBalance(_id);
        //Increase Balance of the Pool
        streampools[_id].totalBalance+=_amount;
        //transfer funds from msg.sender to the contract
        token.transferFrom(msg.sender,address(this),_amount);
        //Mint shares for the liquidity provider
        calculateShares(_id,_amount);
    }

    //Remove Liquidity Fucntion 
    function removeLiquidity(uint256 _id) public {
        //update Balance of pool
        updateBalance(_id);
        uint256 share = poolshare[msg.sender];
        //Calculating amount from shares of the LP
        uint256 amount = (share * streampools[_id].totalBalance)/100;
        //Transferring tokens from pool to LP
        token.transfer(msg.sender,amount);
        //Update shares of the LP
        calculateShares(_id,amount);
        //update total balance of loan pool
        streampools[_id].totalBalance-=amount;
    }

    //Share calculating function for the LP
    function calculateShares(uint _poolid, uint256 _amount)public{
        require(_amount !=0,"Amount cannot be zero");
        uint256 shares =(_amount * 100/streampools[_poolid].totalBalance);
        poolshare[msg.sender]=shares;
    }

    //Update fucntion for updating the total balance of the pool
    function updateBalance(uint256 _id) public {
        //Interest will be calculated from repayment Stream
        uint256 interest = 0;
        uint256 updatedBalance = interest + streampools[_id].totalBalance;
        streampools[_id].totalBalance+=updatedBalance;
    }


    //View Functions for both Stream and StreamPool

    function getStream(uint256 _streamid)public view returns(Stream memory){
        return streams[_streamid];
    }   

    function getOutgoing(uint256 _streamid)public view returns(Outgoing memory){
        return outgoings[_streamid];
    }

    function getCount() public view returns(uint256){
        return streamid;
    }

    function getOutgoingCount() public view returns(uint256){
        return outgoingid;
    }

    function getFund(address _owner)public view returns(uint256){
        return orgbalance[_owner];
    }

    function getOrgCount(address _owner)public view returns(uint256){
        return orgcount[_owner];
    }

    function getName()public view returns(string memory){
        return orgdetails[msg.sender].name;
    }

    function showMember()public view returns(Member[] memory){
        return memberDetails;
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