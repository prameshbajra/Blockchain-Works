var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "d8pbxEanTYMPyyxCGqgA";
var mnemonic = "celery loud exotic wisdom welcome urban cabbage beyond solar acid tooth priority";

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
            gas: 400000
        }
    }
};