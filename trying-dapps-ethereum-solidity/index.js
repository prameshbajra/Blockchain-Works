console.log("Pramesh");
if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
} else {
    // localhost:8545 testrpc le khole ko port ho .. ani by default remix le deko port pani yoi ho ...
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];
const DemoContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "age",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getInfo",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_age",
                "type": "uint256"
            }
        ],
        "name": "setInfo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]);

const Demo = DemoContract.at("0x45d4931a9098b5453aafc865209dbae27eff830e");

Demo.getInfo((error, result) => {
    if (!error) {
        $("#data").html(`${result[0]} is ${result[1]} years old. `)
    } else {
        console.log("Error", error);
    }
    $("#button").on("click", () => {
        Demo.setInfo($("#name").val(), $("#age").val());
    })
});