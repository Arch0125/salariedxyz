// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract ERCStream {
    IERC20 public immutable token;

    uint public totalSupply;
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

    function _mint(address _to, uint _shares) private {
        totalSupply += _shares;
        balanceOf[_to] += _shares;
    }

    function _burn(address _from, uint _shares) private {
        totalSupply -= _shares;
        balanceOf[_from] -= _shares;
    }

    function deposit(uint _amount) external {
        /*
        a = amount
        B = balance of token before deposit
        T = total supply
        s = shares to mint

        (T + s) / T = (a + B) / B 

        s = aT / B
        */
        uint shares;
        if (totalSupply == 0) {
            shares = _amount;
        } else {
            shares = (_amount * totalSupply) / token.balanceOf(address(this));
        }

        _mint(msg.sender, shares);
        token.transferFrom(msg.sender, address(this), _amount);
        orgbalance[msg.sender] += _amount;
    }

    function withdraw(uint _shares) internal {
        /*
        a = amount
        B = balance of token before withdraw
        T = total supply
        s = shares to burn

        (T - s) / T = (B - a) / B 

        a = sB / T
        */
        uint amount = (_shares * token.balanceOf(address(this))) / totalSupply;
        _burn(msg.sender, _shares);
        token.transfer(msg.sender, amount);
        orgbalance[msg.sender] -= amount;
    }

    function createStream(address sender, address recepient, address tokenAddress, uint256 amount, uint256 timeframe)returns(uint256){
        streamid++;
        require(sender != recepient, 'You cant stream to yourself');
        require(sender == address(this), 'Only the vault contract can stream');
        require(orgbalance[msg.sender] != 0, 'Balance cant be zero');
        require(orgbalance[msg.sender] >= amount, 'Vault balance must be reateer than the streaming amount');
        streams[streamid]=Stream(sender,recepient,tokenAddress,amount,0,timeframe);
    }

    function getStreamBalance(uint256 _streamid)public view returns(uint256){
        uint256 rate = streams[_streamid].rate;
        uint256 starttime = streams[_streamid].timeframe;
        uint256 currenttime = block.timestamp;
        uint256 timepassed = currenttime - starttime;
        uint256 balance = timepassed * rate;
        return balance;
    }

    function withdrawStream(uint256 _streamid)public view returns(uint256){
        uint256 balance = getStreamBalance(_streamid);
        require(balance != 0,'Cant withdraw zero amount');
        token.transfer(msg.sender, balance);
        streams[_streamid].amount-=balance;
        orgbalance[streams[_streamid].owner]-=balance;
    }

    function getStream(uint256 _id)public view returns(Stream){
        return streams[_id];
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
