pragma solidity ^0.4.18;

contract SimpleStorage {
  uint storedData;
  address[1] public winner;

  function giveMeMoney() {
  	msg.sender.send(1000000000000000000);
  }

  function getWin() public view returns (address[1]) {
  	return winner;
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function getBalance() public view returns (uint) {
  	return address(this).balance;
  }

  function deposit(uint amount) payable public {
        require(msg.value == amount);
        // nothing else to do!
  }

  function() payable {

  }

  function withdraw(uint theGuess) public returns (bool) {
  	// require(address(this).balance > 0);
  	
  	if(storedData == theGuess){
  		msg.sender.transfer(address(this).balance);
  		return true;
  	} else {
  		return false;
    }
  }
}
