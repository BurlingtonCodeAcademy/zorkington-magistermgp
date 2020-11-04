const { read } = require('fs');
const readline = require('readline');
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
    this.welcomeMessage = `You are in a foyer. Or maybe it's an antechamber. Or a
vestibule. Or an entryway. Or an atrium. Or a narthex.
But let's forget all that fancy flatlander vocabulary,
and just call it a foyer. In Vermont, this is pronounced
"FO-ee-yurr".
A copy of Seven Days lies in a corner.`;
    this.inventory = [new item('sevenDays', this.SevenDays)];
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
    this.inventory = [new item('sign', this.sign), new item('key', 12345)];
    this.nextRoom = new Foyer();
  }

  openDoor(locked) {
    console.log('\n');
    return `The door is locked. There is a keypad on the door handle.`;
  }

  openDoor(open) {
    console.log('\n');
    return `Success! The door opens. 
    You enter the foyer and the door shuts behind you.`;
  }

  read(thingToRead) {
    console.log('\n');
    return this[thingToRead];
  }

  take() {
    console.log('\n');
    return `That would be selfish. How will other students find their way?`;
  }
}

start();

async function start() {
  console.log('\n');
  let room = new MainStreet();
  let answer = await ask(room.welcomeMessage);
  // answer === "read sign" => ['read', 'sign'];
  while (answer !== 'exit') {
    //console.log(`Sorry, I don't know how to ${answer}.`);
    let commands = answer.split(' ');
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
