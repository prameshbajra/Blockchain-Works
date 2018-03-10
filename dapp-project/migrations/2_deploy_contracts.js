const Election = artifacts.require("./Election.sol");
const RealEstate = artifacts.require("./RealEstate.sol");
const Blackjack = artifacts.require("./Blackjack.sol");


module.exports = function (deployer) {
    deployer.deploy(Election);
    deployer.deploy(RealEstate);
    deployer.deploy(Blackjack);
};
