# Vote App + Web3

To get some ether in your account that is just created you have to follow steps below :

- ` geth --testnet --syncmode "fast" --rpc --datadir "./chaindata/" --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303" console ` 

This will open a RPC connection to **Ropsten Test Network**.

- In **JavaScript console** that comes from **geth**, create a new account using `personal` object.

- The go to **Truffle dev console** 

- Start by `truffle.cmd console`: 
    
    Enter `web3.eth.accounts`. 
    
    You can now see the account that was just now created from **Geth Console**.

- From **Geth Console** hit `miner.start()`.

- Check balance from **Truffle Console**.

Then do what you plan to do. May be `truffle.cmd migrate or deploy?`. 

> Good luck

> **Alert** : __There is problem with geth and truffle in this small project. This might not work.__

