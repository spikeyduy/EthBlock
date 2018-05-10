# EthBlockPotLuck

This is a simple ethereum contract that was built with the purpose of trying to prevent out-of-order transactions on the Ethereum blockchain.

To run this, have Truffle(install by running the command "npm install -g truffle")(To run the npm command, you have to have nodeJS installed on your machine.) and Ganache(http://truffleframework.com/ganache/) installed on your machine.

In the root folder, run the commands in a powershell window: "truffle compile". Start up ganache. Then run the command "truffle migrate". If it outputs an error, rerun the command "truffle migrate --reset". This reconfigures the code to connect to your ganache server.

Once that has finished, run the command "npm run start". This will spin up the server and should open up a new window in your browser.

In your browser, you also have to have the browser extension "metamask". This extension holds the ethereum test accounts. To connect to your ganache server, you need to open it and click the upper left dropdown menu that will probably say Main Network. Select the "custom RPC" option and input the server "http://127.0.0.1:7545" into the field. Once connected, click the option to "restore from seed phrase" and copy the mnemonic seed from ganache and specify any password you want. (I have ran into problems where metamask does not do anything when trying to switch to the custom RPC. To fix this, you can modify your ganache server ports by clicking the upper right hand settings button in ganache and setting the port to 8545. Then go back to metamask and there should be an option to connect to "localhost:8545" and then you should be able to proceed with the entering the mnemonic. You will have to change back the port back to 7545 or modify the "port" setting to be 8545 in the "truffle.js" file. If you modify any of these settings, you have to run "truffle migrate --reset" again.)

Once those settings have been configured, a popup should appear where you can confirm a transaction. This runs a command that creates a random number and stores it in the "Stored Value". You are then able to click the "send it" button to add 1 ether to the pile, and the "withdraw the pile" button will also send 1 ether to the pile, and if your guess in the input box matches the stored value, you will receive the pile. (To cheat, the value is outputted to the console for testing purposes.)
