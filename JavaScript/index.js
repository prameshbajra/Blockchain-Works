const Blockchain = require("./BlockChain");
const Block = require("./Block");

let blockInstance = new Blockchain();

blockInstance.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
blockInstance.addBlock(new Block(2, "20/07/2017", { amount: 8 }));

console.log(JSON.stringify(blockInstance, null, 4));