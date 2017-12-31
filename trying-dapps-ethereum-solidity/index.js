if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
} else {
    // localhost:8545 testrpc le khole ko port ho .. ani by default remix le deko port pani yoi ho ...
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

// The array parameter is the abi from the remix ide ...
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
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "age",
                "type": "uint256"
            }
        ],
        "name": "Info",
        "type": "event"
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

const Demo = DemoContract.at("0x569043a82fe94d2bab9523630683cb9bc9c0b4b4");
const infoEvent = Demo.Info();

infoEvent.watch((error, result) => {
    if (!error) {
        $("#data").html(`${result.args.name} is ${result.args.age} years old.`);
    } else {
        console.log(error);
    }
});

$("#button").on("click", () => {
    Demo.setInfo($("#name").val(), $("#age").val(), (error, response) => {
        // Owner bahek koi aaru le setInfo() access garrna khojjyo vanney error aaunxa 
        // Tyai error ko lai callback ho yo !!
        if (error) {
            console.log(error);
        }
    });
})