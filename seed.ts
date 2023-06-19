import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import { IFriendRequest } from "./src/providers/friends-provider";
import { User } from "./src/Interfaces/user";

function generateTunes() {
  const inputArray = [];
  for (let i = 0; i < 30; i++) {
    inputArray.push({
      artist: `${faker.name.firstName()} ${faker.music.genre()}`,
      title: faker.music.songName(),
      img: faker.image.abstract(100, 100, true),
      createdBy: "user" + faker.random.numeric(),
      comment: faker.lorem.lines(2),
      tagged: "user" + faker.random.numeric(),
      id: i,
    });
  }
  return inputArray;
}
function generateAccounts() {
  const inputArray: User[] = [];
  for (let i = 0; i < 10; i++) {
    inputArray.push({
      userName: `user${i}`,
      profileImg: faker.image.people(100, 100, true),
      password: `pw${i}`,
      id: i,
    });
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
function createRequest(config: IFriendRequest): {
  status: string;
  sender: string;
  receiver: string;
  id: number | undefined;
} {
  return {
    status: config.status,
    sender: config.sender,
    receiver: config.receiver,
    id: config.id,
  };
}

function generateUniqueReceiver(potentialSender: User) {
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
function generateFriendRequests(accounts: User[], requestsPerPerson: number) {
  const requestArray: IFriendRequest[] = [];
  let idCount = 0;
  for (const account of accounts) {
    const eligibleReceivers: User[] = [];
    for (let index = 0; index < requestsPerPerson; index++) {
      const receiver = generateUniqueReceiver(account);
      eligibleReceivers.push(receiver);
    }
    for (let index = 0; index < requestsPerPerson; index++) {
      const sender = account.userName;
      const receiver = eligibleReceivers[index].userName;
      const request = createRequest({
        status: generateRandomStatus(),
        sender: sender,
        receiver: receiver,
        id: idCount,
      }) as IFriendRequest;
      if (!isDuplicateRequest(requestArray, sender, receiver)) {
        requestArray.push(request);
        idCount++;
      }
    }

    //************** */
    //you should go through this project and pass around the User object instead of the userName string that way you can easily get anything you want from it++++++ */
    //************** */
  }
  console.log(requestArray);
  console.log(requestArray.length);
  return requestArray;
}

const accounts = generateAccounts();
const friendRequests = generateFriendRequests(accounts, 7);
const data = {
  accounts: accounts,
  tunes: generateTunes(),
  friendRequests: friendRequests,
};

writeFileSync("db.json", JSON.stringify(data));

// index.js
// maybe make a list of all accounts, pick random ones, and pop them off to make requests.
// or maybe just make random friend requests with possible duplicates and add themt o a set
