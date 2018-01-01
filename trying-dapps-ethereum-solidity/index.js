if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
} else {
    // localhost:8545 testrpc le khole ko port ho .. ani by default remix le deko port pani yoi ho ...
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

// The array parameter is the abi from the remix ide ...
var MainContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [],
        "name": "getInformations",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "informationAccounts",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getInformation",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "bytes16"
            },
            {
                "name": "",
                "type": "bytes16"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "countInformations",
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
        "constant": false,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            },
            {
                "name": "_age",
                "type": "uint256"
            },
            {
                "name": "_firstName",
                "type": "bytes16"
            },
            {
                "name": "_lastName",
                "type": "bytes16"
            }
        ],
        "name": "setInformation",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "firstName",
                "type": "bytes16"
            },
            {
                "indexed": false,
                "name": "lastName",
                "type": "bytes16"
            },
            {
                "indexed": false,
                "name": "age",
                "type": "uint256"
            }
        ],
        "name": "InformationInfoEvent",
        "type": "event"
    }
]);

var Main = MainContract.at("0x5eaf049dc767d77fc43985e9dfb8daaf92e9d232");
var informationEvent = Main.InformationInfoEvent({}, "latest");

$("#hash").hide();
$("#blockNumber").hide();
$("#data").hide();

informationEvent.watch((error, result) => {
    if (!error) {
        if (result.blockHash !== $("#hash").html()) {
        }
        $("#hash").show();
        $("#hash").html(`Block Hash : ${result.blockHash}`);
        $("#blockNumber").show();
        $("#blockNumber").html(`Block number : ${result.blockNumber}`);
        console.log(result);
        $("#data").show();
        $("#data").html(`${web3.toAscii(result.args.firstName)} ${web3.toAscii(result.args.lastName)} is ${result.args.age} years old.`);
    } else {
        console.log(error);
    }
});

Main.countInformations((error, response) => {
    if (response) {
        $("#counts").html(`Count : ${response.c}`);
    }
});

$("#button").on("click", () => {
    Main.setInformation(web3.eth.defaultAccount, $("#age").val(), $("#firstName").val(), $("#lastName").val(), (error, response) => {
        // Owner bahek koi aaru le setInfo() access garrna khojjyo vanney error aaunxa 
        // Tyai error ko lai callback ho yo !!
        if (error) {
            console.log(error);
        }
    });
})