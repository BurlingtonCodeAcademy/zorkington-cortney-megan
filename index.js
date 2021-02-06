const { ENETRESET } = require("constants");
const { read } = require("fs");
const { exit } = require("process");
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
//-------Player-----//
let player = {
  name: "Player1",
  inventory: [],
  currentRoom: "",
};

//--------------------Rooms------------------------------//

class Room {
  constructor(
    isUnlocked,
    roomDescription,
    itemsInRoom,
    north,
    east,
    south,
    west
  ) {
    this.isUnlocked = isUnlocked;
    this.roomDescription = roomDescription;
    this.itemsInRoom = itemsInRoom;
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
  }

  enter() {
    console.log(this.roomDescription);
  }

  move(answer) {
    let direction = "";
    //console.log("this is the first console.log in the move function")

    //assign direction to direction entered
    if (answer.trim().toLowerCase().includes("south")) {
      direction = "south";
    } else if (answer.trim().toLowerCase().includes("north")) {
      direction = "north";
    } else if (answer.trim().toLowerCase().includes("east")) {
      direction = "east";
    } else if (answer.trim().toLowerCase().includes("west")) {
      direction = "west";
    } else {
      console.log("Gotta figure this out");
    }
    console.log(this.direction);
    //check and see if direction is true/false
    if (this.direction !== false) {
      //if true, the value that belongs to the direction key is the room in that direction, so go enter that room
      currentRoom = this.direction;
      this.enter(currentRoom);
      //if not, we want error message
    } else {
      console.log(
        "Oh no! You've reached the castle wall. You can't go this way."
      );
    }
  }

  //look around the room and see the items!
  lookAround(currentRoom) {
    let currentItems = currentRoom.items;
    console.log(
      `You look around and you see the following items: ${currentItems}`
    );
  }
}
// list of all of our rooms:
let greatHall = new Room(
  true,
  "Welcome to the Great Hall! It is filled with students feasting on many treats, including your favorite- treacle tarts!.In the distance you see professor MgGonnagall with the sorting hat. What would you like to do?",
  ["sorting hat", "treacle tart"],
  "gryffindorCommon",
  "darkArtsClass",
  "chamberOfSecrets",
  false
);

let gryffindorCommon = new Room(
  true,
  `Here dwell the brave at heart,
their daring, nerve, and chivalry,
set Gryffindors apart!

The fire is roaring and the students are lounging. You overhear bits of conversations among the past heads of Gryffindor (all the way back to Godrick Gryffindor), as they appear and vanish in their portrait frames that line the walls. You see a glimmering fabric in the corner of the room. What is your move?`,
  ["invisibility cloak", "portrait of Godrick Gryffindor"],
  false,
  "library",
  "greatHall",
  false
);

let library = new Room(
  "unlocked",
  `Welcome to the Hogwarts library, where tens of thousands of books on thousands of shelves.`,
  ["A brief history of the Room of Requirement", "Tom Riddle's Diary"],
  false,
  false,
  "darkArtsClass",
  "gryffindorCommon"
);

let darkArtsClass = new Room(
  true,
  `You are now in the Defense Against the Dark Arts classroom.  Who is teaching this year?  You really shouldn’t bother figuring out, they’ll be gone before too long….

Several rows of desks line the classroom, the professor’s desk is cluttered with copies of Advanced Potion-Making and scrolls.`,
  ["Advanced Potion-Making textbook", "scroll"],
  "library",
  false,
  "roomOfRequirement",
  "greatHall"
);

let chamberOfSecrets = new Room(
  false,
  ` Enemies of the Heir, beware! The Chamber of Secrets has been opened! You are standing in a large pipe at the entrance to the Chamber. In front of you is the decaying skeleton of the Basilisk.  Near its giant head you see a glimmer of light.`,
  ["mirror", "House Cup"],
  "greatHall",
  "roomOfRequirement",
  false,
  false
);

let roomOfRequirement = new Room(
  false,
  `Welcome to the Room of Requirement! As Dobby describes it to Harry Potter, “It is a room that a person can only enter when they have real need of it. Sometimes it is there, and sometimes it is not, but when it appears, it is always equipped for the seeker's needs."  You look around and notice many items left by other students who were once in need.`,
  ["Vanishing Cabinet", "basilisk fang", "Sword of Godrick Gryffindor"],
  "darkArtsClass",
  false,
  false,
  "chamberOfSecrets"
);

//room key
let roomKey = {
  gryffindorCommon: gryffindorCommon,
  "gryffindor common room": gryffindorCommon,
  "gryffindor common": gryffindorCommon,
  gryffindorcommon: gryffindorCommon,
  "common room": gryffindorCommon,
  library: library,
  greatHall: greatHall,
  greathall: greatHall,
  "great hall": greatHall,
  darkArtsClass: darkArtsClass,
  "dark arts": darkArtsClass,
  "dark arts class": darkArtsClass,
  darkartsclass: darkArtsClass,
  "dark arts classroom": darkArtsClass,
  classroom: darkArtsClass,
  chamberOfSecrets: chamberOfSecrets,
  "chamber of secrets": chamberOfSecrets,
  chamberofsecrets: chamberOfSecrets,
  roomOfRequirement: roomOfRequirement,
  "room of requirement": roomOfRequirement,
};

//directionkey

//---------------------------Items----------------------------//
let inventory = [];
class checkInventory {
  constructor(name, description, takeable) {
    (this.name = name), // name of the object
      (this.description = description), // text about the object when player grabs it
      (this.takeable = takeable);
  }
  examine() {
    return this.description;
  }
  take() {
    if (this.takeable) {
      inventory.push(this.name);
      return "you have picked " + this.name + ", you have " + inventory;
    } else {
      return "you can't take that " + this.description;
    }
  }
}

let diary = new checkInventory("diary", "Tom Riddle’s Diary", true);
// console.log(diary.take())
let scroll = new checkInventory("scroll", "Instructions", false);
//console.log(scroll.take())
let fabric = new checkInventory("fabric", "description", true);
//console.log(fabric.take())
let horcrux = new checkInventory("Horcrux", "description", false);
//console.log(Horcrux.take())
let treacleTart = new checkInventory(
  "Treacle Tart",
  "Tom Riddle’s Diary",
  true
);
//console.log(TreacleTart.take())
let sortingHat = new checkInventory("Sorting Hat", "Tom Riddle’s Diary", false);
//console.log(sortingHat.take())
let book = new checkInventory("Book", "Tom Riddle’s Diary", true);
//console.log(book.take())
let paper = new checkInventory("Paper", "Tom Riddle’s Diary", false);
//console.log(paper.take())

//items key
let itemKey = {
  treacletart: treacleTart,
  "treacle tart": treacleTart,
  tart: treacleTart,
  sortinghat: sortingHat,
  "sorting hat": sortingHat,
  hat: sortingHat,
  diary: diary,
  "tom riddle's diary": diary,
  "riddle's diary": diary,
  "tom's diary": diary,
  "riddle diary": diary,
  "tom riddle diary": diary,
  inventory: inventory,
  north: "north",
  south: "south",
  east: "east",
  west: "west",
  room: "room",
};

//--------------------------------------------Actions---------------------------------------//
//action key
let listOfActions = {
  move: ["move", "go"],
  "look around": ["look around"],
  take: ["take"],
  drop: ["drop"],
  examine: ["examine", "look at"],
  read: ["read"],
  greet: ["greet"],
};

//drop function
//would like to drop an item
// yes
//which item
//1=diary, 2= scroll.....
//player inputs a number of the item to be dropped

async function drop() {
  console.log("which item would you like to drop?");

  for (i = 0; i < inventory.length; i++) {
    console.log(i + "-" + inventory[i]);
  }
  userInp = await ask("please input the item number to be removed: ");

  inventory.splice(parseInt(userInp), 1); // index,how many item to be removed
  console.log("you have " + inventory);
}

//state machine //Megan made this as a statehold

//----------------------------------------Functions-------------------------------//

//function to turn answer into array to isolate verb and noun
function splitAnswer(answer) {
  //declares answerArr variable as an array to hold the answer action and answer verb
  let answerArr = [];
  //creates an array of the available actions from listOfActions
  let actionKeys = Object.keys(listOfActions);
  //creates an array of the available items from the itemKey
  let itemKeys = Object.keys(itemKey);
  //the first part of the answer should be the action - compare the answer against the actionKey
  actionKeys.forEach((action) => {
    //for each action, there are multiple valid user inputs
    listOfActions[action].forEach((option) => {
      //if the user input is included in the listOfActions, return the valid action verb and store in answerArr[0]
      if (answer.includes(option)) {
        answerArr[0] = action;
      }
    });
    //for each item, if the item is included in the itemKey, return the valid item and store in asnwerArr1[]
    itemKeys.forEach((item) => {
      if (answer.includes(item)) {
        answerArr[1] = item;
      }
    });
  });
  //return answerArr
  return answerArr;
}

//confirms if the item being called upon is in the room the users is currently in
function checkRoom(item, currentRoom) {
  return items[mapOfItems[item]].currentRoom === currentRoom;
}

//----------------------Play game-------------------------------------------------//
start();
async function start() {
  //declares variable to store current room
  let currentRoom = "";
  const welcomeMessage = `Welcome to Hogwarts, School of Witchcraft and Wizardry! Today you are tasked with a very important mission: find the remaining horcrux and destroy it to defeat Voldemort once and for all! Are you ready to defeat Voldemort?\n>_`;
  let answer = await ask(welcomeMessage);
  while (answer.toLowerCase().trim() !== "yes") {
    answer = await ask("Say yes when you're ready to begin!\n>_");
  }
  //core of game - expects user input to move through rooms and interact with items.  Will continue to loop until the user enters 'exit'
  while (answer !== "exit") {
    //the user has said yes - show them the room description for the first room
    if (answer.toLowerCase().trim() === "yes") {
      currentRoom = greatHall;
      greatHall.enter();
    }
    //prompts user for input
    answer = await ask(">_");

    //sanitize answer
    answer = answer.toLowerCase().trim();

    //accepts answer and breaks out into action and noun
    let answerArr = splitAnswer(answer);

    //declares variables to hold the answerAction and answerItem
    let answerAction = answerArr[0];
    let answerItem = answerArr[1];

    //validate the user input to confirm the user has provided a valid action and item.  If they have the answerArr will have length 2
    if (answerArr.length === 2) {
      switch (answerAction) {
        case "move":
          console.log("moving!");
          // console.log("this is within the switch statement:");
          // console.log(currentRoom);
          // currentRoom.move(answer);
          break;
        case "look around":
          console.log("looking around!");
          lookAround();
          break;
        case "take":
          console.log("taking!");
          take();
          break;
        case "drop":
          console.log("dropping!");
          drop();
          break;
        case "check":
          console.log("checking inventory!");
          checkInventory();
          break;
        default:
          console.log(itemKey[answerItem].description);
      }
    } else console.log(`Sorry, I don't know how to ${answer}.`);
  }
  console.log("Goodbye!");
  process.exit();
}

// items = {
//   sortingHat: {
//     description: "here is a description for the sorting hat",
//     movability: "permanent",
//     currentRoom: "greatHall",
//     examine: () => {
//       return "\"Oh you may not think I'm pretty, but don't judge on what you see, I'll eat myself if you can find a smarter hat than me.\"";
//     },
//     read: () => {
//       return "You cannot read the Sorting Hat";
//     },
//     greet: () => {
//       return "Hello. I am the Sorting Hat.  I have a clue for you!  The answer lies in the secret chamber south of this great room.  To enter you must pocess that which will make you invisible to those around you.";
//     },
//     //include take, drop, use(?)
//   },
//   treacleTart: {
//     description: "here is a description for the treacle tart",
//     movability: "removable",
//     currentRoom: "greatHall",
//     examine: () => {
//       return "Hogwart's treacle tarts are made to perfection with a flakey pastry and golden syrup; and of course no soggy bottoms.";
//     },
//     read: () => {
//       return "You cannot read the treacle tart";
//     },
//     greet: () => {
//       return "Not everything in Hogwarts is living...you can't greet a treacle tart.";
//     },
//   },
//   riddleDiary: {
//     description: "here is a description for Tom Riddle's Diary",
//     movability: "removable",
//     currentRoom: "gryffindorCommonRoom",
//     examine: () => {
//       return "You are examining the diary";
//     },
//     read: () => {
//       return "You are reading the diary";
//     },
//     greet: () => {
//       return "Hello. I am the diary of Tom Riddle";
//     },
//   },
// };
