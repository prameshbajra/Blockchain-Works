const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timeStamp, data, previousHash = "") {
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timeStamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis Block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        if (this.isValidChain()) {
            newBlock.previousHash = this.getLatestBlock().hash;
            newBlock.hash = newBlock.calculateHash();
            this.chain.push(newBlock);
        }
    }
    isValidChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let blockInstance = new BlockChain();
// Adding date to the chain array , block chain in this sense ...
blockInstance.addBlock(new Block(1, "10/01/2017", { amount: 100 }));
blockInstance.addBlock(new Block(2, "14/01/2017", { amount: 19 }));
blockInstance.addBlock(new Block(4, "15/01/2017", { amount: 10 }));
blockInstance.addBlock(new Block(5, "16/01/2017", { amount: 12340 }));

// Tampering with the block chain ...
blockInstance.chain[2].data = { amount: 1200000 };
// Adding some data to check if it works ... (It doesnt - checked)
blockInstance.addBlock(new Block(7, "15/01/2017", { amount: 1234 }));
blockInstance.addBlock(new Block(8, "16/01/2017", { amount: 19657 }));
blockInstance.addBlock(new Block(9, "17/01/2017", { amount: 19576 }));
