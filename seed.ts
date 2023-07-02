import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import { IFriendRequest } from "./src/providers/friends-provider";
import { User } from "./src/Interfaces/user";

function generateAccounts() {
  const inputArray: User[] = [];
  for (let i = 0; i < 30; i++) {
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

function generateRandomStatus(): "accepted" | "rejected" | "pending" {
  const num = generateRandomInt(3);
  switch (true) {
    case num === 0:
      return "accepted";
    case num === 1:
      return "rejected";
    case num === 2:
      return "pending";
    default:
      return "accepted";
  }
}

function generateIdWithout(omit: number) {
  let randomId: number = generateRandomInt(accounts.length);
  return randomId === omit ? (randomId += 1) : randomId;
}

function generateRandomReceiver(potentialSender: User) {
  const potentialReceiverId = generateIdWithout(potentialSender.id);
  const receiver = accounts.find(
    (account) => account.id === potentialReceiverId
  );
  if (receiver) {
    return receiver;
  } else {
    return potentialSender;
  }
}
const isDuplicateRequest = (
  requests: IFriendRequest[],
  sender: string,
  receiver: string
) => {
  let isDupe = false;
  for (const request of requests) {
    const values = Object.values(request);
    const hasSender = values.includes(sender);
    const hasReceiver = values.includes(receiver);
    if (hasSender && hasReceiver) {
      isDupe = true;
    } else {
      continue;
    }
  }
  return isDupe;
};

//everyone is friends with user0 and is tagged in a post
function generateFriendRequests(accounts: User[], requestsPerPerson: number) {
  const requestArray: IFriendRequest[] = [];
  let idCount = 0;
  for (const account of accounts) {
    const eligibleReceivers: User[] = [];
    for (let index = 0; index < requestsPerPerson; index++) {
      const receiver = generateRandomReceiver(account);
      eligibleReceivers.push(receiver);
    }
    for (let index = 0; index < requestsPerPerson; index++) {
      const sender = account.userName;
      const receiver = eligibleReceivers[index].userName;
      const request: IFriendRequest = {
        status: generateRandomStatus(),
        sender: sender,
        receiver: receiver,
        id: idCount,
      };
      const defaultFriend: IFriendRequest = {
        status: "accepted",
        sender: sender,
        receiver: "user0",
        id: idCount + 1,
      };
      if (!isDuplicateRequest(requestArray, sender, receiver)) {
        requestArray.push(request);
        requestArray.push(defaultFriend);
        idCount += 2;
      } else idCount += 1;
    }
  }
  console.log(requestArray);
  console.log(requestArray.length);
  return requestArray;
}

const accounts = generateAccounts();
const friendRequests = generateFriendRequests(accounts, 20);
const data = {
  accounts: accounts,
  tunes: generateTunes(),
  friendRequests: friendRequests,
};

writeFileSync("db.json", JSON.stringify(data));
