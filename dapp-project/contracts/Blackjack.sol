pragma solidity ^0.4.2;

contract Blackjack {

    struct Game {
        uint256 bet;
        address player;
        uint256 payout;
        uint gameId;
    }

    mapping(uint => Game) public games;
    mapping(address => uint256) currentGame;
    mapping(address => uint256) cummulativePayout;
    uint public gameCount;

    function Blackjack() payable {
        init(0);
        gameCount = 0;
    }

    function () payable {
        startGame();
    }

    function init(uint gameId) private {
        games[gameId].player = msg.sender;
        games[gameId].bet = msg.value;
        games[gameId].payout = 0;
        games[gameId].gameId = gameId;
    }

    function addPayout(uint gameId) private {
        if (games[gameId].payout == 0) {
            games[gameId].payout = games[gameId].bet * 2;
            games[gameId].bet = 0;
            cummulativePayout[msg.sender] += games[gameId].payout;
        }
    }

    function closeGame(uint gameId) private {
        if (cummulativePayout[msg.sender] > 0) {
            games[gameId].player.transfer(cummulativePayout[msg.sender]);
            cummulativePayout[msg.sender] = 0;
        }
    }

    //call this function to set the bet, game Id, player
    function startGame() payable {
        uint256 newGameID = ++gameCount;
        init(newGameID);
        currentGame[msg.sender] = newGameID;
    }

    //Call this function on each win to increase cummulative cashout by bet X 2
    function ifWin() {
        addPayout(currentGame[msg.sender]);
    }

    //Cashout all money won by an account
    function redeem() {
        closeGame(currentGame[msg.sender]);
    }

    function checkPayout() returns(uint256) {
        return cummulativePayout[msg.sender];
    }

}