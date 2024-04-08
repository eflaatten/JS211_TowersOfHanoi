'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?

// This function is printing the three stacks
// Using dot notation to get a,b,c from the stacks object
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// For counting the moves 
let moves = 0

// Next, what do you think this function should do?

// This function should move the input the disk on top to the stack that was selected. example: a: 4,3,2,1 b: c: | startStack: a endStack: b | output: a: 4,3,2 b: 1 c: 
const movePiece = (startStack, endStack) => {
  // Your code here
  if (!isLegal(startStack, endStack)){
    return
  }

  // Moves go up by 1 for every prompt
  moves++

  // Takes the disk from the top of startStack and pushes it to the end stack if it can
  const piece = stacks[startStack].pop()
  stacks[endStack].push(piece)
  
  console.log(`Move: ${moves}`)
  
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2

// 3 cannot stack on 2 since it is a bigger disk.
// Should check the piece that is going to move against the piece it is headed, so if 3 moving to 2 = illegal. but if 2 moving to 3 = legal
const isLegal = (startStack, endStack) => {
  // Your code here

  // Check if startStack and endStack are valid
  if (!stacks[startStack] || !stacks[endStack]) {
    console.log("Invalid stack");
    return false;
  }

  // Check if the start stack has a disk
  if (stacks[startStack].length === 0) {
    console.log("Start stack is empty");
    return false;
  }

  // Get the disks on top of the startStack and endStack
  const startTop = stacks[startStack][stacks[startStack].length - 1];
  const endTop = stacks[endStack][stacks[endStack].length - 1];

  //CHeck if the piece that is moving is smaller than the piece it is moving to
  if (startTop < endTop || stacks[endStack].length === 0) {
    return true;
  } else {
    console.log("Illegal move!");
    return false;
  }
}

// What is a win in Towers of Hanoi? When should this function run?

// A win is when you have successfully moved all the disks from one stack to another.
// it should run for every move until and returns a win when all the disks are on a single stack
const checkForWin = () => {
  // Your code here.

  // Checks if the disks are stacked on b or c and returns a win
  if(stacks.b.toString() === '4,3,2,1' || stacks.c.toString() === '4,3,2,1'){
    setTimeout(() => {
      rl.close()
      console.log('You win!')
      console.log(`You won in ${moves} moves!`);
    }, 100);
    return true
  }
  return false
}

// When is this function called? What should it do with its argument?

// The function is called after startStack and endStack have been inputted
const towersOfHanoi = (startStack, endStack) => {
  // Your code here

  // Convert the input to lowercase
  startStack = startStack.toLowerCase()
  endStack = endStack.toLowerCase()

  // Moves the piece
  movePiece(startStack, endStack)
}

const getPrompt = () => {
  if(!checkForWin()){
    printStacks();
    rl.question('start stack: ', (startStack) => {
      rl.question('end stack: ', (endStack) => {
        towersOfHanoi(startStack, endStack);
        getPrompt();
      });
    });
  }
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
