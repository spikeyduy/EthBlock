import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // storageValue: "GUESS ME",
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // simpleStorageInstance.giveMeMoney({from:this.state.web3.eth.coinbase})

        // Stores a given value, 5 by default.
        // simpleStorage.set(40000, {from: accounts[1]})
        simpleStorageInstance.getBalance.call().then((result) => {
    		document.getElementById('plValue').innerHTML = result.c[0]/10000
    	})
      	// var loserVal = simpleStorageInstance.getWin.call()
      	var loserVal = accounts[0]
        // simpleStorageInstance.deposit({from:accounts[0], value: 1})
        var testVal = this.state.web3.toWei('1', "ether")
        var fguessVal
        var matchME = Math.floor(Math.random() * 100);
        // var matchME = 5
        simpleStorageInstance.set(matchME, {from: accounts[0]}).then((result) => {
        	return simpleStorageInstance.get.call(accounts[0])
        }).then((result) => {
        	console.log(result.c[0])
        	document.getElementById('strValue').innerHTML = "GUESS ME"
        	// this.setState({ storageValue: "GUESS" })
        })



    	var butt = document.getElementById('transferFunds')
    	butt.addEventListener('click', function() {
    		simpleStorageInstance.deposit(testVal, {from: accounts[0], value: testVal}).then(function() {
    			simpleStorageInstance.getBalance.call().then((result) => {
    			document.getElementById('plValue').innerHTML = result.c[0]/10000
    			})
    		})
    	})

		document.getElementById('withdrawFunds').addEventListener('click', function() {
			simpleStorageInstance.deposit(testVal, {from: accounts[0], value: testVal}).then(function() {
    			simpleStorageInstance.getBalance.call().then((result) => {
    			document.getElementById('plValue').innerHTML = result.c[0]/10000
    			})
    		}).then(function() {
	    			fguessVal = document.getElementById('fguess').value
				console.log(fguessVal)
				console.log(matchME)
				console.log(fguessVal == matchME)
				if(fguessVal == matchME) {
					document.getElementById('status').innerHTML = "GOOD JOB"
					simpleStorageInstance.withdraw(fguessVal, {from: accounts[0]}).then(function() {
						simpleStorageInstance.getBalance.call().then((result) => {
							document.getElementById('strValue').innerHTML = matchME
	    					document.getElementById('plValue').innerHTML = result.c[0]/10000		
						}).then(function() {
							// location.reload()
							// kill the buttons so they have to reload
						})
				})} else {
					document.getElementById('status').innerHTML = "WRONG"
				}
    		
			// var loserVal = accounts[0]
			})    	
		})
    	// return simpleStorageInstance.getBalance.call()
    	// pileVal = this.state.web3.fromWei(pileVal, ether) 
    	console.log(document.getElementById('fguess').value)
    	this.setState({ loseValue: loserVal}) 
    	simpleStorageInstance.getBalance.call().then((result) => {
			document.getElementById('plValue').innerHTML = result.c[0]/10000
    	})
   		// document.getElementById('plValue').innerHTML = simpleStorageInstance.getBalance.call().c[0]/10000
      })
      // .then((result) => {
      //   // Update state with the result.
      //   // this.setState({ testValue: winnerAcc })
      //   // this.setState({ loseValue: loserVal })     
      //   // console.log(result)
      //   // return this.setState({ pileValue: (this.state.web3.fromWei(result.c[0], "kwei")/10) })
      // })
    })
}

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Can You Find the Bugs?</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Bug Finder</h1>
              <p>This is the testing environment for finding ethereum smart contract bugs!</p>
              <h2>Who wins first? Money or Speed?</h2>
              <p>This shows that the more gas you spend, the faster your transaction can be.</p>
              <p>This should hold the value of whoever was the first to be accepted.</p>
              <p>The stored value is: <strong><span id="strValue"></span></strong></p>
              <p>This is the total pile amount: {this.state.pileValue}<span id="plValue"></span> ETHER</p>
              <p>This is the most recent transaction: {this.state.loseValue}</p>
              <button id="transferFunds"><strong>SEND IT</strong></button><p></p>
              <button id="withdrawFunds"><strong>WITHDRAW THE PILE</strong></button>
              <p></p> If you guess the stored value correctly, you are able to withdraw the PILE!<p></p> <input type="number" name="fguess" id="fguess"></input>
              <p></p>
              <p id="status">Right or Wrong?</p>         
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
