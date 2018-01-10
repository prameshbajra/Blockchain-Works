pragma solidity ^0.4.17;

contract Todo {
    address myAddress;
    bytes32[] todos;

    function Todo() public {
        myAddress = msg.sender;
    }
    
    modifier isMyAddress {
        if (myAddress == msg.sender) {
            _;
        }
    }

    function setTodo(bytes32 todo) isMyAddress public {
        todos.push(todo);
    }

    function getTodo() isMyAddress constant public returns (bytes32[]) {
        return todos;
    }
}