const HDWalletProvider = require("truffle-hdwallet-provider");

const infura_apikey = "aDwmNJ8VINV7YZku7EZe";
const mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        ropsten: {
            provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey),
            network_id: 3,
            gas: 3000000
        }
    }
};