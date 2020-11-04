const { read } = require("fs");
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

class Kitchen {
  constructor() {
    this.welcomeMessage = `Welcome to the Kitchen`;
    this.nextRoom = null;
  }
}

class Foyer {
  constructor() {
    this.welcomeMessage = `Welcome to the Foyer`;
    this.nextRoom = new Kitchen();
  }
}

class MainStreet {
  constructor() {
    this.welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign. >_`;
    this.sign = `The sign says "Welcome to Burlington Code Academy!
     Come on up to the third floor. 
     If the door is locked, use the code 12345."`;
    this.inventory = [new item("sign", this.sign), new item("key", 12345)];
    this.nextRoom = new Foyer();
  }

  read(thingToRead) {
    console.log("\n");
    return this[thingToRead];
  }

  take() {
    console.log("\n");
    return `That would be selfish. How will other students find their way?`;
  }
}

start();

async function start() {
  console.log("\n");
  let room = new MainStreet();
  let answer = await ask(room.welcomeMessage);
  // answer === "read sign" => ['read', 'sign'];
  while (answer !== "exit") {
    //console.log(`Sorry, I don't know how to ${answer}.`);
    let commands = answer.split(" ");
    let action = commands[0];
    let object = commands[1];
    if (room[action] !== undefined) {
      console.log(room[action](object));
    } else {
      console.log(`Sorry I don't know how to ${action}`);
    }
    answer = await ask(`${room.welcomeMessage}`);
  }
  process.exit();
}

/*class Room {
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


//let room = new Room();*/
