const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign. >_`;
  let answer = await ask(welcomeMessage);
  while (answer !== "exit") {
    answer = await ask(">_ ");
  }
  if (answer !== "read sign") {
    console.log("Sorry, I don't know how to " + answer);
  } else {
    console.log(
      "The sign says Welcome to Burlington Code Academy!\n Come on up to the third floor.\n If the door is locked, use the code 12345."
    );
  }
  process.exit();
}

class Room {
  constructor() {
    console.log("Making the room");
  }

  item(sevenDays) {
    if (Room === foyer) {
      console.log("A copy of Seven Days lies in a corner.");
      return this.item;
  }
}
  inventory(item) {
    console.log("You are carrying " + item());
  }


//let room = new Room();
