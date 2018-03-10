pragma solidity ^0.4.2;

contract Blackjack {

    uint256 bet;
    address player;
    address dealer;
    uint256 payout;
    
    function Blackjack() payable {
        dealer = msg.sender;
    }

    function () payable {
        startGame();
    }
   
    function init() private {
        player = msg.sender;
        bet = msg.value;
        payout = 0;
    }
    
    function endGame() private {
        payout = bet*2;
        closeGame();
    }

    function closeGame() private {
        if (payout > 0) {   
            player.transfer(payout);
            payout = 0;
            bet = 0;
        }
    }
    
    function startGame() payable {
         init();
    }
    
    function redeem() {
        endGame();
    }
}
