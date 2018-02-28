var Election = artifacts.require("./Election.sol");
var RealEstate = artifacts.require("./RealEstate.sol");

module.exports = function (deployer) {
    deployer.deploy(Election);
    deployer.deploy(RealEstate);
};
