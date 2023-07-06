import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import { IFriendRequest } from "./src/providers/friends-provider";
import { User } from "./src/Interfaces/user";

const accounts = generateAccounts(10);
function generateAccounts(maxAccounts: number) {
  const inputArray: User[] = [];
  for (let i = 0; i < maxAccounts; i++) {
    inputArray.push({
      userName: `user${i}`,
      profileImg: faker.image.people(100, 100, true),
      password: `pw${i}`,
      id: i,
    });
  }
  return inputArray;
}
const returnDefaultTune = (user: string, id: number) => {
  const createdBy = id === 0 ? "user1" : "user0";
  const tagged = id === 0 ? "user0" : user;

  return {
    artist: `${faker.name.firstName()} ${faker.music.genre()}`,
    title: faker.music.songName(),
    img: faker.image.abstract(100, 100, true),
    createdBy: createdBy,
    comment: faker.lorem.lines(2),
    tagged: tagged,
    id: id,
  };
};

function generateTunes() {
  const inputArray = [];
  for (let index = 0; index < accounts.length; index++) {
    const account = accounts[index];
    inputArray.push(returnDefaultTune(account.userName, index));
  }
  for (let index = accounts.length; index < accounts.length + 30; index++) {
    const num1 = generateRandomInt(30);
    let num2 = generateRandomInt(30);
    if (num1 === num2) {
      num2 = num1 + 1;
    }
    const createdBy = "user" + num1.toString();
    const tagged = "user" + num2.toString();

    const randomTune = {
      artist: `${faker.name.firstName()} ${faker.music.genre()}`,
      title: faker.music.songName(),
      img: faker.image.abstract(100, 100, true),
      createdBy: createdBy,
      comment: faker.lorem.lines(2),
      tagged: tagged,
      id: index,
    };
    inputArray.push(randomTune);
  }

  return inputArray;
}

function generateRandomInt(limit: number) {
  return Math.floor(Math.random() * (limit - 0) + 0);
}

const generateAllUniquePairs = (array: User[], start: number) => {
  const allCombos = [];
  for (let i = start; i <= array.length; i++) {
    const current = "user" + i;
    const iPlusOne = i + 1;
    for (let n = iPlusOne; n <= array.length; n++) {
      const otherUser = "user" + n;
      allCombos.push([current, otherUser]);
    }
  }
  return allCombos;
};
let allPossiblePairs = generateAllUniquePairs(accounts, 0);

function generateFriendRequests(numberPerUser: number) {
  const requestArray: IFriendRequest[] = [];
  let idCount = 0;
  for (let index = 0; index < accounts.length; index++) {
    const currentUser = accounts[index].userName;
    //get array of possibilities for user
    const hasUser = allPossiblePairs.filter((pair) => {
      const values = Object.values(pair);
      return values.includes(currentUser);
    });
    //create x number of requests
    for (let subIndex = 0; subIndex < numberPerUser; subIndex++) {
      const randomInt = generateRandomInt(hasUser.length);
      const randomPair = hasUser[randomInt];
      //update hasUSer
      hasUser.splice(randomInt, 1);
      const reciever =
        randomPair[0] === currentUser ? randomPair[1] : randomPair[0];
      requestArray.push({
        status: "accepted",
        sender: currentUser,
        receiver: reciever,
        id: idCount,
      });
      idCount++;
      //remove pair from allPossible Pairs
      allPossiblePairs = allPossiblePairs.filter((pair) => {
        if (pair.includes(randomPair[0])) {
          if (pair.includes(randomPair[1])) {
            return false;
          }
        }
        return true;
      });
    }
  }

  for (let index = 0; index < allPossiblePairs.length; index++) {
    const users = allPossiblePairs[index];
    if (index % 2 === 0) {
      requestArray.push({
        status: "pending",
        sender: users[0],
        receiver: users[1],
        id: idCount,
      });
      idCount++;
    } else {
      requestArray.push({
        status: "rejected",
        sender: users[0],
        receiver: users[1],
        id: idCount,
      });
      idCount++;
    }
  }

  return requestArray;
}
const totalRequests = generateFriendRequests(3);
// console.log({
//   allpossiblepairs: allPossiblePairs.length,
//   totalRequests: totalRequests,
//   totalRequestsLength: totalRequests.length,
// });
const data = {
  accounts: accounts,
  tunes: generateTunes(),
  friendRequests: totalRequests,
};

writeFileSync("db.json", JSON.stringify(data));
